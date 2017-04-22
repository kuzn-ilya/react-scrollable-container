import { List } from 'immutable';

import { ColumnProps } from '../Columns/Column/ColumnProps';
import { RowData } from '../RowData';

export interface RowState {
    // tslint:disable-next-line:no-any
    data: RowData<any>;
    selectedIndexes: number[];
    focusedCellPropName?: string;
    focusedCellRowIndex?: number;
}

export interface ColumnGroupState {
    columnsWidth: number;
    rowsThumbWidth?: number;

    scrollLeft: number;
    scrollTop: number;
    // tslint:disable-next-line:no-any
    columnProps: List<ColumnProps<any>>;
    width: number;
    rowState: RowState;
}
