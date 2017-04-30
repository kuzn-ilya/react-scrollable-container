import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { classNames, listenToResize } from '../../../utils';

import { ScrollableContainerProps, scrollableContainerPropTypes } from  './ScrollableContainerProps';
import { ScrollableContainerState } from  './ScrollableContainerState';
import { ScrollableContent } from '../ScrollableContent';
import { TransformableContainer } from '../TransformableContainer';
import { ScrollBar } from '../ScrollBar';

import * as emptyFunction from 'fbjs/lib/emptyFunction';
import * as invariant from 'fbjs/lib/invariant';

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

        let scrollLeft = this.props.scrollLeft || 0;
        let scrollTop = this.props.scrollTop || 0;

        this.state = {
            containerHeight: 0,
            containerWidth: 0,
            contentHeight: 0,
            contentWidth: 0,
            horzScrollThumbHeight: 0,
            scrollLeft,
            scrollTop,
            style: this.calculateStyle(this.props),
            vertScrollThumbWidth: 0
        };
        this.propsScrollLeft = this.props.scrollLeft;
        this.propsScrollTop = this.props.scrollTop;
    }

    private removeResizeEventListener: () => void = emptyFunction;

    componentDidMount(): void {
        this.measureScrollbars();
        this.updateScrollPositions();
        this.removeResizeEventListener = listenToResize(this.ref, this.handleResize);
    }

    componentDidUpdate(): void {
        this.updateScrollPositions();
    }

    componentWillUnmount(): void {
        this.removeResizeEventListener();
    }

    private calculateStyle(props: ScrollableContainerProps): React.CSSProperties {
        return {
            bottom: props.horzScrollBarReplacerHeight
                ? props.horzScrollBarReplacerHeight + 'px' : '0px',
            overflowX: props.customScrollBars ? 'hidden' : props.overflowX,
            overflowY: props.customScrollBars ? 'hidden' : props.overflowY,
            right: props.vertScrollBarReplacerWidth
                ? props.vertScrollBarReplacerWidth + 'px' : '0px'
        };
    }

    componentWillReceiveProps(newProps: ScrollableContainerProps): void {
        if (newProps.scrollLeft !== this.propsScrollLeft
            && newProps.scrollLeft !== this.state.scrollLeft) {
            this.setStateInternal({
                scrollLeft: newProps.scrollLeft || 0
            });
            this.propsScrollLeft = newProps.scrollLeft;
        }
        if (newProps.scrollTop !== this.propsScrollTop
            && newProps.scrollTop !== this.state.scrollTop) {
            this.setStateInternal({
                scrollTop: newProps.scrollTop || 0
            });
            this.propsScrollTop = newProps.scrollTop;
        }

        if (newProps.horzScrollBarReplacerHeight !== this.props.horzScrollBarReplacerHeight
            || newProps.vertScrollBarReplacerWidth !== this.props.vertScrollBarReplacerWidth
            || newProps.customScrollBars !== this.props.customScrollBars
            || newProps.overflowX !== this.props.overflowX
            || newProps.overflowY !== this.props.overflowY) {
            this.setStateInternal({
                style: this.calculateStyle(newProps)
            });
        }
    }

    private ref: HTMLDivElement;
    private scrollableContentDOMRef: HTMLElement;

    private setRef = (ref: HTMLDivElement): void => {
        this.ref = ref;
        this.handleResize();
    }

    private setScrollableContentRef = (ref: ScrollableContent): void => {
        this.scrollableContentDOMRef = ReactDOM.findDOMNode(ref) as HTMLElement;
        if (this.scrollableContentDOMRef) {
            this.handleContentResize(this.scrollableContentDOMRef.offsetWidth, this.scrollableContentDOMRef.offsetHeight);
        } else {
            this.handleContentResize(0, 0);
        }
    }

    public handleResize = (): void => {
        this.setStateInternal({
            containerHeight: this.ref ? this.ref.offsetHeight : 0,
            containerWidth: this.ref ? this.ref.offsetWidth : 0
        });
        this.measureScrollbars();
    }

    private handleContentResize = (newWidth: number, newHeight: number): void => {
        this.setStateInternal({
            contentHeight: newHeight,
            contentWidth: newWidth
        });
        this.measureScrollbars();
    }

    // TODO: Implement class for both shadows.
    render(): JSX.Element {
        // TODO: overflowX & overflowY other values
        let horzScrollBar = this.props.customScrollBars && this.props.overflowX === 'auto' && this.state.horzScrollThumbHeight ? (
            <ScrollBar
                orientation="horizontal"
                min={0}
                max={this.state.contentWidth - this.state.containerWidth + this.state.horzScrollThumbHeight}
                pageSize={this.state.containerWidth - this.state.vertScrollThumbWidth}
                largeChange={this.state.containerWidth - this.state.vertScrollThumbWidth}
                smallChange={10}
                position={this.state.scrollLeft}
                rightOrBottom={this.state.vertScrollThumbWidth}
                showButtons
                onScroll={this.handleHorzScroll}
            />
        ) : null;

        let vertScrollBar = this.props.customScrollBars && this.props.overflowY === 'auto' && this.state.vertScrollThumbWidth ? (
            <ScrollBar
                orientation="vertical"
                min={0}
                max={this.state.contentHeight - this.state.containerHeight + this.state.horzScrollThumbHeight}
                pageSize={this.state.containerHeight - this.state.horzScrollThumbHeight}
                largeChange={this.state.containerHeight - this.state.horzScrollThumbHeight}
                smallChange={10}
                position={this.state.scrollTop}
                rightOrBottom={this.state.horzScrollThumbHeight}
                showButtons
                onScroll={this.handleVertScroll}
            />
        ) : null;

        let scrollableContent = (
            <ScrollableContent contentWidth={this.props.contentWidth} contentHeight={this.props.contentHeight}
                onResize={this.handleContentResize}
                ref={this.setScrollableContentRef}
            >
                {this.props.children}
            </ScrollableContent>
        );

        if (this.props.customScrollBars) {
            scrollableContent = (
                <TransformableContainer contentWidth={this.props.contentWidth} contentHeight={this.props.contentHeight}
                    scrollLeft={this.state.scrollLeft}
                    scrollTop={this.state.scrollTop}
                >
                    {scrollableContent}
                </TransformableContainer>
            );
        }

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
                        'right-shadow': Boolean(this.props.showShadowForReplacer && this.props.vertScrollBarReplacerWidth),
                        'bottom-shadow': Boolean(this.props.showShadowForReplacer && this.props.horzScrollBarReplacerHeight)
                    })}
                    style={this.state.style}
                    ref={this.setRef}
                    onScroll={this.props.customScrollBars ? undefined : this.handleScroll}
                >
                    {scrollableContent}
                    {horzScrollBar}
                    {vertScrollBar}
                </div>
            </div>
        );
    }

    private handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
        let scrollLeft = (event.currentTarget as Element).scrollLeft;
        let scrollTop = (event.currentTarget as Element).scrollTop;
        this.setStateInternal({
            scrollLeft,
            scrollTop
        });
        this.props.onScrollPosChanged!(scrollLeft, scrollTop);
    }

    private handleVertScroll = (newPosition: number): void => {
        this.setStateInternal({
            scrollTop: newPosition
        });
        this.props.onScrollPosChanged!(this.state.scrollLeft, newPosition);
    }

    private handleHorzScroll = (newPosition: number): void => {
        this.setStateInternal({
            scrollLeft: newPosition
        });
        this.props.onScrollPosChanged!(newPosition, this.state.scrollTop);
    }

    private updateScrollPositions(): void {
        if (this.ref) {
            if (this.props.customScrollBars) {
                this.ref.scrollLeft = 0;
                this.ref.scrollTop = 0;
            } else {
                this.ref.scrollLeft = this.state.scrollLeft;
                this.ref.scrollTop = this.state.scrollTop;
            }
        }
    }

    private calculateScrollThumbsMeasurements(): ScrollableContainerState {
        invariant(!!this.ref, 'calculateScrollThumbsMeasurements: this.ref must be defined.');
        if (this.props.customScrollBars) {
            invariant(!!this.scrollableContentDOMRef, 'calculateScrollThumbsMeasurements: this.scrollableContentDOMRef must be defined.');
            return {
                horzScrollThumbHeight: this.props.overflowX !== 'hidden'
                    && this.ref.offsetWidth < this.scrollableContentDOMRef.offsetWidth ? 17 : 0,
                vertScrollThumbWidth: this.props.overflowY !== 'hidden'
                    && this.ref.offsetHeight < this.scrollableContentDOMRef.offsetHeight ? 17 : 0
            }  as ScrollableContainerState;
        } else {
            return {
                horzScrollThumbHeight: this.ref.offsetHeight - this.ref.clientHeight,
                vertScrollThumbWidth: this.ref.offsetWidth - this.ref.clientWidth
            } as ScrollableContainerState;
        }
    }

    private vertScrollThumbWidth: number = 0;
    private horzScrollThumbWidth: number = 0;
    private propsScrollLeft?: number;
    private propsScrollTop?: number;

    setStateInternal(state: Partial<ScrollableContainerState>): void {
        if (state.horzScrollThumbHeight !== undefined) {
            this.horzScrollThumbWidth = state.horzScrollThumbHeight;
        }
        if (state.vertScrollThumbWidth !== undefined) {
            this.vertScrollThumbWidth = state.vertScrollThumbWidth;
        }

        if (this.props.customScrollBars && (state.scrollLeft !== undefined || state.scrollTop !== undefined)) {
            let scrollLeft = state.scrollLeft;
            let scrollTop = state.scrollTop;
            if (scrollLeft === undefined) {
                scrollLeft = this.state.scrollLeft;
            }
            if (scrollTop === undefined) {
                scrollTop = this.state.scrollTop;
            }
        }

        this.setState(state as ScrollableContainerState);
    }

    private measureScrollbars(): void  {
        if (this.ref && this.scrollableContentDOMRef) {
            let newState = this.calculateScrollThumbsMeasurements();
            if (this.vertScrollThumbWidth !== newState.vertScrollThumbWidth) {
                this.props.onVerticalScrollVisibilityChanged!(newState.vertScrollThumbWidth > 0, newState.vertScrollThumbWidth);
            }
            if (this.horzScrollThumbWidth !== newState.horzScrollThumbHeight) {
                this.props.onHorizontalScrollVisibilityChanged!(newState.horzScrollThumbHeight > 0, newState.horzScrollThumbHeight);
            }
            this.setStateInternal(newState);
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
