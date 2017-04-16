import * as React from 'react';
import { List } from 'immutable';

import { createDateListBetweenTwoDates, addSeconds, calculateTimeline, TimelineModel } from '../../../../utils';

import { HeaderGanttCellProps, headerGanttCellPropTypes } from './HeaderGanttCellProps';
import { Day } from './Day';

export class HeaderGanttCell extends React.PureComponent<HeaderGanttCellProps, TimelineModel> {
    static propTypes = headerGanttCellPropTypes;

    constructor(props: HeaderGanttCellProps) {
        super(props);
        this.state = this.calcState(props);
    }

    componentWillReceiveProps(nextProps: HeaderGanttCellProps): void {
        this.setState(this.calcState(nextProps));
    }

    calcState(props: HeaderGanttCellProps): TimelineModel {
        return calculateTimeline(props.columnProps.startDate, props.columnProps.endDate,
            props.columnProps.zoomStartDate, props.columnProps.zoomEndDate, props.width);
    }

    render(): JSX.Element {
        let timelineStartDate: Date = this.props.columnProps.startDate;
        let timelineEndDate: Date = this.props.columnProps.endDate;
        let days: List<Date> = createDateListBetweenTwoDates(
            timelineStartDate,
            addSeconds(timelineEndDate, -1)
        );

        let dayWidth = this.state.dayWidth;

        let daysEl = days.map((day: Date, key: number) => {
            return <Day key={day.toString()} position={this.state.dayWidth * key} day={day} width={dayWidth} />;
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
