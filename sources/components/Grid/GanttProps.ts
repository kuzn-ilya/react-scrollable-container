import { PropTypes, ComponentClass } from 'react';
import { ValidationMap } from '../../react';
import { RowData } from './RowData';
import { RowProps } from './Row/RowProps';
import { HeaderRowProps } from './HeaderRow/HeaderRowProps';

export interface GanttProps {
    customScrollBars?: boolean;
    headerHeight: number;
    // tslint:disable-next-line:no-any
    rowData: RowData<any>;
    fixedColumnCount?: number;
    fixedRowCount?: number;
    rowHeight: number;
    readonly fixedHeaderRowClass: ComponentClass<HeaderRowProps>;
    readonly fixedRowClass: ComponentClass<RowProps>;
    readonly scrollableHeaderRowClass: ComponentClass<HeaderRowProps>;
    readonly scrollableRowClass: ComponentClass<RowProps>;
}

export const ganttPropTypes: ValidationMap<GanttProps> = {
    customScrollBars: PropTypes.bool,
    fixedColumnCount: PropTypes.number,
    // TODO: Find more appropriate prop type
    fixedHeaderRowClass: PropTypes.any.isRequired,
    // TODO: Find more appropriate prop type
    fixedRowClass: PropTypes.any.isRequired,
    fixedRowCount: PropTypes.number,
    headerHeight: PropTypes.number.isRequired,
    rowData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    rowHeight: PropTypes.number.isRequired,
    // TODO: Find more appropriate prop type
    scrollableHeaderRowClass: PropTypes.any.isRequired,
    // TODO: Find more appropriate prop type
    scrollableRowClass: PropTypes.any.isRequired
};
