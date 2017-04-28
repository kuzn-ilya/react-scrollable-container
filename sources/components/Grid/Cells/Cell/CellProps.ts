import * as PropTypes from 'prop-types';
import { ValidationMap } from '../../../../react';
import { ColumnProps } from '../../Columns/Column/ColumnProps';

export interface CellProps<T extends ColumnProps<V>, V> {
    value?: V;
    columnProps: T;
    rowIndex: number;
}

// tslint:disable-next-line:no-any
export const cellPropTypes: ValidationMap<CellProps<any, any>> = {
    // TODO: columnProps type
    columnProps: PropTypes.any.isRequired,
    rowIndex: PropTypes.number.isRequired,
    value: PropTypes.any
};
