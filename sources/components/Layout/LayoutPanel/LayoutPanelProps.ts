import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';
import { Align, alignPropType } from '../../../utils';

export interface LayoutPanelProps {
    readonly align: Align;
    readonly height?: number;
    readonly maxHeight?: number;
    readonly maxWidth?: number;
    readonly minHeight?: number;
    readonly minWidth?: number;
    readonly showBottomShadow?: boolean;
    readonly showRightShadow?: boolean;
    readonly width?: number;
}

export const layoutPanelPropTypes: ValidationMap<LayoutPanelProps> = {
    align: alignPropType.isRequired,
    height: PropTypes.number,
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    minHeight: PropTypes.number,
    minWidth: PropTypes.number,
    showBottomShadow: PropTypes.bool,
    showRightShadow: PropTypes.bool,
    width: PropTypes.number
};
