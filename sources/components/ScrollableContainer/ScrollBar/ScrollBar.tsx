import * as React from 'react';
import { ScrollBarProps } from './ScrollBarProps';
import { ScrollBarState } from './ScrollBarState';
import { classNames } from '../../../utils';

import '../../../styles/scroll-bar.css';

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

        let buttonStyle = {
            height: buttonSize,
            width: buttonSize
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
                        backgroundColor: 'lightgray',
                        display: 'inline-block',
                        height: this.props.orientation === 'vertical' ? knobSize : buttonSize,
                        left: this.props.orientation === 'horizontal' ? knobPos : 0,
                        position: 'absolute',
                        top: this.props.orientation === 'vertical' ? knobPos : 0,
                        width: this.props.orientation === 'horizontal' ? knobSize : buttonSize
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
                <div style={buttonStyle} className={classNames('scrollbar-button', 'scrollbar-prev-button')}></div>
                {knob}
                <div style={buttonStyle} className={classNames('scrollbar-button', 'scrollbar-next-button')}></div>
            </div>
        );
    }

    private ref: HTMLDivElement;

    componentDidMount(): void {
        if (this.ref) {
            this.setState({
                actualSize: this.props.orientation === 'vertical' ? this.ref.offsetHeight : this.ref.offsetWidth
            });
        }
    }
}
