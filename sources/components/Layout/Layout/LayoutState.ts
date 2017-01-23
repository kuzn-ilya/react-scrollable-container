import { List } from 'immutable';

export interface LayoutPanelChildState {
    align: 'left' | 'right' | 'top' | 'bottom' | 'client';
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
    align: 'left' | 'right' | 'top' | 'bottom';
    onResizing?: (newCoord: number) => void;
    onResizeEnd?: () => void;
}

export type LayoutChildState = LayoutPanelChildState | LayoutSplitterChildState | undefined;

export interface LayoutState {
    childrenStates: List<LayoutChildState>;
}
