import { PropTypes } from 'react';
import { Orientation, orientationPropType } from '../../../utils';
import { ValidationMap } from '../../../react';

// TODO come up with more appropriate names for coord, minCoord and maxCoord
export interface LayoutSplitterProps {
    readonly bottom?: number;
    readonly left?: number;
    readonly onResizing?: (newCoord: number) => void;
    readonly onResizeEnd?: () => void;
    readonly orientation: Orientation;
    readonly right?: number;
    readonly top?: number;
}

export const layoutSplitterPropTypes: ValidationMap<LayoutSplitterProps> = {
    bottom: PropTypes.number,
    left: PropTypes.number,
    onResizeEnd: PropTypes.func,
    onResizing: PropTypes.func,
    orientation: orientationPropType.isRequired,
    right: PropTypes.number,
    top: PropTypes.number
};
