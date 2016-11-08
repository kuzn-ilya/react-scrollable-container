import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ScrollableContainer, Header, Content } from '../../sources';

import './app.less';

import { fakeData } from './data/fake.data';
import { Row } from './row/row.component';
import { Header as GridHeader } from './header/header.component';

const children = fakeData.map(
    (item, index) => 
        (<Row model={item} />)
);

ReactDOM.render((
    <ScrollableContainer 
        height="100%"
        width="100%"
        headerHeight={19}
        contentWidth={2190}
        contentHeight={1900}
    >
        <Header>
            <GridHeader childWidth={2190} />
        </Header>
        <Content>
            {children}
        </Content>
    </ScrollableContainer>
), document.getElementById('app'));
