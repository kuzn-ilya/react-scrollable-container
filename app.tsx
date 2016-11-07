import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { RightPanel } from './sources/components/right-panel';
import './app.less';

import { fakeData } from './examples/grid/data/fake.data';
import { Row } from './examples/grid/row/row.component';

const children = fakeData.map(
    (item, index) => 
        (<Row model={item} />)
);

ReactDOM.render((
    <RightPanel 
        children={children} 
        height="100%"
        width="100%"
        headerHeight={50}
        headerChild={<div style={{width: 1028}}>Header</div>}
        childWidth={2190}
        childHeight={1900}
    />
), document.getElementById('app'));
