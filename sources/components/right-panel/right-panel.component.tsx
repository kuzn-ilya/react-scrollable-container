import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { RightPanelProps } from './right-panel.props';
import './right-panel.less';

export class RightPanel extends React.Component<RightPanelProps, void> {
    render(): JSX.Element {
        return (
            <div 
                className="right-panel" 
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
            >
                Scrollable here
                {this.props.children}

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