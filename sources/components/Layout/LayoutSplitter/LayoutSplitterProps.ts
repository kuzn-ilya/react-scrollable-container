import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';

// TODO come up with more appropriate names for coord, minCoord and maxCoord
export interface LayoutSplitterProps {
    readonly onResizing?: (newCoord: number) => void;
    readonly onResizeEnd?: () => void;
}

export const layoutSplitterPropTypes: ValidationMap<LayoutSplitterProps> = {
    onResizeEnd: PropTypes.func,
    onResizing: PropTypes.func
};
