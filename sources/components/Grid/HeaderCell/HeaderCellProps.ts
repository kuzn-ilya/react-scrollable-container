import { PropTypes, ValidationMap } from 'react';

export interface HeaderCellProps {
    caption?: string;
    width: number;
}

export const headerCellPropTypes: ValidationMap<HeaderCellProps> = {
    caption: PropTypes.string,
    width: PropTypes.number.isRequired
};
