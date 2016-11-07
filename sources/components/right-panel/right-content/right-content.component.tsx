import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RightContentProps } from './right-content.props';

export class RightContent extends React.Component<RightContentProps, void> {
    private horizontalScrollThumbHeight?: number;
    private verticalScrollThumbWidth?: number;
    
    componentDidMount() {
        this.remeasure();
        // TODO throttle it!
        this.boundRemeasure = this.remeasure.bind(this);
        window.addEventListener('resize', this.boundRemeasure);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.boundRemeasure);
        this.horizontalScrollThumbHeight = this.verticalScrollThumbWidth = null;
    }

    render(): JSX.Element {
        return (
            <div style={{
                    overflow: "auto", 
                    position: "absolute",
                    top: this.props.headerHeight,
                    bottom: 0,
                    left: 0,
                    right: 0
            }} onScroll={this.onScroll.bind(this)} >
                <div style={{
                    position: "relative",
                    overflow: "hidden",
                    top: 0,
                    left: 0,
                    height: this.props.childHeight,
                    width: this.props.childWidth,
                }}>
                    {this.props.children}
                </div>
            </div>
        );
    }

    private boundRemeasure: () => void;
    private remeasure() {
        let el = ReactDOM.findDOMNode(this) as HTMLElement;
        let newWidth = el.offsetWidth - el.clientWidth;
        let newHeight = el.offsetHeight - el.clientHeight;
        if (newWidth != this.verticalScrollThumbWidth || newHeight != this.horizontalScrollThumbHeight) {
            this.horizontalScrollThumbHeight = newHeight;
            this.verticalScrollThumbWidth = newWidth;

            if (this.props.onScrollBarThumbChanged) {
                this.props.onScrollBarThumbChanged(this.horizontalScrollThumbHeight, this.verticalScrollThumbWidth);
            }
        }
    }

    private onScroll = (event: React.UIEvent<HTMLDivElement>) => {
        let node = ReactDOM.findDOMNode(this);
        let scrollTop = node.scrollTop;
        let scrollLeft = node.scrollLeft;
        if (this.props.onScroll) {
            this.props.onScroll(scrollLeft, scrollTop);
        }
    }
}