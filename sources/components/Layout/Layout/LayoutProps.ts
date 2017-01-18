import { PropTypes } from 'react';
import { Orientation, orientationPropType } from '../../../utils';
import { ValidationMap } from '../../../react';

type ChildProps = {
    size: number | '100%',
    showSplitter?: boolean
};

export interface LayoutProps {
    readonly className?: string;
    readonly height?: number | '100%';
    readonly orientation: Orientation;
    readonly width?: number | '100%';
    readonly showSplitter?: boolean;
    readonly childrenProps: Array<ChildProps>;
}

export const layoutPropTypes: ValidationMap<LayoutProps> = {
    childrenProps: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    className: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    orientation: orientationPropType.isRequired,
    showSplitter: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
