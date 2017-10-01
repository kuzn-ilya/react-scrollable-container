import * as React from 'react';

import { ScrollBarThumbProps, scrollBarThumbPropTypes } from './ScrollBarThumbProps';
import { ScrollBarThumbState } from './ScrollBarThumbState';

import { CSS_NUMBER_VARS } from '../../../../stubs/cssVars';
import { MouseCapture, classNames, updateCSSPosition } from '../../../../utils';

import * as emptyFunction from 'fbjs/lib/emptyFunction';

import * as classes from '../../../../styles/scroll-bar.css';

export class ScrollBarThumb extends React.PureComponent<ScrollBarThumbProps, ScrollBarThumbState> {
    static propTypes = scrollBarThumbPropTypes;

    static defaultProps: Partial<ScrollBarThumbProps> = {
        onDragEnd: emptyFunction,
        onDragging: emptyFunction
    };

    constructor(props?: ScrollBarThumbProps) {
        super(props);
        this.state = {
            isActive: false
        };
    }

    private ref: HTMLDivElement | null;
    private startPosition: number = 0;
    private mouseCapture?: MouseCapture = undefined;

    private handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (e.button !== 0) {
            return;
        }

        this.mouseCapture = MouseCapture.captureMouseEvents(e.nativeEvent as MouseEvent, this.handleMouseMove, this.handleMouseUp);
        let pagePosition = this.isVertical() ? e.pageY : e.pageX;

        this.startPosition = pagePosition - this.props.position;

        this.setState({
            isActive: true
        });
    }

    private handleMouseMove = (deltaX: number, deltaY: number): void => {
        let newPosition = this.calcNewPosition(deltaX, deltaY);
        this.props.onDragging!(newPosition);
    }

    private handleMouseUp = (): void => {
        if (this.mouseCapture) {
            this.mouseCapture = undefined;

            this.props.onDragEnd!();

            this.setState({
                isActive: false
            });
        }
    }

    render(): JSX.Element {
        // tslint:disable-next-line:no-string-literal
        let scrollBarThumbMargin = CSS_NUMBER_VARS['SCROLLBAR_THUMB_OFFSET'];

        let style = {
            height: this.isVertical() ? this.props.size : this.props.thickness - 2 * scrollBarThumbMargin,
            width: !this.isVertical() ? this.props.size : this.props.thickness - 2 * scrollBarThumbMargin
        };
        let left = !this.isVertical() ? this.props.position : scrollBarThumbMargin;
        let top = this.isVertical() ? this.props.position : scrollBarThumbMargin;

        updateCSSPosition(style, left, top);

        return (
            <div
                className={classNames(classes.scrollbarThumb, {
                    [classes.scrollbarThumbCaptured]: this.state.isActive
                })}
                style={style}
                ref={(ref) => this.ref = ref}
                onMouseDown={this.handleMouseDown}
            >
            </div>
        );
    }

    private isVertical(): boolean {
        return this.props.orientation === 'vertical';
    }

    private calcNewPosition(deltaX: number, deltaY: number): number {
        return (this.isVertical() ? deltaY : deltaX) + this.props.position;
    }
}
