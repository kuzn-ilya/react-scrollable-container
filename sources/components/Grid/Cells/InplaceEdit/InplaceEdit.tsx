import * as React from 'react';
import { KeyConsts, Direction } from '../../../../utils';
import { InplaceEditProps, inplaceEditPropTypes } from './InplaceEditProps';

import '../../../../styles/grid.css';

export class InplaceEdit extends React.PureComponent<InplaceEditProps, {}> {
    static propTypes = inplaceEditPropTypes;

    private ref: HTMLInputElement;

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

    handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        // TODO: Not implemented yet
    }

    render(): JSX.Element {
        return (
            <input className="inplace-edit"
                type="text"
                ref={(ref) => this.ref = ref}
                value={this.props.value}
                onBlur={this.props.onBlur}
                onFocus={this.props.onFocus}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
            >
            </input>
        );
    }
}
