import * as React from 'react';
import { ScrollBarProps } from './ScrollBarProps';
import { ScrollBarState } from './ScrollBarState';
import { ScrollBarButton } from './ScrollBarButton';
import { ScrollBarThumb } from './ScrollBarThumb';

import * as invariant from 'fbjs/lib/invariant';
import * as emptyFunction from 'fbjs/lib/emptyFunction';

import '../../../styles/scroll-bar.css';

const SCROLL_TIME = 50;

export class ScrollBar extends React.PureComponent<ScrollBarProps, Partial<ScrollBarState>> {
    static defaultProps: Partial<ScrollBarProps> = {
        onScroll: emptyFunction
    };

    constructor(props?: ScrollBarProps) {
        super(props);

        this.prevButtonClick = this.prevButtonClick.bind(this);
        this.nextButtonClick = this.nextButtonClick.bind(this);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);

        this.handleThumbDragEnd = this.handleThumbDragEnd.bind(this);
        this.handleThumbDragging = this.handleThumbDragging.bind(this);

        this.scroll = this.scroll.bind(this);

        this.state = this.calculateState(0, this.props);
    }

    calculateState(scrollBarSize: number, props: ScrollBarProps, position?: number): Partial<ScrollBarState> {
        let pos = position === undefined ? this.props.position : position;

        let buttonSize = props.orientation === 'vertical' ? props.width : props.height;

        if (buttonSize === '100%') {
            buttonSize = 17;
        }

        // TODO: Check min/max and assert if it's necessary
        let scale = (scrollBarSize - 2 * buttonSize) / (props.max - props.min + 1);

        let thumbSize = props.pageSize * scale;
        let thumbPosition = (pos - props.min) * scale
            * (props.max - props.min - props.pageSize + 1) / (props.max - props.min)
            + buttonSize;

        return {
            buttonSize,
            position: pos,
            scale,
            thumbPosition,
            thumbSize
        };
    }

    prevButtonClick: () => void = () => {
        this.moveBy(-this.props.smallChange);
    }

    nextButtonClick: () => void = () => {
        this.moveBy(this.props.smallChange);
    }

    private mousePos?: number = undefined;

    updateMousePos(event: React.MouseEvent<HTMLDivElement>): void {
        this.mousePos = this.props.orientation === 'horizontal'
            ? event.pageX - this.ref.getBoundingClientRect().left
            : event.pageY - this.ref.getBoundingClientRect().top;
    }

    // tslint:disable-next-line:no-any
    private timerId: any;

    scroll: () => void = () => {
        if (this.mousePos < this.state.thumbPosition) {
            this.moveBy(-this.props.largeChange);
            this.timerId = setTimeout(this.scroll, SCROLL_TIME);
        } else if (this.mousePos > this.state.thumbPosition + this.state.thumbSize) {
            this.moveBy(this.props.largeChange);
            this.timerId = setTimeout(this.scroll, SCROLL_TIME);
        }
    }

    handleMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void = (event) => {
        this.updateMousePos(event);
        this.scroll();
    }

    handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void = (event) => {
        this.updateMousePos(event);
    }

    handleMouseUp: (event: React.MouseEvent<HTMLDivElement>) => void = (event) => {
        this.mousePos = undefined;
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = undefined;
        }
    }

    handleThumbDragEnd: (newPosition: number) => void = (newPosition) => {
        let newPos = this.thumbPositionToPosition(newPosition);
        this.updateState(this.props, newPos);
    }

    handleThumbDragging: (newPosition: number) => void = (newPosition) => {
        let newPos = this.thumbPositionToPosition(newPosition);
        this.updateState(this.props, newPos);
    }

    thumbPositionToPosition(thumbPosition: number): number {
        invariant(!!this.ref, '<ScrollBar>: ref should be defined.');

        let size = this.props.orientation === 'vertical' ? this.ref.offsetHeight : this.ref.offsetWidth;

        let thumbPos = thumbPosition;
        if (thumbPos < this.state.buttonSize) {
            thumbPos = this.state.buttonSize || 0;
        } else if (thumbPos + this.state.thumbSize > size - this.state.buttonSize) {
            thumbPos = size - this.state.buttonSize - this.state.thumbSize;
        }

        let pos = (thumbPos - this.state.buttonSize) * (this.props.max - this.props.min)
            / (this.props.max - this.props.min - this.props.pageSize + 1) / this.state.scale
            + this.props.min;

        return Math.round(pos);
    }

    moveBy(delta: number): void {
        let newPosition = this.state.position + delta;

        if (delta < 0 && newPosition < this.props.min) {
            newPosition = this.props.min;
        }

        if (delta > 0 && newPosition > this.props.max) {
            newPosition = this.props.max;
        }

        this.updateState(this.props, newPosition);
    }

    updateState(props: ScrollBarProps, position?: number): void {
        if (this.ref) {
            let size = props.orientation === 'vertical' ? this.ref.offsetHeight : this.ref.offsetWidth;
            let oldPosition = this.state.position;
            this.setState(this.calculateState(size, props, position));
            if (position !== undefined && position !== oldPosition) {
                this.props.onScroll!(position);
            }
        }
    }

    componentDidMount(): void {
        this.updateState(this.props);
    }

    componentWillReceiveProps(nextProps: ScrollBarProps): void {
        let position = this.props.position !== nextProps.position ? nextProps.position : this.state.position;
        this.updateState(nextProps, position!);
    }

    render(): JSX.Element {
        return (
            <div
                ref={(ref: HTMLDivElement) => this.ref = ref}
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
                className="scrollbar-container"
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
            >
                <ScrollBarButton
                    type={this.props.orientation === 'vertical' ? 'top' : 'left'}
                    size={this.state.buttonSize!}
                    onScroll={this.prevButtonClick}
                    disabled={this.state.position <= this.props.min}
                />
                <ScrollBarThumb
                    orientation={this.props.orientation}
                    thickness={this.state.buttonSize!}
                    position={this.state.thumbPosition!}
                    size={this.state.thumbSize!}
                    onDragging={this.handleThumbDragging}
                    onDragEnd={this.handleThumbDragEnd}
                />
                <ScrollBarButton
                    type={this.props.orientation === 'vertical' ? 'bottom' : 'right'}
                    size={this.state.buttonSize!}
                    onScroll={this.nextButtonClick}
                    disabled={this.state.position >= this.props.max}
                />
            </div>
        );
    }

    private ref: HTMLDivElement;
}
