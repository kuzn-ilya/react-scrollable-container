import * as PropTypes from 'prop-types';
import { FocusEvent } from 'react';
import { ValidationMap } from '../../../../react';
import { Direction } from '../../../../utils';

export interface InplaceEditProps<V> {
    value?: V;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    onMove?: (direction: Direction) => void;
    onChange?: (newValue: V) => void;
}

// tslint:disable-next-line:no-any
export const inplaceEditPropTypes: ValidationMap<InplaceEditProps<any>> = {
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onMove: PropTypes.func,
    value: PropTypes.any
};
