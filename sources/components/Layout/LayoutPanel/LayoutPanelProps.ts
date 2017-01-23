import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';
import { Align, alignPropType } from '../../../utils';

export interface LayoutPanelProps {
    readonly align: Align;
    readonly height?: number;
    readonly showBottomShadow?: boolean;
    readonly showRightShadow?: boolean;
    readonly width?: number;
}

export const layoutPanelPropTypes: ValidationMap<LayoutPanelProps> = {
    align: alignPropType.isRequired,
    height: PropTypes.number,
    showBottomShadow: PropTypes.bool,
    showRightShadow: PropTypes.bool,
    width: PropTypes.number
};
