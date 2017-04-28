import * as PropTypes from 'prop-types';
import { ValidationMap } from '../../../../react';
import * as objectAssign from 'object-assign';

import { ColumnProps, columnPropTypes } from '../Column/ColumnProps';

export interface DateColumnProps extends ColumnProps<Date> {
    align?: 'left' | 'right' | 'center';
}

export const dateColumnPropTypes: ValidationMap<DateColumnProps> = objectAssign({}, columnPropTypes, {
    align: PropTypes.oneOf(['left', 'right', 'center'])
});
