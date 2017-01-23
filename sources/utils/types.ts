import { PropTypes } from 'react';

export type Overflow = 'auto' | 'hidden' | 'scroll' | 'visible';

export const overflowPropType = PropTypes.oneOf([
    'auto',
    'hidden',
    'scroll',
    'visible'
]);

export type Size = '100%' | number;

export const sizePropType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);
