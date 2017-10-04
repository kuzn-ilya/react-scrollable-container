import * as PropTypes from 'prop-types';
import { ComponentClass } from 'react';
import { ValidationMap } from '../../../../react';
import { CellProps } from '../../Cells/Cell/CellProps';
import { HeaderCellProps } from '../../Cells/HeaderCell/HeaderCellProps';
import { InplaceEditProps } from '../../Cells/InplaceEdit/InplaceEditProps';
import { CellContainerProps } from '../../Cells/CellContainer/CellContainerProps';

export interface ColumnProps<V> {
    caption?: string;
    maxWidth?: number;
    minWidth?: number;
    propName: string;
    width: number;
    readonly?: boolean;
    cellClass?: ComponentClass<CellProps<ColumnProps<V>, V>>;
    headerCellClass?: ComponentClass<HeaderCellProps<ColumnProps<V>>>;
    inplaceEditClass?: ComponentClass<InplaceEditProps<V>>;
    cellContainerClass?: ComponentClass<CellContainerProps<V>>;
    onCellClick?: (rowIndex: number, propName: string) => void;
}

// tslint:disable-next-line:no-any
export const columnPropTypes: ValidationMap<ColumnProps<any>> = {
    caption: PropTypes.string,
    // TODO: more appropriate cellClass prop types
    cellClass: PropTypes.any.isRequired,
    cellContainerClass: PropTypes.any.isRequired,
    headerCellClass: PropTypes.any.isRequired,
    inplaceEditClass: PropTypes.any.isRequired,
    maxWidth: PropTypes.number,
    minWidth: PropTypes.number,
    onCellClick: PropTypes.func,
    propName: PropTypes.string.isRequired,
    readonly: PropTypes.bool,
    width: PropTypes.number.isRequired
};
