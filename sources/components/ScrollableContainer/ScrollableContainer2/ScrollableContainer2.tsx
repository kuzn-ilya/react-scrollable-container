import * as React from 'react';
import { classNames, listenToResize } from '../../../utils';

import { ScrollableContainer2Props, scrollableContainer2PropTypes } from  './ScrollableContainer2Props';
import { ScrollableContainer2State } from  './ScrollableContainer2State';
import { ScrollableContent2 } from '../ScrollableContent2';
import { ScrollBar } from '../ScrollBar';

import * as emptyFunction from 'fbjs/lib/emptyFunction';

import '../../../styles/container.css';
import '../../../styles/common.css';

export class ScrollableContainer2 extends React.PureComponent<ScrollableContainer2Props, ScrollableContainer2State> {

    static defaultProps: ScrollableContainer2Props = {
        className: '',
        contentHeight: '100%',
        contentWidth: '100%',
        height: '100%',
        horzScrollBarReplacerHeight: 0,
        onHorizontalScrollVisibilityChanged: emptyFunction,
        onScrollPosChanged: emptyFunction,
        onVerticalScrollVisibilityChanged: emptyFunction,
        overflowX: 'auto',
        overflowY: 'auto',
        scrollLeft: 0,
        scrollTop: 0,
        style: {},
        vertScrollBarReplacerWidth: 0,
        width: '100%'
    };

    static propTypes = scrollableContainer2PropTypes;

    constructor(props?: ScrollableContainer2Props) {
        super(props);
        this.handleVertScroll = this.handleVertScroll.bind(this);
        this.handleHorzScroll = this.handleHorzScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleContentResize = this.handleContentResize.bind(this);
        this.setRef = this.setRef.bind(this);
        this.state = {
            containerHeight: 0,
            containerWidth: 0,
            contentHeight: 0,
            contentWidth: 0,
            scrollLeft: this.props.scrollLeft || 0,
            scrollTop: this.props.scrollTop || 0
        };
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
        this.setState({
            containerHeight: this.ref ? this.ref.offsetHeight : 0,
            containerWidth: this.ref ? this.ref.offsetWidth : 0
        } as ScrollableContainer2State);
    }

    private handleContentResize: (newWidth: number, newHeight: number) => void = (newWidth, newHeight) => {
        this.setState({
            contentHeight: newHeight,
            contentWidth: newWidth
        } as ScrollableContainer2State);
    }

    componentDidMount(): void {
        this.removeResizeEventListener = listenToResize(this.ref, this.handleResize);
    }

    componentWillUnmount(): void {
        this.removeResizeEventListener();
    }

    // TODO: Implement class for both shadows.
    render(): JSX.Element {
        let horzScrollBar = this.props.overflowX !== 'hidden' ? (
            <ScrollBar
                orientation="horizontal"
                min={0}
                max={this.state.contentWidth - this.state.containerWidth}
                pageSize={10}
                largeChange={50}
                smallChange={10}
                position={this.props.scrollLeft || this.props.scrollLeft!}
                rightOrBottom={17}
                showButtons
                onScroll={this.handleHorzScroll}
            />
        ) : null;

        let vertScrollBar = this.props.overflowY !== 'hidden' ? (
            <ScrollBar
                orientation="vertical"
                min={0}
                max={this.state.contentHeight - this.state.containerHeight}
                pageSize={10}
                largeChange={50}
                smallChange={10}
                position={this.state.scrollTop || this.props.scrollTop!}
                rightOrBottom={17}
                showButtons
                onScroll={this.handleVertScroll}
            />
        ) : null;

        return (
            <div
                className={classNames('scrollable-container', this.props.className!)}
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
                id={this.props.id}
            >
                <div className={classNames({
                        'scrollable-container-scrollable': true,
                        // 'scrollable-container-scrollable-boost': this.props.overflowX !== 'hidden' || this.props.overflowY !== 'hidden',
                        'right-shadow': Boolean(this.props.showShadowForReplacer && this.props.vertScrollBarReplacerWidth),
                        'bottom-shadow': Boolean(this.props.showShadowForReplacer && this.props.horzScrollBarReplacerHeight)
                    })}
                    style={{
                        bottom: this.props.horzScrollBarReplacerHeight ? this.props.horzScrollBarReplacerHeight + 'px' : '0px',
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                        right: this.props.vertScrollBarReplacerWidth ? this.props.vertScrollBarReplacerWidth + 'px' : '0px'
                    }}
                    ref={this.setRef}
                >
                    <ScrollableContent2 contentWidth={this.props.contentWidth} contentHeight={this.props.contentHeight}
                        dataRenderer={this.props.dataRenderer}
                        data={this.props.data}
                        onResize={this.handleContentResize}
                        scrollLeft={this.state.scrollLeft || this.props.scrollLeft!}
                        scrollTop={this.state.scrollTop || this.props.scrollTop!}
                    >
                        {this.props.children}
                    </ScrollableContent2>
                    {horzScrollBar}
                    {vertScrollBar}
                </div>
            </div>
        );
    }

    private handleVertScroll: (newPosition: number) => void = (newPosition) => {
        let scrollLeft = this.state.scrollLeft || this.props.scrollLeft!;
        this.setState({
            scrollTop: newPosition
        } as ScrollableContainer2State);
        this.props.onScrollPosChanged!(scrollLeft, newPosition);
    }

    private handleHorzScroll: (newPosition: number) => void = (newPosition) => {
        let scrollTop = this.state.scrollTop || this.props.scrollTop!;
        this.setState({
            scrollLeft: newPosition
        } as ScrollableContainer2State);
        this.props.onScrollPosChanged!(newPosition, scrollTop);
    }
}
