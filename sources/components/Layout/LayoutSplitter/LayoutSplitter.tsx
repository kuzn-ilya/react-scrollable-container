import * as React from 'react';

import { LayoutSplitterProps, layoutSplitterPropTypes } from  './LayoutSplitterProps';
import * as warning from 'fbjs/lib/warning';

import '../../../styles/layout-splitter.css';

export class LayoutSplitter extends React.PureComponent<LayoutSplitterProps, {}> {

    static propTypes = layoutSplitterPropTypes;

    render(): null {
        warning(false, 'Component <LayoutSplitter /> should never render.');
        return null;
    }
}
