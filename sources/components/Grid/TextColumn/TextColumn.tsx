import * as React from 'react';
import * as warning from 'fbjs/lib/warning';

import { TextColumnProps, textColumnPropTypes } from './TextColumnProps';
import { TextCell } from '../TextCell';

export class TextColumn extends React.PureComponent<TextColumnProps, {}> {

    static propTypes = textColumnPropTypes;

    static defaultProps: Partial<TextColumnProps> = {
        cellClass: TextCell
    };

    render(): null {
        warning(false, 'Component <TextColumn /> should never render.');
        return null;
    }
}
