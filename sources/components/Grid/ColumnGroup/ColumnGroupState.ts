import { List } from 'immutable';

import { ColumnProps } from '../Columns/Column/ColumnProps';

export interface ColumnGroupState {
    columnsWidth: number;
    rowsThumbWidth?: number;

    scrollLeft: number;
    scrollTop: number;
    // tslint:disable-next-line:no-any
    columnProps: List<ColumnProps<any>>;
    width: number;
}
