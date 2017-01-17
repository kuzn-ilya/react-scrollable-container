import * as React from 'react';

import { LayoutProps, layoutPropTypes } from  './LayoutProps';
import { LayoutChildContext, layoutChildContextTypes } from './LayoutContext';
import { classNames } from '../../utils/classNames';

import '../../styles/layout.css';
import '../../styles/common.css';

export class Layout extends React.PureComponent<LayoutProps, {}> {

    static propTypes = layoutPropTypes;

    static contextTypes = layoutChildContextTypes;
    static childContextTypes = layoutChildContextTypes;

    constructor(props?: LayoutProps) {
        super(props);
        this.updateSize(this.props.children);
    }

    getChildContext(): LayoutChildContext {
        return {
            orientation: this.props.orientation ? this.props.orientation : this.context.orientation,
            parent: this
        };
    }

    size?: number;

    updateSize(children: React.ReactNode): void {
        let size = undefined;
        React.Children.forEach(children, (child: React.ReactChild) => {
            if (typeof child !== 'string' && typeof child !== 'number' && child.type === Layout) {
                if (this.props.orientation === 'vertical' && typeof child.props.height === 'number') {
                    size = child.props.height;
                } else if (this.props.orientation === 'horizontal' && typeof child.props.width === 'number') {
                    size = child.props.width;
                }
            }
        });

        this.size = size;
    }

    componentWillReceiveProps(nextProps: { children?: React.ReactNode }): void {
        this.updateSize(nextProps.children);
    }

    render(): JSX.Element | null {
        let layoutPaneStyle: {} = {};
        let layoutPaneClassName = '';

        if (this.context.orientation === 'vertical') {
            if (typeof this.props.height === 'number') {
                layoutPaneClassName = 'layout2-vert-first';
                layoutPaneStyle = {
                    height: this.props.height + 'px'
                };
            } else if (this.context.parent && this.context.parent.size) {
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
            } else if (this.context.parent && this.context.parent.size) {
                layoutPaneClassName = 'layout2-horz-second';
                layoutPaneStyle = {
                    left: this.context.parent.size + 'px'
                };
            }
        }

        let wrapChild = Boolean(layoutPaneClassName);

        let child = this.props.orientation ? (
            <div
                className={classNames('layout2-container', !wrapChild ? this.props.className : '', {
                    'right-shadow': wrapChild ? false : Boolean(this.props.showRightShadow),
                    'bottom-shadow': wrapChild ? false : Boolean(this.props.showBottomShadow)
                })}
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
            >
                {this.props.children}
            </div>
        ) : null;

        let component = !wrapChild ? child : (
            <div className={classNames(layoutPaneClassName,
                    wrapChild ? this.props.className : '', {
                        'right-shadow': Boolean(this.props.showRightShadow),
                        'bottom-shadow': Boolean(this.props.showBottomShadow)
                    })}
                style={layoutPaneStyle}
            >
                {this.props.orientation ? child : this.props.children}
            </div>
        );

        return component;
    }
}
