import { PropTypes } from 'react';
import { ValidationMap } from '../../../../react';
import { ColumnProps } from '../../Columns/Column/ColumnProps';

export interface CellContainerProps {
    firstCell?: boolean;
    height: number;
    rowIndex: number;
    width: number;
    // tslint:disable-next-line:no-any
    columnProps: ColumnProps<any>;
}

export const cellContainerPropTypes: ValidationMap<CellContainerProps> = {
    columnProps: PropTypes.any.isRequired,
    firstCell: PropTypes.bool,
    height: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};
