import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';

export interface LayoutSplitterProps {
    readonly onResizing?: (newPosition: number) => void;
    readonly onResizeEnd?: (newPosition: number) => void;
    readonly liveUpdate?: boolean;
}

export const layoutSplitterPropTypes: ValidationMap<LayoutSplitterProps> = {
    liveUpdate: PropTypes.bool,
    onResizeEnd: PropTypes.func,
    onResizing: PropTypes.func
};
