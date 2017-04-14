import * as React from 'react';
import { List } from 'immutable';

import { createDateListBetweenTwoDates, addSeconds } from '../../../utils';

import { HeaderGanttCellProps, headerGanttCellPropTypes } from './HeaderGanttCellProps';
import { Day } from './Day';

export class HeaderGanttCell extends React.PureComponent<HeaderGanttCellProps, {}> {
    static propTypes = headerGanttCellPropTypes;

    render(): JSX.Element {
        let timelineStartDate: Date = this.props.columnProps.timelineModel.startDate;
        let timelineEndDate: Date = this.props.columnProps.timelineModel.endDate;
        let days: List<Date> = createDateListBetweenTwoDates(
            timelineStartDate,
            addSeconds(timelineEndDate, -1)
        );

        let dayWidth = this.props.columnProps.timelineModel.dayWidth;

        let daysEl = days.map((day: Date, key: number) => {
            return <Day key={day.toString()} position={this.props.columnProps.timelineModel.dayWidth * key} day={day} width={dayWidth} />;
        });

        let style = {
            height: this.props.height.toString() + 'px',
            width: this.props.width.toString() + 'px'
        };

        return (
            <div style={style} className="header-cell-container">
                <div className={this.props.firstCell ? 'header-cell-first' : 'header-cell'}>
                    {daysEl}
                </div>
            </div>
        );
    }
}
