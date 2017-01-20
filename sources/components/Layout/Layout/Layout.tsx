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
                        nextIndexes: [],
                        orientation: prevAlign,
                        prevIndexes: [],
                        right,
                        top,
                        type: 'splitter'
                    };
                case 'bottom':
                    return {
                        bottom,
                        left,
                        nextIndexes: [],
                        orientation: prevAlign,
                        prevIndexes: [],
                        right,
                        type: 'splitter'
                    };
                case 'left':
                    return {
                        left,
                        nextIndexes: [],
                        orientation: prevAlign,
                        prevIndexes: [],
                        top,
                        type: 'splitter',
                        bottom
                    };
                case 'right':
                    return {
                        nextIndexes: [],
                        orientation: prevAlign,
                        prevIndexes: [],
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
                for (let j = i - 1; j >= 0; j--) {
                    let panelState = childrenStates[j];
                    if (panelState && panelState.type === 'panel') {
                        if (isPanelPreviousForSplitter(panelState, state)) {
                            state.prevIndexes.push(j);
                        } else {
                            break;
                        }
                    }
                }

                for (let j = i + 1; j < childrenStates.length; j++) {
                    let panelState = childrenStates[j];
                    if (panelState && panelState.type === 'panel') {
                        if (isPanelNextForSplitter(panelState, state)) {
                            state.nextIndexes.push(j);
                        } else {
                            break;
                        }
                    }
                }
            }
        }

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

function isPanelPreviousForSplitter(panel: LayoutPanelChildState, splitter: LayoutSplitterChildState): boolean {
    switch (splitter.orientation) {
        case 'left':
            return splitter.left === (panel.left + panel.width || 0);
        case 'right':
            return splitter.right === panel.left;
        case 'top':
            return splitter.top === (panel.top + panel.height || 0);
        case 'bottom':
            return splitter.bottom === panel.top;
        default:
            return false;
    }
}

function isPanelNextForSplitter(panel: LayoutPanelChildState, splitter: LayoutSplitterChildState): boolean {
    switch (splitter.orientation) {
        case 'left':
            return splitter.left === panel.left;
        case 'right':
            return splitter.right === (panel.left + panel.width || 0);
        case 'top':
            return splitter.bottom === panel.top;
        case 'bottom':
            return splitter.top === (panel.top + panel.height || 0);
        default:
            return false;
    }
}
