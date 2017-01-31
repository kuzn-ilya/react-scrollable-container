import * as React from 'react';

import { ScrollBarThumbProps } from './ScrollBarThumbProps';
import { ScrollBarThumbState } from './ScrollBarThumbState';

import { CSS_NUMBER_VARS } from '../../../../stubs/cssVars';
import { MouseCapture, classNames } from '../../../../utils';

import * as emptyFunction from 'fbjs/lib/emptyFunction';

import '../../../../styles/scroll-bar.css';

export class ScrollBarThumb extends React.PureComponent<ScrollBarThumbProps, ScrollBarThumbState> {
    ref: HTMLDivElement;

    static defaultProps: Partial<ScrollBarThumbProps> = {
        onDragEnd: emptyFunction,
        onDragging: emptyFunction
    };

    constructor(props?: ScrollBarThumbProps) {
        super(props);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.state = {
            isActive: false
        };
    }

    startPosition: number = 0;
    mouseCapture?: MouseCapture = undefined;

    handleMouseDown: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
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

    handleMouseMove: (deltaX: number, deltaY: number) => void = (deltaX, deltaY) => {
        let newPosition = this.calcNewPosition(deltaX, deltaY);
        this.props.onDragging!(newPosition);
    }

    handleMouseUp: () => void = () => {
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

        return (
            <div
                className={classNames('scrollbar-thumb', {
                    'scrollbar-thumb-captured': this.state.isActive
                })}
                style={{
                    height: this.isVertical() ? this.props.size : this.props.thickness - 2 * scrollBarThumbMargin,
                    left: !this.isVertical() ? this.props.position : scrollBarThumbMargin,
                    top: this.isVertical() ? this.props.position : scrollBarThumbMargin,
                    width: !this.isVertical() ? this.props.size : this.props.thickness - 2 * scrollBarThumbMargin
                }}
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
