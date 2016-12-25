import * as React from 'react';
import { warning } from '../../../utils/warning';

import { ColumnProps, columnPropTypes } from './ColumnProps';

export class Column extends React.PureComponent<ColumnProps, {}> {

    static propTypes = columnPropTypes;

    render(): null {
        warning('Component <Column /> should never render.');
        return null;
    }
}
