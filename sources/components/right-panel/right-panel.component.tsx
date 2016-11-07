import * as React from 'react';

import { addPrefixToClass } from './../../utils/css.utils';

import { RightHeader } from './right-header';
import { RightContent } from './right-content';
import { RightPanelProps } from './right-panel.props';
import { RightPanelState } from './right-panel.state';
import './right-panel.less';

export class RightPanel extends React.Component<RightPanelProps, RightPanelState> {
    constructor(props: RightPanelProps) {
        super(props);
        this.state = {};
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollBarThumbChanged = this.handleScrollBarThumbChanged.bind(this);
    }

    render(): JSX.Element {
        return (
            <div
                className={addPrefixToClass("right-panel")}
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
            >
                <RightHeader child={this.props.headerChild} 
                    childWidth={this.props.childWidth} 
                    height={this.props.headerHeight}
                    spaceWidth={this.state.verticalScrollThumbWidth}
                    scrollLeft={ this.state.scrollLeft } />
                <RightContent children={this.props.children} 
                    childWidth={this.props.childWidth} 
                    childHeight={this.props.childHeight} 
                    headerHeight={this.props.headerHeight}
                    onScrollBarThumbChanged={this.handleScrollBarThumbChanged}
                    onScroll={this.handleScroll} />
            </div>
        );
    }

    private handleScrollBarThumbChanged: (horizontalScrollThumbHeight: number, verticalScrollThumbWidth: number) => void = 
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