import { PropTypes } from 'react';
import { ValidationMap } from '../../../../react';
import { ColumnProps } from '../../Columns/Column/ColumnProps';

// tslint:disable-next-line:no-any
export interface HeaderCellProps<T extends ColumnProps<any>> {
    caption?: string;
    firstCell?: boolean;
    height: number;
    width: number;
    columnProps: T;
}

// tslint:disable-next-line:no-any
export const headerCellPropTypes: ValidationMap<HeaderCellProps<any>> = {
    caption: PropTypes.string,
    // TODO: More appropriate type
    columnProps: PropTypes.any.isRequired,
    firstCell: PropTypes.bool,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
};
