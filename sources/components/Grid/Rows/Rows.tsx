import * as React from 'react';

import * as emptyFunction from 'fbjs/lib/emptyFunction';

import { Direction } from '../../../utils';
import { RowsProps, rowsPropTypes } from './RowsProps';
// import { RowState } from './RowState';
// import { ColumnProps } from '../Columns/Column/ColumnProps';

export class Rows extends React.PureComponent<RowsProps, {}> {
    static propTypes = rowsPropTypes;

    static defaultProps: Partial<RowsProps> = {
        onCellFocus: emptyFunction
    };

    handleRowClick = (rowIndex: number, propName: string, e: React.MouseEvent<HTMLElement>) => {
        if (this.props.onRowClick) {
            this.props.onRowClick(rowIndex, propName, e);
        }

        this.onCellFocus(rowIndex, propName);
    }

    handleRowMove = (direction: Direction, rowIndex: number, propName: string): void => {
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

            this.onCellFocus(rowIndex, nextCellPropName);

        } else if (direction === 'down' && rowIndex < this.props.rowData.length - 1) {
            this.onCellFocus(rowIndex + 1, propName);
        } else if (direction === 'up' && rowIndex > 0) {
            this.onCellFocus(rowIndex - 1, propName);
        }

        if (this.props.onRowMove) {
            this.props.onRowMove(direction, rowIndex, propName);
        }
    }

    onCellFocus(rowIndex: number, propName: string): void {
        console.log(rowIndex, propName);
        this.props.onCellFocus!(rowIndex, propName);
    }

    // tslint:disable-next-line:no-any
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
                onClick={this.handleRowClick}
                onMove={this.handleRowMove}
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
