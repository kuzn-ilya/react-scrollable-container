import * as React from 'react';
import { ScrollBarProps, scrollBarPropTypes } from './ScrollBarProps';
import { ScrollBarState } from './ScrollBarState';
import { ScrollBarButton } from './ScrollBarButton';
import { ScrollBarThumb } from './ScrollBarThumb';

import { classNames, listenToResize } from '../../../utils';
import * as invariant from 'fbjs/lib/invariant';
import * as emptyFunction from 'fbjs/lib/emptyFunction';
import { CSS_NUMBER_VARS } from '../../../stubs/cssVars';

import * as classes from '../../../styles/scroll-bar.css';

const SCROLL_TIME = 200;
// tslint:disable-next-line:no-string-literal
const SCROLLBAR_THICKNESS = CSS_NUMBER_VARS['SCROLLBAR_THICKNESS'];
const SCROLLBAR_MIN_SIZE = SCROLLBAR_THICKNESS;

export class ScrollBar extends React.PureComponent<ScrollBarProps, Partial<ScrollBarState>> {
    static propTypes = scrollBarPropTypes;

    static defaultProps: Partial<ScrollBarProps> = {
        onScroll: emptyFunction,
        showButtons: false
    };

    constructor(props?: ScrollBarProps) {
        super(props);
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
        scrollBarSize = scrollBarSize - 2 * buttonSize;

        let pageSize = props.pageSize;
        // TODO: Check min/max and assert if it's necessary

        let thumbSize = pageSize * scrollBarSize / (pageSize + props.max - props.min + 1);

        if (thumbSize < SCROLLBAR_MIN_SIZE) {
            thumbSize = SCROLLBAR_MIN_SIZE;
        }

        let thumbPosition = pos * scrollBarSize / (pageSize + props.max - props.min + 1)
            + buttonSize;

        return {
            pageSize,
            position: pos,
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

        let scrollBarSize = this.calculateScrollBarSize();
        let buttonSize = this.props.showButtons ? SCROLLBAR_THICKNESS : 0;

        let thumbPos = thumbPosition;
        let thumbSize = this.state.thumbSize || 0;
        if (thumbPos < buttonSize) {
            thumbPos = buttonSize;
        } else if (thumbPos + thumbSize > scrollBarSize - buttonSize) {
            thumbPos = scrollBarSize - buttonSize - thumbSize;
        }

        scrollBarSize = scrollBarSize - 2 * buttonSize;
        let pos = (thumbPos - buttonSize) * (this.state.pageSize! + this.props.max - this.props.min + 1) / scrollBarSize;

        return Math.round(pos);
    }

    private moveBy(delta: number): void {
        let newPosition = (this.state.position || 0) + delta;

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

    private setRef = (ref: HTMLDivElement): void => {
        this.ref = ref;
        if (ref && this.state.scrollBarSize !== this.calculateScrollBarSize()) {
            this.updateState(this.props, this.state.position);
        }
    }

    private handlePrevButtonClick = (): void => {
        this.moveBy(-this.props.smallChange);
    }

    private handleNextButtonClick = (): void => {
        this.moveBy(this.props.smallChange);
    }

    private handleMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
        this.updateMousePos(event);
        this.handleScroll();
    }

    private handleMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
        this.updateMousePos(event);
    }

    private handleMouseUp = (event: React.MouseEvent<HTMLDivElement>): void => {
        this.mousePos = undefined;
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = undefined;
        }
    }

    private handleThumbDragging = (newPosition: number): void => {
        let newPos = this.thumbPositionToPosition(newPosition);
        this.updateState(this.props, newPos);
    }

    private handleResize = (): void => {
        this.updateState(this.props, this.state.position);
    }

    private handleScroll = (): void => {
        let mousePos = this.mousePos || 0;
        let thumbPosition = this.state.thumbPosition || 0;
        if (mousePos < thumbPosition) {
            this.moveBy(-this.props.largeChange);
            this.timerId = setTimeout(this.handleScroll, SCROLL_TIME);
        } else if (mousePos > thumbPosition + (this.state.thumbSize || 0)) {
            this.moveBy(this.props.largeChange);
            this.timerId = setTimeout(this.handleScroll, SCROLL_TIME);
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
        let position = this.state.position || 0;
        let prevButton = this.props.showButtons ?
            <ScrollBarButton
                type={this.props.orientation === 'vertical' ? 'top' : 'left'}
                size={SCROLLBAR_THICKNESS}
                onScroll={this.handlePrevButtonClick}
                disabled={position <= this.props.min}
            /> : null;

        let nextButton = this.props.showButtons ?
            <ScrollBarButton
                type={this.props.orientation === 'vertical' ? 'bottom' : 'right'}
                size={SCROLLBAR_THICKNESS}
                onScroll={this.handleNextButtonClick}
                disabled={position >= this.props.max}
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
                className={classNames(classes.scrollbarContainer, {
                    [classes.scrollbarContainerVertical]: this.props.orientation === 'vertical',
                    [classes.scrollbarContainerHorizontal]: this.props.orientation === 'horizontal'
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
