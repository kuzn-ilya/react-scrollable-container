import * as PropTypes from 'prop-types';
import { Size, sizePropType } from '../../../utils';
import { ValidationMap } from '../../../react';

export interface TransformableContainerProps {
    readonly contentWidth?: Size;
    readonly contentHeight?: Size;
    readonly scrollLeft?: number;
    readonly scrollTop?: number;
    readonly onScrollPosChanged?: (scrollLeft: number, scrollTop: number) => void;
}

export const transformableContainerPropTypes: ValidationMap<TransformableContainerProps> = {
    contentHeight: sizePropType,
    contentWidth: sizePropType,
    onScrollPosChanged: PropTypes.func,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number
};
