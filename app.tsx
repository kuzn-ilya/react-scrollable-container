import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class App extends React.Component<void, void> {
    render(): JSX.Element {
        return (
            <div>Hello, world!</div>
        );
    }
}

ReactDOM.render((
    <App />
), document.getElementById('app'));
