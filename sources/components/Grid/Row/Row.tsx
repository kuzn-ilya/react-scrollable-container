import * as React from 'react';

import { classNames } from '../../../utils';
import { RowProps, rowPropTypes } from './RowProps';
import { RowState } from './RowState';
import { ColumnProps } from '../Columns/Column/ColumnProps';

export class Row extends React.PureComponent<RowProps, RowState> {
    static propTypes = rowPropTypes;

    constructor(props?: RowProps) {
        super(props);
        this.state = {
            focusedCellPropName: this.props.focusedCellPropName
        };
    }

    componentWillReceiveProps(nextProps: RowProps): void {
        if (this.props.focusedCellPropName !== nextProps.focusedCellPropName) {
            this.setState({
                focusedCellPropName: nextProps.focusedCellPropName
            });
        }
    }

    handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (this.props.onClick) {
            this.props.onClick(this.props.rowIndex, e);
        }
    }

    handleMove = (direction: 'left' | 'right' | 'down' | 'up', rowIndex: number, propName: string): void => {
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
            this.setState({
                focusedCellPropName: nextCellPropName
            });
        }

        if (this.props.onMove) {
            this.props.onMove(direction, this.props.rowIndex, propName);
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
