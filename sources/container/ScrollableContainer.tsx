import * as React from 'react';
import { addPrefixToClass } from './../utils/css.utils';

import { ScrollableContainerProps } from  './ScrollableContainerProps';
import { ScrollableContainerState } from  './ScrollableContainerState';
import { ScrollableContainerContent } from './ScrollableContainerContent';

import './container.less';

export class ScrollableContainer extends React.PureComponent<ScrollableContainerProps, ScrollableContainerState> {

    static defaultProps: ScrollableContainerProps = {
        contentHeight: 'auto',
        contentWidth: 'auto',
        height: '100%',
        overflowX: 'auto',
        overflowY: 'auto',
        scrollLeft: 0,
        scrollTop: 0,
        width: '100%'
    };

    constructor(props: ScrollableContainerProps) {
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

        this.ref.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentDidUpdate(): void {
        this.updateScrollPositions();
}

    componentWillUnmount(): void {
        this.ref.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleWindowResize);
    }

    private ref: HTMLDivElement;

    render(): JSX.Element {
        return (
            <div
                className={addPrefixToClass('container')}
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
                id={this.props.id}
            >
                <div className={addPrefixToClass('container-scrollable')}
                    ref={(ref: HTMLDivElement) => this.ref = ref}
                    style={{
                        overflowX: this.props.overflowX,
                        overflowY: this.props.overflowY
                    }}
                >
                    <ScrollableContainerContent contentWidth={this.props.contentWidth} contentHeight={this.props.contentHeight}
                        dataRenderer={this.props.dataRenderer}
                        data={this.props.data}
                    >
                        {this.props.children}
                    </ScrollableContainerContent>
                </div>
            </div>
        );
    }

    private handleWindowResize: () => void =
        () => this.measureScrollbars();

    private handleScroll: (event: UIEvent) => void = (event) => {
        let scrollLeft = (event.target as Element).scrollLeft;
        let scrollTop = (event.target as Element).scrollTop;
        if (this.props.onScrollPosChanged) {
            this.props.onScrollPosChanged(scrollLeft, scrollTop);
        }
    }

    private updateScrollPositions(): void {
        if (this.ref) {
            this.ref.scrollLeft = this.props.scrollLeft!;
            this.ref.scrollTop = this.props.scrollTop!;
        }
    }

    public measureScrollbars: () => void = () => {
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
}
