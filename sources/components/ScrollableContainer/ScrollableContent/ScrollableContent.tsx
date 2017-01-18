import * as React from 'react';

import '../../../styles/container.css';

import {ScrollableContentProps, scrollableContentPropTypes } from './ScrollableContentProps';

export class ScrollableContent extends React.PureComponent<ScrollableContentProps, {}> {

    static defaultProps: ScrollableContentProps = {
        contentHeight: 'auto',
        contentWidth: 'auto'
    };

    static propTypes = scrollableContentPropTypes;

    render(): JSX.Element {
        let wrapper: React.ReactNode = null;
        if (this.props.contentWidth !== 'auto' || this.props.contentHeight !== 'auto') {
            wrapper = (
                <div className="scrollable-container-wrapper"
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
                className="scrollable-content"
            >
                {this.props.dataRenderer ? this.props.dataRenderer(this.props.data) : null}
                {this.props.children}
                {wrapper}
            </div>
        );
    }
}
