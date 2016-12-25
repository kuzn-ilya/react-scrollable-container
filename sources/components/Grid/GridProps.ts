import { PropTypes, ValidationMap } from 'react';

export interface GridProps {
    fixedColumnCount?: number;
    fixedRowCount?: number;
}

export const gridPropTypes: ValidationMap<GridProps> = {
    fixedColumnCount: PropTypes.number,
    fixedRowCount: PropTypes.number
};
