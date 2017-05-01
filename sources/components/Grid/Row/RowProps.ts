import * as PropTypes from 'prop-types';
import { MouseEvent, ReactInstance } from 'react';
import { ValidationMap } from '../../../react';
import { ColumnProps } from '../Columns/Column/ColumnProps';
import { List } from 'immutable';
import { Direction } from '../../../utils';

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
    // tslint:disable-next-line:no-any
    onCellFocus?: (rowIndex: number, propName: string, target: ReactInstance) => void;
    onCellClick?: (rowIndex: number, propName: string, e?: MouseEvent<HTMLElement>) => void;
    onCellMove?: (direction: Direction, rowIndex: number, propName: string) => void;
}

export const rowPropTypes: ValidationMap<RowProps> = {
    columnProps: PropTypes.instanceOf(List).isRequired,
    data: PropTypes.any.isRequired,
    focusedCellPropName: PropTypes.string,
    height: PropTypes.number.isRequired,
    onCellClick: PropTypes.func,
    onCellFocus: PropTypes.func,
    onCellMove: PropTypes.func,
    rowIndex: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    showEdgeForTheLeftCell: PropTypes.bool
};
