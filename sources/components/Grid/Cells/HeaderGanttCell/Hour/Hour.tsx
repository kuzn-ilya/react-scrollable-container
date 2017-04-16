import * as React from 'react';

import { HourProps } from './HourProps';

export class Hour extends React.PureComponent<HourProps, {}> {
    public render(): JSX.Element {
        let styles = {
            left: this.props.position + 'px',
            width: this.props.width + 'px'
        };

        return (
            <div className="hour" style={styles} key={this.props.hour}>
                {this.props.hour}
            </div>
        );
    }
}
