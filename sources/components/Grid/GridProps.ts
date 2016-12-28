import { PropTypes, ValidationMap } from 'react';

export interface GridProps {
    data?: any;
    fixedColumnCount?: number;
    fixedRowCount?: number;
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
