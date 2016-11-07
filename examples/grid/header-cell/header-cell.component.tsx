import * as React from 'react';

import { HeaderCellProps } from './header-cell.props';

export class HeaderCell extends React.Component<HeaderCellProps, void> {
    render(): JSX.Element {
        let style = {
            width: this.props.width.toString() + "px", 
            display: "inline-block", 
            borderRight: "solid 1px grey", 
            borderBottom: "solid 1px grey",
            textAlign: "center",
            paddingLeft: "5px",
            paddingRight: "5px"
        };
        return (
            <span style={style}>{this.props.caption}</span>
        );
    }
}