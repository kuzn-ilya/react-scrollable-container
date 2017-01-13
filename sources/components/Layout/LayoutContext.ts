import { Orientation } from '../../utils/types';
import { PropTypes } from 'react';
import { BaseLayout } from './Layout';
import { ValidationMap } from '../../react/ValidationMap';

export interface LayoutChildContext {
    orientation?: Orientation;
    parent?: BaseLayout;
}

export const layoutChildContextTypes: ValidationMap<LayoutChildContext> = {
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    parent: PropTypes.any // TODO chose more appropriate type
};
