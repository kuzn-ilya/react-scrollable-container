import * as PropTypes from 'prop-types';
import { ValidationMap } from '../../../../react';
import * as objectAssign from 'object-assign';

import { ColumnProps, columnPropTypes } from '../Column/ColumnProps';

export interface TextColumnProps extends ColumnProps<string> {
    align?: 'left' | 'right' | 'center';
}

export const textColumnPropTypes: ValidationMap<TextColumnProps> = objectAssign({}, columnPropTypes, {
    align: PropTypes.oneOf(['left', 'right', 'center'])
});
