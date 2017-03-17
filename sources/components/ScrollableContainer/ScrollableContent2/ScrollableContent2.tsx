import * as React from 'react';

import {ScrollableContent2Props, scrollableContent2PropTypes } from './ScrollableContent2Props';
import { listenToResize } from '../../../utils';
import * as emptyFunction from 'fbjs/lib/emptyFunction';

import '../../../styles/container.css';

export class ScrollableContent2 extends React.PureComponent<ScrollableContent2Props, {}> {

    static defaultProps: ScrollableContent2Props = {
        contentHeight: '100%',
        contentWidth: '100%',
        dataRenderer: emptyFunction.thatReturns<React.ReactNode>(null),
        onResize: emptyFunction
    };

    static propTypes = scrollableContent2PropTypes;

    constructor(props?: ScrollableContent2Props) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
        this.setRef = this.setRef.bind(this);
    }

    private removeResizeEventListener: () => void = emptyFunction;
    private ref: HTMLDivElement;

    private handleResize: () => void = () => {
        this.doResize();
    }

    private setRef: (ref: HTMLDivElement) => void = (ref) => {
        this.ref = ref;
        this.doResize();
    }

    private doResize(): void {
        if (this.ref) {
            this.props.onResize!(this.ref.offsetWidth, this.ref.offsetHeight);
        }
    }

    render(): JSX.Element {
        let wrapper: React.ReactNode = null;
        if (this.props.contentWidth !== '100%' || this.props.contentHeight !== '100%') {
            wrapper = (
                <div className="scrollable-container-wrapper"
                    style={{
                        left: this.props.contentWidth === '100%' ? 0 : (this.props.contentWidth || 0) - 1,
                        top: this.props.contentHeight === '100%' ? 0 : (this.props.contentHeight || 0) - 1
                    }}
                />
            );
        }

        let style = {
            height: this.props.contentHeight,
            width: this.props.contentWidth
        };

        return (
            <div style={style}
                className="scrollable-content"
                ref={this.setRef}
            >
                {this.props.dataRenderer!(this.props.data)}
                {this.props.children}
                {wrapper}
            </div>
        );
    }

    componentDidMount(): void {
        this.removeResizeEventListener = listenToResize(this.ref, this.handleResize);
    }

    componentWillUnmount(): void {
        this.removeResizeEventListener();
    }

}
