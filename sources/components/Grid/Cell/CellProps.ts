import { PropTypes, ValidationMap } from 'react';

export interface CellProps {
    align?: 'left' | 'right' | 'center';
    // tslint:disable-next-line:no-any
    value: any;
    width: number;
}

export const cellPropTypes: ValidationMap<CellProps> = {
    align: PropTypes.oneOf(['left', 'right', 'center']),
    value: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired
};
