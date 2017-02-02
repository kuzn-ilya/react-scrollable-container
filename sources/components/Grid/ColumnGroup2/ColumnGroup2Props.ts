import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';
import { ColumnProps } from '../Column/ColumnProps';
import { Overflow, overflowPropType } from '../../../utils';
import { RowData } from '../RowData';

export interface ColumnGroup2Props {
    readonly colsThumbHeight?: number;
    readonly columnProps: ColumnProps[];
    readonly headerHeight: number;

    readonly onHorizontalScrollVisibilityChanged?: (visible: boolean, thumbHeight: number) => void;
    readonly onScrollPosChanged?: (left: number, top: number) => void;

    readonly overflowX: Overflow;
    readonly overflowY: Overflow;

    // tslint:disable-next-line:no-any
    readonly rowData: RowData<any>;
    readonly rowHeight: number;
    readonly scrollTop?: number;
    readonly showEdgeForTheLeftCell?: boolean;
    readonly showRightShadow?: boolean;

    readonly width: number | '100%';
}

export const columnGroup2PropTypes: ValidationMap<ColumnGroup2Props> = {
    colsThumbHeight: PropTypes.number,
    columnProps: PropTypes.arrayOf(PropTypes.object).isRequired,
    headerHeight: PropTypes.number.isRequired,

    onHorizontalScrollVisibilityChanged: PropTypes.func,
    onScrollPosChanged: PropTypes.func,

    overflowX: overflowPropType.isRequired,
    overflowY: overflowPropType.isRequired,

    rowData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    rowHeight: PropTypes.number.isRequired,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
    showEdgeForTheLeftCell: PropTypes.bool,
    showRightShadow: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
};
