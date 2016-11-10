import * as React from 'react';
import { addPrefixToClass } from './../utils/css.utils';

import { ContainerProps } from './container.props';
import { ContainerState } from './container.state';
import { ContainerContext } from './container.context';
import { ContainerScrollable } from './container-scrollable';

import './container.less';

export class Container extends React.Component<ContainerProps, ContainerState> implements React.ChildContextProvider<ContainerContext> {

    static childContextTypes: React.ValidationMap<any> = {
        height: React.PropTypes.number,
        width: React.PropTypes.number
    };

    constructor(props: ContainerProps) {
        super(props);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.state = {
            height: 0,
            width: 0
        };
    }

    private ref: HTMLElement;

    getChildContext(): ContainerContext {
        return {
            height: this.state.height,
            width: this.state.width
        };
    }

    componentDidMount(): void {
        this.measureScrollbars();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    render(): JSX.Element {
        return (
            <div
                ref={(ref) => this.ref = ref}
                className={addPrefixToClass('container')}
                style={this.props.style}>
                <ContainerScrollable>
                    {this.props.children}
                </ContainerScrollable>
            </div>
        );
    }

    private handleWindowResize: () => void =
        () => this.measureScrollbars();

    private measureScrollbars: () => void =
        () => this.setState({
                height: this.ref ? this.ref.offsetHeight : 0,
                width: this.ref ? this.ref.offsetWidth : 0
        });
}
