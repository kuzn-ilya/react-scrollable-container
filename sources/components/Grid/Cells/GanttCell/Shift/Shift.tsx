import * as React from 'react';
import { classNames } from '../../../../../utils';

import { ShiftProps } from './ShiftProps';
import { toHourAndMinutesString } from '../../../../../utils';

import * as classes from '../../../../../styles/shift.css';

export class Shift extends React.PureComponent<ShiftProps, {}> {
    public render(): JSX.Element {
        let startHours: string = toHourAndMinutesString(this.props.entity.startDateTime);
        let endHours: string = toHourAndMinutesString(this.props.entity.endDateTime);

        let styles = {
            left: this.props.position + 'px',
            width: this.props.width + 'px'
        };

        return (
            <div className={classNames(classes.shift, classes.shiftGantt)}
                style={styles}>
                {startHours}-{endHours}
            </div>
        );
    }
}
