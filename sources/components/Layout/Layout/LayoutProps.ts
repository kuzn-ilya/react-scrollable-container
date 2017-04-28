import * as PropTypes from 'prop-types';
import { ValidationMap } from '../../../react';
import { Size, sizePropType } from '../../../utils';

export interface LayoutProps {
    readonly className?: string;
    readonly height?: Size;
    readonly width?: Size;
    readonly onResize?: () => void;
}

export const layoutPropTypes: ValidationMap<LayoutProps> = {
    className: PropTypes.string,
    height: sizePropType,
    onResize: PropTypes.func,
    width: sizePropType
};
