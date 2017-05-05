import * as React from 'react';

import { HourProps } from './HourProps';

import * as classes from '../../../../../styles/shift.css';

export class Hour extends React.PureComponent<HourProps, {}> {
    public render(): JSX.Element {
        let styles = {
            left: this.props.position + 'px',
            width: this.props.width + 'px'
        };

        return (
            <div className={classes.hour} style={styles} key={this.props.hour}>
                {this.props.hour}
            </div>
        );
    }
}
