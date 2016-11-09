import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ScrollableContainer, Header, Content } from '../../sources';

import './app.less';

import { fakeData } from './data/fake.data';
import { Row } from './row/row.component';
import { Header as GridHeader } from './header/header.component';

const component = (
    <ScrollableContainer
        height="100%"
        width="100%"
        headerHeight={19}
        contentWidth={2190}
        contentHeight={1900}
    >
        <Header>
            <GridHeader />
        </Header>
        <Content>
            {fakeData.map((item) => (<Row model={item} />))}
        </Content>
    </ScrollableContainer>
);

ReactDOM.render(component, document.getElementById('app'));
