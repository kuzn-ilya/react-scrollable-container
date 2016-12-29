import { PropTypes, ValidationMap } from 'react';
import { ColumnProps } from '../Column/ColumnProps';

export interface RowProps {
    columnProps: ColumnProps[];
    // tslint:disable-next-line:no-any
    data: any;
    rowIndex: number;
}

export const rowPropTypes: ValidationMap<RowProps> = {
    columnProps: PropTypes.arrayOf(PropTypes.any),
    data: PropTypes.any.isRequired,
    rowIndex: PropTypes.number.isRequired
};
