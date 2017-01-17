import { Orientation } from '../../utils/types';
import { PropTypes } from 'react';
import { ValidationMap } from '../../react/ValidationMap';

import { Layout } from './Layout';

export interface LayoutChildContext {
    orientation?: Orientation;
    parent?: Layout;
}

export const layoutChildContextTypes: ValidationMap<LayoutChildContext> = {
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    parent: PropTypes.object
};
