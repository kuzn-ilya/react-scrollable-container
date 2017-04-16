import * as React from 'react';
import { CellContainerProps, cellContainerPropTypes } from './CellContainerProps';

import '../../../../styles/grid.css';

export class CellContainer extends React.PureComponent<CellContainerProps, {}> {
    static propTypes = cellContainerPropTypes;

    constructor(props: CellContainerProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void = (e) => {
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
