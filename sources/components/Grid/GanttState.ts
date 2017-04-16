import { ColumnProps } from './Columns/Column/ColumnProps';
import { List } from 'immutable';

export interface GanttState {
    // tslint:disable-next-line:no-any
    fixedColumns?: List<ColumnProps<any>>;
    fixedColumnsWidth?: number;
    fixedColumnMinWidth?: number;
    // tslint:disable-next-line:no-any
    scrollableColumns?: List<ColumnProps<any>>;
    colsThumbHeight?: number;
    scrollLeft?: number;
    scrollTop?: number;
}
