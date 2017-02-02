import { ColumnProps } from './Column/ColumnProps';

export interface Grid2State {
    fixedColumns?: ColumnProps[];
    fixedColumnsWidth?: number;
    scrollableColumns?: ColumnProps[];
    colsThumbHeight?: number;
    scrollLeft?: number;
    scrollTop?: number;
}
