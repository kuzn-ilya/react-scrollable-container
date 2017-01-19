import * as React from 'react';

import { LayoutProps, layoutPropTypes } from  './LayoutProps';
import { LayoutState } from  './LayoutState';
import { LayoutPanel } from  '../LayoutPanel';
import { LayoutPanelProps } from  '../LayoutPanel/LayoutPanelProps';
import { Internal } from  '../InternalLayoutPanel';
// TODO: How to avoid alias for namespace here
import { Internal as Internal2} from  '../InternalLayoutSplitter';
import { LayoutSplitter } from  '../LayoutSplitter';
import { classNames, warning, Orientation } from '../../../utils';

import '../../../styles/layout.css';
import '../../../styles/common.css';

export class Layout extends React.PureComponent<LayoutProps, LayoutState> {

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

    render(): JSX.Element {
        let left = 0;
        let top = 0;
        let bottom = 0;
        let right = 0;
        let orientation: Orientation | undefined = undefined;

        let children: React.ReactNode = React.Children.map(this.props.children,
            (child: React.ReactChild, index: number): React.ReactNode => {
            if (typeof child === 'string' || typeof child === 'number' || (child.type !== LayoutPanel && child.type !== LayoutSplitter)) {
                warning('<Layout />: Children should have a type of either <LayoutPanel /> or <LayoutSplitter />.');
                return child;
        } else if (child.type === LayoutPanel ) {
                let panelProps = child.props as LayoutPanelProps & { children?: React.ReactNode };
                let component = null;

                switch (panelProps.align) {
                    case 'left':
                        component = <Internal.LayoutPanel
                            top={top}
                            bottom={bottom}
                            left={left}
                            width={panelProps.width}
                            showBottomShadow={panelProps.showBottomShadow}
                            showRightShadow={panelProps.showRightShadow}
                        >
                            {panelProps.children}
                        </Internal.LayoutPanel>;
                        left += panelProps.width;
                        orientation = 'horizontal';
                        break;
                    case 'right':
                        component = <Internal.LayoutPanel
                            top={top}
                            bottom={bottom}
                            right={right}
                            width={panelProps.width}
                            showBottomShadow={panelProps.showBottomShadow}
                            showRightShadow={panelProps.showRightShadow}
                        >
                            {panelProps.children}
                        </Internal.LayoutPanel>;
                        right += panelProps.width;
                        orientation = 'horizontal';
                        break;
                    case 'top':
                        component = <Internal.LayoutPanel
                            left={left}
                            right={right}
                            top={top}
                            height={panelProps.height}
                            showBottomShadow={panelProps.showBottomShadow}
                            showRightShadow={panelProps.showRightShadow}
                        >
                            {panelProps.children}
                        </Internal.LayoutPanel>;
                        top += panelProps.height;
                        orientation = 'vertical';
                        break;
                    case 'bottom':
                        component = <Internal.LayoutPanel
                            left={left}
                            right={right}
                            bottom={bottom}
                            height={panelProps.height}
                            showBottomShadow={panelProps.showBottomShadow}
                            showRightShadow={panelProps.showRightShadow}
                        >
                            {panelProps.children}
                        </Internal.LayoutPanel>;
                        bottom += panelProps.height;
                        orientation = 'vertical';
                        break;
                    case 'client':
                        // TODO: Warning should be here in case of the second attempt to render a client aligned panel.
                        component = <Internal.LayoutPanel
                            left={left}
                            right={right}
                            top={top}
                            bottom={bottom}
                            showBottomShadow={panelProps.showBottomShadow}
                            showRightShadow={panelProps.showRightShadow}
                        >
                            {panelProps.children}
                        </Internal.LayoutPanel>;
                        orientation = undefined;
                        break;
                    default:
                        break;
                }

                return component;
            } else { // child.type === LayoutSplitter
                switch (orientation)  {
                    case 'vertical':
                        return <Internal2.LayoutSplitter orientation={orientation}
                            top={top - 3}
                            left={left}
                            bottom={top + 3}
                            right={right}
                        />;
                    case 'horizontal':
                        return <Internal2.LayoutSplitter orientation={orientation}
                            left={left - 3}
                            right={left + 3}
                            top={top}
                            bottom={bottom}
                        />;
                    default:
                        warning('Cannot determine orientation of <LayoutSplitter />.'
                            + 'It seems like either is the first child or is used after a client aligned panel.');
                        return null;
                }
            }

        });

                    // splitter = this.props.showSplitter ? (
                    //     <LayoutSplitter orientation={this.context.orientation}
                    //         onResizing={this.handleSplitterResizing}
                    //         onResizeEnd={this.handleSplitterResizeEnd}
                    //         coord={this.state.splitterCoord} />
                    // ) : null;

        let component = (
            <div
                className={classNames('layout-container', this.props.className)}
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
