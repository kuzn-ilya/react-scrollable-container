import { Orientation } from '../../utils/types';
import { PropTypes } from 'react';
import { ValidationMap } from '../../react/ValidationMap';

import { Layout2 } from './Layout2';

export interface Layout2ChildContext {
    orientation?: Orientation;
    parent?: Layout2;
}

export const layout2ChildContextTypes: ValidationMap<Layout2ChildContext> = {
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    parent: PropTypes.object
};
