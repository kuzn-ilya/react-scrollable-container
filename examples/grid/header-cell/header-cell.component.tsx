import * as React from 'react';

import { HeaderCellProps } from './header-cell.props';

export class HeaderCell extends React.Component<HeaderCellProps, void> {
    render(): JSX.Element {
        let style = {
            borderBottom: 'solid 1px #d6d6d6',
            borderRight: 'solid 1px #d6d6d6',
            borderTop: 'solid 1px #d6d6d6',
            display: 'inline-block',
            overflow: 'hidden',
            paddingLeft: '5px',
            paddingRight: '5px',
            textAlign: 'center',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: this.props.width.toString() + 'px'
        };
        return (
            <div style={style}>{this.props.caption}</div>
        );
    }
}
