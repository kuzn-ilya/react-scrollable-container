import * as PropTypes from 'prop-types';
import { Size, sizePropType } from '../../../utils';
import { ValidationMap } from '../../../react';

export interface TransformableContainerProps {
    readonly contentWidth?: Size;
    readonly contentHeight?: Size;
    readonly scrollLeft?: number;
    readonly scrollTop?: number;
}

export const transformableContainerPropTypes: ValidationMap<TransformableContainerProps> = {
    contentHeight: sizePropType,
    contentWidth: sizePropType,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number
};
