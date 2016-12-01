import * as React from 'react';

import { CellProps } from './cell.props';

export class Cell extends React.Component<CellProps, void> {
    render(): JSX.Element {
        let style = {
            borderBottom: 'solid 1px grey',
            borderRight: 'solid 1px grey',
            display: 'inline-block',
            paddingLeft: '5px',
            paddingRight: '5px',
            textAlign: this.props.align,
            width: this.props.width.toString() + 'px'
        };
        return (
            <span style={style}>{this.props.value}</span>
        );
    }
}
