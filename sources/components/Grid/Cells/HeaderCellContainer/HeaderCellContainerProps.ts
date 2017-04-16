import { PropTypes } from 'react';
import { ValidationMap } from '../../../../react';

export interface HeaderCellContainerProps {
    firstCell?: boolean;
    height: number;
    width: number;
}

export const headerCellContainerPropTypes: ValidationMap<HeaderCellContainerProps> = {
    firstCell: PropTypes.bool,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};
