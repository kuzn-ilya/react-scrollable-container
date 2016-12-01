import { Component } from 'react';
import { baseRender } from './BaseRender';

// tslint:disable-next-line:variable-name */
export function mounted<P, S>(Comp: new() => Component<P, S>, onMounted: () => void, onUnmounting: () => void): React.ComponentClass<P> {
    return class Mounted extends baseRender<P, S, void, Component<P, S>>(Comp) {
        componentDidMount(): void {
            onMounted.call(this);
        }
        componentWillUnmount(): void {
            onUnmounting.call(this);
        }
    };
}
