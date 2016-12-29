import * as React from 'react';
import { CellProps, cellPropTypes } from './CellProps';

export class Cell extends React.PureComponent<CellProps, {}> {
    static propTypes = cellPropTypes;

    render(): JSX.Element {
        let style = {
            borderBottom: 'solid 1px #d6d6d6',
            // borderRight: 'solid 1px #d6d6d6',
            display: 'inline-block',
            // paddingLeft: '5px',
            // paddingRight: '5px',
            textAlign: this.props.align,
            textOverflow: 'ellipsis',
            width: this.props.width.toString() + 'px'
        };
        return (
            <div style={style}>{this.props.value}</div>
        );
    }
}
