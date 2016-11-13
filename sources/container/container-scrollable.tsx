import * as React from 'react';
import * as assign from 'object-assign';
import { addPrefixToClass } from './../utils/css.utils';

import { ContainerScrollableProps } from  './container-scrollable.props';
import { ContainerScrollableState } from  './container-scrollable.state';

require('./container.less');

export class ContainerScrollable extends React.Component<ContainerScrollableProps, ContainerScrollableState> {

    constructor(props: ContainerScrollableProps) {
        super(props);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.state = {
            contentHeight: this.props.contentHeight ? this.props.contentHeight : 'auto',
            contentWidth: this.props.contentWidth ? this.props.contentWidth : 'auto',
            height: 0,
            width: 0
        }
    }

    componentDidMount(): void {
        this.measureScrollbars();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    private ref: HTMLElement;

    render(): JSX.Element {
        let wrapper: JSX.Element = null;

        if (this.state.contentWidth !== 'auto' || this.state.contentHeight !== 'auto') {
            wrapper = (
                <div className={addPrefixToClass('container-wrapper')}
                    style={{
                        left: this.state.contentWidth === 'auto' ? 0 : this.state.contentWidth,
                        top: this.state.contentHeight === 'auto' ? 0 : this.state.contentHeight
                    }}
                />
            );
        }

        return (
            <div className={addPrefixToClass('container-scrollable')}
                ref={(ref) => this.ref = ref}
                style={{
                    overflowX: this.props.overflowX,
                    overflowY: this.props.overflowY
                }}>
                    {this.props.children}
                    {wrapper}
            </div>
        );
    }

    private handleWindowResize: () => void =
        () => this.measureScrollbars();

    private measureScrollbars: () => void =
        () => this.setState(assign(this.state, {
            height: this.ref ? this.ref.offsetHeight : 0,
            width: this.ref ? this.ref.offsetWidth : 0
        }));
}
