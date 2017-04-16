// import { PropTypes } from 'react';
import { ValidationMap } from '../../../../react';
import * as objectAssign from 'object-assign';

import { HeaderCellProps, headerCellPropTypes } from '../HeaderCell/HeaderCellProps';
import { GanttColumnProps } from '../../Columns/GanttColumn/GanttColumnProps';

export interface HeaderGanttCellProps extends HeaderCellProps<GanttColumnProps> {
}

export const headerGanttCellPropTypes: ValidationMap<HeaderGanttCellProps> = objectAssign({}, headerCellPropTypes, {
});
