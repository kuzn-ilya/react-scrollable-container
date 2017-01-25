import { List } from 'immutable';
import { Align, Edge } from '../../../utils';

export interface LayoutPanelChildState {
    align: Align;
    type: 'panel';
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
    height?: number;
    width?: number;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
}

export interface LayoutSplitterChildState {
    align: Edge;
    type: 'splitter';
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
    onResizing?: (newPosition: number) => void;
    onResizeEnd?: (newPosition: number) => void;
    liveUpdate?: boolean;
}

export type LayoutChildState = LayoutPanelChildState | LayoutSplitterChildState | undefined;

export interface LayoutState {
    childrenStates: List<LayoutChildState>;
    showNoDropCursor?: boolean;
}

export function isSplitter(item: LayoutChildState): item is LayoutSplitterChildState {
    return item !== undefined && item.type === 'splitter';
}

export function isPanel(item: LayoutChildState): item is LayoutPanelChildState {
    return item !== undefined && item.type === 'panel';
}
