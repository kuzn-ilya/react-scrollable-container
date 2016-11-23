import * as React from 'react';
import { addPrefixToClass } from './../utils/css.utils';

import { ContainerProps } from './container.props';
import { ContainerState } from './container.state';
import { ContainerScrollable } from './container-scrollable';

import './container.less';

export class Container extends React.PureComponent<ContainerProps, ContainerState> {

    private ref: HTMLElement;

    constructor(props: ContainerProps) {
        super(props);
        this.handleScrollPosChanged = this.handleScrollPosChanged.bind(this);
        this.state = {
        }
    }

    render(): JSX.Element {

        return (
            <div
                ref={(ref) => this.ref = ref}
                className={addPrefixToClass('container')}
                style={this.props.style}
            >
                <ContainerScrollable
                    contentHeight={this.props.contentHeight}
                    contentWidth={this.props.contentWidth}
                    overflowX={this.props.overflowX}
                    overflowY={this.props.overflowY}
                    onScrollPosChanged={this.handleScrollPosChanged}
                    scrollLeft={this.props.scrollLeft}
                    scrollTop={this.props.scrollTop}
                >
                    {this.props.children}
                </ContainerScrollable>
            </div>
        );
    }
    handleScrollPosChanged: (left: number, top: number) => void = (scrollLeft, scrollTop) => {
        if (this.props.onScrollPosChanged) {
            this.props.onScrollPosChanged(scrollLeft, scrollTop);
        }
    }
}
