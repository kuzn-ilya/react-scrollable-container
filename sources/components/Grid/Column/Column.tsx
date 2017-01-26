import * as React from 'react';
import * as warning from 'fbjs/lib/warning';

import { ColumnProps, columnPropTypes } from './ColumnProps';

export class Column extends React.PureComponent<ColumnProps, {}> {

    static propTypes = columnPropTypes;

    render(): null {
        warning(false, 'Component <Column /> should never render.');
        return null;
    }
}
