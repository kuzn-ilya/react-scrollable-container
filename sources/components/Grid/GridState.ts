import { ColumnProps } from './Column/ColumnProps';

export interface GridState {
    fixedColumns?: ColumnProps[];
    fixedColumnsWidth?: number;
    fixedColumnMinWidth?: number;
    scrollableColumns?: ColumnProps[];
    scrollableColumnMinWidth?: number;
    colsThumbHeight?: number;
    scrollLeft?: number;
    scrollTop?: number;
}
