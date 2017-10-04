import * as PropTypes from 'prop-types';
import { ValidationMap } from '../../../../react';
import { GanttCellModel } from '../../../../utils';

import { ColumnProps, columnPropTypes } from '../Column/ColumnProps';

export interface GanttColumnProps extends ColumnProps<Array<GanttCellModel>> {
    zoomStartDate: Date;
    zoomEndDate: Date;
    startDate: Date;
    endDate: Date;
}

export const ganttColumnPropTypes: ValidationMap<GanttColumnProps> = {
    ...columnPropTypes,
    endDate: PropTypes.object.isRequired,
    startDate: PropTypes.object.isRequired,
    zoomEndDate: PropTypes.object.isRequired,
    zoomStartDate: PropTypes.object.isRequired
};
