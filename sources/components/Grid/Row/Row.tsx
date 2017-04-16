import * as React from 'react';
import { RowProps, rowPropTypes } from './RowProps';
import { ColumnProps } from '../Columns/Column/ColumnProps';
import { CellContainer } from '../Cells/CellContainer';
import { classNames } from '../../../utils';

export class Row extends React.PureComponent<RowProps, {}> {
    static propTypes = rowPropTypes;

    constructor(props: RowProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void = (e) => {
        if (this.props.onClick) {
            this.props.onClick(this.props.rowIndex);
        }
    }

    render(): JSX.Element {
        return (
            <div className={classNames({'selected-row': this.props.selected})}
                key={this.props.rowIndex} style={{height: this.props.height }} onClick={this.handleClick}>
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
                    columnProps={value}
                    rowIndex={this.props.rowIndex}
                >
                    <Cell rowIndex={this.props.rowIndex}
                        value={this.props.data[value.propName]}
                        columnProps={value}
                    />
                </CellContainer>
            );
        });
    }
}
