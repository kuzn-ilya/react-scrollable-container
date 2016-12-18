import { Orientation } from './../utils/types';
import { PropTypes } from 'react';

export interface LayoutChildContext {
    orientation: Orientation;
}

export const layoutChildContextTypes = {
    orientation: PropTypes.oneOf(['horizontal', 'vertical'])
};
