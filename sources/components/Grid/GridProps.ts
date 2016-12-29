import { PropTypes, ValidationMap } from 'react';

export interface GridProps {
    // tslint:disable-next-line:no-any
    rowData: any[];
    fixedColumnCount?: number;
    fixedRowCount?: number;
}

export const gridPropTypes: ValidationMap<GridProps> = {
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    fixedColumnCount: PropTypes.number,
    fixedRowCount: PropTypes.number
};
