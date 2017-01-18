import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';

export interface LayoutPanelProps {
    readonly align: 'left' | 'right' | 'top' | 'bottom' | 'client';
    readonly height?: number;
    readonly showBottomShadow?: boolean;
    readonly showRightShadow?: boolean;
    readonly width?: number;
}

export const layoutPanelPropTypes: ValidationMap<LayoutPanelProps> = {
    align: PropTypes.oneOf(['left', 'right', 'top', 'bottom', 'client']).isRequired,
    height: PropTypes.number,
    showBottomShadow: PropTypes.bool,
    showRightShadow: PropTypes.bool,
    width: PropTypes.number
};
