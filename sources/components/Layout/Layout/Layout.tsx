import * as React from 'react';
import { List } from 'immutable';

import { LayoutProps, layoutPropTypes } from  './LayoutProps';
import { LayoutState, LayoutChildState, LayoutPanelChildState, LayoutSplitterChildState } from  './LayoutState';
import { LayoutPanel } from  '../LayoutPanel';
import { LayoutPanelProps } from  '../LayoutPanel/LayoutPanelProps';
import { Internal } from  '../InternalLayoutPanel';
// TODO: How to avoid alias for namespace here
import { Internal as Internal2} from  '../InternalLayoutSplitter';
import { LayoutSplitter } from  '../LayoutSplitter';
import { LayoutSplitterProps } from  '../LayoutSplitter/LayoutSplitterProps';
import { classNames } from '../../../utils';

import '../../../styles/layout.css';
import '../../../styles/common.css';

export class Layout extends React.PureComponent<LayoutProps, LayoutState> {

    static propTypes = layoutPropTypes;

    constructor(props?: LayoutProps) {
        super(props);

        this.handleSplitterResizing = this.handleSplitterResizing.bind(this);
        this.handleSplitterResizeEnd = this.handleSplitterResizeEnd.bind(this);

        this.state = this.calculateState(this.props);
    }

    calculateState(props: { children?: React.ReactNode }): LayoutState {
        let left = 0;
        let top = 0;
        let bottom = 0;
        let right = 0;
        let prevAlign: 'left' | 'right' | 'top' | 'bottom' | undefined = undefined;

        function calculatePanelState(index: number, panelProps: LayoutPanelProps): LayoutPanelChildState | undefined {
            let { align, height, width } = panelProps;

            let state: LayoutPanelChildState | undefined = undefined;

            prevAlign = align === 'client' ? undefined : align;

            switch (align) {
                case 'left':
                    state = {
                        bottom,
                        left,
                        top,
                        type: 'panel',
                        width
                    };
                    left += width;
                    break;
                case 'right':
                    state = {
                        bottom,
                        right,
                        top,
                        type: 'panel',
                        width
                    };
                    right += width;
                    break;
                case 'top':
                    state = {
                        height,
                        left,
                        right,
                        top,
                        type: 'panel'
                    };
                    top += height;
                    break;
                case 'bottom':
                    state = {
                        bottom,
                        height,
                        left,
                        right,
                        type: 'panel'
                    };
                    bottom += height;
                    break;
                case 'client':
                    // TODO: Warning should be here in case of the second attempt to render a client aligned panel.
                    state = {
                        bottom,
                        left,
                        right,
                        top,
                        type: 'panel'
                    };
                    break;
                default:
                    break;
            }
            return state;
       }

        function calculateSplitterState(index: number, splitterProps: LayoutSplitterProps): LayoutSplitterChildState | undefined {
            switch (prevAlign)  {
                // TODO: Only align left and top cases
                case 'top':
                case 'bottom':
                    return {
                        bottom: top + 3,
                        left,
                        orientation: prevAlign,
                        right,
                        top: top - 3,
                        type: 'splitter'
                    };
                case 'left':
                case 'right':
                    return {
                        left: left - 3,
                        orientation: prevAlign,
                        right: left + 3,
                        top,
                        type: 'splitter',
                        bottom
                    };
                default:
                    return undefined;
            }
        }

        let childrenStates: LayoutChildState[] = React.Children.map(props.children, (child, index) => {
            if (typeof child === 'string' || typeof child === 'number') {
                return undefined;
            } else if (child.type === LayoutPanel ) {
                return calculatePanelState(index, child.props as LayoutPanelProps);
            } else if (child.type === LayoutSplitter) {
                return calculateSplitterState(index, child.props as LayoutSplitterProps);
            } else {
                return undefined;
            }
        });

        // for (let i = 0; i < childrenStates.length; i++) {
        //     let state = childrenStates[i];
        //     let before = [];
        //     let after = [];
        //     if (state && state.type === 'splitter') {
        //         for (let j = i - 1; j >= 0; j--) {
        //             let beforeState = childrenStates[j];
        //             if (beforeState) {
        //                 if (beforeState.type === 'panel') {
        //                     if (beforeState.)
        //                 } else {
        //                     break;
        //                 }
        //             } 
        //         }
        //     }
        // }

        return {
            childrenStates: List(childrenStates)
        };
    }

    handleSplitterResizing: (newCoord: number) => void = (newCoord) => {
        return;
    }

    handleSplitterResizeEnd: () => void = () => {
        return;
    }

    componentWillReceiveProps(nextProps: { children?: React.ReactNode }): void {
        this.setState(this.calculateState(nextProps));
    }

    render(): JSX.Element {
        let children: React.ReactNode = React.Children.map(this.props.children, (child, index) => {
            let childState = this.state.childrenStates.get(index);
            if (childState) {
                switch (childState.type) {
                    case 'panel':
                        let panelProps = (child as React.ReactElement<LayoutPanelProps & {children?: React.ReactChildren}>).props;
                        return (
                            <Internal.LayoutPanel
                                top={childState.top}
                                bottom={childState.bottom}
                                left={childState.left}
                                right={childState.right}
                                width={childState.width}
                                height={childState.height}
                                showBottomShadow={panelProps.showBottomShadow}
                                showRightShadow={panelProps.showRightShadow}
                            >
                                {panelProps.children}
                            </Internal.LayoutPanel>
                        );
                    case 'splitter':
                        return (
                            <Internal2.LayoutSplitter orientation={childState.orientation!}
                                top={childState.top}
                                left={childState.left}
                                bottom={childState.bottom}
                                right={childState.right}
                                onResizing={this.handleSplitterResizing}
                                onResizeEnd={this.handleSplitterResizeEnd}
                            />
                        );
                    default:
                        break;
                }
            }
            return child;
        });

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
