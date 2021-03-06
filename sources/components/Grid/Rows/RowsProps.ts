import * as PropTypes from 'prop-types';
import { ComponentClass, MouseEvent, ReactInstance } from 'react';
import { ValidationMap } from '../../../react';
import { ColumnProps } from '../Columns/Column/ColumnProps';
import { List } from 'immutable';
import { Direction } from '../../../utils';
import { RowData } from '../RowData';
import { RowProps } from '../Row/RowProps';

export interface RowsProps {
    // tslint:disable-next-line:no-any
    columnProps: List<ColumnProps<any>>;
    selectedIndexes: number[];
    focusedCellPropName?: string;
    focusedCellRowIndex?: number;

    // tslint:disable-next-line:no-any
    readonly rowData: RowData<any>;
    readonly rowClass: ComponentClass<RowProps>;
    readonly rowHeight: number;

    showEdgeForTheLeftCell?: boolean;

    readonly onRowClick?: (rowIndex: number, propName: string, e: MouseEvent<HTMLElement>) => void;
    readonly onRowMove?: (direction: Direction, rowIndex: number, propName: string) => void;
    // tslint:disable-next-line:no-any
    readonly onCellChange?: (rowIndex: number, propName: string, newValue: any) => void;
    readonly onCellFocus?: (rowIndex: number, propName: string, target: ReactInstance) => void;
    readonly onCellSelect?: (rowIndex: number, propName: string) => void;
}

export const rowsPropTypes: ValidationMap<RowsProps> = {
    columnProps: PropTypes.instanceOf(List).isRequired,
    focusedCellPropName: PropTypes.string,
    focusedCellRowIndex: PropTypes.number,
    onCellChange: PropTypes.func,
    onCellFocus: PropTypes.func,
    onCellSelect: PropTypes.func,
    onRowClick: PropTypes.func,
    onRowMove: PropTypes.func,
    // TODO: Find more appropriate prop type
    rowClass: PropTypes.any.isRequired,
    rowData: PropTypes.any,
    rowHeight: PropTypes.number.isRequired,
    selectedIndexes: PropTypes.arrayOf(PropTypes.number.isRequired),
    showEdgeForTheLeftCell: PropTypes.bool
};
