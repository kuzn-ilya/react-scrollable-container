import * as React from 'react';

import { LayoutProps, layoutPropTypes } from  './LayoutProps';
import { LayoutState } from  './LayoutState';
// import { LayoutSplitter } from  '../LayoutSplitter';
import { classNames } from '../../../utils';

import '../../../styles/layout.css';
import '../../../styles/common.css';

export class Layout extends React.PureComponent<LayoutProps, LayoutState> {

    static defaultProps: Partial<LayoutProps> = {
        showSplitter: false
    };

    static propTypes = layoutPropTypes;

    constructor(props?: LayoutProps) {
        super(props);

        this.handleSplitterResizing = this.handleSplitterResizing.bind(this);
        this.handleSplitterResizeEnd = this.handleSplitterResizeEnd.bind(this);
        // this.state = {
        //     splitterCoord: this.getInitialSplitterCoord()
        // };

        this.updateSize(this.props.children);
    }

    handleSplitterResizing: (newCoord: number) => void = (newCoord) => {
        // if (this.ref) {
        //     if (this.context.orientation === 'vertical') {
        //         this.ref.style.height = newCoord + 'px';
        //     } else if (this.context.orientation === 'horizontal') {
        //         this.ref.style.width = newCoord + 'px';
        //     }
        //     this.setState({
        //         splitterCoord: this.context.orientation === 'vertical' ? this.ref.offsetHeight : this.ref.offsetWidth
        //     });
        // }
    }

    handleSplitterResizeEnd: () => void = () => {
        // if (this.ref) {
        //     this.setState({
        //         splitterCoord: this.context.orientation === 'vertical' ? this.ref.offsetHeight : this.ref.offsetWidth
        //     });
        // }
    }

    // getInitialSplitterCoord(): number {
    //     if (this.context.orientation === 'vertical' && typeof this.props.height === 'number') {
    //         return this.props.height;
    //     } else if (this.context.orientation === 'horizontal' && typeof this.props.width === 'number') {
    //         return this.props.width;
    //     }
    //     return 0;
    // }

    componentDidMount(): void {
        // if (this.props.showSplitter && this.ref) {
        //     this.setState({
        //         splitterCoord: this.context.orientation === 'vertical' ? this.ref.offsetHeight : this.ref.offsetWidth
        //     });
        // }
    }

    // size?: number;
    ref: HTMLDivElement;

    updateSize(children: React.ReactNode): void {
        // let size = undefined;
        // React.Children.forEach(children, (child: React.ReactChild) => {
        //     if (typeof child !== 'string' && typeof child !== 'number' && child.type === Layout) {
        //         if (this.props.orientation === 'vertical' && typeof child.props.height === 'number') {
        //             size = child.props.height;
        //         } else if (this.props.orientation === 'horizontal' && typeof child.props.width === 'number') {
        //             size = child.props.width;
        //         }
        //     }
        // });

        // this.size = size;
    }

    componentWillReceiveProps(nextProps: { children?: React.ReactNode }): void {
        this.updateSize(nextProps.children);
    }

    render(): JSX.Element | null {

        let children = React.Children.map(this.props.children, (child: React.ReactChild, index: number) => {
            let childProps = this.props.childrenProps[index];
            let layoutPaneStyle: {} = {};
            let layoutPaneClassName = '';

            if (typeof childProps.size === 'number') {
                layoutPaneClassName = this.props.orientation === 'vertical' ? 'layout2-vert-first' : 'layout2-horz-first';
                layoutPaneStyle = {
                    height: this.props.orientation === 'vertical' ? childProps.size + 'px' : undefined,
                    width: this.props.orientation === 'horizontal' ? childProps.size + 'px' : undefined
                };
            } else {
                layoutPaneClassName = this.props.orientation === 'vertical' ? 'layout2-vert-second' : 'layout2-horz-second';
                let prevSize = this.props.childrenProps
                    .slice(0, index)
                    .reduce((prev: number, curr: { size: '100%' | number }) => prev + (curr.size === '100%' ? 0 : curr.size), 0);
                layoutPaneStyle = {
                    left: this.props.orientation === 'horizontal' ? prevSize + 'px' : undefined,
                    top: this.props.orientation === 'vertical' ? prevSize + 'px' : undefined
                };
            }

            return (
                <div className={classNames(layoutPaneClassName)}
                    style={layoutPaneStyle}
                >
                    {child}
                </div>
            );
        });

                    // splitter = this.props.showSplitter ? (
                    //     <LayoutSplitter orientation={this.context.orientation}
                    //         onResizing={this.handleSplitterResizing}
                    //         onResizeEnd={this.handleSplitterResizeEnd}
                    //         coord={this.state.splitterCoord} />
                    // ) : null;

        let component = (
            <div
                className={classNames('layout2-container', this.props.className)}
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
            >
                {children}
            </div>
        );

        return component;
    }
}
