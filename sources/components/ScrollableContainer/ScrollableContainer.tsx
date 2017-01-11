import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { WindowEvents } from '../../utils/WindowEvents';

import { ScrollableContainerProps, scrollableContainerPropTypes } from  './ScrollableContainerProps';
import { ScrollableContainerState } from  './ScrollableContainerState';
import { ScrollableContent } from '../ScrollableContent';

import '../../styles/container.css';

export class ScrollableContainer extends React.PureComponent<ScrollableContainerProps, ScrollableContainerState> {

    static defaultProps: ScrollableContainerProps = {
        className: '',
        contentHeight: 'auto',
        contentWidth: 'auto',
        height: '100%',
        horzScrollBarReplacerHeight: 0,
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
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            horzScrollThumbHeight: 0,
            vertScrollThumbWidth: 0
        };
    }

    componentDidMount(): void {
        this.measureScrollbars();
        this.updateScrollPositions();

        WindowEvents.addResizeEventListener(this.handleWindowResize);
    }

    componentDidUpdate(): void {
        this.updateScrollPositions();
    }

    componentWillUnmount(): void {
        WindowEvents.removeResizeEventListener(this.handleWindowResize);
    }

    private ref: HTMLDivElement;

    render(): JSX.Element {
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
                        'scrollable-container-scrollable-boost': this.props.overflowX !== 'hidden' || this.props.overflowY !== 'hidden'
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

    handleWindowResize: () => void =
        () => this.measureScrollbars();

    private scrollLeft: number = 0;
    private scrollTop: number = 0;

    private handleScroll: (event: React.UIEvent<HTMLDivElement>) => void = (event) => {
        let scrollLeft = (event.target as Element).scrollLeft;
        let scrollTop = (event.target as Element).scrollTop;
        if (scrollLeft !== this.scrollLeft || scrollTop !== this.scrollTop) {
            this.scrollTop = scrollTop;
            this.scrollLeft = scrollLeft;
            if (this.props.onScrollPosChanged) {
                this.props.onScrollPosChanged(scrollLeft, scrollTop);
            }
        }
    }

    private updateScrollPositions(): void {
        if (this.ref) {
            if (typeof this.props.scrollLeft !== 'undefined' && this.scrollLeft !== this.props.scrollLeft) {
                this.ref.scrollLeft = this.props.scrollLeft;
                this.scrollLeft = this.props.scrollLeft;
            }
            if (typeof this.props.scrollTop !== 'undefined' && this.scrollTop !== this.props.scrollTop) {
                this.ref.scrollTop = this.props.scrollTop;
                this.scrollTop = this.props.scrollTop;
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
                this.setState(newState);

                if (this.props.onVerticalScrollVisibilityChanged &&
                    newState.vertScrollThumbWidth !== oldState.vertScrollThumbWidth) {
                    this.props.onVerticalScrollVisibilityChanged(newState.vertScrollThumbWidth > 0, newState.vertScrollThumbWidth);
                }

                if (this.props.onHorizontalScrollVisibilityChanged &&
                    newState.horzScrollThumbHeight !== oldState.horzScrollThumbHeight) {
                    this.props.onHorizontalScrollVisibilityChanged(newState.horzScrollThumbHeight > 0, newState.horzScrollThumbHeight);
                }
            }
        }
    }

    setScrollLeft(position: number): void {
        if (this.ref) {
            this.ref.scrollLeft = position;
        }
    }
}
