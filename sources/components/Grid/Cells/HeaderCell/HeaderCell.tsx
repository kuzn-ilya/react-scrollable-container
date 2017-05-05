import * as React from 'react';
import { HeaderCellProps, headerCellPropTypes } from './HeaderCellProps';
import { ColumnProps } from '../../Columns/Column/ColumnProps';

import * as classes from '../../../../styles/grid.css';

// tslint:disable-next-line:no-any
export class HeaderCell extends React.PureComponent<HeaderCellProps<ColumnProps<any>>, {}> {
    static propTypes = headerCellPropTypes;

    render(): JSX.Element {
        return (
            <div className={classes.headerCellCaption}>
                {this.props.caption}
            </div>
        );
    }
}
