import { ValidationMap } from '../../../../react';
import { TextAlign, textAlignPropType } from '../../../../utils';

import { ColumnProps, columnPropTypes } from '../Column/ColumnProps';

export interface TextColumnProps extends ColumnProps<string> {
    align?: TextAlign;
}

export const textColumnPropTypes: ValidationMap<TextColumnProps> = {
    ...columnPropTypes,
    align: textAlignPropType
};
