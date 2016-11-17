import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

export function renderIntoDocument<P, S>(element: React.ReactElement<P>): React.Component<P, S> {
    return TestUtils.renderIntoDocument<P>(element) as React.Component<P, S>;
}

export function unmountComponent<P, S>(component: React.Component<P, S>): void {
    let element = ReactDOM.findDOMNode(component);
    let parent = element.parentElement;
    ReactDOM.unmountComponentAtNode(parent);
}

