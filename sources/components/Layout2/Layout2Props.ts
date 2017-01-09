import { PropTypes } from 'react';
import { Orientation, orientationPropType } from '../../utils/types';
import { ValidationMap } from '../../react/ValidationMap';

export interface Layout2Props {
    readonly height?: number | '100%';
    readonly orientation?: Orientation;
    readonly width?: number | '100%';
}

export const layout2PropTypes: ValidationMap<Layout2Props> = {
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    orientation: orientationPropType,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
