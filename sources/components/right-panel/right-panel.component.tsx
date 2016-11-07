import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { RightHeader } from './right-header';
import { RightContent } from './right-content';
import { RightPanelProps } from './right-panel.props';

export class RightPanel extends React.Component<RightPanelProps, void> {
    render(): JSX.Element {
        return (
            <div 
                style={{
                    height: this.props.height,
                    width: this.props.width,
                    position: "relative",
                    outline: "1px solid red"
                }}
            >
                <RightHeader height={this.props.headerHeight} child={this.props.headerChild} />
                <RightContent headerHeight={this.props.headerHeight} children={this.props.children} />
            </div>
        );
    }

    getScrollbarWidth(): number {
        let node = ReactDOM.findDOMNode(this) as HTMLElement;
        let scrollbarWidth = node.offsetWidth - node.clientWidth;
        return scrollbarWidth;
    }    

    getScrollbarHeight(): number {
        let node = ReactDOM.findDOMNode(this) as HTMLElement;
        let scrollbarHeight = node.offsetHeight - node.clientHeight;
        return scrollbarHeight;
    }    
}