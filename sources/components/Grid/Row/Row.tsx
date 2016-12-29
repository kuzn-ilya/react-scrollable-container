import * as React from 'react';
import { RowProps, rowPropTypes } from './RowProps';
import { ColumnProps } from '../Column/ColumnProps';
import { Cell } from '../Cell';

export class Row extends React.PureComponent<RowProps, {}> {
    static propTypes = rowPropTypes;

    render(): JSX.Element {
        return (
            <div key={this.props.rowIndex}>
                {this.renderCells()}
            </div>
        );
    }

    renderCells(): React.ReactNode {
        return this.props.columnProps.map((value: ColumnProps, index: number) =>
            <Cell key={index} width={value.width} value={this.props.data[value.propName]} align={value.align}/>
        );
    }
}
