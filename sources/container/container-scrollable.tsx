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
            width: 0,
            scrollLeft: this.props.scrollLeft ? this.props.scrollLeft : 0,
            scrollTop: this.props.scrollTop ? this.props.scrollTop : 0
        }
    }

    componentWillReceiveProps(nextProps: ContainerScrollableProps): void {
        let changed = false;
        if (nextProps.scrollLeft !== this.props.scrollLeft && this.ref) {
            this.ref.scrollLeft = nextProps.scrollLeft;
            changed = true;
        }
        if (nextProps.scrollTop !== this.props.scrollTop && this.ref) {
            this.ref.scrollTop = nextProps.scrollTop;
            changed = true;
        }

        if (changed && this.props.onScrollPosChanged) {
            this.props.onScrollPosChanged(nextProps.scrollLeft, nextProps.scrollTop);
        }
    }

    componentDidMount(): void {
        this.measureScrollbars();
        this.ref.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount(): void {
        this.ref.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleWindowResize);
    }

    private ref: HTMLElement;

    render(): JSX.Element {
        let wrapper: React.ReactNode = null;

        let divProps = omit(this.props, 'contentHeight', 'contentWidth', 'overflowX', 'overflowY', 'onScrollPosChanged');

        if (this.state.contentWidth !== 'auto' || this.state.contentHeight !== 'auto') {
            wrapper = (
                <div style={{
                        width: this.state.contentWidth === 'auto' ? "100%" : this.state.contentWidth,
                        height: this.state.contentHeight === 'auto' ? "100%" : this.state.contentHeight
                    }}
               >
                    {this.props.children}
                    <div className={addPrefixToClass('container-wrapper')}
                        style={{
                            left: this.state.contentWidth === 'auto' ? 0 : this.state.contentWidth,
                            top: this.state.contentHeight === 'auto' ? 0 : this.state.contentHeight
                        }}
                    />
                </div>
            );
        } else {
            wrapper = this.props.children;
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
                {wrapper}
            </div>
        );
    }

    private handleWindowResize: () => void =
        () => this.measureScrollbars();

    private handleScroll: (event: UIEvent) => void = (event) => {
        this.setState(assign(this.state, {
            scrollLeft: event.srcElement.scrollLeft,
            scrollTop: event.srcElement.scrollTop
        }));
    }

    private measureScrollbars: () => void =
        () => this.setState(assign(this.state, {
            height: this.ref ? this.ref.offsetHeight : 0,
            width: this.ref ? this.ref.offsetWidth : 0
        }));
}
