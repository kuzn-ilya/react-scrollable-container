import { PropTypes } from 'react';
import { ValidationMap } from '../../react';
import { RowData } from './RowData';

export interface Grid2Props {
    headerHeight: number;
    // tslint:disable-next-line:no-any
    rowData: RowData<any>;
    fixedColumnCount?: number;
    fixedRowCount?: number;
    rowHeight: number;
}

export const grid2PropTypes: ValidationMap<Grid2Props> = {
    fixedColumnCount: PropTypes.number,
    fixedRowCount: PropTypes.number,
    headerHeight: PropTypes.number.isRequired,
    rowData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    rowHeight: PropTypes.number.isRequired
};
