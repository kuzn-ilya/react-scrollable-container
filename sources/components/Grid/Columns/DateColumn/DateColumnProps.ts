import { ValidationMap } from '../../../../react';
import * as objectAssign from 'object-assign';
import { TextAlign, textAlignPropType } from '../../../../utils';

import { ColumnProps, columnPropTypes } from '../Column/ColumnProps';

export interface DateColumnProps extends ColumnProps<Date> {
    align?: TextAlign;
}

export const dateColumnPropTypes: ValidationMap<DateColumnProps> = objectAssign({}, columnPropTypes, {
    align: textAlignPropType
});
