import { PropTypes, ComponentClass } from 'react';
import { ValidationMap } from '../../../react';
import { CellProps } from '../Cell/CellProps';
import { HeaderCellProps } from '../HeaderCell/HeaderCellProps';

export interface ColumnProps {
    caption?: string;
    maxWidth?: number;
    minWidth?: number;
    propName: string;
    width: number;
    // tslint:disable-next-line:no-any
    cellClass?: ComponentClass<CellProps<ColumnProps>>;
    // tslint:disable-next-line:no-any
    headerCellClass?: ComponentClass<HeaderCellProps<ColumnProps>>;
}

export const columnPropTypes: ValidationMap<ColumnProps> = {
    caption: PropTypes.string,
    // TODO: more appropriate cellClass prop types
    cellClass: PropTypes.any.isRequired,
    headerCellClass: PropTypes.any.isRequired,
    maxWidth: PropTypes.number,
    minWidth: PropTypes.number,
    propName: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
};
