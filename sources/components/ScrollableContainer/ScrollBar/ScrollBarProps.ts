import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';

export interface ScrollBarProps {
    readonly leftOrTop?: number;
    readonly rightOrBottom?: number;
    readonly orientation: 'horizontal' | 'vertical';
    readonly min: number;
    readonly max: number;
    readonly position: number;
    readonly pageSize: number;
    readonly showButtons?: boolean;
    readonly smallChange: number;
    readonly largeChange: number;
    readonly onScroll?: (newPosition: number) => void;
}

export const scrollBarPropTypes: ValidationMap<ScrollBarProps> = {
    largeChange: PropTypes.number.isRequired,
    leftOrTop: PropTypes.number,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    onScroll: PropTypes.func,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    pageSize: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    rightOrBottom: PropTypes.number,
    showButtons: PropTypes.bool,
    smallChange: PropTypes.number.isRequired
};
