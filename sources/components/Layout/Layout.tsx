import * as React from 'react';

import { LayoutProps, layoutPropTypes } from  './LayoutProps';
import { LayoutChildContext, layoutChildContextTypes } from './LayoutContext';
import { LayoutState } from  './LayoutState';
import { LayoutSplitter } from  '../LayoutSplitter';
import { classNames } from '../../utils/classNames';

import '../../styles/layout.css';
import '../../styles/common.css';

export class Layout extends React.PureComponent<LayoutProps, LayoutState> {

    static defaultProps: LayoutProps = {
        showSplitter: false
    };

    static propTypes = layoutPropTypes;

    static contextTypes = layoutChildContextTypes;
    static childContextTypes = layoutChildContextTypes;

    constructor(props?: LayoutProps, context?: LayoutChildContext) {
        super(props, context);

        this.handleSplitterResizing = this.handleSplitterResizing.bind(this);
        this.handleSplitterResizeEnd = this.handleSplitterResizeEnd.bind(this);
        this.state = {
            splitterCoord: this.getInitialSplitterCoord()
        };

        this.updateSize(this.props.children);
    }

    getChildContext(): LayoutChildContext {
        return {
            orientation: this.props.orientation,
            parent: this
        };
    }

    handleSplitterResizing: (newCoord: number) => void = (newCoord) => {
        if (this.ref) {
            if (this.context.orientation === 'vertical') {
                this.ref.style.height = newCoord + 'px';
            } else if (this.context.orientation === 'horizontal') {
                this.ref.style.width = newCoord + 'px';
            }
            this.setState({
                splitterCoord: this.context.orientation === 'vertical' ? this.ref.offsetHeight : this.ref.offsetWidth
            });
        }
    }

    handleSplitterResizeEnd: () => void = () => {
        if (this.ref) {
            this.setState({
                splitterCoord: this.context.orientation === 'vertical' ? this.ref.offsetHeight : this.ref.offsetWidth
            });
        }
    }

    getInitialSplitterCoord(): number {
        if (this.context.orientation === 'vertical' && typeof this.props.height === 'number') {
            return this.props.height;
        } else if (this.context.orientation === 'horizontal' && typeof this.props.width === 'number') {
            return this.props.width;
        }
        return 0;
    }

    componentDidMount(): void {
        if (this.props.showSplitter && this.ref) {
            this.setState({
                splitterCoord: this.context.orientation === 'vertical' ? this.ref.offsetHeight : this.ref.offsetWidth
            });
        }
    }

    size?: number;
    ref: HTMLDivElement;

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
        let splitter = null;

        if (this.context.orientation === 'vertical') {
            if (typeof this.props.height === 'number') {
                layoutPaneClassName = 'layout2-vert-first';
                layoutPaneStyle = {
                    height: this.props.height + 'px'
                };
                splitter = this.props.showSplitter ? (
                    <LayoutSplitter orientation={this.context.orientation}
                        onResizing={this.handleSplitterResizing}
                        onResizeEnd={this.handleSplitterResizeEnd}
                        coord={this.state.splitterCoord} />
                ) : null;
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
                splitter = this.props.showSplitter ? (
                    <LayoutSplitter orientation={this.context.orientation}
                        onResizing={this.handleSplitterResizing}
                        onResizeEnd={this.handleSplitterResizeEnd}
                        coord={this.state.splitterCoord} />
                ) : null;
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
                ref={(ref: HTMLDivElement) => this.ref = ref}
            >
                {this.props.orientation ? child : this.props.children}
                {splitter}
            </div>
        );

        return component;
    }
}
