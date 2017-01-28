import * as React from 'react';
import { ScrollBarProps } from './ScrollBarProps';
import { ScrollBarState } from './ScrollBarState';
import { classNames } from '../../../utils';

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
        let scale = (scrollBarSize - 2 * buttonSize) / (this.props.maxPosition - this.props.minPosition);

        return {
            buttonSize,
            position: this.props.position,
            scale
        };
    }

    prevButtonClick: () => void = () => {
        if (this.state.position > this.props.minPosition) {
            this.setState({
                position: this.state.position - 1
            });
        }
    }

    nextButtonClick: () => void = () => {
        if (this.state.position < this.props.maxPosition) {
            this.setState({
                position: this.state.position + 1
            });
        }
    }

    render(): JSX.Element {
        let buttonStyle = {
            height: this.state.buttonSize,
            width: this.state.buttonSize
        };

        let knob = null;
        if (this.state.scale) {
            let knobSize = this.props.pageSize * this.state.scale;
            let knobPos = (this.state.position - this.props.minPosition) * this.state.scale + this.state.buttonSize;

            // tslint:disable-next-line:no-string-literal
            let scrollBarKnobOffset = CSS_NUMBER_VARS['SCROLLBAR_KNOB_OFFSET'];

            knob = (
                <div className="scrollbar-knob"
                    style={{
                        height: this.props.orientation === 'vertical' ? knobSize : this.state.buttonSize - 2 * scrollBarKnobOffset,
                        left: this.props.orientation === 'horizontal' ? knobPos : scrollBarKnobOffset,
                        top: this.props.orientation === 'vertical' ? knobPos : scrollBarKnobOffset,
                        width: this.props.orientation === 'horizontal' ? knobSize : this.state.buttonSize - 2 * scrollBarKnobOffset
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
                <div
                    style={buttonStyle}
                    className={classNames(
                        'scrollbar-button',
                        'scrollbar-prev-button',
                        {
                            'scrollbar-up-button': this.props.orientation === 'vertical'
                                && this.state.position > this.props.minPosition,
                            'scrollbar-left-button': this.props.orientation === 'horizontal'
                                && this.state.position > this.props.minPosition,
                            'scrollbar-up-button-disabled': this.props.orientation === 'vertical'
                                && this.state.position <= this.props.minPosition,
                            'scrollbar-left-button-disabled': this.props.orientation === 'horizontal'
                                && this.state.position <= this.props.minPosition
                        }
                    )}
                    onClick={this.prevButtonClick}
                >
                </div>
                {knob}
                <div
                    style={buttonStyle}
                    className={classNames(
                        'scrollbar-button',
                        'scrollbar-next-button',
                        {
                            'scrollbar-down-button': this.props.orientation === 'vertical'
                                && this.state.position < this.props.maxPosition,
                            'scrollbar-right-button': this.props.orientation === 'horizontal'
                                && this.state.position < this.props.maxPosition,
                            'scrollbar-down-button-disabled': this.props.orientation === 'vertical'
                                && this.state.position >= this.props.maxPosition,
                            'scrollbar-right-button-disabled': this.props.orientation === 'horizontal'
                                && this.state.position >= this.props.maxPosition
                        }
                    )}
                    onClick={this.nextButtonClick}
                >
                </div>
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
