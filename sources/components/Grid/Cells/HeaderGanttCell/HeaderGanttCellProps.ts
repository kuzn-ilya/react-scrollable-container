// import * as PropTypes from 'prop-types';
import { ValidationMap } from '../../../../react';

import { HeaderCellProps, headerCellPropTypes } from '../HeaderCell/HeaderCellProps';
import { GanttColumnProps } from '../../Columns/GanttColumn/GanttColumnProps';

export interface HeaderGanttCellProps extends HeaderCellProps<GanttColumnProps> {
}

export const headerGanttCellPropTypes: ValidationMap<HeaderGanttCellProps> = {...headerCellPropTypes}
