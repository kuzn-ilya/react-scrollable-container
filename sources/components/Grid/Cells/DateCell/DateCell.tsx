import * as React from 'react';
import { CellProps, cellPropTypes } from '../Cell/CellProps';
import { DateColumnProps } from '../../Columns/DateColumn/DateColumnProps';

import '../../../../styles/grid.css';

export class DateCell extends React.PureComponent<CellProps<DateColumnProps, Date>, {}> {
    static propTypes = cellPropTypes;

    render(): JSX.Element {
        return (
            <div className="date-cell"
                style={{
                    textAlign: this.props.columnProps.align
                }}
            >
                {this.props.value ? this.props.value.toString() : '' }
            </div>
        );
    }
}
