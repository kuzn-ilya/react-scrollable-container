import * as React from 'react';
import { ScrollBarButtonProps, scrollBarButtonPropTypes } from './ScrollBarButtonProps';
import { ScrollBarButtonState } from './ScrollBarButtonState';
import { classNames } from '../../../../utils';
import * as emptyFunction from 'fbjs/lib/emptyFunction';

import * as classes from '../../../../styles/scroll-bar.css';

const SCROLL_TIME = 50;

export class ScrollBarButton extends React.PureComponent<ScrollBarButtonProps, ScrollBarButtonState> {
    static propTypes = scrollBarButtonPropTypes;

    static defaultProps: Partial<ScrollBarButtonProps> = {
        onScroll: emptyFunction
    };

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
                        [classes.scrollbarButton]: !this.props.disabled,
                        [classes.scrollbarButtonDisabled]: !!this.props.disabled,
                        [classes.scrollbarPrevButton]: this.props.type === 'top' || this.props.type === 'left',
                        [classes.scrollbarNextButton]: this.props.type === 'bottom' || this.props.type === 'right',
                        [classes.scrollbarUpButton]: this.props.type === 'top' && !this.props.disabled,
                        [classes.scrollbarDownButton]: this.props.type === 'bottom' && !this.props.disabled,
                        [classes.scrollbarLeftButton]: this.props.type === 'left' && !this.props.disabled,
                        [classes.scrollbarRightButton]: this.props.type === 'right' && !this.props.disabled,
                        [classes.scrollbarUpButtonDisabled]: this.props.type === 'top' && !!this.props.disabled,
                        [classes.scrollbarDownButtonDisabled]: this.props.type === 'bottom' && !!this.props.disabled,
                        [classes.scrollbarLeftButtonDisabled]: this.props.type === 'left' && !!this.props.disabled,
                        [classes.scrollbarRightButtonDisabled]: this.props.type === 'right' && !!this.props.disabled
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

    private handleScroll = (): void => {
        if (!this.props.disabled) {
            this.props.onScroll!();
            this.timerId = setTimeout(this.handleScroll, SCROLL_TIME);
        }
    }

    private handleMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();

        this.handleScroll();
    }

    private handleMouseUp = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();

        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = undefined;
        }
    }
}
