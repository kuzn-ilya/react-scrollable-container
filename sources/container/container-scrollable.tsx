import * as React from 'react';
import * as assign from 'object-assign';
import { addPrefixToClass } from './../utils/css.utils';

import { ContainerScrollableProps } from  './container-scrollable.props';
import { ContainerScrollableState } from  './container-scrollable.state';
import { ContainerScrollableContent } from './container-scrollable-content';

import './container.less';

export class ContainerScrollable extends React.PureComponent<ContainerScrollableProps, ContainerScrollableState> {

    constructor(props: ContainerScrollableProps) {
        super(props);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            height: 0,
            width: 0
        }
    }

    componentDidMount(): void {
        this.measureScrollbars();

        if (this.props.scrollLeft !== null) {
            this.ref.scrollLeft = this.props.scrollLeft;
        }
        if (this.props.scrollTop !== null) {
            this.ref.scrollTop = this.props.scrollTop;
        }

        this.ref.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentDidUpdate(): void {
        if (this.props.scrollLeft !== null) {
            this.ref.scrollLeft = this.props.scrollLeft;
        }
        if (this.props.scrollTop !== null) {
            this.ref.scrollTop = this.props.scrollTop;
        }
    }

    componentWillUnmount(): void {
        this.ref.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleWindowResize);
    }

    private ref: HTMLElement;

    render(): JSX.Element {
        return (
            <div
                className={addPrefixToClass('container')}
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
                id={this.props.id}
            >
                <div className={addPrefixToClass('container-scrollable')}
                    ref={(ref) => this.ref = ref}
                    style={{
                        overflowX: this.props.overflowX,
                        overflowY: this.props.overflowY
                    }}
                >
                    <ContainerScrollableContent contentWidth={this.props.contentWidth} contentHeight={this.props.contentHeight} 
                        children={this.props.children}
                        childState={this.props.childState}
                    >
                    </ContainerScrollableContent>
                </div>
            </div>
        );
    }

    private handleWindowResize: () => void =
        () => this.measureScrollbars();

    private handleScroll: (event: UIEvent) => void = (event) => {
        let scrollLeft = (event.target as Element).scrollLeft;
        let scrollTop = (event.target as Element).scrollTop;
        if (this.props.onScrollPosChanged) {
            this.props.onScrollPosChanged(scrollLeft, scrollTop);
        }
    }

    private measureScrollbars: () => void =
        () => this.setState(assign(this.state, {
            height: this.ref ? this.ref.offsetHeight : 0,
            width: this.ref ? this.ref.offsetWidth : 0
        }));
}
