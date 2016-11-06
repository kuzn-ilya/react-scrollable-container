import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Scrollable } from './sources/components/scrollable';

import './app.less';

export class App extends React.Component<void, void> {
    render(): JSX.Element {
        return (
            <div className="app">
                Hello, world!
                <Scrollable />
            </div>
        );
    }
}

ReactDOM.render((
    <App />
), document.getElementById('app'));
