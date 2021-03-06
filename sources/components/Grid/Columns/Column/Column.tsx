import * as React from 'react';
import * as warning from 'fbjs/lib/warning';

import { ColumnProps, columnPropTypes } from './ColumnProps';

export class Column<V> extends React.PureComponent<ColumnProps<V>, {}> {

    static propTypes = columnPropTypes;

    // tslint:disable-next-line:no-any
    static defaultProps: Partial<ColumnProps<any>> = {
        readonly: false
    };

    render(): null {
        warning(false, 'Component <Column /> should never render.');
        return null;
    }
}
