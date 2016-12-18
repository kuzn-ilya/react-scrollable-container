import { Orientation } from './../utils/types';
import { PropTypes } from 'react';
import { Layout } from './Layout';

export interface LayoutChildContext {
    orientation?: Orientation;
    parent?: Layout;
}

export const layoutChildContextTypes = {
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    parent: PropTypes.any // TODO chose more appropriate type
};
