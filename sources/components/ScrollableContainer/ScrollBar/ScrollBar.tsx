import * as React from 'react';
import { ScrollBarProps } from './ScrollBarProps';
import { ScrollBarState } from './ScrollBarState';
import { ScrollBarButton } from './ScrollBarButton';

import '../../../styles/scroll-bar.css';
import { CSS_NUMBER_VARS } from '../../../stubs/cssVars';

export class ScrollBar extends React.PureComponent<ScrollBarProps, Partial<ScrollBarState>> {
    constructor(props?: ScrollBarProps) {
        super(props);

        this.prevButtonClick = this.prevButtonClick.bind(this);
        this.nextButtonClick = this.nextButtonClick.bind(this);

        this.state = this.calculateSize(0);
    }

    calculateSize(scrollBarSize: number): Partial<ScrollBarState> {
        let buttonSize = this.props.orientation === 'vertical' ? this.props.width : this.props.height;

        if (buttonSize === '100%') {
            buttonSize = 17;
        }

        // TODO: Check min/max and assert if it's necessary
        let scale = (scrollBarSize - 2 * buttonSize) / (this.props.max - this.props.min + 1);

        return {
            buttonSize,
            position: this.props.position,
            scale
        };
    }

    prevButtonClick: () => void = () => {
        if (this.state.position > this.props.min) {
            this.setState({
                position: this.state.position - 1
            });
        }
    }

    nextButtonClick: () => void = () => {
        if (this.state.position < this.props.max) {
            this.setState({
                position: this.state.position + 1
            });
        }
    }

    render(): JSX.Element {
        let thumb = null;
        if (this.state.scale) {
            let thumbSize = this.props.pageSize * this.state.scale;
            let thumbPos = (this.state.position - this.props.min) * this.state.scale + this.state.buttonSize;

            // tslint:disable-next-line:no-string-literal
            let scrollBarThumbMargin = CSS_NUMBER_VARS['SCROLLBAR_THUMB_OFFSET'];

            thumb = (
                <div className="scrollbar-thumb"
                    style={{
                        height: this.props.orientation === 'vertical' ? thumbSize : this.state.buttonSize - 2 * scrollBarThumbMargin,
                        left: this.props.orientation === 'horizontal' ? thumbPos : scrollBarThumbMargin,
                        top: this.props.orientation === 'vertical' ? thumbPos : scrollBarThumbMargin,
                        width: this.props.orientation === 'horizontal' ? thumbSize : this.state.buttonSize - 2 * scrollBarThumbMargin
                    }}
                >
                </div>
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

    componentDidMount(): void {
        if (this.ref) {
            this.setState(this.calculateSize(this.props.orientation === 'vertical' ? this.ref.offsetHeight : this.ref.offsetWidth));
        }
    }
}
