import * as React from 'react';

import { LayoutPanelProps, layoutPanelPropTypes } from  './LayoutPanelProps';
import * as warning from 'fbjs/lib/warning';

export class LayoutPanel extends React.PureComponent<LayoutPanelProps, {}> {

    static propTypes = layoutPanelPropTypes;

    render(): null {
        warning(false, 'Component <LayoutPanel /> should never render.');
        return null;
    }
}
