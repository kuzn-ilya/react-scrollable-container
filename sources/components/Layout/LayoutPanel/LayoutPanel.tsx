import * as React from 'react';

import { LayoutPanelProps, layoutPanelPropTypes } from  './LayoutPanelProps';
import { warning } from '../../../utils';

export class LayoutPanel extends React.PureComponent<LayoutPanelProps, {}> {

    static propTypes = layoutPanelPropTypes;

    render(): null {
        warning('Component <LayoutPanel /> should never render.');
        return null;
    }
}
