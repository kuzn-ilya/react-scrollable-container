import * as React from 'react';
import { HeaderCellProps, headerCellPropTypes } from './HeaderCellProps';

import '../../../styles/grid.css';

export class HeaderCell extends React.PureComponent<HeaderCellProps, {}> {
    static propTypes = headerCellPropTypes;

    render(): JSX.Element {
        let style = {
            height: this.props.height.toString() + 'px',
            width: this.props.width.toString() + 'px'
        };

        return (
            <div style={style} className="header-cell-container">
                <div className={this.props.firstCell ? 'header-cell-first' : 'header-cell'}>{this.props.caption}</div>
            </div>
        );
    }
}
