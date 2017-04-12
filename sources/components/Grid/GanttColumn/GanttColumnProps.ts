import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';
import * as objectAssign from 'object-assign';

import { TimelineModel } from '../../../utils';
import { ColumnProps, columnPropTypes } from '../Column/ColumnProps';

export interface GanttColumnProps extends ColumnProps {
    timelineModel: TimelineModel;
}

export const ganttColumnPropTypes: ValidationMap<GanttColumnProps> = objectAssign(columnPropTypes, {
    timelineModel: PropTypes.object
});
