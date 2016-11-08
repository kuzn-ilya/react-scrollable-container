import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ScrollableContainer } from './sources/scrollable-container';
import './app.less';

import { fakeData } from './examples/grid/data/fake.data';
import { Row } from './examples/grid/row/row.component';
import { Header } from './examples/grid/header/header.component';

const children = fakeData.map(
    (item, index) => 
        (<Row model={item} />)
);

ReactDOM.render((
    <ScrollableContainer 
        children={children}
        height="100%"
        width="100%"
        headerHeight={19}
        headerChildren={<Header childWidth={2190}/>}
        childWidth={2190}
        childHeight={1900}
    />
), document.getElementById('app'));
