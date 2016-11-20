import * as React from 'react';
import * as assign from 'object-assign';
import { addPrefixToClass } from './../utils/css.utils';
import { omit } from './../utils/object.utils';

import { ContainerScrollableProps } from  './container-scrollable.props';
import { ContainerScrollableState } from  './container-scrollable.state';

import './container.less';

export class ContainerScrollable extends React.Component<ContainerScrollableProps, ContainerScrollableState> {

    constructor(props: ContainerScrollableProps) {
        super(props);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            contentHeight: this.props.contentHeight ? this.props.contentHeight : 'auto',
            contentWidth: this.props.contentWidth ? this.props.contentWidth : 'auto',
            height: 0,
            scrollLeft: props.scrollLeft ? props.scrollLeft : 0,
            scrollTop: props.scrollTop ? props.scrollTop : 0,
            width: 0
        }
    }

    componentWillReceiveProps(nextProps: ContainerScrollableProps) {
        if ((nextProps.scrollLeft && this.state.scrollLeft !== nextProps.scrollLeft)
            || (nextProps.scrollTop && this.state.scrollTop !== nextProps.scrollTop)) {
            this.setState(assign(this.state, {
                scrollLeft: nextProps.scrollLeft ? nextProps.scrollLeft : 0,
                scrollTop: nextProps.scrollTop ? nextProps.scrollTop : 0
            }));
        }
    }

    componentDidMount(): void {
        this.measureScrollbars();

        this.ref.scrollLeft = this.state.scrollLeft;
        this.ref.scrollTop = this.state.scrollTop;

        this.ref.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentDidUpdate(): void {
        this.ref.scrollLeft = this.state.scrollLeft;
        this.ref.scrollTop = this.state.scrollTop;
    }

    componentWillUnmount(): void {
        this.ref.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleWindowResize);
    }

    private ref: HTMLElement;

    render(): JSX.Element {
        let content: React.ReactNode = null;

        let divProps = omit(this.props, 'contentHeight', 'contentWidth', 'overflowX', 'overflowY', 
            'onScrollPosChanged', 'scrollLeft', 'scrollTop');

        if (this.state.contentWidth !== 'auto' || this.state.contentHeight !== 'auto') {
            content = (
                <div style={{
                        height: this.state.contentHeight === 'auto' ? "100%" : this.state.contentHeight,
                        width: this.state.contentWidth === 'auto' ? "100%" : this.state.contentWidth
                    }}
               >
                    {this.props.children}
                    <div className={addPrefixToClass('container-wrapper')}
                        style={{
                            left: this.state.contentWidth === 'auto' ? 0 : this.state.contentWidth - 1,
                            top: this.state.contentHeight === 'auto' ? 0 : this.state.contentHeight - 1
                        }}
                    />
                </div>
            );
        } else {
            content = this.props.children;
        }

        return (
            <div className={addPrefixToClass('container-scrollable')}
                ref={(ref) => this.ref = ref}
                style={{
                    overflowX: this.props.overflowX,
                    overflowY: this.props.overflowY
                }}
                {...divProps}
            >
                {content}
            </div>
        );
    }

    private handleWindowResize: () => void =
        () => this.measureScrollbars();

    private handleScroll: (event: UIEvent) => void = (event) => {
        let scrollLeft = (event.target as Element).scrollLeft;
        let scrollTop = (event.target as Element).scrollTop;
        if (this.state.scrollLeft !== scrollLeft || this.state.scrollTop !== scrollTop) {
            this.setState(assign(this.state, {
                scrollLeft,
                scrollTop
            }));
            if (this.props.onScrollPosChanged) {
                this.props.onScrollPosChanged(scrollLeft, scrollTop);
            }
        }
    }

    private measureScrollbars: () => void =
        () => this.setState(assign(this.state, {
            height: this.ref ? this.ref.offsetHeight : 0,
            width: this.ref ? this.ref.offsetWidth : 0
        }));
}
