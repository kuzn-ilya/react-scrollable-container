import * as React from 'react';
import { addPrefixToClass } from './../utils/css.utils';

import { ContainerProps } from './container.props';
import { ContainerState } from './container.state';
import { ContainerScrollable } from './container-scrollable';

import './container.less';

export class Container extends React.Component<ContainerProps, ContainerState> {

    private ref: HTMLElement;

    render(): JSX.Element {
        return (
            <div
                ref={(ref) => this.ref = ref}
                className={addPrefixToClass('container')}
                style={this.props.style}>
                <ContainerScrollable
                    contentHeight={this.props.contentHeight}
                    contentWidth={this.props.contentWidth}
                    overflowX={this.props.overflowX}
                    overflowY={this.props.overflowY}
                    onScrollPosChanged={this.props.onScrollPosChanged}
                >
                    {this.props.children}
                </ContainerScrollable>
            </div>
        );
    }
}
