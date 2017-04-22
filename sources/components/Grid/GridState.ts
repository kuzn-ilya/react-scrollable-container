import { ColumnProps } from './Columns/Column/ColumnProps';
import { List } from 'immutable';

export interface GridState {
    fixedFocusedCellPropName?: string;
    fixedFocusedCellRowIndex?: number;
    scrollableFocusedCellPropName?: string;
    scrollableFocusedCellRowIndex?: number;
    // tslint:disable-next-line:no-any
    fixedColumns?: List<ColumnProps<any>>;
    fixedColumnsWidth?: number;
    fixedColumnMinWidth?: number;
    // tslint:disable-next-line:no-any
    scrollableColumns?: List<ColumnProps<any>>;
    colsThumbHeight?: number;
    selectedRowIndexes: number[];
    scrollLeft?: number;
    scrollTop?: number;
}
