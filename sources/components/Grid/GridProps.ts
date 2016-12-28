import { PropTypes, ValidationMap } from 'react';

export interface GridProps {
    // tslint:disable-next-line:no-any
    data?: any;
    fixedColumnCount?: number;
    fixedRowCount?: number;
    // tslint:disable-next-line:no-any
    getRowCount?: (data: any) => number;
    rowCount?: number;
}

export const gridPropTypes: ValidationMap<GridProps> = {
    data: PropTypes.any,
    fixedColumnCount: PropTypes.number,
    fixedRowCount: PropTypes.number,
    getRowCount: PropTypes.func,
    rowCount: PropTypes.number
};
