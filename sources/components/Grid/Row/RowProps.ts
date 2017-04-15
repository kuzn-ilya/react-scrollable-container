import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';
import { ColumnProps } from '../Column/ColumnProps';
import { List } from 'immutable';

export interface RowProps {
    // tslint:disable-next-line:no-any
    columnProps: List<ColumnProps<any>>;
    // tslint:disable-next-line:no-any
    data: any;
    rowIndex: number;
    height: number;
    showEdgeForTheLeftCell?: boolean;
}

export const rowPropTypes: ValidationMap<RowProps> = {
    columnProps: PropTypes.instanceOf(List).isRequired,
    data: PropTypes.any.isRequired,
    height: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    showEdgeForTheLeftCell: PropTypes.bool
};
