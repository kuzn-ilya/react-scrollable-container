import * as React from 'react';
import { KeyConsts, Direction } from '../../../../utils';
import { InplaceEditProps, inplaceEditPropTypes } from './InplaceEditProps';
import { InplaceEditState } from './InplaceEditState';

import * as classes from '../../../../styles/grid.css';

export class InplaceEdit extends React.PureComponent<InplaceEditProps, InplaceEditState> {
    static propTypes = inplaceEditPropTypes;

    private ref: HTMLInputElement;

    constructor(props: InplaceEditProps) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    componentDidMount(): void {
        if (this.ref) {
            this.ref.focus();
        }
    }

    componentDidUpdate(prevProps: InplaceEditProps, prevState: {}): void {
        if (this.ref) {
            this.ref.focus();
        }
    }

    componentWillReceiveProps(nextProps: InplaceEditProps): void {
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        let direction: Direction | undefined = undefined;
        if (e.currentTarget.selectionEnd >= e.currentTarget.value.length && e.keyCode === KeyConsts.ARROW_RIGHT) {
            direction = 'right';
        } else if (e.currentTarget.selectionStart <= 0 && e.keyCode === KeyConsts.ARROW_LEFT) {
            direction = 'left';
        } else if (e.keyCode === KeyConsts.ARROW_DOWN) {
            direction = 'down';
        } else if (e.keyCode === KeyConsts.ARROW_UP) {
            direction = 'up';
        }

        if (direction) {
            e.preventDefault();
            if (this.props.onMove) {
                this.props.onMove(direction);
            }
        }
    }

    handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }

        if (this.state.value !== this.props.value && this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    componentWillUnmount(): void {
        if (this.state.value !== this.props.value && this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            value: e.currentTarget.value
        });
    }

    render(): JSX.Element {
        return (
            <input className={classes.inplaceEdit}
                type="text"
                ref={(ref) => this.ref = ref}
                value={this.state.value}
                onBlur={this.handleBlur}
                onFocus={this.props.onFocus}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
            >
            </input>
        );
    }
}
