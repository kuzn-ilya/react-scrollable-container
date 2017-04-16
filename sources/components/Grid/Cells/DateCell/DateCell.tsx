import * as React from 'react';
import { CellProps, cellPropTypes } from '../Cell/CellProps';
import { DateColumnProps } from '../../Columns/DateColumn/DateColumnProps';

import '../../../../styles/grid.css';

export class DateCell extends React.PureComponent<CellProps<DateColumnProps, string>, {}> {
    static propTypes = cellPropTypes;

    render(): JSX.Element {
        let style: React.CSSProperties = {
            height: this.props.height.toString() + 'px',
            textAlign: this.props.columnProps.align,
            width: this.props.width.toString() + 'px'
        };
        return (
            <div style={style} className="cell-container">
                <div className={this.props.firstCell ? 'cell-first' : 'cell'}>
                    {this.props.value ? this.props.value.toString() : '' }
                </div>
            </div>
        );
    }
}
