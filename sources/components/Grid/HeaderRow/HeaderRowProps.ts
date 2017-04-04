import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';
import { ColumnProps } from '../Column/ColumnProps';
import { List } from 'immutable';

export interface HeaderRowProps {
    columnProps: List<ColumnProps>;
    // tslint:disable-next-line:no-any
    height: number;
    showEdgeForTheLeftCell?: boolean;
}

export const headerRowPropTypes: ValidationMap<HeaderRowProps> = {
    columnProps: PropTypes.instanceOf(List).isRequired,
    height: PropTypes.number.isRequired,
    showEdgeForTheLeftCell: PropTypes.bool
};
