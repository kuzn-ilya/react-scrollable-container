import { List } from 'immutable';

import { ColumnProps } from '../Columns/Column/ColumnProps';

export interface ColumnGroupState {
    columnsWidth: number;
    vertScrollWidth?: number;
    horzScrollHeight?: number;

    scrollLeft: number;
    scrollTop: number;
    // tslint:disable-next-line:no-any
    columnProps: List<ColumnProps<any>>;
    width: number;

    readonly selectedIndexes: number[];
    readonly focusedCellPropName?: string;
    readonly focusedCellRowIndex?: number;
}
