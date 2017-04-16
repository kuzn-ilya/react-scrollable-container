import { PropTypes } from 'react';
import { ValidationMap } from '../../../../react';

export interface CellContainerProps {
    firstCell?: boolean;
    height: number;
    width: number;
}

export const cellContainerPropTypes: ValidationMap<CellContainerProps> = {
    firstCell: PropTypes.bool,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};
