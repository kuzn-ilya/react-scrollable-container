import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';
import { ColumnProps } from '../Column/ColumnProps';

export interface HeaderRowProps {
    columnProps: ColumnProps[];
    // tslint:disable-next-line:no-any
    height: number;
    showEdgeForTheLeftCell?: boolean;
}

export const headerRowPropTypes: ValidationMap<HeaderRowProps> = {
    columnProps: PropTypes.arrayOf(PropTypes.any).isRequired,
    height: PropTypes.number.isRequired,
    showEdgeForTheLeftCell: PropTypes.bool
};
