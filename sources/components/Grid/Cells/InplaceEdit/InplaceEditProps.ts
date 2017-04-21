import { PropTypes } from 'react';
import { ValidationMap } from '../../../../react';

export interface InplaceEditProps {
    // TODO: get rid of any type
    // tslint:disable-next-line:no-any
    value: any;
    onBlur?: () => void;
}

export const inplaceEditPropTypes: ValidationMap<InplaceEditProps> = {
    onBlur: PropTypes.func,
    value: PropTypes.any.isRequired
};
