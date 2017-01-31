import * as React from 'react';

import { ScrollBarThumbProps } from './ScrollBarThumbProps';
import { CSS_NUMBER_VARS } from '../../../../stubs/cssVars';
import { MouseCapture } from '../../../../utils';

import * as emptyFunction from 'fbjs/lib/emptyFunction';

import '../../../../styles/scroll-bar.css';

export class ScrollBarThumb extends React.PureComponent<ScrollBarThumbProps, {}> {
    ref: HTMLDivElement;

    static defaultProps: Partial<ScrollBarThumbProps> = {
        onDragEnd: emptyFunction,
        onDragging: emptyFunction
    };

    constructor(props?: ScrollBarThumbProps) {
        super(props);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleWindowMouseMove = this.handleWindowMouseMove.bind(this);
        this.handleReleaseMouseCapture = this.handleReleaseMouseCapture.bind(this);
    }

    startPosition: number = 0;
    mouseCapture?: MouseCapture = undefined;

    handleMouseDown: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
        if (e.button !== 0) {
            return;
        }

        this.mouseCapture = MouseCapture.captureMouseEvents(e.nativeEvent, this.handleWindowMouseMove, this.handleReleaseMouseCapture);
        let pagePosition = this.isVertical() ? e.pageY : e.pageX;

        this.startPosition = pagePosition - this.props.position;

        this.setState({
            isActive: true
        });
    }

    handleWindowMouseMove: (e: MouseEvent) => void = (e) => {
        let newPosition = this.calcNewPosition(e);
        this.props.onDragging!(newPosition);
    }

    handleReleaseMouseCapture: (e: MouseEvent) => void = (e) => {
        if (this.mouseCapture) {
            this.mouseCapture = undefined;
            let newPosition = this.calcNewPosition(e);
            this.props.onDragEnd!(newPosition);

            this.setState({
                isActive: false
            });
        }
    }

    render(): JSX.Element {
        // tslint:disable-next-line:no-string-literal
        let scrollBarThumbMargin = CSS_NUMBER_VARS['SCROLLBAR_THUMB_OFFSET'];

        return (
            <div className="scrollbar-thumb"
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

    private calcNewPosition(e: MouseEvent): number {
        let pagePosition = this.isVertical() ? e.pageY : e.pageX;
        return pagePosition - this.startPosition;
    }

}
