import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as assign from 'object-assign';
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
        let style = assign({}, {
            height: this.props.height,
            width: this.props.width
        }, this.props.style);

        return (
            <div className={addPrefixToClass('container')}
                style={style}>
                <ContainerScrollable>
                    {this.props.children}
                </ContainerScrollable>
            </div>
        );
    }

    private handleWindowResize: () => void =
        () => this.measureScrollbars();

    private measureScrollbars: () => void =
        () => {
            let el = ReactDOM.findDOMNode(this) as HTMLElement;
            this.setState({ height: el.offsetHeight, width: el.offsetWidth});
        }
}
