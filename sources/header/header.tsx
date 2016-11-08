import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addPrefixToClass } from './../utils/css.utils';

import { HeaderProps } from './header.props';
import './header.less';

export class Header extends React.Component<HeaderProps, void> implements React.Mixin<HeaderProps, void> {
    static defaultProps: HeaderProps = {
        children: null,
        contentWidth: null,
        height: null,
        scrollLeft: 0,
        spaceWidth: '0px' // TODO
    };

    componentWillReceiveProps(nextProps: HeaderProps): void {
        if (nextProps.scrollLeft !== this.props.scrollLeft) {
            let node = ReactDOM.findDOMNode(this);
            if (node) {
                node.scrollLeft = nextProps.scrollLeft;
            }
        }
    }

    shouldComponentUpdate(nextProps: HeaderProps): boolean {
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
                        height: this.props.height,
                        width: this.props.contentWidth
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}
