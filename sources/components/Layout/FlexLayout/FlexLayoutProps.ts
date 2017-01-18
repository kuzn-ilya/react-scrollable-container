import { PropTypes } from 'react';
import { Orientation, orientationPropType } from '../../../utils';
import { ValidationMap } from '../../../react';

export interface LayoutProps {
    readonly className?: string;
    readonly height?: number | string;
    readonly orientation?: Orientation;
    readonly showSplitter?: boolean;
    readonly width?: number | string;
}

export const layoutPropTypes: ValidationMap<LayoutProps> = {
    className: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    orientation: orientationPropType,
    showSplitter: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
