import { List } from 'immutable';

import { ColumnProps } from '../Column/ColumnProps';

export interface ColumnGroupState {
    columnsWidth: number;
    rowsThumbWidth?: number;

    scrollLeft: number;
    scrollTop: number;
    columnProps: List<ColumnProps>;
}
