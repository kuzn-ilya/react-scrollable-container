import * as React from 'react';
import { addPrefixToClass } from './../utils/css.utils';

import './container.less';
import { Size } from './../utils/types';

interface ContainerScrollableContentProps {
    contentWidth?: Size;
    contentHeight?: Size;
    children: (childState: any) => React.ReactNode;
    childState: any;
}

interface ContainerScrollableContentState {
    contentWidth: 'auto' | number;
    contentHeight: 'auto' | number;
}

export class ContainerScrollableContent extends React.PureComponent<ContainerScrollableContentProps, ContainerScrollableContentState> {

    constructor(props: ContainerScrollableContentProps) {
        super(props);
        this.state = {
            contentHeight: this.props.contentHeight ? this.props.contentHeight : 'auto',
            contentWidth: this.props.contentWidth ? this.props.contentWidth : 'auto'
        }
    }

    componentWillReceiveProps(nextProps: ContainerScrollableContentProps, nextState: ContainerScrollableContentState) {
        console.log(nextProps, nextState);
    }

    render(): JSX.Element {
        console.log('content render');
        let wrapper: React.ReactNode = null;
        if (this.state.contentWidth !== 'auto' || this.state.contentHeight !== 'auto') {
            wrapper = (
                <div className={addPrefixToClass('container-wrapper')}
                    style={{
                        left: this.state.contentWidth === 'auto' ? 0 : this.state.contentWidth - 1,
                        top: this.state.contentHeight === 'auto' ? 0 : this.state.contentHeight - 1
                    }}
                />
            );
        }

        return (
            <div style={{
                    height: this.state.contentHeight === 'auto' ? "100%" : this.state.contentHeight,
                    width: this.state.contentWidth === 'auto' ? "100%" : this.state.contentWidth
                }}
            >
                {(this.props.children(this.props.childState))}
                {wrapper}
            </div>
        );
    }
}
