import * as React from 'react';

import { classNames, Direction } from '../../../utils';
import { RowProps, rowPropTypes } from './RowProps';
import { RowState } from './RowState';
import { ColumnProps } from '../Columns/Column/ColumnProps';

export class Row extends React.PureComponent<RowProps, RowState> {
    static propTypes = rowPropTypes;

    handleMove = (direction: Direction, rowIndex: number, propName: string): void => {
        if (this.props.onCellMove) {
            this.props.onCellMove(direction, this.props.rowIndex, propName);
        }
    }

    handleClick = (rowIndex: number, propName: string): void => {
        if (this.props.onCellClick) {
            this.props.onCellClick(rowIndex, propName);
        }
    }

    render(): JSX.Element {
        return (
            <div className={classNames({'selected-row': this.props.selected})}
                key={this.props.rowIndex} style={{height: this.props.height }}>
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
                    onClick={this.handleClick}
                    onFocus={this.props.onCellFocus}
                    onChange={this.props.onCellChange}
                    focused={this.props.focusedCellPropName === value.propName}
                />
            );
        });
    }
}
