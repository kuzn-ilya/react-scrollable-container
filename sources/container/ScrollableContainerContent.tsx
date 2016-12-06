import * as React from 'react';
import { addCssClassPrefix } from './../utils/addCssClassPrefix';

import './container.css';

import {ScrollableContainerContentState} from './ScrollableContainerContentState';
import {ScrollableContainerContentProps} from './ScrollableContainerContentProps';

export class ScrollableContainerContent extends React.PureComponent<ScrollableContainerContentProps, ScrollableContainerContentState> {

    static defaultProps: ScrollableContainerContentProps = {
        contentHeight: 'auto',
        contentWidth: 'auto'
    };

    render(): JSX.Element {
        let wrapper: React.ReactNode = null;
        if (this.props.contentWidth !== 'auto' || this.props.contentHeight !== 'auto') {
            wrapper = (
                <div className={addCssClassPrefix('container-wrapper')}
                    style={{
                        left: this.props.contentWidth === 'auto' ? 0 : this.props.contentWidth - 1,
                        top: this.props.contentHeight === 'auto' ? 0 : this.props.contentHeight - 1
                    }}
                />
            );
        }

        return (
            <div style={{
                    height: this.props.contentHeight === 'auto' ? '100%' : this.props.contentHeight,
                    width: this.props.contentWidth === 'auto' ? '100%' : this.props.contentWidth
                }}
                className={addCssClassPrefix('content')}
            >
                {this.props.dataRenderer ? this.props.dataRenderer(this.props.data) : null}
                {this.props.children}
                {wrapper}
            </div>
        );
    }
}
