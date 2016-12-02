import * as React from 'react';
import { addPrefixToClass } from './../utils/css.utils';

import './container.less';

import {ScrollableContainerContentState} from './ScrollableContainerContentState';
import {ScrollableContainerContentProps} from './ScrollableContainerContentProps';

export class ScrollableContainerContent extends React.PureComponent<ScrollableContainerContentProps, ScrollableContainerContentState> {

    static defaultProps: ScrollableContainerContentProps = {
        contentHeight: 'auto',
        contentWidth: 'auto'
    };


    constructor(props: ScrollableContainerContentProps) {
        super(props);
        this.state = {
            contentHeight: this.props.contentHeight!,
            contentWidth: this.props.contentWidth!
        };
    }

    render(): JSX.Element {
        let wrapper: React.ReactNode = null;
        if (this.state.contentWidth !== 'auto' || this.state.contentHeight !== 'auto') {
            wrapper = (
                <div className={addPrefixToClass('container-wrapper')}
                    style={{
                        left: this.state.contentWidth === 'auto' ? 0 : this.state.contentWidth - 1,
                        top: this.state.contentHeight === 'auto' ? 0 : this.state.contentHeight - 1
                    }}
                />
            );
        }

        return (
            <div style={{
                    height: this.state.contentHeight === 'auto' ? '100%' : this.state.contentHeight,
                    width: this.state.contentWidth === 'auto' ? '100%' : this.state.contentWidth
                }}
            >
                {this.props.dataRenderer ? this.props.dataRenderer(this.props.data) : null}
                {this.props.children}
                {wrapper}
            </div>
        );
    }
}
