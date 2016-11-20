import * as React from 'react';
import { addPrefixToClass } from './../utils/css.utils';
import { omit } from './../utils/object.utils';

import { ContainerProps } from './container.props';
import { ContainerState } from './container.state';
import { ContainerScrollable } from './container-scrollable';

import './container.less';

export class Container extends React.Component<ContainerProps, ContainerState> {

    private ref: HTMLElement;

    constructor(props: ContainerProps) {
        super(props);
        this.handleScrollPosChanged = this.handleScrollPosChanged.bind(this);
        this.state = {
            scrollLeft: props.scrollLeft ? props.scrollLeft : 0,
            scrollTop: props.scrollTop ? props.scrollTop : 0
        }
    }

    componentWillReceiveProps(nextProps: ContainerProps) {
        if ((nextProps.scrollLeft && this.state.scrollLeft !== nextProps.scrollLeft)
            || (nextProps.scrollTop && this.state.scrollTop !== nextProps.scrollTop)) {
            this.setState({
                scrollLeft: nextProps.scrollLeft ? nextProps.scrollLeft : 0,
                scrollTop: nextProps.scrollTop ? nextProps.scrollTop : 0
            });
        }
    }

    render(): JSX.Element {
        let divProps = omit(this.props, 'contentHeight', 'contentWidth', 'overflowX', 'overflowY', 
            'onScrollPosChanged', 'scrollLeft', 'scrollTop');

        return (
            <div
                ref={(ref) => this.ref = ref}
                className={addPrefixToClass('container')}
                style={this.props.style}
                {...divProps}
            >
                <ContainerScrollable
                    contentHeight={this.props.contentHeight}
                    contentWidth={this.props.contentWidth}
                    overflowX={this.props.overflowX}
                    overflowY={this.props.overflowY}
                    onScrollPosChanged={this.handleScrollPosChanged}
                    scrollLeft={this.state.scrollLeft}
                    scrollTop={this.state.scrollTop}
                >
                    {this.props.children}
                </ContainerScrollable>
            </div>
        );
    }
    handleScrollPosChanged: (left: number, top: number) => void = (scrollLeft, scrollTop) => {
        if (this.state.scrollLeft !== scrollLeft || this.state.scrollTop !== scrollTop) {
            this.setState({
                scrollLeft,
                scrollTop
            });
            if (this.props.onScrollPosChanged) {
                this.props.onScrollPosChanged(scrollLeft, scrollTop);
            }
        }
    }
}
