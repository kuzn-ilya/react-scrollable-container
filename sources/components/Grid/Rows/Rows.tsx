import * as React from 'react';

import * as emptyFunction from 'fbjs/lib/emptyFunction';

import { Direction } from '../../../utils';
import { RowsProps, rowsPropTypes } from './RowsProps';
// import { RowState } from './RowState';
// import { ColumnProps } from '../Columns/Column/ColumnProps';

export class Rows extends React.PureComponent<RowsProps, {}> {
    static propTypes = rowsPropTypes;

    static defaultProps: Partial<RowsProps> = {
        onCellSelect: emptyFunction
    };

    handleCellClick = (rowIndex: number, propName: string, e: React.MouseEvent<HTMLElement>) => {
        if (this.props.onRowClick) {
            this.props.onRowClick(rowIndex, propName, e);
        }

        this.onCellSelect(rowIndex, propName);
    }

    handleCellMove = (direction: Direction, rowIndex: number, propName: string): void => {
        let index = this.props.columnProps.findIndex((columnProps) =>
            (columnProps && columnProps.propName) === propName
        );

        let nextCellPropName = propName;
        if (direction === 'left' || direction === 'right') {
            if (index > 0 && direction === 'left') {
                nextCellPropName = this.props.columnProps.get(index - 1).propName;
            } else if (index < this.props.columnProps.size - 1 && direction === 'right') {
                nextCellPropName = this.props.columnProps.get(index + 1).propName;
            }

            this.onCellSelect(rowIndex, nextCellPropName);

        } else if (direction === 'down' && rowIndex < this.props.rowData.length - 1) {
            this.onCellSelect(rowIndex + 1, propName);
        } else if (direction === 'up' && rowIndex > 0) {
            this.onCellSelect(rowIndex - 1, propName);
        }

        if (this.props.onRowMove) {
            this.props.onRowMove(direction, rowIndex, propName);
        }
    }

    onCellSelect(rowIndex: number, propName: string): void {
        this.props.onCellSelect!(rowIndex, propName);
    }

    render(): JSX.Element {
        // tslint:disable-next-line:variable-name
        let Row = this.props.rowClass;
        // tslint:disable-next-line:no-any
        let children = Array.prototype.map.call(this.props.rowData, (value: any, index: number) =>
            <Row data={value}
                key={index}
                rowIndex={index}
                columnProps={this.props.columnProps}
                height={this.props.rowHeight}
                showEdgeForTheLeftCell={this.props.showEdgeForTheLeftCell}
                selected={!!(this.props.selectedIndexes && (this.props.selectedIndexes.indexOf(index) >= 0))}
                onCellChange={this.props.onCellChange}
                onCellClick={this.handleCellClick}
                onCellMove={this.handleCellMove}
                onCellFocus={this.props.onCellFocus}
                focusedCellPropName={this.props.focusedCellRowIndex === index && this.props.focusedCellPropName
                    ? this.props.focusedCellPropName : undefined}
            />
        );

        return (
            <div>
                {children}
            </div>
        );
    }
}
