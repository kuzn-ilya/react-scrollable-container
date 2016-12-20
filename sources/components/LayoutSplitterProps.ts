import { Orientation } from './../utils/types';

// TODO come up with more appropriate names for coord, minCoord and maxCoord
export interface LayoutSplitterProps {
    orientation: Orientation;
    coord: number;
    minCoord?: number;
    maxCoord?: number;
    onResizing?: (newCoord: number) => void;
    onResizeEnd?: () => void;
}
