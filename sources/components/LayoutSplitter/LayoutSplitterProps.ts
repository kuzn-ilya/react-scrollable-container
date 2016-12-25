import { PropTypes } from 'react';
import { Orientation, orientationPropType } from '../../utils/types';

// TODO come up with more appropriate names for coord, minCoord and maxCoord
export interface LayoutSplitterProps {
    orientation: Orientation;
    coord: number;
    minCoord?: number;
    maxCoord?: number;
    onResizing?: (newCoord: number) => void;
    onResizeEnd?: () => void;
}

export const layoutSplitterPropTypes = {
    coord: PropTypes.number.isRequired,
    maxCoord: PropTypes.number,
    minCoord: PropTypes.number,
    onResizeEnd: PropTypes.func,
    onResizing: PropTypes.func,
    orientation: orientationPropType.isRequired
};
