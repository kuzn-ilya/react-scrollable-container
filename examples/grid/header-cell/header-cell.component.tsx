import * as React from 'react';

import { HeaderCellProps } from './header-cell.props';

export class HeaderCell extends React.Component<HeaderCellProps, void> {
    render(): JSX.Element {
        let style = {
            borderBottom: 'solid 1px grey',
            borderRight: 'solid 1px grey',
            display: 'inline-block',
            paddingLeft: '5px',
            paddingRight: '5px',
            textAlign: 'center',
            width: this.props.width.toString() + 'px'
        };
        return (
            <span style={style}>{this.props.caption}</span>
        );
    }
}
