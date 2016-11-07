import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { addPrefixToClass } from './../../../utils/css.utils';

import { RightContentProps } from './right-content.props';
import './right-content.less';

export class RightContent extends React.Component<RightContentProps, void> {
    private horizontalScrollThumbHeight?: number;
    private verticalScrollThumbWidth?: number;
    
    constructor(props: RightContentProps) {
        super(props);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.measureScrollbars();
        window.addEventListener('resize', this.measureScrollbars);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureScrollbars);
        this.horizontalScrollThumbHeight = this.verticalScrollThumbWidth = null;
    }

    render(): JSX.Element {
        return (
            <div 
                className={addPrefixToClass("right-content-container")}
                style={{
                    top: this.props.headerHeight
                }} 
                onScroll={this.handleScroll} 
            >
                <div 
                    className={addPrefixToClass("right-content")}
                    style={{
                        height: this.props.childHeight,
                        width: this.props.childWidth
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }

    private handleWindowResize: () => void =
        () => this.measureScrollbars();

    // TODO It is worth a try to throttle it!
    private measureScrollbars: () => void =
        () => {
            let el = ReactDOM.findDOMNode(this) as HTMLElement;
            let newWidth = el.offsetWidth - el.clientWidth;
            let newHeight = el.offsetHeight - el.clientHeight;
            if (newWidth != this.verticalScrollThumbWidth || newHeight != this.horizontalScrollThumbHeight) {
                this.horizontalScrollThumbHeight = newHeight;
                this.verticalScrollThumbWidth = newWidth;

                if (this.props.onScrollBarThumbSizeChanged) {
                    this.props.onScrollBarThumbSizeChanged(this.horizontalScrollThumbHeight, this.verticalScrollThumbWidth);
                }
            }
        }

    private handleScroll: (event: React.UIEvent<HTMLDivElement>) => void =
        (event) => {
            let node = ReactDOM.findDOMNode(this);
            let scrollTop = node.scrollTop;
            let scrollLeft = node.scrollLeft;
            if (this.props.onScroll) {
            this.props.onScroll(scrollLeft, scrollTop);
            }
        }
}