import { PropTypes } from 'react';
import { ValidationMap } from '../../../react/ValidationMap';
import { ColumnProps } from '../Column/ColumnProps';

export interface RowProps {
    columnProps: ColumnProps[];
    // tslint:disable-next-line:no-any
    data: any;
    rowIndex: number;
}

export const rowPropTypes: ValidationMap<RowProps> = {
    columnProps: PropTypes.arrayOf(PropTypes.any).isRequired,
    data: PropTypes.any.isRequired,
    rowIndex: PropTypes.number.isRequired
};
