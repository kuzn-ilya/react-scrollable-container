import * as PropTypes from 'prop-types';
import { CSSProperties } from 'react';
import { Size, sizePropType } from '../../../utils';
import { ValidationMap } from '../../../react';

export interface ScrollableContentProps {
    readonly contentWidth?: Size;
    readonly contentHeight?: Size;
    readonly onResize?: (newWidth: number, newHeight: number) => void;
    readonly style?: CSSProperties;
}

export const scrollableContentPropTypes: ValidationMap<ScrollableContentProps> = {
    contentHeight: sizePropType,
    contentWidth: sizePropType,
    onResize: PropTypes.func,
    style: PropTypes.object
};
