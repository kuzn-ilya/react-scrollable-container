import * as React from 'react';

import { LayoutProps } from  './LayoutProps';
import { LayoutChildContext, layoutChildContextTypes } from  './LayoutChildContext';

import './layout.css';

export class Layout extends React.PureComponent<LayoutProps, void> {

    static defaultProps: LayoutProps = {
        height: '100%',
        orientation: 'horizontal',
        width: '100%'
    };

    static childContextTypes = layoutChildContextTypes;

    getChildContext(): LayoutChildContext {
        return {
            orientation: this.props.orientation
        };
    }

    render(): JSX.Element | null {
        return (
            <div className={this.props.orientation === 'vertical' ? 'layout-vert-container' : 'layout-horz-container'}
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
            >
                {this.props.children}
            </div>
        );
    }
}
