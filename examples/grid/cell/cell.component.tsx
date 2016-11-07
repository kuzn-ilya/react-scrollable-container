import * as React from 'react';

import { CellProps } from './cell.props';

export class Cell extends React.Component<CellProps, void> {
    render(): JSX.Element {
        let style = {
            width: this.props.width.toString() + "px", 
            display: "inline-block", 
            borderRight: "solid 1px grey", 
            borderBottom: "solid 1px grey",
            textAlign: this.props.align,
            paddingLeft: "5px",
            paddingRight: "5px"
        };
        return (
            <span style={style}>{this.props.value}</span>
        );
    }
}
