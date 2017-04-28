import * as PropTypes from 'prop-types';
import { MouseEvent } from 'react';
import { ValidationMap } from '../../../react';
import { ColumnProps } from '../Columns/Column/ColumnProps';
import { List } from 'immutable';

export interface RowProps {
    // tslint:disable-next-line:no-any
    columnProps: List<ColumnProps<any>>;
    // tslint:disable-next-line:no-any
    data: any;
    focusedCellPropName?: string;

    rowIndex: number;
    height: number;
    selected: boolean;
    showEdgeForTheLeftCell?: boolean;
    onClick?: (rowIndex: number, propName: string, e?: MouseEvent<HTMLElement>) => void;
    onMove?: (direction: 'left' | 'right' | 'down' | 'up', rowIndex: number, propName: string) => void;
}

export const rowPropTypes: ValidationMap<RowProps> = {
    columnProps: PropTypes.instanceOf(List).isRequired,
    data: PropTypes.any.isRequired,
    focusedCellPropName: PropTypes.string,
    height: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    onMove: PropTypes.func,
    rowIndex: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    showEdgeForTheLeftCell: PropTypes.bool
};
