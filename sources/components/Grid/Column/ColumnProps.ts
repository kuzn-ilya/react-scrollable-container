import { PropTypes, ValidationMap } from 'react';

export interface ColumnProps {
    maxWidth?: number;
    minWidth?: number;
    width: number;
}

export const columnPropTypes: ValidationMap<ColumnProps> = {
    maxWidth: PropTypes.number,
    minWidth: PropTypes.number,
    width: PropTypes.number.isRequired
};
