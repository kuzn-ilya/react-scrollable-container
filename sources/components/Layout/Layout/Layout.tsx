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

            state = {
                align,
                bottom: align !== 'top' ? bottom : undefined,
                height,
                left: align !== 'right' ? left : undefined,
                right: align !== 'left' ? right : undefined,
                top: align !== 'bottom' ? top : undefined,
                type: 'panel',
                width
            };

            prevAlign = align === 'client' ? undefined : align;

            switch (align) {
                case 'left':
                    left += width;
                    break;
                case 'right':
                    right += width;
                    break;
                case 'top':
                    top += height;
                    break;
                case 'bottom':
                    bottom += height;
                    break;
                default:
                    // TODO: Warning should be here in case of the second attempt to render a client aligned panel.
                    break;
            }
            return state;
       }

        function calculateSplitterState(index: number, splitterProps: LayoutSplitterProps): LayoutSplitterChildState | undefined {
            switch (prevAlign)  {
                // TODO: Only align left and top cases
                case 'top':
                    return {
                        left,
                        orientation: prevAlign,
                        right,
                        top,
                        type: 'splitter'
                    };
                case 'bottom':
                    return {
                        bottom,
                        left,
                        orientation: prevAlign,
                        right,
                        type: 'splitter'
                    };
                case 'left':
                    return {
                        left,
                        orientation: prevAlign,
                        top,
                        type: 'splitter',
                        bottom
                    };
                case 'right':
                    return {
                        orientation: prevAlign,
                        right,
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

        for (let i = 0; i < childrenStates.length; i++) {
            let state = childrenStates[i];
            if (state && state.type === 'splitter') {
                let prevIndexes = [];
                for (let j = i - 1; j >= 0; j--) {
                    let panelState = childrenStates[j];
                    if (panelState && panelState.type === 'panel' && isPanelPreviousForSplitter(panelState, state)) {
                        prevIndexes.push(j);
                    }
                }

                let nextIndexes = [];
                for (let j = i + 1; j < childrenStates.length; j++) {
                    let panelState = childrenStates[j];
                    if (panelState && panelState.type === 'panel' && isPanelNextForSplitter(panelState, state)) {
                        nextIndexes.push(j);
                    }
                }

                state.onResizing = this.handleSplitterResizing.bind(this, i, prevIndexes, nextIndexes);
                state.onResizeEnd = this.handleSplitterResizeEnd.bind(this, i, prevIndexes, nextIndexes);
            }
        }

        return {
            childrenStates: List(childrenStates)
        };
    }

    handleSplitterResizing: (splitterIndex: number, prevIndexes: Array<number>, nextIndexes: Array<number>, newCoord: number) => void =
        (splitterIndex, prevIndexes, nextIndexes, newCoord) => {
        return;
    }

    handleSplitterResizeEnd: (splitterIndex: number, prevIndexes: Array<number>, nextIndexes: Array<number>) => void =
        (splitterIndex, prevIndexes, nextIndexes) => {
        console.log(splitterIndex, prevIndexes, nextIndexes);
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
                                onResizing={childState.onResizing}
                                onResizeEnd={childState.onResizeEnd}
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

function isPanelPreviousForSplitter(panel: LayoutPanelChildState, splitter: LayoutSplitterChildState): boolean {
    switch (splitter.orientation) {
        case 'left':
            return splitter.left === panel.left + panel.width;
        case 'right':
            return splitter.right === panel.right + panel.width;
        case 'top':
            return splitter.top === panel.top + panel.height;
        case 'bottom':
            return splitter.bottom === panel.bottom + panel.height;
        default:
            return false;
    }
}

function isPanelNextForSplitter(panel: LayoutPanelChildState, splitter: LayoutSplitterChildState): boolean {
    switch (splitter.orientation) {
        case 'left':
            return splitter.left === panel.left;
        case 'right':
            return splitter.right === panel.right;
        case 'top':
            return splitter.top === panel.top;
        case 'bottom':
            return splitter.bottom === panel.bottom;
        default:
            return false;
    }
}
