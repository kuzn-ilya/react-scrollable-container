import { Component } from 'react';
import { baseRender } from './BaseRender';

export function mounted<P, S>(Comp: new() => Component<P, S>, onMounted: () => void, onUnmounting: () => void) {
    return class Mounted extends baseRender<P, S, void, Component<P, S>>(Comp) {
        componentDidMount() {
            onMounted.call(this);
        }
        componentWillUnmount() {
            onUnmounting.call(this);
        }
    }
}