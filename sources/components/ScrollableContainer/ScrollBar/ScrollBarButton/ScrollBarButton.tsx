import * as React from 'react';
import { ScrollBarButtonProps, scrollBarButtonPropTypes } from './ScrollBarButtonProps';
import { ScrollBarButtonState } from './ScrollBarButtonState';
import { classNames } from '../../../../utils';
import * as emptyFunction from 'fbjs/lib/emptyFunction';

import '../../../../styles/scroll-bar.css';

const SCROLL_TIME = 50;

export class ScrollBarButton extends React.PureComponent<ScrollBarButtonProps, ScrollBarButtonState> {
    static propTypes = scrollBarButtonPropTypes;

    static defaultProps: Partial<ScrollBarButtonProps> = {
        onScroll: emptyFunction
    };

    constructor(props?: ScrollBarButtonProps) {
        super(props);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.doScroll = this.doScroll.bind(this);
    }

    render(): JSX.Element {
        let buttonStyle = {
            height: this.props.size,
            width: this.props.size
        };

        return (
            <div
                style={buttonStyle}
                className={classNames(
                    {
                        'scrollbar-button': !this.props.disabled,
                        'scrollbar-button-disabled': !!this.props.disabled,
                        'scrollbar-prev-button': this.props.type === 'top' || this.props.type === 'left',
                        'scrollbar-next-button': this.props.type === 'bottom' || this.props.type === 'right',
                        'scrollbar-up-button': this.props.type === 'top' && !this.props.disabled,
                        'scrollbar-down-button': this.props.type === 'bottom' && !this.props.disabled,
                        'scrollbar-left-button': this.props.type === 'left' && !this.props.disabled,
                        'scrollbar-right-button': this.props.type === 'right' && !this.props.disabled,
                        'scrollbar-up-button-disabled': this.props.type === 'top' && !!this.props.disabled,
                        'scrollbar-down-button-disabled': this.props.type === 'bottom' && !!this.props.disabled,
                        'scrollbar-left-button-disabled': this.props.type === 'left' && !!this.props.disabled,
                        'scrollbar-right-button-disabled': this.props.type === 'right' && !!this.props.disabled
                    }
                )}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
            >
            </div>
        );
    }

    // tslint:disable-next-line:no-any
    private timerId: any;

    private doScroll: () => void = () => {
        if (!this.props.disabled) {
            this.props.onScroll!();
            this.timerId = setTimeout(this.doScroll, SCROLL_TIME);
        }
    }

    private handleMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void = (event) => {
        event.preventDefault();

        this.doScroll();
    }

    private handleMouseUp: (event: React.MouseEvent<HTMLDivElement>) => void = (event) => {
        event.preventDefault();

        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = undefined;
        }
    }
}
