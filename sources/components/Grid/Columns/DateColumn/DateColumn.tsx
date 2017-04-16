import * as React from 'react';
import * as warning from 'fbjs/lib/warning';

import { DateColumnProps, dateColumnPropTypes } from './DateColumnProps';
import { DateCell, HeaderCell } from '../../Cells';

export class DateColumn extends React.PureComponent<DateColumnProps, {}> {

    static propTypes = dateColumnPropTypes;

    static defaultProps: Partial<DateColumnProps> = {
        cellClass: DateCell,
        headerCellClass: HeaderCell
    };

    render(): null {
        warning(false, 'Component <DateColumn /> should never render.');
        return null;
    }
}
