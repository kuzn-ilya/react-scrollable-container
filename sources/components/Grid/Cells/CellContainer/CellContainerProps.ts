import * as PropTypes from 'prop-types';
import { MouseEvent } from 'react';
import { ValidationMap } from '../../../../react';
import { ColumnProps } from '../../Columns/Column/ColumnProps';
import { Direction } from '../../../../utils';

export interface CellContainerProps<V> {
    firstCell?: boolean;
    height: number;
    rowIndex: number;
    width: number;
    columnProps: ColumnProps<V>;
    value?: V;
    onBlur?: (rowIndex: number, propName: string) => void;
    onClick?: (rowIndex: number, propName: string, e?: MouseEvent<HTMLElement>) => void;
    onFocus?: (rowIndex: number, propName: string) => void;
    onMove?: (direction: Direction, rowIndex: number, propName: string) => void;
    focused?: boolean;
}

// tslint:disable-next-line:no-any
export const cellContainerPropTypes: ValidationMap<CellContainerProps<any>> = {
    columnProps: PropTypes.any.isRequired,
    firstCell: PropTypes.bool,
    focused: PropTypes.bool,
    height: PropTypes.number.isRequired,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onMove: PropTypes.func,
    rowIndex: PropTypes.number.isRequired,
    value: PropTypes.any,
    width: PropTypes.number.isRequired
};
