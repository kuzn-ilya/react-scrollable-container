import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addPrefixToClass } from './../../../utils/css.utils';

import { RightHeaderProps } from './right-header.props';
import './right-header.less';

export class RightHeader extends React.Component<RightHeaderProps, void> {
    componentWillReceiveProps(nextProps: RightHeaderProps) {
        if (nextProps.scrollLeft != this.props.scrollLeft) {
            let node = ReactDOM.findDOMNode(this);
            if (node) {
                node.scrollLeft = nextProps.scrollLeft;
            } 
        }
    }

    shouldComponentUpdate(newProps: RightHeaderProps) {
        return !(newProps.childWidth == this.props.childWidth 
            && newProps.child == this.props.child 
            && newProps.height == this.props.height
            && newProps.spaceWidth == this.props.spaceWidth);
    }

    render(): JSX.Element {
        return (
            <div
                className={addPrefixToClass("right-header")} 
                style={{ 
                    height: this.props.height,
                    right: this.props.spaceWidth ? this.props.spaceWidth : 0
                }}
            >
                {this.props.child}
            </div>
        );
    }
}