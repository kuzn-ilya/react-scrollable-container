import { PropTypes } from 'react';
import { ValidationMap } from '../../../../react';
import { ColumnProps } from '../../Columns/Column/ColumnProps';

export interface CellProps<T extends ColumnProps<V>, V> {
    value?: V;
    columnProps: T;
}

// tslint:disable-next-line:no-any
export const cellPropTypes: ValidationMap<CellProps<any, any>> = {
    // TODO: columnProps type
    columnProps: PropTypes.any.isRequired,
    value: PropTypes.any
};
