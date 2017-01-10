import * as React from 'react';

import { Layout2Props, layout2PropTypes } from  './Layout2Props';
import { Layout2ChildContext, layout2ChildContextTypes } from './Layout2Context';

import '../../styles/layout2.css';

export class Layout2 extends React.PureComponent<Layout2Props, {}> {

    static propTypes = layout2PropTypes;

    static contextTypes = layout2ChildContextTypes;
    static childContextTypes = layout2ChildContextTypes;

    constructor(props?: Layout2Props) {
        super(props);
        this.updateSize(this.props.children);
    }

    getChildContext(): Layout2ChildContext {
        return {
            orientation: this.props.orientation ? this.props.orientation : this.context.orientation,
            parent: this
        };
    }

    size?: number;

    updateSize(children: React.ReactNode): void {
        let size = undefined;
        React.Children.forEach(children, (child: React.ReactChild) => {
            if (typeof child !== 'string' && typeof child !== 'number' && child.type instanceof Layout2) {
                if (this.props.orientation === 'vertical' && typeof child.props.height === 'number') {
                    size = child.props.height;
                } else if (this.props.orientation === 'horizontal' && typeof child.props.width === 'number') {
                    size = child.props.width;
                }
            }
        });

        this.size = size;
        console.log('updateSize Layout2', size);
    }

    componentWillReceiveProps(nextProps: { children?: React.ReactNode }): void {
        this.updateSize(nextProps.children);
    }

    render(): JSX.Element | null {
        console.log('render Layout2');
        console.log(this.props.orientation, this.size);

        let layoutPaneStyle: {} = {};
        let layoutPaneClassName = '';

        if (this.context.orientation === 'vertical') {
            if (typeof this.props.height === 'number') {
                layoutPaneClassName = 'layout2-vert-first';
                layoutPaneStyle = {
                    height: this.props.height + 'px'
                };
            } else if (this.context.parent) {
                layoutPaneClassName = 'layout2-vert-second';
                layoutPaneStyle = {
                    top: this.context.parent.size + 'px'
                };
            }
        } else if (this.context.orientation === 'horizontal') {
            if (typeof this.props.width === 'number') {
                layoutPaneClassName = 'layout2-horz-first';
                layoutPaneStyle = {
                    width: this.props.width + 'px'
                };
            } else if (this.context.parent) {
                layoutPaneClassName = 'layout2-horz-second';
                layoutPaneStyle = {
                    left: this.context.parent.size + 'px'
                };
            }
        }

        let child = this.props.orientation ? (
            <div className="layout2-container"
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
            >
                {this.props.children}
            </div>
        ) : null;

        let component = this.props.orientation ? child : (
            <div className={layoutPaneClassName}
                style={layoutPaneStyle}
            >
                {this.props.orientation ? child : this.props.children}
            </div>
        );

        return component;
    }
}
