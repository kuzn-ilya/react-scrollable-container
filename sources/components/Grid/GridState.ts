import { ColumnProps } from './Column/ColumnProps';

export interface GridState {
    fixedColumns?: ColumnProps[];
    scrollableColumns?: ColumnProps[];
    colsThumbHeight?: number;
    scrollTop?: number;
}
