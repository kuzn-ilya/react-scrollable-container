import * as React from 'react';
import { addPrefixToClass } from './../utils/css.utils';
import { ContainerWrapperProps } from './container-wrapper.props';
import { ContainerWrapperState } from './container-wrapper.state';

export class ContainerWrapper extends React.Component<ContainerWrapperProps, ContainerWrapperState> {
    constructor(props: ContainerWrapperProps) {
        super(props);
        this.state = {
            childrenHeight: 0,
            childrenWidth: 0
        };
    }

    private ref: HTMLElement;

    shouldComponentUpdate(nextProps: ContainerWrapperProps, nextState: ContainerWrapperState): boolean {
        return this.state.childrenHeight !== nextState.childrenHeight
            || this.state.childrenWidth !== nextState.childrenWidth;
    }

    componentDidUpdate(prevProps: ContainerWrapperProps, prevState: ContainerWrapperState): void {
        if (this.props.onChildrenSizeChanged) {
            this.props.onChildrenSizeChanged(this.state.childrenWidth, this.state.childrenHeight);
        }
    }

    componentDidMount(): void {
        let maxX = this.ref.offsetLeft + this.ref.offsetWidth;
        let maxY = this.ref.offsetTop + this.ref.offsetHeight;
        for (let i = 0; i < this.ref.children.length; i++) {
            let child = this.ref.children[i] as HTMLElement;
            let clientRect = child.getBoundingClientRect();
            let x = child.offsetLeft + clientRect.right - clientRect.left;
            let y = child.offsetTop + clientRect.bottom - clientRect.top;
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        }
        this.setState({
            childrenHeight: maxY,
            childrenWidth: maxX
        });
    }

    render(): JSX.Element {
        return (
            <div className={addPrefixToClass('container-wrapper')}
                style={{ height: this.state.childrenHeight, width: this.state.childrenWidth}}
                ref={(ref) => this.ref = ref}>

                {this.props.children}
            </div>
        );
    }
}
