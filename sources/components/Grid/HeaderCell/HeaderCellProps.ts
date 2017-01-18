import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';

export interface HeaderCellProps {
    caption?: string;
    firstCell?: boolean;
    height: number;
    width: number;
}

export const headerCellPropTypes: ValidationMap<HeaderCellProps> = {
    caption: PropTypes.string,
    firstCell: PropTypes.bool,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};
