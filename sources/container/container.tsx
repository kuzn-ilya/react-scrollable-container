import * as React from 'react';
import { addPrefixToClass } from './../utils/css.utils';

import { ContainerProps } from './container.props';
import { ContainerScrollable } from './container-scrollable';

require('./container.less');

export class Container extends React.Component<ContainerProps, void> {

    private ref: HTMLElement;

    render(): JSX.Element {
        return (
            <div
                ref={(ref) => this.ref = ref}
                className={addPrefixToClass('container')}
                style={this.props.style}>
                <ContainerScrollable overflowX={this.props.overflowX} overflowY={this.props.overflowY}>
                    {this.props.children}
                </ContainerScrollable>
            </div>
        );
    }
}
