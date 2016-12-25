import { PropTypes } from 'react';
import { Orientation, orientationPropType } from '../../utils/types';

export interface LayoutProps {
    height?: number | string;
    orientation?: Orientation;
    showSplitter?: boolean;
    width?: number | string;
}

export const layoutPropTypes = {
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    orientation: orientationPropType,
    showSplitter: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
