import { PropTypes, ComponentClass } from 'react';
import { ValidationMap } from '../../../react';

export interface ColumnProps {
    caption?: string;
    maxWidth?: number;
    minWidth?: number;
    propName: string;
    width: number;
    // tslint:disable-next-line:no-any
    cellClass?: ComponentClass<any>;
}

export const columnPropTypes: ValidationMap<ColumnProps> = {
    caption: PropTypes.string,
    // TODO: more appropriate cellClass prop types
    cellClass: PropTypes.any,
    maxWidth: PropTypes.number,
    minWidth: PropTypes.number,
    propName: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
};
