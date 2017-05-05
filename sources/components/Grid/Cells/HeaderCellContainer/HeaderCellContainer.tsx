import * as React from 'react';
import { HeaderCellContainerProps, headerCellContainerPropTypes } from './HeaderCellContainerProps';

import * as classes from '../../../../styles/grid.css';

export class HeaderCellContainer extends React.PureComponent<HeaderCellContainerProps, {}> {
    static propTypes = headerCellContainerPropTypes;

    render(): JSX.Element {
        let style = {
            height: this.props.height.toString() + 'px',
            width: this.props.width.toString() + 'px'
        };

        return (
            <div style={style} className={classes.headerCellContainer}>
                <div className={this.props.firstCell ? classes.headerCellFirst : classes.headerCell}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
