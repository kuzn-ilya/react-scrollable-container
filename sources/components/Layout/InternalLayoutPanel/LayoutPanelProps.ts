import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';

export interface LayoutPanelProps {
    readonly bottom?: number;
    readonly height?: number;
    readonly left?: number;
    readonly right?: number;
    readonly top?: number;
    readonly showBottomShadow?: boolean;
    readonly showRightShadow?: boolean;
    readonly width?: number;
}

export const layoutPanelPropTypes: ValidationMap<LayoutPanelProps> = {
    bottom: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    showBottomShadow: PropTypes.bool,
    showRightShadow: PropTypes.bool,
    top: PropTypes.number,
    width: PropTypes.number
};
