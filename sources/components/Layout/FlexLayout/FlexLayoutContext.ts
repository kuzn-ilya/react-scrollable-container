import { PropTypes } from 'react';
import { Orientation } from '../../../utils';
import { Layout } from './FlexLayout';
import { ValidationMap } from '../../../react';

export interface LayoutChildContext {
    orientation?: Orientation;
    parent?: Layout;
}

export const layoutChildContextTypes: ValidationMap<LayoutChildContext> = {
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    parent: PropTypes.any // TODO chose more appropriate type
};
