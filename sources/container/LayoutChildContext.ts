import { Orientation } from './../utils/types';
import { PropTypes } from 'react';
import { LayoutPane } from './LayoutPane';

export interface LayoutChildContext {
    orientation?: Orientation;
    parent?: LayoutPane;
}

export const layoutChildContextTypes = {
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    parent: PropTypes.any // TODO chose more appropriate type
};
