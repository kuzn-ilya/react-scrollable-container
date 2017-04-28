import * as React from 'react';
import * as KeyConsts from '../../../../utils/KeyConsts';
import { InplaceEditProps, inplaceEditPropTypes } from './InplaceEditProps';

import '../../../../styles/grid.css';

export class InplaceEdit extends React.PureComponent<InplaceEditProps, {}> {
    static propTypes = inplaceEditPropTypes;

    private ref: HTMLInputElement;

    componentDidMount(): void {
        if (this.ref) {
            console.log('InplaceEdit.componentDidMount: focus');
            this.ref.focus();
        }
    }

    componentDidUpdate(prevProps: InplaceEditProps, prevState: {}): void {
        if (this.ref) {
            console.log('InplaceEdit.componentDidUpdate: focus');
            this.ref.focus();
        }
    }
    componentWillUnmount(): void {
        console.log('InplaceEdit.componentWillUnmount');
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (this.props.onMove) {
            console.log('handleKeyDown');
            if (e.currentTarget.selectionEnd >= e.currentTarget.value.length && e.key === KeyConsts.ARROW_RIGHT) {
                this.props.onMove('right');
            } else if (e.currentTarget.selectionStart <= 0 && e.key === KeyConsts.ARROW_LEFT) {
                this.props.onMove('left');
            } else if (e.key === KeyConsts.ARROW_DOWN) {
                this.props.onMove('down');
            } else if (e.key === KeyConsts.ARROW_UP) {
                this.props.onMove('up');
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
