import * as React from 'react';
import { CellContainerProps, cellContainerPropTypes } from './CellContainerProps';

import '../../../../styles/grid.css';

export class CellContainer extends React.PureComponent<CellContainerProps, {}> {
    static propTypes = cellContainerPropTypes;

    handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (this.props.columnProps.onCellClick) {
            this.props.columnProps.onCellClick(this.props.rowIndex, this.props.columnProps.propName);
        }
    }

    render(): JSX.Element {
        let style: React.CSSProperties = {
            height: this.props.height.toString() + 'px',
            width: this.props.width.toString() + 'px'
        };
        return (
            <div style={style} className="cell-container" onClick={this.handleClick}>
                <div className={this.props.firstCell ? 'cell-first' : 'cell'}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
