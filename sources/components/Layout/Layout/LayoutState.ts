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
}

export interface LayoutSplitterChildState {
    type?: 'splitter';
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
    align: Edge;
    onResizing?: (newCoord: number) => void;
    onResizeEnd?: () => void;
}

export type LayoutChildState = LayoutPanelChildState | LayoutSplitterChildState | undefined;

export interface LayoutState {
    childrenStates: List<LayoutChildState>;
}
