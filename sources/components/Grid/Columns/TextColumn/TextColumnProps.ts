import { ValidationMap } from '../../../../react';
import * as objectAssign from 'object-assign';
import { TextAlign, textAlignPropType } from '../../../../utils';

import { ColumnProps, columnPropTypes } from '../Column/ColumnProps';

export interface TextColumnProps extends ColumnProps<string> {
    align?: TextAlign;
}

export const textColumnPropTypes: ValidationMap<TextColumnProps> = objectAssign({}, columnPropTypes, {
    align: textAlignPropType
});
