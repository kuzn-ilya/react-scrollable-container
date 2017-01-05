import { PropTypes } from 'react';
import { ValidationMap } from '../../../react/ValidationMap';

export interface HeaderCellProps {
    caption?: string;
    firstCell?: boolean;
    width: number;
}

export const headerCellPropTypes: ValidationMap<HeaderCellProps> = {
    caption: PropTypes.string,
    firstCell: PropTypes.bool,
    width: PropTypes.number.isRequired
};
