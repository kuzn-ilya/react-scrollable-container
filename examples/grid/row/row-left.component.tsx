import * as React from 'react';

import { RowProps } from './row.props';
import { Cell } from '../cell/cell.component';

export class RowLeft extends React.Component<RowProps, void> {
    render(): JSX.Element {
        return (
            <div key={this.props.model.id}>
                <Cell width={30} value={this.props.model.id} align="right"/>
                <Cell width={150} value={this.props.model.firstName} align="left"/>
            </div>
        );
    }
}
