import * as React from 'react';
import { classNames, listenToResize, updateCSSPosition } from '../../../utils';

import { ScrollableContainerProps, scrollableContainerPropTypes } from  './ScrollableContainerProps';
import { ScrollableContainerState } from  './ScrollableContainerState';
import { ScrollableContent } from '../ScrollableContent';
import { ScrollBar } from '../ScrollBar';

import * as emptyFunction from 'fbjs/lib/emptyFunction';

import '../../../styles/container.css';
import '../../../styles/common.css';

export class ScrollableContainer extends React.PureComponent<ScrollableContainerProps, ScrollableContainerState> {

    static defaultProps: ScrollableContainerProps = {
        className: '',
        contentHeight: '100%',
        contentWidth: '100%',
        customScrollBars: false,
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

    static propTypes = scrollableContainerPropTypes;

    constructor(props?: ScrollableContainerProps) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
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
            horzScrollThumbHeight: 0,
            scrollLeft: this.props.scrollLeft || 0,
            scrollTop: this.props.scrollTop || 0,
            vertScrollThumbWidth: 0
        };
    }

    private removeResizeEventListener: () => void = emptyFunction;

    componentDidMount(): void {
        if (!this.props.customScrollBars) {
            this.measureScrollbars();
            this.updateScrollPositions();
        }
        this.removeResizeEventListener = listenToResize(this.ref, this.handleResize);
    }

    componentDidUpdate(): void {
        if (!this.props.customScrollBars) {
            this.updateScrollPositions();
        }
    }

    componentWillUnmount(): void {
        this.removeResizeEventListener();
    }

    private ref: HTMLDivElement;

    handleResize: () => void = this.doResize;

    private setRef: (ref: HTMLDivElement) => void = (ref) => {
        this.ref = ref;
        this.doResize();
    }

    private doResize(): void {
        if (!this.props.customScrollBars) {
            this.measureScrollbars();
        }
        this.setState({
            containerHeight: this.ref ? this.ref.offsetHeight : 0,
            containerWidth: this.ref ? this.ref.offsetWidth : 0
        } as ScrollableContainerState);
    }

    private handleContentResize: (newWidth: number, newHeight: number) => void = (newWidth, newHeight) => {
        this.setState({
            contentHeight: newHeight,
            contentWidth: newWidth
        } as ScrollableContainerState);
    }

    // TODO: Implement class for both shadows.
    private renderNativeScrollBars(): JSX.Element {
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
                        'scrollable-container-scrollable-boost': this.props.overflowX !== 'hidden' || this.props.overflowY !== 'hidden',
                        'right-shadow': Boolean(this.props.showShadowForReplacer && this.props.vertScrollBarReplacerWidth),
                        'bottom-shadow': Boolean(this.props.showShadowForReplacer && this.props.horzScrollBarReplacerHeight)
                    })}
                    ref={(ref: HTMLDivElement) => this.ref = ref}
                    onScroll={this.handleScroll}
                    style={{
                        bottom: this.props.horzScrollBarReplacerHeight ? this.props.horzScrollBarReplacerHeight + 'px' : '0px',
                        overflowX: this.props.overflowX,
                        overflowY: this.props.overflowY,
                        right: this.props.vertScrollBarReplacerWidth ? this.props.vertScrollBarReplacerWidth + 'px' : '0px'
                    }}
                >
                    <ScrollableContent contentWidth={this.props.contentWidth} contentHeight={this.props.contentHeight}
                        dataRenderer={this.props.dataRenderer}
                        data={this.props.data}
                    >
                        {this.props.children}
                    </ScrollableContent>
                </div>
            </div>
        );
    }

    // TODO: Implement class for both shadows.
    private renderCustomScrollBars(): JSX.Element {
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

        let style = {
            bottom: this.props.horzScrollBarReplacerHeight ? this.props.horzScrollBarReplacerHeight + 'px' : '0px',
            overflowX: 'hidden',
            overflowY: 'hidden',
            right: this.props.vertScrollBarReplacerWidth ? this.props.vertScrollBarReplacerWidth + 'px' : '0px'
        };

        let wrapperStyle = {
            height: this.props.contentHeight,
            width: this.props.contentWidth
        };

        updateCSSPosition(wrapperStyle, -(this.state.scrollLeft || this.props.scrollLeft!),
            -(this.state.scrollTop || this.props.scrollTop!));

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
                    style={style}
                    ref={this.setRef}
                >
                    <div className="scrollable-content" style={wrapperStyle}>
                        <ScrollableContent contentWidth={this.props.contentWidth} contentHeight={this.props.contentHeight}
                            dataRenderer={this.props.dataRenderer}
                            data={this.props.data}
                            onResize={this.handleContentResize}
                        >
                            {this.props.children}
                        </ScrollableContent>
                    </div>
                    {horzScrollBar}
                    {vertScrollBar}
                </div>
            </div>
        );
    }

    render(): JSX.Element {
        if (this.props.customScrollBars) {
            return this.renderCustomScrollBars();
        } else {
            return this.renderNativeScrollBars();
        }
    }

    private handleScroll: (event: React.UIEvent<HTMLDivElement>) => void = (event) => {
        let scrollLeft = (event.currentTarget as Element).scrollLeft;
        let scrollTop = (event.currentTarget as Element).scrollTop;
        this.props.onScrollPosChanged!(scrollLeft, scrollTop);
    }

    private handleVertScroll: (newPosition: number) => void = (newPosition) => {
        let scrollLeft = this.state.scrollLeft || this.props.scrollLeft!;
        this.setState({
            scrollTop: newPosition
        } as ScrollableContainerState);
        this.props.onScrollPosChanged!(scrollLeft, newPosition);
    }

    private handleHorzScroll: (newPosition: number) => void = (newPosition) => {
        let scrollTop = this.state.scrollTop || this.props.scrollTop!;
        this.setState({
            scrollLeft: newPosition
        } as ScrollableContainerState);
        this.props.onScrollPosChanged!(newPosition, scrollTop);
    }

    private updateScrollPositions(): void {
        if (this.ref) {
            if (this.props.scrollLeft !== undefined) {
                this.ref.scrollLeft = this.props.scrollLeft;
            }
            if (this.props.scrollTop !== undefined) {
                this.ref.scrollTop = this.props.scrollTop;
            }
        }
    }

    private measureScrollbars: () => void = () => {
        if (this.ref) {
            let newState = {
                horzScrollThumbHeight: this.ref.offsetHeight - this.ref.clientHeight,
                vertScrollThumbWidth: this.ref.offsetWidth - this.ref.clientWidth
            };
            let oldState = this.state;

            if (newState.vertScrollThumbWidth !== oldState.vertScrollThumbWidth ||
                newState.horzScrollThumbHeight !== oldState.horzScrollThumbHeight) {
                this.setState(newState as ScrollableContainerState);

                if (newState.vertScrollThumbWidth !== oldState.vertScrollThumbWidth) {
                    this.props.onVerticalScrollVisibilityChanged!(newState.vertScrollThumbWidth > 0, newState.vertScrollThumbWidth);
                }

                if (newState.horzScrollThumbHeight !== oldState.horzScrollThumbHeight) {
                    this.props.onHorizontalScrollVisibilityChanged!(newState.horzScrollThumbHeight > 0, newState.horzScrollThumbHeight);
                }
            }
        }
    }

    setScrollLeft(position: number): void {
        if (this.ref) {
            this.ref.scrollLeft = position;
        }
    }

    setScrollTop(position: number): void {
        if (this.ref) {
            this.ref.scrollTop = position;
        }
    }
}
