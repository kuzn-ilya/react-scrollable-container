import { PropTypes } from 'react';

export type Overflow = 'auto' | 'hidden' | 'scroll' | 'visible';

export const overflowPropType = PropTypes.oneOf([
    'auto',
    'hidden',
    'scroll',
    'visible'
]);

export type Size = 'auto' | number;

export const sizePropType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);

export type Orientation = 'horizontal' | 'vertical';

export const orientationPropType = PropTypes.oneOf([
    'horizontal',
    'vertical'
]);
