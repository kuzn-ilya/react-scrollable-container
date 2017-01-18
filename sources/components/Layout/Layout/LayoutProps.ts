import { PropTypes } from 'react';
import { ValidationMap } from '../../../react';

export interface LayoutProps {
    readonly className?: string;
    readonly height?: number | '100%';
    readonly width?: number | '100%';
}

export const layoutPropTypes: ValidationMap<LayoutProps> = {
    className: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
