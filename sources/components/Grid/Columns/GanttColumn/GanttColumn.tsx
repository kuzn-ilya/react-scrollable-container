import * as React from 'react';
import * as warning from 'fbjs/lib/warning';

import { GanttColumnProps, ganttColumnPropTypes } from './GanttColumnProps';
import { GanttCell, HeaderGanttCell, InplaceEdit, CellContainer } from '../../Cells';
import { GanttCellModel } from '../../../../utils';

class GanttCellContainer extends CellContainer<Array<GanttCellModel>> {
}

export class GanttColumn extends React.PureComponent<GanttColumnProps, {}> {

    static propTypes = ganttColumnPropTypes;

    static defaultProps: Partial<GanttColumnProps> = {
        cellClass: GanttCell,
        cellContainerClass: GanttCellContainer,
        headerCellClass: HeaderGanttCell,
        inplaceEditClass: InplaceEdit
    };

    render(): null {
        warning(false, 'Component <GanttColumn /> should never render.');
        return null;
    }
}
