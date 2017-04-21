import { PropTypes } from 'react';
import { ValidationMap } from '../../../../react';

export interface InplaceEditProps {
    // TODO: get rid of any type
    // tslint:disable-next-line:no-any
    value: any;
    onBlur?: () => void;
    onMove?: (direction: 'down' | 'left' | 'right' | 'up') => void;
}

export const inplaceEditPropTypes: ValidationMap<InplaceEditProps> = {
    onBlur: PropTypes.func,
    onMove: PropTypes.func,
    value: PropTypes.any.isRequired
};
