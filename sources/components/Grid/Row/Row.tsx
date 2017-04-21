import * as React from 'react';

import { classNames } from '../../../utils';
import { RowProps, rowPropTypes } from './RowProps';
import { RowState } from './RowState';
import { ColumnProps } from '../Columns/Column/ColumnProps';

export class Row extends React.PureComponent<RowProps, RowState> {
    static propTypes = rowPropTypes;

    constructor(props?: RowProps) {
        super(props);
        this.state = {};
    }

    handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (this.props.onClick) {
            this.props.onClick(this.props.rowIndex, e);
        }
    }

    handleMove = (direction: string, rowIndex: number, propName: string): void => {
        if (direction === 'right' || direction === 'left') {
            let index = this.props.columnProps.findIndex((columnProps) =>
                (columnProps && columnProps.propName) === propName
            );

            let focusedCellPropName = propName;
            if (index > 0 && direction === 'left') {
                focusedCellPropName = this.props.columnProps.get(index - 1).propName;
            } else if (index < this.props.columnProps.size - 1 && direction === 'right') {
                focusedCellPropName = this.props.columnProps.get(index + 1).propName;
            }

            this.setState({
                focusedCellPropName
            });
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
            let CellContainer = value.cellContainerClass!;
            return (
                <CellContainer key={index}
                    firstCell={index === 0 && this.props.showEdgeForTheLeftCell}
                    width={value.width}
                    height={this.props.height}
                    columnProps={value}
                    rowIndex={this.props.rowIndex}
                    value={this.props.data[value.propName]}
                    onMove={this.handleMove}
                    focused={this.state.focusedCellPropName === value.propName}
                />
            );
        });
    }
}
