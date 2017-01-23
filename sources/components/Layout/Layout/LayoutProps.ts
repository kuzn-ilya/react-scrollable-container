import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';
import { Size, sizePropType } from '../../../utils';

export interface LayoutProps {
    readonly className?: string;
    readonly height?: Size;
    readonly width?: Size;
}

export const layoutPropTypes: ValidationMap<LayoutProps> = {
    className: PropTypes.string,
    height: sizePropType,
    width: sizePropType
};
