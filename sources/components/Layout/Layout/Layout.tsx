import * as React from 'react';
import { List } from 'immutable';

import { LayoutProps, layoutPropTypes } from  './LayoutProps';
import { LayoutState, LayoutChildState, LayoutPanelChildState, LayoutSplitterChildState, isSplitter, isPanel } from  './LayoutState';
import { LayoutPanel } from  '../LayoutPanel';
import { LayoutPanelProps } from  '../LayoutPanel/LayoutPanelProps';
import { Internal } from  '../InternalLayoutPanel';
// TODO: How to avoid alias for namespace here
import { Internal as Internal2} from  '../InternalLayoutSplitter';
import { LayoutSplitter } from  '../LayoutSplitter';
import { LayoutSplitterProps } from '../LayoutSplitter/LayoutSplitterProps';
import { range, classNames, Edge, getOppositeEdge, isHorizontal, listenToResize } from '../../../utils';

import * as sprintf from 'fbjs/lib/sprintf';

import * as classes from '../../../styles/layout.css';

export class Layout extends React.PureComponent<LayoutProps, LayoutState> {

    static propTypes = layoutPropTypes;

    constructor(props?: LayoutProps) {
        super(props);

        this.state = this.calculateState(this.props);
    }

    private ref: HTMLDivElement;
    private removeResizeEventListener: () => void;

    calculateState(props: { children?: React.ReactNode }): LayoutState {
        let newPositions: Positions = {
            align: undefined,
            bottom: 0,
            left: 0,
            right: 0,
            top: 0
        };

        let childrenStates: LayoutChildState[] = React.Children.map(props.children, (child) =>
            calculateChildState(child, newPositions)
        );

        childrenStates.forEach((state, index) => {
            if (isSplitter(state)) {
                let prevIndexes =
                    range(0, index)
                    .filter((i) => isPanelPreviousForSplitter(childrenStates[i], state));

                let nextIndexes =
                    range(index + 1, childrenStates.length)
                    .filter((i) => isPanelNextForSplitter(childrenStates[i], state));

                state.onResizing = this.handleSplitterResizing.bind(this, index, prevIndexes, nextIndexes);
                state.onResizeEnd = this.handleSplitterResizeEnd.bind(this, index, prevIndexes, nextIndexes);
            }
        });

        return {
            childrenStates: List(childrenStates)
        };
    }

    handleSplitterResizing: (splitterIndex: number, prevIndexes: Array<number>, nextIndexes: Array<number>, newPosition: number) => void =
        (splitterIndex, prevIndexes, nextIndexes, newPosition) => {

        let states = this.state.childrenStates;
        let splitterState = cloneLayoutChildState(states.get(splitterIndex));

        if (isSplitter(splitterState)) {
            let adjustedNewPosition = this.adjustNewPosition(splitterIndex, splitterState, prevIndexes, nextIndexes, newPosition);
            if (splitterState.liveUpdate) {
                this.resizePanels(splitterIndex, splitterState, prevIndexes, nextIndexes, adjustedNewPosition);
            }
            this.resizeSplitter(splitterIndex, splitterState, adjustedNewPosition, adjustedNewPosition !== newPosition);
        }
    }

    handleSplitterResizeEnd: (splitterIndex: number, prevIndexes: Array<number>, nextIndexes: Array<number>) => void =
        (splitterIndex, prevIndexes, nextIndexes) => {

        let states = this.state.childrenStates;
        let splitterState = cloneLayoutChildState(states.get(splitterIndex));

        if (isSplitter(splitterState)) {
            this.resizePanels(splitterIndex, splitterState, prevIndexes, nextIndexes, splitterState[splitterState.align]!);
        }
    }

    resizeSplitter(splitterIndex: number, splitterState: LayoutSplitterChildState, newPosition: number, showNoDropCursor: boolean): void {

        let states = this.state.childrenStates;
        let splitterAlign = splitterState.align;

        splitterState[splitterAlign] = newPosition;
        states = states.set(splitterIndex, splitterState);
        // TODO: it doesn't react whenever showNoDropCursor is ture
        this.setState({
            childrenStates: states,
            showNoDropCursor
        });
    }

    resizePanels(splitterIndex: number, splitterState: LayoutSplitterChildState, prevIndexes: Array<number>, nextIndexes: Array<number>,
        newPosition: number): void {

        let states = this.state.childrenStates;
        let splitterAlign = splitterState.align;

        prevIndexes.forEach((value) => {
            let panelState = cloneLayoutChildState(states.get(value));
            if (isPanel(panelState)) {
                // TODO: Asserting: prev for splitter must be a panel and have the same align
                panelState[getMeasurementByAlign(splitterAlign)] = newPosition - (panelState[splitterAlign] || 0);
                states = states.set(value, panelState);
            }
        });

        nextIndexes.forEach((value) => {
            let panelState = cloneLayoutChildState(states.get(value));
            if (panelState) {
                if (isPanel(panelState) && panelState.align !== getOppositeEdge(splitterAlign)
                    && panelState.align === splitterAlign) {
                    panelState[getMeasurementByAlign(splitterAlign)] =
                        (panelState[getMeasurementByAlign(splitterAlign)] || 0) - newPosition + (panelState[splitterAlign] || 0);
                }
                panelState[splitterAlign] = newPosition;
                states = states.set(value, panelState);
            }
        });
        this.setState({childrenStates: states});
    }

    adjustNewPosition(splitterIndex: number, splitterState: LayoutSplitterChildState, prevIndexes: Array<number>,
        nextIndexes: Array<number>, newPosition: number): number {

        let states = this.state.childrenStates;
        let splitterAlign = splitterState.align;
        let result = newPosition;

        prevIndexes.forEach((value) => {
            let panelState = states.get(value);
            if (isPanel(panelState)) {
                let minMeasurement = panelState[getMinMeasurementByAlign(splitterAlign)];
                let maxMeasurement = panelState[getMaxMeasurementByAlign(splitterAlign)];
                let boundaryCoord = panelState[splitterAlign] || 0;
                let newMeasurement = result - boundaryCoord;
                if (minMeasurement && minMeasurement > newMeasurement) {
                    result = minMeasurement + boundaryCoord;
                    newMeasurement = minMeasurement!;
                }
                if (maxMeasurement && maxMeasurement < newMeasurement) {
                    result = maxMeasurement + boundaryCoord;
                }
            }
        });

        nextIndexes.forEach((value) => {
            let panelState = states.get(value);
            if (panelState) {
                if (isPanel(panelState) && panelState.align !== getOppositeEdge(splitterAlign)
                    && panelState.align === splitterAlign) {

                    let minMeasurement = panelState[getMinMeasurementByAlign(splitterAlign)];
                    let maxMeasurement = panelState[getMaxMeasurementByAlign(splitterAlign)];
                    let measurement = panelState[getMeasurementByAlign(splitterAlign)] || 0;
                    let boundaryCoord = panelState[splitterAlign] || 0;
                    let newMeasurement = measurement - result + boundaryCoord;
                    if (minMeasurement && minMeasurement > newMeasurement) {
                        result = measurement + boundaryCoord - minMeasurement;
                        newMeasurement = minMeasurement!;
                    }
                    if (maxMeasurement && maxMeasurement < newMeasurement) {
                        result = measurement + boundaryCoord - maxMeasurement;
                    }
                }
            }
        });

        return result;
    }

    componentWillReceiveProps(nextProps: { children?: React.ReactNode }): void {
        if (this.props.children !== nextProps.children) {
            this.setState(this.calculateState(nextProps));
        }
    }

    componentDidMount(): void {
        if (this.props.onResize && this.ref) {
            this.removeResizeEventListener = listenToResize(this.ref, this.props.onResize);
        }
    }

    componentWillUnmount(): void {
        if (this.removeResizeEventListener) {
            this.removeResizeEventListener();
        }
    }

    render(): JSX.Element {
        let children: React.ReactNode = React.Children.map(this.props.children, (child, index) => {
            let childState = this.state.childrenStates.get(index);
            if (childState) {
                switch (childState.type) {
                    case 'panel':
                        let panelProps = (child as React.ReactElement<LayoutPanelProps & {children: React.ReactChildren}>).props;
                        return (
                            <Internal.LayoutPanel
                                key={index}
                                top={childState.top}
                                bottom={childState.bottom}
                                left={childState.left}
                                right={childState.right}
                                width={childState.width}
                                height={childState.height}
                                showBottomShadow={panelProps.showBottomShadow}
                                showRightShadow={panelProps.showRightShadow}
                                maxHeight={panelProps.maxHeight}
                                maxWidth={panelProps.maxWidth}
                                minHeight={panelProps.minHeight}
                                minWidth={panelProps.minWidth}
                            >
                                {panelProps.children}
                            </Internal.LayoutPanel>
                        );
                    case 'splitter':
                        return (
                            <Internal2.LayoutSplitter align={childState.align!}
                                key={index}
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

        this.updateStyle();
        let className = classNames(classes.layoutContainer, this.props.className);

        let component = (
            <div
                className={className}
                style={this.style}
                ref={this.setRef}
            >
                {children}
            </div>
        );

        return component;
    }

    private setRef = (ref: HTMLDivElement): void => {
        this.ref = ref;
    }

    private style: React.CSSProperties;
    private updateStyle(): void {
        if (!this.style || this.style.height !== this.props.height || this.style.width !== this.props.width) {
            this.style = {
                height: this.props.height,
                width: this.props.width
            };
        }
    }
}

function isPanelPreviousForSplitter(sibling: LayoutChildState, splitter: LayoutSplitterChildState): boolean {
    // Only panel can be previous sibling of splitter
    if (isPanel(sibling)) {
        return splitter[splitter.align] === (sibling[splitter.align] || 0) + (sibling[getMeasurementByAlign(splitter.align)] || 0);
    } else {
        return false;
    }
}

function isPanelNextForSplitter(sibling: LayoutChildState, splitter: LayoutSplitterChildState): boolean {
    if (isPanel(sibling)) {
        return splitter[splitter.align] === sibling[splitter.align];
    } else if (isSplitter(sibling)) {
        return isHorizontal(splitter.align) !== isHorizontal(sibling.align)
            && splitter[splitter.align] === sibling[splitter.align];
    } else {
        return false;
    }
}

function getMeasurementByAlign(align: Edge): 'height' | 'width' {
    switch (align) {
        case 'left':
        case 'right':
            return 'width';
        case 'bottom':
        case 'top':
            return 'height';
        default:
            throw new Error(sprintf('Got unexpected "%s"', align));
    }
}

function getMinMeasurementByAlign(align: Edge): 'minHeight' | 'minWidth' {
    switch (align) {
        case 'left':
        case 'right':
            return 'minWidth';
        case 'bottom':
        case 'top':
            return 'minHeight';
        default:
            throw new Error(sprintf('Got unexpected "%s"', align));
    }
}

function getMaxMeasurementByAlign(align: Edge): 'maxHeight' | 'maxWidth' {
    switch (align) {
        case 'left':
        case 'right':
            return 'maxWidth';
        case 'bottom':
        case 'top':
            return 'maxHeight';
        default:
            throw new Error(sprintf('Got unexpected "%s"', align));
    }
}

type Positions = {
    align?: Edge;
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
};

function calculateSplitterState(newPositions: Positions, splitterProps: LayoutSplitterProps): LayoutSplitterChildState | undefined {
    if (newPositions.align === undefined) {
        return undefined;
    } else {
        return {
            align: newPositions.align,
            bottom: newPositions.align === 'top' ? undefined : newPositions.bottom,
            left: newPositions.align === 'right' ? undefined : newPositions.left,
            liveUpdate: splitterProps.liveUpdate,
            right: newPositions.align === 'left' ? undefined : newPositions.right,
            top: newPositions.align === 'bottom' ? undefined : newPositions.top,
            type: 'splitter'
        };
    }
}

function calculatePanelState(newPositions: Positions, panelProps: LayoutPanelProps): LayoutPanelChildState | undefined {
    let align = panelProps.align;

    let state: LayoutPanelChildState = {
        align,
        bottom: align !== 'top' ? newPositions.bottom : undefined,
        height: panelProps.height,
        left: align !== 'right' ? newPositions.left : undefined,
        maxHeight: panelProps.maxHeight,
        maxWidth: panelProps.maxWidth,
        minHeight: panelProps.minHeight,
        minWidth: panelProps.minWidth,
        right: align !== 'left' ? newPositions.right : undefined,
        top: align !== 'bottom' ? newPositions.top : undefined,
        type: 'panel',
        width: panelProps.width
    };

    newPositions.align = align === 'client' ? undefined : align;
    if (align !== 'client') {
        newPositions[align] = (newPositions[align] || 0) + (panelProps[getMeasurementByAlign(align)] || 0);
    }

    return state;
}

function calculateChildState(child: React.ReactChild, newPositions: Positions): LayoutChildState {
    if (typeof child === 'string' || typeof child === 'number') {
        return undefined;
    } else if (child.type === LayoutPanel ) {
        return calculatePanelState(newPositions, child.props as LayoutPanelProps);
    } else if (child.type === LayoutSplitter) {
        return calculateSplitterState(newPositions, child.props as LayoutSplitterProps);
    } else {
        return undefined;
    }
}

function cloneLayoutChildState(state: LayoutChildState): LayoutChildState {
    let result = { ...state };
    return result;
}
