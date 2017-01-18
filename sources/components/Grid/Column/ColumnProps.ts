import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';

export interface ColumnProps {
    align?: 'left' | 'right' | 'center';
    caption?: string;
    maxWidth?: number;
    minWidth?: number;
    propName: string;
    width: number;
}

export const columnPropTypes: ValidationMap<ColumnProps> = {
    align: PropTypes.oneOf(['left', 'right', 'center']),
    caption: PropTypes.string,
    maxWidth: PropTypes.number,
    minWidth: PropTypes.number,
    propName: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
};
