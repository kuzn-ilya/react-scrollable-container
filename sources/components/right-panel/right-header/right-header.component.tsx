import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RightHeaderProps } from './right-header.props';

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
            <div style={{ 
                height: this.props.height,
                position: "absolute",
                backgroundColor: "yellow",
                left: 0,
                right: this.props.spaceWidth ? this.props.spaceWidth : 0,
                overflow: "hidden"
            }} >
                {this.props.child}
            </div>
        );
    }
}