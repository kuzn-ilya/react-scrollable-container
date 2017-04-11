import * as React from 'react';
import * as objectAssign from 'object-assign';

import { ScrollableContentProps, scrollableContentPropTypes } from './ScrollableContentProps';
import { ScrollableContentState } from './ScrollableContentState';
import { listenToResize, classNames } from '../../../utils';
import * as emptyFunction from 'fbjs/lib/emptyFunction';

import '../../../styles/common.css';
import '../../../styles/container.css';

export class ScrollableContent extends React.PureComponent<ScrollableContentProps, ScrollableContentState> {

    static defaultProps: ScrollableContentProps = {
        contentHeight: '100%',
        contentWidth: '100%',
        dataRenderer: emptyFunction.thatReturns<React.ReactNode>(null),
        onResize: emptyFunction,
        style: {
        }
    };

    static propTypes = scrollableContentPropTypes;
    constructor(props?: ScrollableContentProps) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
        this.setRef = this.setRef.bind(this);
        this.state = {
            style: this.calculateStyle(this.props)
        };
    }

    private removeResizeEventListener: () => void = emptyFunction;
    private ref: HTMLDivElement;

    private handleResize: () => void = () => {
        if (this.ref) {
            this.props.onResize!(this.ref.offsetWidth, this.ref.offsetHeight);
        }
    }

    private setRef: (ref: HTMLDivElement) => void = (ref) => {
        this.ref = ref;
        this.handleResize();
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

        return (
            <div style={this.state.style}
                className={classNames('scrollable-content', 'transform-boost')}
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

    private calculateStyle(props: ScrollableContentProps): React.CSSProperties {
        return objectAssign({}, props.style, {
            height: props.contentHeight,
            width: props.contentWidth
        });
    }

    componentWillReceiveProps(newProps: ScrollableContentProps): void {
        if (newProps.style !== this.props.style
            || newProps.contentHeight !== this.props.contentHeight
            || newProps.contentWidth !== this.props.contentWidth) {
            this.setState({
                style: this.calculateStyle(newProps)
            });
        }
    }
}
