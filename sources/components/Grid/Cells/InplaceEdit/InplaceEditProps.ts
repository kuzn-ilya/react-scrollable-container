import * as PropTypes from 'prop-types';
import { FocusEvent } from 'react';
import { ValidationMap } from '../../../../react';

export interface InplaceEditProps {
    // TODO: get rid of any type
    // tslint:disable-next-line:no-any
    value: any;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    onMove?: (direction: 'down' | 'left' | 'right' | 'up') => void;
}

export const inplaceEditPropTypes: ValidationMap<InplaceEditProps> = {
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onMove: PropTypes.func,
    value: PropTypes.any.isRequired
};
