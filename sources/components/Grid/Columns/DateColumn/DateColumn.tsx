import * as React from 'react';
import * as warning from 'fbjs/lib/warning';

import { DateColumnProps, dateColumnPropTypes } from './DateColumnProps';
import { DateCell, HeaderCell, InplaceEdit, CellContainer } from '../../Cells';

class DateCellContainer extends CellContainer<Date> {
}

export class DateColumn extends React.PureComponent<DateColumnProps, {}> {

    static propTypes = dateColumnPropTypes;

    static defaultProps: Partial<DateColumnProps> = {
        cellClass: DateCell,
        cellContainerClass: DateCellContainer,
        headerCellClass: HeaderCell,
        inplaceEditClass: InplaceEdit
    };

    render(): null {
        warning(false, 'Component <DateColumn /> should never render.');
        return null;
    }
}
