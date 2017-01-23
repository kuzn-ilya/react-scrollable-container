import * as React from 'react';

import '../../../styles/container.css';

import {ScrollableContentProps, scrollableContentPropTypes } from './ScrollableContentProps';

export class ScrollableContent extends React.PureComponent<ScrollableContentProps, {}> {

    static defaultProps: ScrollableContentProps = {
        contentHeight: '100%',
        contentWidth: '100%'
    };

    static propTypes = scrollableContentPropTypes;

    render(): JSX.Element {
        let wrapper: React.ReactNode = null;
        if (this.props.contentWidth !== '100%' || this.props.contentHeight !== '100%') {
            wrapper = (
                <div className="scrollable-container-wrapper"
                    style={{
                        left: this.props.contentWidth === '100%' ? 0 : this.props.contentWidth - 1,
                        top: this.props.contentHeight === '100%' ? 0 : this.props.contentHeight - 1
                    }}
                />
            );
        }

        return (
            <div style={{
                    height: this.props.contentHeight,
                    width: this.props.contentWidth
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
