import * as React from 'react';
import * as warning from 'fbjs/lib/warning';

import { GanttColumnProps, ganttColumnPropTypes } from './GanttColumnProps';
import { GanttCell } from '../GanttCell';
import { HeaderGanttCell } from '../HeaderGanttCell';

export class GanttColumn extends React.PureComponent<GanttColumnProps, {}> {

    static propTypes = ganttColumnPropTypes;

    static defaultProps: Partial<GanttColumnProps> = {
        cellClass: GanttCell,
        headerCellClass: HeaderGanttCell
    };

    render(): null {
        warning(false, 'Component <GanttColumn /> should never render.');
        return null;
    }
}
