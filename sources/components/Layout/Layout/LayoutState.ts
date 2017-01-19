import { List } from 'immutable';

export interface LayoutPanelChildState {
    type: 'panel';
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
    height?: number;
    width?: number;
}

export interface LayoutSplitterChildState {
    type: 'splitter';
    bottom: number;
    top: number;
    left: number;
    right: number;
    orientation: 'left' | 'right' | 'top' | 'bottom';
}

export type LayoutChildState = LayoutPanelChildState | LayoutSplitterChildState | undefined;

export interface LayoutState {
    childrenStates: List<LayoutChildState>;
}
