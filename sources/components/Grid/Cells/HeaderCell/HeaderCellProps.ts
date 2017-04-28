import * as PropTypes from 'prop-types';
import { ValidationMap } from '../../../../react';
import { ColumnProps } from '../../Columns/Column/ColumnProps';

// tslint:disable-next-line:no-any
export interface HeaderCellProps<T extends ColumnProps<any>> {
    caption?: string;
    columnProps: T;
}

// tslint:disable-next-line:no-any
export const headerCellPropTypes: ValidationMap<HeaderCellProps<any>> = {
    caption: PropTypes.string,
    // TODO: More appropriate type
    columnProps: PropTypes.any.isRequired
};
