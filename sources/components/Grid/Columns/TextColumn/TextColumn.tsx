import * as React from 'react';
import * as warning from 'fbjs/lib/warning';

import { TextColumnProps, textColumnPropTypes } from './TextColumnProps';
import { TextCell, HeaderCell, InplaceEdit, CellContainer } from '../../Cells';

class TextCellContainer extends CellContainer<string> {
}

export class TextColumn extends React.PureComponent<TextColumnProps, {}> {

    static propTypes = textColumnPropTypes;

    static defaultProps: Partial<TextColumnProps> = {
        cellClass: TextCell,
        cellContainerClass: TextCellContainer,
        headerCellClass: HeaderCell,
        inplaceEditClass: InplaceEdit
    };

    render(): null {
        warning(false, 'Component <TextColumn /> should never render.');
        return null;
    }
}
