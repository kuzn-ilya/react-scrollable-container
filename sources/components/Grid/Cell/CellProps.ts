import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';

export interface CellProps<ColumnProps> {
    firstCell?: boolean;
    height: number;
    // tslint:disable-next-line:no-any
    value: any;
    width: number;
    columnProps: ColumnProps;
}

// tslint:disable-next-line:no-any
export const cellPropTypes: ValidationMap<CellProps<any>> = {
    // TODO: columnProps type
    columnProps: PropTypes.any,
    firstCell: PropTypes.bool,
    height: PropTypes.number.isRequired,
    value: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired
};
