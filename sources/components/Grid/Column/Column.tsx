import * as React from 'react';

import { ColumnProps, columnPropTypes } from './ColumnProps';

export class Column extends React.PureComponent<ColumnProps, {}> {

    static propTypes = columnPropTypes;

    render(): null {
        return null;
    }
}
