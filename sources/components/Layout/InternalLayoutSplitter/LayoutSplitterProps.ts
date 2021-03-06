import * as PropTypes from 'prop-types';
import { ValidationMap } from '../../../react';
import { Edge, edgePropType } from '../../../utils';

export interface LayoutSplitterProps {
    readonly bottom?: number;
    readonly left?: number;
    readonly onResizing?: (newPosition: number) => void;
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
