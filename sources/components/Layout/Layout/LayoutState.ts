import { List } from 'immutable';

import { Orientation } from '../../../utils';

export interface LayoutChildState {
    index: number;
    type?: 'panel' | 'splitter';
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
    height?: number;
    width?: number;
    orientation?: Orientation;
}

export interface LayoutState {
    childrenStates: List<LayoutChildState>;
}
