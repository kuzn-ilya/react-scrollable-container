import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addPrefixToClass } from './../utils/css.utils';

import { HeaderProps } from './header.props';
import './header.less';

export class Header extends React.Component<HeaderProps, void> implements React.Mixin<HeaderProps, void> {
    static defaultProps: HeaderProps = {
        height: "100%",
        children: null,
        childWidth: "100%",
        spaceWidth: "0px", // TODO
        scrollLeft: 0
    } 

    componentWillReceiveProps(nextProps: HeaderProps) {
        if (nextProps.scrollLeft != this.props.scrollLeft) {
            let node = ReactDOM.findDOMNode(this);
            if (node) {
                node.scrollLeft = nextProps.scrollLeft;
            } 
        }
    }

    shouldComponentUpdate(newProps: HeaderProps) {
        return !(newProps.childWidth == this.props.childWidth 
            && newProps.children == this.props.children 
            && newProps.height == this.props.height
            && newProps.spaceWidth == this.props.spaceWidth);
    }

    render(): JSX.Element {
        return (
            <div
                className={addPrefixToClass("header")} 
                style={{ 
                    height: this.props.height,
                    right: this.props.spaceWidth ? this.props.spaceWidth : 0
                }}
            >
                {this.props.children}
            </div>
        );
    }
}