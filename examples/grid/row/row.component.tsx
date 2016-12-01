import * as React from 'react';

import { RowProps } from './row.props';
import { Cell } from '../cell/cell.component';

export class Row extends React.Component<RowProps, void> {
    render(): JSX.Element {
        return (
            <div key={this.props.model.id}>
                <Cell width={30} value={this.props.model.id} align="right"/>
                <Cell width={150} value={this.props.model.firstName} align="left"/>
                <Cell width={150} value={this.props.model.lastName} align="left"/>
                <Cell width={250} value={this.props.model.email} align="left"/>
                <Cell width={80} value={this.props.model.gender} align="center"/>
                <Cell width={150} value={this.props.model.ipAddress} align="left"/>
                <Cell width={200} value={this.props.model.creditCardType} align="left"/>
                <Cell width={150} value={this.props.model.creditCardNumber} align="left"/>
                <Cell width={80} value={this.props.model.creditCardExpires} align="right"/>
                <Cell width={250} value={this.props.model.city} align="left"/>
                <Cell width={150} value={this.props.model.company} align="left"/>
                <Cell width={250} value={this.props.model.department} align="left"/>
                <Cell width={150} value={this.props.model.currency} align="left"/>
            </div>
        );
    }
}
