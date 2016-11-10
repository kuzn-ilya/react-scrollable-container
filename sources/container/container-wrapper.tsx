import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
        let el = ReactDOM.findDOMNode(this) as HTMLElement;
        let maxX = el.offsetLeft + el.offsetWidth;
        let maxY = el.offsetTop + el.offsetHeight;
        console.log("maxX", maxX, "maxY", maxY);
        for (let i = 0; i < el.children.length; i++) {
            let child = el.children[i] as HTMLElement;
            let clientRect = child.getBoundingClientRect();
            console.log(child.offsetLeft, child.offsetWidth, child.offsetTop, child.offsetHeight, clientRect);
            let x = child.offsetLeft + clientRect.right - clientRect.left;
            let y = child.offsetTop + clientRect.bottom - clientRect.top;
            console.log(x, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        }
        console.log("maxX", maxX, "maxY", maxY);
        this.setState({
            childrenHeight: maxY,
            childrenWidth: maxX
        });
    }

    render(): JSX.Element {
        return (
            <div className={addPrefixToClass('container-wrapper')}
                style={{ height: this.state.childrenHeight, width: this.state.childrenWidth}}>
                {this.props.children}
            </div>
        );
    }
}
