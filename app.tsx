import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ScrollableContainer } from './sources/scrollable-container';
import { Header } from './sources/scrollable-container/header';
import { Content } from './sources/scrollable-container/content';
import './app.less';

import { fakeData } from './examples/grid/data/fake.data';
import { Row } from './examples/grid/row/row.component';
import { Header as GridHeader } from './examples/grid/header/header.component';

const children = fakeData.map(
    (item, index) => 
        (<Row model={item} />)
);

ReactDOM.render((
    <ScrollableContainer 
        height="100%"
        width="100%"
    >
        <Header height={19} childWidth={2190} children={<GridHeader childWidth={2190} />} />
        <Content children={children} 
            childWidth={2190}
            childHeight={1900}
            headerHeight={19}
        />
    </ScrollableContainer>
), document.getElementById('app'));
