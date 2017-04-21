import { PropTypes } from 'react';
import { ValidationMap } from '../../../../react';
import { ColumnProps } from '../../Columns/Column/ColumnProps';

export interface CellContainerProps<V> {
    firstCell?: boolean;
    height: number;
    rowIndex: number;
    width: number;
    columnProps: ColumnProps<V>;
    value: V;
    onMove?: (direction: 'left' | 'right' | 'down' | 'up', rowIndex: number, propName: string) => void;
    focused?: boolean;
}

// tslint:disable-next-line:no-any
export const cellContainerPropTypes: ValidationMap<CellContainerProps<any>> = {
    columnProps: PropTypes.any.isRequired,
    firstCell: PropTypes.bool,
    focused: PropTypes.bool,
    height: PropTypes.number.isRequired,
    onMove: PropTypes.func,
    rowIndex: PropTypes.number.isRequired,
    value: PropTypes.any.isRequired,
    width: PropTypes.number.isRequired
};
