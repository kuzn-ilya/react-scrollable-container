import { ColumnProps } from './Column/ColumnProps';
import { List } from 'immutable';

export interface GridState {
    fixedColumns?: List<ColumnProps>;
    fixedColumnsWidth?: number;
    fixedColumnMinWidth?: number;
    scrollableColumns?: List<ColumnProps>;
    colsThumbHeight?: number;
    scrollLeft?: number;
    scrollTop?: number;
}
