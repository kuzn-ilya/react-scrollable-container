import * as PropTypes from 'prop-types';
import { ComponentClass, MouseEvent } from 'react';
import { ValidationMap } from '../../../react';
import { ColumnProps } from '../Columns/Column/ColumnProps';
import { RowProps } from '../Row/RowProps';
import { HeaderRowProps } from '../HeaderRow/HeaderRowProps';
import { Overflow, overflowPropType } from '../../../utils';
import { RowData } from '../RowData';
import { List } from 'immutable';

export interface ColumnGroupProps {
    readonly colsThumbHeight?: number;
    // tslint:disable-next-line:no-any
    readonly columnProps: List<ColumnProps<any>>;
    readonly customScrollBars?: boolean;
    readonly headerHeight: number;

    readonly onHorizontalScrollVisibilityChanged?: (visible: boolean, thumbHeight: number) => void;
    readonly onRowClick?: (rowIndex: number, propName: string, e: MouseEvent<HTMLElement>) => void;
    readonly onRowMove?: (direction: 'left' | 'right' | 'down' | 'up', rowIndex: number, propName: string) => void;
    readonly onScrollPosChanged?: (left: number, top: number) => void;
    readonly onResize?: () => void;

    readonly overflowX: Overflow;
    readonly overflowY: Overflow;

    // tslint:disable-next-line:no-any
    readonly rowData: RowData<any>;
    readonly rowHeight: number;
    readonly scrollTop?: number;
    readonly showEdgeForTheLeftCell?: boolean;
    readonly showRightShadow?: boolean;

    readonly width: number | '100%';

    readonly headerRowClass: ComponentClass<HeaderRowProps>;
    readonly rowClass: ComponentClass<RowProps>;

    readonly selectedRowIndexes?: number[];
    readonly focusedCellPropName?: string;
    readonly focusedCellRowIndex?: number;
}

export const columnGroupPropTypes: ValidationMap<ColumnGroupProps> = {
    colsThumbHeight: PropTypes.number,
    columnProps: PropTypes.instanceOf(List).isRequired,
    customScrollBars: PropTypes.bool,
    focusedCellPropName: PropTypes.string,
    focusedCellRowIndex: PropTypes.number,
    headerHeight: PropTypes.number.isRequired,

    // TODO: Find more appropriate prop type
    headerRowClass: PropTypes.any.isRequired,

    onHorizontalScrollVisibilityChanged: PropTypes.func,
    onResize: PropTypes.func,
    onRowClick: PropTypes.func,
    onRowMove: PropTypes.func,
    onScrollPosChanged: PropTypes.func,

    overflowX: overflowPropType.isRequired,
    overflowY: overflowPropType.isRequired,

    // TODO: Find more appropriate prop type
    rowClass: PropTypes.any.isRequired,

    rowData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    rowHeight: PropTypes.number.isRequired,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
    selectedRowIndexes: PropTypes.arrayOf(PropTypes.number),
    showEdgeForTheLeftCell: PropTypes.bool,
    showRightShadow: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};
