import { List } from 'immutable';
import { ColumnProps } from './Column/ColumnProps';

export interface Grid2State {
    fixedColumns?: List<ColumnProps>;
    fixedColumnsWidth?: number;
    scrollableColumns?: List<ColumnProps>;
    colsThumbHeight?: number;
    scrollLeft?: number;
    scrollTop?: number;
}
