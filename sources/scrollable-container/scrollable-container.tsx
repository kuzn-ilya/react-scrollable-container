import * as React from 'react';

import { addPrefixToClass } from './../utils/css.utils';

//import { Header } from './header';
//import { Content } from './content';
import { ScrollableContainerProps } from './scrollable-container.props';
import { ScrollableContainerState } from './scrollable-container.state';
import { Header } from './header';
import { Content } from './content';
import './scrollable-container.less';

export class ScrollableContainer extends React.Component<ScrollableContainerProps, ScrollableContainerState> {
    constructor(props: ScrollableContainerProps) {
        super(props);
        this.state = {};
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollBarThumbSizeChanged = this.handleScrollBarThumbSizeChanged.bind(this);
    }

    render(): JSX.Element {
        let newChildren = React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
            if (child.props && typeof child.props.spaceWidth != "undefined") {
                let newChild = (
                    <Header children = {child.props.children}
                        childWidth={child.props.childWidth} 
                        height={child.props.height}
                        spaceWidth={this.state.verticalScrollThumbWidth}
                        scrollLeft={this.state.scrollLeft } 
                    />
                );
                return newChild;
            } else if (child.props && typeof child.props.onScrollBarThumbSizeChanged != "undefined" && typeof child.props.onScroll != "undefined") {
                let newChild = (
                    <Content children={child.props.children} 
                        childWidth={child.props.childWidth} 
                        childHeight={child.props.childHeight} 
                        headerHeight={child.props.headerHeight}
                        onScrollBarThumbSizeChanged={this.handleScrollBarThumbSizeChanged}
                        onScroll={this.handleScroll} 
                    />
                );
                return newChild;
            }

            return child;
        });

        return (
            <div
                className={addPrefixToClass("scrollable-container")}
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
            >
                {newChildren}
            </div>
        );
    }

    private handleScrollBarThumbSizeChanged: (horizontalScrollThumbHeight: number, verticalScrollThumbWidth: number) => void = 
        (horizontalScrollThumbHeight, verticalScrollThumbWidth) => {
            this.setState((prevState, props) =>
                ({ horizontalScrollThumbHeight, verticalScrollThumbWidth })
            );
        }

    private handleScroll: (scrollLeft: number, scrollTop: number) => void =
        (scrollLeft, scrollTop) => {
            this.setState((prevState, props) => 
                ({ scrollLeft, scrollTop })
            );
        }
}