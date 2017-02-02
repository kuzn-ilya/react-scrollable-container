import { PropTypes } from 'react';
import { ValidationMap } from '../../../../react';

export interface ScrollBarThumbProps {
    readonly orientation: 'horizontal' | 'vertical';
    readonly position: number;
    readonly size: number;
    readonly thickness: number;

    readonly onDragging?: (newPosition: number) => void;
    readonly onDragEnd?: () => void;
}

export const scrollBarThumbPropTypes: ValidationMap<ScrollBarThumbProps> = {
    onDragEnd: PropTypes.func,
    onDragging: PropTypes.func,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    position: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    thickness: PropTypes.number.isRequired
};
