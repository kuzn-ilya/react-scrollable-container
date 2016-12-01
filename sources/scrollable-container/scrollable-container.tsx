import * as React from 'react';

import { addPrefixToClass } from './../utils/css.utils';

import { ScrollableContainerProps } from './scrollable-container.props';
import { ScrollableContainerState } from './scrollable-container.state';
import { Header } from './../header';
import { Content } from './../content';
import './scrollable-container.less';

export class ScrollableContainer extends React.Component<ScrollableContainerProps, ScrollableContainerState> {
    static reactScrollableContainerName = 'ScrollableContainer';

    constructor(props: ScrollableContainerProps) {
        super(props);
        this.state = {};
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollBarThumbSizeChanged = this.handleScrollBarThumbSizeChanged.bind(this);
    }

    render(): JSX.Element {
        // tslint:disable-next-line:no-any
        let children = React.Children.map(this.props.children, (child: React.ReactElement<any>) => {
            // tslint:disable-next-line:no-any
            if (child.props && (child.type as any).reactScrollableContainerName === 'Header') {
                let newChild = (
                    <Header children = {child.props.children}
                        contentWidth={child.props.contentWidth || this.props.contentWidth}
                        height={child.props.height || this.props.headerHeight || '0px'}
                        spaceWidth={this.state.verticalScrollThumbWidth}
                        scrollLeft={this.state.scrollLeft }
                    />
                );
                return newChild;
            // tslint:disable-next-line:no-any
            } else if (child.props && (child.type as any).reactScrollableContainerName === 'Content') {
                let newChild = (
                    <Content children={child.props.children}
                        contentWidth={child.props.contentWidth || this.props.contentWidth}
                        contentHeight={child.props.contentHeight || this.props.contentHeight}
                        top={child.props.top || this.props.headerHeight || '0px'}
                        onScrollBarThumbSizeChanged={this.handleScrollBarThumbSizeChanged}
                        onScroll={this.handleScroll}
                    />
                );
                return newChild;
            }
            return null;
        });

        return (
            <div
                className={addPrefixToClass('scrollable-container')}
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
            >
                {children}
            </div>
        );
    }

    private handleScrollBarThumbSizeChanged: (horizontalScrollThumbHeight: number, verticalScrollThumbWidth: number) => void =
        (horizontalScrollThumbHeight, verticalScrollThumbWidth) => {
            this.setState((prevState: ScrollableContainerState, props: ScrollableContainerProps) =>
                ({ horizontalScrollThumbHeight, verticalScrollThumbWidth })
            );
        }

    private handleScroll: (scrollLeft: number, scrollTop: number) => void =
        (scrollLeft, scrollTop) => {
            this.setState((prevState: ScrollableContainerState, props: ScrollableContainerProps) =>
                ({ scrollLeft, scrollTop })
            );
        }
}
