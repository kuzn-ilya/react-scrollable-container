import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addPrefixToClass } from './../utils/css.utils';

import { HeaderProps } from './header.props';
import './header.less';

export class Header extends React.Component<HeaderProps, void> implements React.Mixin<HeaderProps, void> {
    static defaultProps: HeaderProps = {
        height: null,
        children: null,
        contentWidth: null,
        spaceWidth: '0px', // TODO
        scrollLeft: 0
    };

    componentWillReceiveProps(nextProps: HeaderProps) {
        if (nextProps.scrollLeft !== this.props.scrollLeft) {
            let node = ReactDOM.findDOMNode(this);
            if (node) {
                node.scrollLeft = nextProps.scrollLeft;
            }
        }
    }

    shouldComponentUpdate(nextProps: HeaderProps) {
        return !(nextProps.contentWidth === this.props.contentWidth
            && nextProps.children === this.props.children
            && nextProps.height === this.props.height
            && nextProps.spaceWidth === this.props.spaceWidth);
    }

    render(): JSX.Element {
        return (
            <div
                className={addPrefixToClass('header-container')}
                style={{
                    height: this.props.height,
                    right: this.props.spaceWidth || 0
                }}
            >
                <div
                    className={addPrefixToClass('header')}
                    style={{
                        width: this.props.contentWidth,
                        height: this.props.height
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}