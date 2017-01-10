import * as React from 'react';
import { CellProps, cellPropTypes } from './CellProps';

import '../../../styles/grid.css';

export class Cell extends React.PureComponent<CellProps, {}> {
    static propTypes = cellPropTypes;

    render(): JSX.Element {
        let style: React.CSSProperties = {
            height: this.props.height.toString() + 'px',
            textAlign: this.props.align,
            width: this.props.width.toString() + 'px'
        };
        return (
            <div style={style} className="cell-container">
                <div className={this.props.firstCell ? 'cell-first' : 'cell'}>
                    {this.props.value}
                </div>
            </div>
        );
    }
}
