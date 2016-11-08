import * as React from 'react';

import { addPrefixToClass } from './../utils/css.utils';

import { Header } from './header';
import { Content } from './content';
import { ScrollableContainerProps } from './scrollable-container.props';
import { ScrollableContainerState } from './scrollable-container.state';
import './scrollable-container.less';

export class ScrollableContainer extends React.Component<ScrollableContainerProps, ScrollableContainerState> {
    constructor(props: ScrollableContainerProps) {
        super(props);
        this.state = {};
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollBarThumbSizeChanged = this.handleScrollBarThumbSizeChanged.bind(this);
    }

    render(): JSX.Element {
        return (
            <div
                className={addPrefixToClass("scrollable-container")}
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
            >
                <Header children={this.props.headerChildren} 
                    childWidth={this.props.childWidth} 
                    height={this.props.headerHeight}
                    spaceWidth={this.state.verticalScrollThumbWidth}
                    scrollLeft={ this.state.scrollLeft } />
                <Content children={this.props.children} 
                    childWidth={this.props.childWidth} 
                    childHeight={this.props.childHeight} 
                    headerHeight={this.props.headerHeight}
                    onScrollBarThumbSizeChanged={this.handleScrollBarThumbSizeChanged}
                    onScroll={this.handleScroll} />
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