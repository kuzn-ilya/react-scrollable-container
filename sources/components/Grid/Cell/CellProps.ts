import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';

export interface CellProps {
    align?: 'left' | 'right' | 'center';
    firstCell?: boolean;
    height: number;
    // tslint:disable-next-line:no-any
    value: any;
    width: number;
}

export const cellPropTypes: ValidationMap<CellProps> = {
    align: PropTypes.oneOf(['left', 'right', 'center']),
    firstCell: PropTypes.bool,
    height: PropTypes.number.isRequired,
    value: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired
};
