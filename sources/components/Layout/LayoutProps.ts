import { PropTypes } from 'react';
import { Orientation, orientationPropType } from '../../utils/types';
import { ValidationMap } from '../../react/ValidationMap';

export interface LayoutProps {
    readonly className?: string;
    readonly height?: number | '100%';
    readonly orientation?: Orientation;
    readonly width?: number | '100%';
    readonly showBottomShadow?: boolean;
    readonly showRightShadow?: boolean;
}

export const layoutPropTypes: ValidationMap<LayoutProps> = {
    className: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    orientation: orientationPropType,
    showBottomShadow: PropTypes.bool,
    showRightShadow: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
