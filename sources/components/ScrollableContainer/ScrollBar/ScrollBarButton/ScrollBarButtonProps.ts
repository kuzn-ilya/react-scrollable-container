import { PropTypes } from 'react';
import { ValidationMap } from '../../../../react';

import { Edge, edgePropType } from '../../../../utils';

export interface ScrollBarButtonProps {
    disabled?: boolean;
    onScroll?: () => void;
    size: number;
    type: Edge;
}

export const scrollBarButtonPropTypes: ValidationMap<ScrollBarButtonProps> = {
    disabled: PropTypes.bool,
    onScroll: PropTypes.func,
    size: PropTypes.number.isRequired,
    type: edgePropType.isRequired
};
