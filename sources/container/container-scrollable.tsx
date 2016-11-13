import * as React from 'react';
import { addPrefixToClass } from './../utils/css.utils';

import { ContainerScrollableProps } from  './container-scrollable.props';
import { ContainerScrollableState } from  './container-scrollable.state';

export class ContainerScrollable extends React.Component<ContainerScrollableProps, ContainerScrollableState> {

    constructor(props: ContainerScrollableProps) {
        super(props);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.state = {
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
        return (
            <div className={addPrefixToClass('container-scrollable')}
                ref={(ref) => this.ref = ref}
                style={{
                    overflowX: this.props.overflowX,
                    overflowY: this.props.overflowY
                }}>
                    {this.props.children}
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
