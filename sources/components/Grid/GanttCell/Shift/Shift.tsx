import * as React from 'react';

import { ShiftProps } from './ShiftProps';
import { toHourAndMinutesString } from '../../../../utils';

import '../../../../styles/shift.css';

export class Shift extends React.PureComponent<ShiftProps, {}> {
    public render(): JSX.Element {
        let startHours: string = toHourAndMinutesString(this.props.entity.startDateTime);
        let endHours: string = toHourAndMinutesString(this.props.entity.endDateTime);

        let styles = {
            left: this.props.position + 'px',
            width: this.props.width + 'px'
        };

        return (
            <div className="shift shift-gantt"
                style={styles}>
                {startHours}-{endHours}
            </div>
        );
    }
}
