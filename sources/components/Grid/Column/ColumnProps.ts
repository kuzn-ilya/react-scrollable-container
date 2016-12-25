import { PropTypes, ValidationMap } from 'react';

export interface ColumnProps {
    width: number;
}

export const columnPropTypes: ValidationMap<ColumnProps> = {
    width: PropTypes.number.isRequired
};
