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

export function findRenderedComponentWithType<P, S, P2, S2, T extends React.Component<P2, S2>, C extends React.ComponentClass<P2>>(
    root: React.Component<P, S>, type: React.ClassType<P2, T, C>): React.Component<P2, S2> {
    return TestUtils.findRenderedComponentWithType(root, type) as React.Component<P2, S2>;
}
