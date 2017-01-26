import * as React from 'react';
import { ScrollBarProps } from './ScrollBarProps';
import { ScrollBarState } from './ScrollBarState';

export class ScrollBar extends React.PureComponent<ScrollBarProps, ScrollBarState> {
    constructor(props?: ScrollBarProps) {
        super(props);
        this.state = {
            actualSize: 0
        };
    }

    render(): JSX.Element {
        let buttonSize = this.props.orientation === 'vertical' ? this.props.width : this.props.height;

        if (buttonSize === '100%') {
            buttonSize = 17;
        }

        let prevButtonStyle = {
            position: 'absolute',
            display: 'inline-block',
            height: buttonSize,
            width: buttonSize,
            left: 0,
            top: 0,
            backgroundColor: 'red'
        };

        let nextButtonStyle = {
            display: 'inline-block',
            position: 'absolute',
            height: buttonSize,
            width: buttonSize,
            right: 0,
            bottom: 0,
            backgroundColor: 'red'
        };

        let knob = null;
        if (this.state.actualSize) {
            let actualSize = this.state.actualSize - 2 * buttonSize;
            // TODO: Check min/max and assert if it's necessary
            let posMultiplier = actualSize / (this.props.maxPosition - this.props.minPosition);
            let knobSize = this.props.pageSize * posMultiplier;
            let knobPos = (this.props.position - this.props.minPosition) * posMultiplier + buttonSize;

            knob = (
                <div
                    style={{
                        display: 'inline-block',
                        position: 'absolute',
                        height: this.props.orientation === 'vertical' ? knobSize : buttonSize,
                        width: this.props.orientation === 'horizontal' ? knobSize : buttonSize,
                        left: this.props.orientation === 'horizontal' ? knobPos : 0,
                        top: this.props.orientation === 'vertical' ? knobPos : 0,
                        backgroundColor: 'white'
                    }}
                >
                </div>
            )
        }

        return (
            <div
                ref={(ref: HTMLDivElement) => this.ref = ref}
                style={{
                    backgroundColor: 'lightgray',
                    height: this.props.height,
                    position: 'relative',
                    width: this.props.width
                }}
            >
                <div style={prevButtonStyle}></div>
                {knob}
                <div style={nextButtonStyle}></div>
            </div>
        );
    }

    private ref: HTMLDivElement;

    componentDidMount(): void {
        if (this.ref) {
            this.setState({
                actualSize: this.props.orientation === 'vertical' ? this.ref.offsetHeight : this.ref.offsetWidth
            })
        }
    }
}
