import * as React from 'react';
import { CellContainerProps, cellContainerPropTypes } from './CellContainerProps';

import '../../../../styles/grid.css';

export class CellContainer extends React.PureComponent<CellContainerProps, {}> {
    static propTypes = cellContainerPropTypes;

    render(): JSX.Element {
        let style: React.CSSProperties = {
            height: this.props.height.toString() + 'px',
            width: this.props.width.toString() + 'px'
        };
        return (
            <div style={style} className="cell-container">
                <div className={this.props.firstCell ? 'cell-first' : 'cell'}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
