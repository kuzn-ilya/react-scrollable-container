import * as React from 'react';
import { RowProps, rowPropTypes } from './RowProps';
import { ColumnProps } from '../Columns/Column/ColumnProps';
import { CellContainer } from '../Cells/CellContainer';

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
        // tslint:disable-next-line:no-any
        return this.props.columnProps.map((value: ColumnProps<any>, index: number) => {
            // tslint:disable-next-line:variable-name
            let Cell = value.cellClass!;
            return (
                <CellContainer key={index}
                    firstCell={index === 0 && this.props.showEdgeForTheLeftCell}
                    width={value.width}
                    height={this.props.height}
                >
                    <Cell
                        value={this.props.data[value.propName]}
                        columnProps={value} />
                </CellContainer>
            );
        });
    }
}
