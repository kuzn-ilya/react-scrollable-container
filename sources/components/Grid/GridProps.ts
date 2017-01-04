import { PropTypes } from 'react';
import { ValidationMap } from '../../react/ValidationMap';

export interface GridProps {
    // tslint:disable-next-line:no-any
    rowData: any[];
    fixedColumnCount?: number;
    fixedRowCount?: number;
}

export const gridPropTypes: ValidationMap<GridProps> = {
    fixedColumnCount: PropTypes.number,
    fixedRowCount: PropTypes.number,
    rowData: PropTypes.arrayOf(PropTypes.any).isRequired
};
