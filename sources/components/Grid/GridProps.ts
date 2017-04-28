import * as PropTypes from 'prop-types';
import { ComponentClass, MouseEvent } from 'react';
import { ValidationMap } from '../../react';
import { RowData } from './RowData';
import { RowProps } from './Row/RowProps';
import { HeaderRowProps } from './HeaderRow/HeaderRowProps';

export interface GridProps {
    readonly customScrollBars?: boolean;
    readonly headerHeight: number;
    // tslint:disable-next-line:no-any
    readonly rowData: RowData<any>;
    readonly fixedColumnCount?: number;
    readonly fixedRowCount?: number;
    readonly rowHeight: number;
    readonly selectedRowIndexes?: number[];
    readonly fixedHeaderRowClass: ComponentClass<HeaderRowProps>;
    readonly fixedRowClass: ComponentClass<RowProps>;
    readonly scrollableHeaderRowClass: ComponentClass<HeaderRowProps>;
    readonly scrollableRowClass: ComponentClass<RowProps>;
    readonly multiSelectRows?: boolean;
    readonly onRowClick?: (rowIndex: number, e?: MouseEvent<HTMLElement>) => void;
    readonly onRowSelectionChanged?: (rowIndexes: Array<number>) => void;
}

export const gridPropTypes: ValidationMap<GridProps> = {
    customScrollBars: PropTypes.bool,
    fixedColumnCount: PropTypes.number,
    // TODO: Find more appropriate prop type
    fixedHeaderRowClass: PropTypes.any.isRequired,
    // TODO: Find more appropriate prop type
    fixedRowClass: PropTypes.any.isRequired,
    fixedRowCount: PropTypes.number,
    headerHeight: PropTypes.number.isRequired,
    multiSelectRows: PropTypes.bool,
    onRowClick: PropTypes.func,
    onRowSelectionChanged: PropTypes.func,
    rowData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    rowHeight: PropTypes.number.isRequired,
    // TODO: Find more appropriate prop type
    scrollableHeaderRowClass: PropTypes.any.isRequired,
    // TODO: Find more appropriate prop type
    scrollableRowClass: PropTypes.any.isRequired,
    selectedRowIndexes: PropTypes.arrayOf(PropTypes.number)
};
