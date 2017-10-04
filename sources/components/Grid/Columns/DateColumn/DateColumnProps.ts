import { ValidationMap } from '../../../../react';
import { TextAlign, textAlignPropType } from '../../../../utils';

import { ColumnProps, columnPropTypes } from '../Column/ColumnProps';

export interface DateColumnProps extends ColumnProps<Date> {
    align?: TextAlign;
}

export const dateColumnPropTypes: ValidationMap<DateColumnProps> = {
    ...columnPropTypes,
    align: textAlignPropType
};
