import * as React from 'react';
import { RowProps, rowPropTypes } from './RowProps';
import { ColumnProps } from '../Column/ColumnProps';

export class Row extends React.PureComponent<RowProps, {}> {
    static propTypes = rowPropTypes;

    render(): JSX.Element {
        return (
            <div key={this.props.rowIndex} style={{height: this.props.height }}>
                {this.renderCells()}
            </div>
        );
    }

    renderCells(): React.ReactNode {
        return this.props.columnProps.map((value: ColumnProps, index: number) => {
            // tslint:disable-next-line:variable-name
            let Cell = value.cellClass!;
            return (
                <Cell key={index} width={value.width}
                    value={this.props.data[value.propName]}
                    firstCell={index === 0 && this.props.showEdgeForTheLeftCell}
                    height={this.props.height}
                    {...this.props}>
                </Cell>
            );
        });
    }
}
