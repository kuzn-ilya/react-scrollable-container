import * as React from 'react';
import { addPrefixToClass } from './../utils/css.utils';
import { omit } from './../utils/object.utils';

import { ContainerProps } from './container.props';
import { ContainerState } from './container.state';
import { ContainerScrollable } from './container-scrollable';

import './container.less';

export class Container extends React.Component<ContainerProps, ContainerState> {

    private ref: HTMLElement;

    static componentList: Container[] = [];

    constructor(props: ContainerProps) {
        super(props);
        this.handleScrollPosChanged = this.handleScrollPosChanged.bind(this);
        this.state = {
        }
    }

    componentDidMount() {
        Container.componentList.push(this);
    }

    componentWillUnmount() {
        Container.componentList = Container.componentList.filter(item => item !== this);
    }

    render(): JSX.Element {
        let divProps = omit(this.props, 'contentHeight', 'contentWidth', 'overflowX', 'overflowY',
            'onScrollPosChanged');

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
