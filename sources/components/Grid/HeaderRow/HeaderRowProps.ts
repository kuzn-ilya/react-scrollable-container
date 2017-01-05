import { PropTypes } from 'react';
import { ValidationMap } from '../../../react/ValidationMap';
import { ColumnProps } from '../Column/ColumnProps';

export interface HeaderRowProps {
    columnProps: ColumnProps[];
    // tslint:disable-next-line:no-any
    height: number;
    showEdgeForTheFirstCell?: boolean;
}

export const headerRowPropTypes: ValidationMap<HeaderRowProps> = {
    columnProps: PropTypes.arrayOf(PropTypes.any).isRequired,
    height: PropTypes.number.isRequired,
    showEdgeForTheFirstCell: PropTypes.bool
};
