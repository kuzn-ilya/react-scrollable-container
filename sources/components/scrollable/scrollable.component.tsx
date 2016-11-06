import * as React from 'react';

import { ScrollableProps } from './scrollable.props';
import './scrollable.less';

export class Scrollable extends React.Component<ScrollableProps, void> {
    render(): JSX.Element {
        return (
            <div className="scrollable">Scrollable here!</div>
        );
    }
}