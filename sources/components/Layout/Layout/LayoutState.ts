import { List } from 'immutable';

import { Orientation } from '../../../utils';

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
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
    orientation?: Orientation;
}

export type LayoutChildState = LayoutPanelChildState | LayoutSplitterChildState | undefined;

export interface LayoutState {
    childrenStates: List<LayoutChildState>;
}
