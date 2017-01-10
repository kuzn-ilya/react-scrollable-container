import { PropTypes } from 'react';
import { ValidationMap } from '../../../react/ValidationMap';
import { ColumnProps } from '../Column/ColumnProps';
import { Overflow, overflowPropType } from '../../../utils/types';

export interface ColumnGroupProps {
    readonly colsThumbHeight?: number;
    readonly columnProps: ColumnProps[];
    readonly headerHeight: number;

    readonly onHorizontalScrollVisibilityChanged?: (visible: boolean, thumbHeight: number) => void;
    readonly onScrollPosChanged?: (top: number) => void;

    readonly overflowX: Overflow;
    readonly overflowY: Overflow;

    // tslint:disable-next-line:no-any
    readonly rowData: any[];
    readonly rowHeight: number;
    readonly scrollTop?: number;
    readonly showEdgeForTheLeftCell?: boolean;
    readonly width: number | '100%';
}

export const columnGroupPropTypes: ValidationMap<ColumnGroupProps> = {
    colsThumbHeight: PropTypes.number,
    columnProps: PropTypes.arrayOf(PropTypes.object).isRequired,
    headerHeight: PropTypes.number.isRequired,

    onHorizontalScrollVisibilityChanged: PropTypes.func,
    onScrollPosChanged: PropTypes.func,

    overflowX: overflowPropType.isRequired,
    overflowY: overflowPropType.isRequired,

    rowData: PropTypes.arrayOf(PropTypes.any).isRequired,
    rowHeight: PropTypes.number.isRequired,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
    showEdgeForTheLeftCell: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};