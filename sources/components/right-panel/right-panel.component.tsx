import * as React from 'react';

import { RightHeader } from './right-header';
import { RightContent } from './right-content';
import { RightPanelProps } from './right-panel.props';
import { RightPanelState } from './right-panel.state';

export class RightPanel extends React.Component<RightPanelProps, RightPanelState> {
    constructor(props: RightPanelProps) {
        super(props);
        this.state = {};
    }

    render(): JSX.Element {
        return (
            <div 
                style={{
                    height: this.props.height,
                    width: this.props.width,
                    position: "relative",
                    overflow: "hidden"
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
                    onScrollBarThumbChanged={this.onScrollBarThumbChanged.bind(this)}
                    onScroll={this.onScroll.bind(this)} />
            </div>
        );
    }

    onScrollBarThumbChanged(horizontalScrollThumbHeight: number, verticalScrollThumbWidth: number) {
        this.setState((prevState, props) =>
            { horizontalScrollThumbHeight, verticalScrollThumbWidth }
        );
    }

    onScroll(scrollLeft: number, scrollTop: number) {
        this.setState((prevState, props) => {
            return { scrollLeft, scrollTop };
        });
    }
}