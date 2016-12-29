import { ColumnProps } from './Column/ColumnProps';

export interface GridState {
    fixedColumnsWidth?: number;
    fixedColumns?: ColumnProps[];
    scrollableColumnsWidth?: number;
    scrollableColumns?: ColumnProps[];
    headerHeight?: number;
    scrollLeft?: number;
    scrollTop?: number;
}
