import * as React from 'react';
import { ScrollBarProps } from './ScrollBarProps';
import { ScrollBarState } from './ScrollBarState';
import { ScrollBarButton } from './ScrollBarButton';
import { ScrollBarThumb } from './ScrollBarThumb';

import '../../../styles/scroll-bar.css';

export class ScrollBar extends React.PureComponent<ScrollBarProps, Partial<ScrollBarState>> {
    constructor(props?: ScrollBarProps) {
        super(props);

        this.prevButtonClick = this.prevButtonClick.bind(this);
        this.nextButtonClick = this.nextButtonClick.bind(this);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.state = this.calculateSize(0, this.props);
    }

    calculateSize(scrollBarSize: number, props: ScrollBarProps, position?: number): Partial<ScrollBarState> {
        let pos = position === undefined ? this.props.position : position;

        let buttonSize = props.orientation === 'vertical' ? props.width : props.height;

        if (buttonSize === '100%') {
            buttonSize = 17;
        }

        // TODO: Check min/max and assert if it's necessary
        let scale = (scrollBarSize - 2 * buttonSize) / (props.max - props.min + 1);

        return {
            buttonSize,
            position: pos,
            scale
        };
    }

    prevButtonClick: () => void = () => {
        this.moveBy(-this.props.smallChange);
    }

    nextButtonClick: () => void = () => {
        this.moveBy(this.props.smallChange);
    }

    handleMouseDown: () => void = () => {
        return;
    }

    handleMouseUp: () => void = () => {
        return;
    }

    moveBy(delta: number): void {
        let newPosition = this.state.position + delta;

        if (delta < 0 && newPosition < this.props.min) {
            newPosition = this.props.min;
        }

        if (delta > 0 && newPosition > this.props.max) {
            newPosition = this.props.max;
        }

        this.setState({
            position: newPosition
        });
    }

    updateState(props: ScrollBarProps, position?: number): void {
        if (this.ref) {
            let size = props.orientation === 'vertical' ? this.ref.offsetHeight : this.ref.offsetWidth;
            this.setState(this.calculateSize(size, props, position));
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
        let thumb = null;
        if (this.state.scale) {
            let thumbSize = this.props.pageSize * this.state.scale;
            let thumbPos = (this.state.position - this.props.min) * this.state.scale
                * (this.props.max - this.props.min - this.props.pageSize + 1) / (this.props.max - this.props.min)
                + this.state.buttonSize;

            thumb = (
                <ScrollBarThumb
                    orientation={this.props.orientation}
                    thickness={this.state.buttonSize!}
                    position={thumbPos}
                    size={thumbSize}
                />
            );
        }

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
            >
                <ScrollBarButton
                    type={this.props.orientation === 'vertical' ? 'top' : 'left'}
                    size={this.state.buttonSize!}
                    onScroll={this.prevButtonClick}
                    disabled={this.state.position <= this.props.min}
                />
                {thumb}
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
