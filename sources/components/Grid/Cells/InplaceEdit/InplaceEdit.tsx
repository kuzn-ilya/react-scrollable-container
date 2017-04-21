import * as React from 'react';
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

    render(): JSX.Element {
        return (
            <input className="inplace-edit" type="text" ref={(ref) => this.ref = ref} value={this.props.value} onBlur={this.props.onBlur}>
            </input>
        );
    }
}
