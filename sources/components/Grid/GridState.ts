import { ColumnProps } from './Column/ColumnProps';

export interface GridState {
    fixedColumns?: ColumnProps[];
    fixedColumnsWidth?: number;
    scrollableColumns?: ColumnProps[];
    colsThumbHeight?: number;
    scrollTop?: number;
}
