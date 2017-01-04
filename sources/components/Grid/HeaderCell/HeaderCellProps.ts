import { PropTypes } from 'react';
import { ValidationMap } from '../../../react/ValidationMap';

export interface HeaderCellProps {
    caption?: string;
    width: number;
}

export const headerCellPropTypes: ValidationMap<HeaderCellProps> = {
    caption: PropTypes.string,
    width: PropTypes.number.isRequired
};
