import { PropTypes, ValidationMap } from 'react';

export interface CellProps {
    align?: 'left' | 'right' | 'center';
    value: string;
    width: number;
}

export const cellPropTypes: ValidationMap<CellProps> = {
    align: PropTypes.oneOf(['left', 'right', 'center']),
    value: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
};
