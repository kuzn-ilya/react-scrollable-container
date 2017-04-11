import { PropTypes, ComponentClass } from 'react';
import { ValidationMap } from '../../react';
import { RowData } from './RowData';

export interface GridProps {
    customScrollBars?: boolean;
    headerHeight: number;
    // tslint:disable-next-line:no-any
    rowData: RowData<any>;
    fixedColumnCount?: number;
    fixedRowCount?: number;
    rowHeight: number;
    // tslint:disable-next-line:no-any
    readonly headerRowClass: ComponentClass<any>;
    // tslint:disable-next-line:no-any
    readonly rowClass: ComponentClass<any>;
}

export const gridPropTypes: ValidationMap<GridProps> = {
    customScrollBars: PropTypes.bool,
    fixedColumnCount: PropTypes.number,
    fixedRowCount: PropTypes.number,
    headerHeight: PropTypes.number.isRequired,
    // TODO: Find more appropriate prop type
    headerRowClass: PropTypes.any.isRequired,
    // TODO: Find more appropriate prop type
    rowClass: PropTypes.any.isRequired,
    rowData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    rowHeight: PropTypes.number.isRequired
};
