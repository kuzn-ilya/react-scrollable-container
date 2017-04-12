import * as React from 'react';
import { List } from 'immutable';

import { classNames, getWeekDayName, isSameDay } from '../../../../utils';

import { DayProps } from './DayProps';
import { Hour } from '../Hour';

export class Day extends React.PureComponent<DayProps, {}> {
    public render(): JSX.Element {
        let hours: List<JSX.Element> = List<JSX.Element>();
        let hourWidth: number = (this.props.width - 1) / 6;
        let firstPartOfDay = getWeekDayName(this.props.day) + ' ' + (this.props.day.getMonth() + 1) + '/';
        let secondPartOfDay = this.props.day.getDate().toString();
        secondPartOfDay = secondPartOfDay.length === 1 ? '0' + secondPartOfDay : secondPartOfDay;

        let styles = {
            left: this.props.position || 0,
            width: this.props.width || 0
        };

        for (let i = 0; i < 6; i++) {
            let hour: string = i * 4 >= 10 ? (i * 4).toString() : '0' + (i * 4).toString();
            let hourEl = <Hour key={i} position={hourWidth * i} width={hourWidth} hour={hour}></Hour>;
            hours = hours.push(hourEl);
        }

        let isCurrentDay = isSameDay(this.props.day, new Date());
        let secondPartClassName = classNames({
            'day-text-current': isCurrentDay,
            'day-text': true
        });

        return (
            <div className="day" style={styles} key={this.props.day.toString()}>
                <span className="day-text">
                    {firstPartOfDay}
                </span>
                <span className={secondPartClassName}>
                    {secondPartOfDay}
                </span>
                <div className="hours">
                    {hours}
                </div>
            </div>
        );
    }
}
