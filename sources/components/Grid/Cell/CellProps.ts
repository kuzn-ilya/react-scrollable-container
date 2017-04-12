import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';
import { ColumnProps } from '../Column/ColumnProps';

export interface CellProps<T extends ColumnProps> {
    firstCell?: boolean;
    height: number;
    // tslint:disable-next-line:no-any
    value?: any;
    width: number;
    columnProps: T;
}

// tslint:disable-next-line:no-any
export const cellPropTypes: ValidationMap<CellProps<any>> = {
    // TODO: columnProps type
    columnProps: PropTypes.any.isRequired,
    firstCell: PropTypes.bool,
    height: PropTypes.number.isRequired,
    value: PropTypes.any,
    width: PropTypes.number.isRequired
};
