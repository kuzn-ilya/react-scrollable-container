import * as React from 'react';
import { HeaderCellContainerProps, headerCellContainerPropTypes } from './HeaderCellContainerProps';

import '../../../../styles/grid.css';

export class HeaderCellContainer extends React.PureComponent<HeaderCellContainerProps, {}> {
    static propTypes = headerCellContainerPropTypes;

    render(): JSX.Element {
        let style = {
            height: this.props.height.toString() + 'px',
            width: this.props.width.toString() + 'px'
        };

        return (
            <div style={style} className="header-cell-container">
                <div className={this.props.firstCell ? 'header-cell-first' : 'header-cell'}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
