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
    PropTypes.oneOf(['100%']),
    PropTypes.number
]);

export type Edge = 'left' | 'right' | 'top' | 'bottom';

export const edgePropType = PropTypes.oneOf([
    'left',
    'right',
    'top',
    'bottom'
]);

export type Align = Edge | 'client';

export const alignPropType = PropTypes.oneOfType([
    edgePropType,
    PropTypes.oneOf(['client'])
]);
