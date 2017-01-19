import * as React from 'react';

import { LayoutSplitterProps, layoutSplitterPropTypes } from  './LayoutSplitterProps';
import { warning } from  '../../../utils';

import '../../../styles/layout-splitter.css';

export class LayoutSplitter extends React.PureComponent<LayoutSplitterProps, {}> {

    static propTypes = layoutSplitterPropTypes;

    render(): null {
        warning('Component <LayoutSplitter /> should never render.');
        return null;
    }
}
