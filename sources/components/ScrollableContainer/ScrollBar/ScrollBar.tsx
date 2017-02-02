import * as React from 'react';
import { ScrollBarProps, scrollBarPropTypes } from './ScrollBarProps';
import { ScrollBarState } from './ScrollBarState';
import { ScrollBarButton } from './ScrollBarButton';
import { ScrollBarThumb } from './ScrollBarThumb';

import { classNames, listenToResize } from '../../../utils';
import * as invariant from 'fbjs/lib/invariant';
import * as emptyFunction from 'fbjs/lib/emptyFunction';
import { CSS_NUMBER_VARS } from '../../../stubs/cssVars';

import '../../../styles/scroll-bar.css';

const SCROLL_TIME = 50;
// tslint:disable-next-line:no-string-literal
const SCROLLBAR_THICKNESS = CSS_NUMBER_VARS['SCROLLBAR_THICKNESS'];

export class ScrollBar extends React.PureComponent<ScrollBarProps, Partial<ScrollBarState>> {
    static propTypes = scrollBarPropTypes;

    static defaultProps: Partial<ScrollBarProps> = {
        onScroll: emptyFunction,
        showButtons: false
    };

    constructor(props?: ScrollBarProps) {
        super(props);

        this.handlePrevButtonClick = this.handlePrevButtonClick.bind(this);
        this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleThumbDragging = this.handleThumbDragging.bind(this);
        this.handleResize = this.handleResize.bind(this);

        this.doScroll = this.doScroll.bind(this);
        this.setRef = this.setRef.bind(this);

        this.state = this.calculateState(0, this.props);
    }

    // tslint:disable-next-line:no-any
    private timerId: any;
    private ref: HTMLDivElement;
    private removeResizeEventListener: () => void = emptyFunction;
    private mousePos?: number = undefined;

    private calculateState(scrollBarSize: number, props: ScrollBarProps, position?: number): Partial<ScrollBarState> {
        let pos = position === undefined ? this.props.position : position;
        let buttonSize = props.showButtons ? SCROLLBAR_THICKNESS : 0;
        // TODO: Check min/max and assert if it's necessary
        let scale = (scrollBarSize - 2 * buttonSize) / (props.max - props.min + 1);

        let thumbSize = props.pageSize * scale;
        let thumbPosition = (pos - props.min) * scale
            * (props.max - props.min - props.pageSize + 1) / (props.max - props.min)
            + buttonSize;

        return {
            position: pos,
            scale,
            scrollBarSize,
            thumbPosition,
            thumbSize
        };
    }

    private calculateScrollBarSize(): number {
        if (this.ref) {
            return this.props.orientation === 'vertical' ? this.ref.offsetHeight : this.ref.offsetWidth;
        }
        return 0;
    }

    private updateMousePos(event: React.MouseEvent<HTMLDivElement>): void {
        this.mousePos = this.props.orientation === 'horizontal'
            ? event.pageX - this.ref.getBoundingClientRect().left
            : event.pageY - this.ref.getBoundingClientRect().top;
    }

    private thumbPositionToPosition(thumbPosition: number): number {
        invariant(!!this.ref, '<ScrollBar>: ref should be defined.');

        let size = this.calculateScrollBarSize();
        let buttonSize = this.props.showButtons ? SCROLLBAR_THICKNESS : 0;

        let thumbPos = thumbPosition;
        if (thumbPos < buttonSize) {
            thumbPos = buttonSize;
        } else if (thumbPos + this.state.thumbSize > size - buttonSize) {
            thumbPos = size - buttonSize - this.state.thumbSize;
        }

        let pos = (thumbPos - buttonSize) * (this.props.max - this.props.min)
            / (this.props.max - this.props.min - this.props.pageSize + 1) / this.state.scale
            + this.props.min;

        return Math.round(pos);
    }

    private moveBy(delta: number): void {
        let newPosition = this.state.position + delta;

        if (delta < 0 && newPosition < this.props.min) {
            newPosition = this.props.min;
        }

        if (delta > 0 && newPosition > this.props.max) {
            newPosition = this.props.max;
        }

        this.updateState(this.props, newPosition);
    }

    private updateState(props: ScrollBarProps, position?: number): void {
        let size = this.calculateScrollBarSize();
        let oldPosition = this.state.position;
        this.setState(this.calculateState(size, props, position));
        if (position !== undefined && position !== oldPosition) {
            this.props.onScroll!(position);
        }
    }

    private setRef: (ref: HTMLDivElement) => void = (ref) => {
        this.ref = ref;
        if (ref && this.state.scrollBarSize !== this.calculateScrollBarSize()) {
            this.updateState(this.props, this.state.position);
        }
    }

    private handlePrevButtonClick: () => void = () => {
        this.moveBy(-this.props.smallChange);
    }

    private handleNextButtonClick: () => void = () => {
        this.moveBy(this.props.smallChange);
    }

    private handleMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void = (event) => {
        this.updateMousePos(event);
        this.doScroll();
    }

    private handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void = (event) => {
        this.updateMousePos(event);
    }

    private handleMouseUp: (event: React.MouseEvent<HTMLDivElement>) => void = (event) => {
        this.mousePos = undefined;
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = undefined;
        }
    }

    private handleThumbDragging: (newPosition: number) => void = (newPosition) => {
        let newPos = this.thumbPositionToPosition(newPosition);
        this.updateState(this.props, newPos);
    }

    private handleResize: () => void = () => {
        this.updateState(this.props, this.state.position);
    }

    private doScroll: () => void = () => {
        if (this.mousePos < this.state.thumbPosition) {
            this.moveBy(-this.props.largeChange);
            this.timerId = setTimeout(this.doScroll, SCROLL_TIME);
        } else if (this.mousePos > this.state.thumbPosition + this.state.thumbSize) {
            this.moveBy(this.props.largeChange);
            this.timerId = setTimeout(this.doScroll, SCROLL_TIME);
        }
    }

    componentDidMount(): void {
        this.updateState(this.props);
        this.removeResizeEventListener = listenToResize(this.ref, this.handleResize);
    }

    componentWillUnmount(): void {
        this.removeResizeEventListener();
    }

    componentWillReceiveProps(nextProps: ScrollBarProps): void {
        let position = this.props.position !== nextProps.position ? nextProps.position : this.state.position;
        this.updateState(nextProps, position!);
    }

    render(): JSX.Element {
        let prevButton = this.props.showButtons ?
            <ScrollBarButton
                type={this.props.orientation === 'vertical' ? 'top' : 'left'}
                size={SCROLLBAR_THICKNESS}
                onScroll={this.handlePrevButtonClick}
                disabled={this.state.position <= this.props.min}
            /> : null;

        let nextButton = this.props.showButtons ?
            <ScrollBarButton
                type={this.props.orientation === 'vertical' ? 'bottom' : 'right'}
                size={SCROLLBAR_THICKNESS}
                onScroll={this.handleNextButtonClick}
                disabled={this.state.position >= this.props.max}
            /> : null;

        let style = {
            bottom: this.props.orientation === 'vertical' ? this.props.rightOrBottom : undefined,
            left: this.props.orientation === 'horizontal' ? this.props.leftOrTop : undefined,
            right: this.props.orientation === 'horizontal' ? this.props.rightOrBottom : undefined,
            top: this.props.orientation === 'vertical' ? this.props.leftOrTop : undefined
        };

        return (
            <div
                ref={this.setRef}
                className={classNames('scrollbar-container', {
                    'scrollbar-container-vertical': this.props.orientation === 'vertical',
                    'scrollbar-container-horizontal': this.props.orientation === 'horizontal'
                })}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
                style={style}
            >
                {prevButton}
                <ScrollBarThumb
                    orientation={this.props.orientation}
                    thickness={SCROLLBAR_THICKNESS}
                    position={this.state.thumbPosition!}
                    size={this.state.thumbSize!}
                    onDragging={this.handleThumbDragging}
                />
                {nextButton}
            </div>
        );
    }
}
