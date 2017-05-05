import * as React from 'react';
import { CellProps, cellPropTypes } from '../Cell/CellProps';
import { DateColumnProps } from '../../Columns/DateColumn/DateColumnProps';

import * as classes from '../../../../styles/grid.css';

export class DateCell extends React.PureComponent<CellProps<DateColumnProps, Date>, {}> {
    static propTypes = cellPropTypes;

    render(): JSX.Element {
        return (
            <div className={classes.dateCell}
                style={{
                    textAlign: this.props.columnProps.align
                }}
            >
                {this.props.value ? this.props.value.toString() : '' }
            </div>
        );
    }
}
