import { PropTypes } from 'react';
import { Orientation, orientationPropType } from '../../../utils';
import { ValidationMap } from '../../../react';

// TODO come up with more appropriate names for coord, minCoord and maxCoord
export interface LayoutSplitterProps {
    readonly orientation: Orientation;
    readonly coord: number;
    readonly minCoord?: number;
    readonly maxCoord?: number;
    readonly onResizing?: (newCoord: number) => void;
    readonly onResizeEnd?: () => void;
}

export const layoutSplitterPropTypes: ValidationMap<LayoutSplitterProps> = {
    coord: PropTypes.number.isRequired,
    maxCoord: PropTypes.number,
    minCoord: PropTypes.number,
    onResizeEnd: PropTypes.func,
    onResizing: PropTypes.func,
    orientation: orientationPropType.isRequired
};
