import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';
import { Edge, edgePropType } from '../../../utils';

// TODO come up with more appropriate names for coord, minCoord and maxCoord
export interface LayoutSplitterProps {
    readonly bottom?: number;
    readonly left?: number;
    readonly onResizing?: (newCoord: number) => void;
    readonly onResizeEnd?: () => void;
    readonly align: Edge;
    readonly right?: number;
    readonly top?: number;
}

export const layoutSplitterPropTypes: ValidationMap<LayoutSplitterProps> = {
    align: edgePropType.isRequired,
    bottom: PropTypes.number,
    left: PropTypes.number,
    onResizeEnd: PropTypes.func,
    onResizing: PropTypes.func,
    right: PropTypes.number,
    top: PropTypes.number
};
