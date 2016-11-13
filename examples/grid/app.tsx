import * as React from 'react';
import * as ReactDOM from 'react-dom';


import './app.less';

import { fakeData } from './data/fake.data';
//import { ScrollableContainer, Header, Content } from '../../sources';
import { Row } from './row/row.component';
//import { Header as GridHeader } from './header/header.component';
import { HeaderCell } from './header-cell/header-cell.component';
import { Container } from '../../sources/container/container';

const component = (
    // <ScrollableContainer
    //     height="100%"
    //     width="100%"
    //     headerHeight={19}
    //     contentWidth={2190}
    //     contentHeight={1900}
    // >
    //     <Header>
    //         <GridHeader />
    //     </Header>
    //     <Content>
    //         {fakeData.map((item) => (<Row model={item} />))}
    //     </Content>
    // </ScrollableContainer>
    <div style={{
        width: "100%",
        height: "100%"
    }}>
        <Container style={{
            width: "100%",
            height: "39px"
        }}
            contentWidth={2190}
            contentHeight="auto"
            overflowX="auto"
            overflowY="auto"
        >
            <HeaderCell width={30} caption="id" />
            <HeaderCell width={150} caption="firstName" />
            <HeaderCell width={150} caption="lastName" />
            <HeaderCell width={250} caption="email" />
            <HeaderCell width={80} caption="gender" />
            <HeaderCell width={150} caption="ipAddress" />
            <HeaderCell width={200} caption="creditCardType" />
            <HeaderCell width={150} caption="creditCardNumber" />
            <HeaderCell width={80} caption="creditCardExpires" />
            <HeaderCell width={250} caption="city" />
            <HeaderCell width={150} caption="company" />
            <HeaderCell width={250} caption="department" />
            <HeaderCell width={150} caption="currency" />
        </Container>
        <Container style={{
            width: "100%",
            height: "90%"
        }}
            contentWidth={2190}
            contentHeight="auto"
            overflowX="auto"
            overflowY="auto"
        >
            {fakeData.map((item) => (<Row model={item} />))}
        </Container>
    </div>
    // <Container style={{left: "40px", top: "40px", width: "200px", height: "200px"}} contentWidth={400} contentHeight={400} overflowX="auto" overflowY="auto">
    //     <div style={{top: "0px", left: "200px", display: "inline-block", position: "absolute", border: "1px solid red"}}>Test 1</div>
    //     <div style={{top: "20px", left: "20px", display: "inline-block", position: "absolute", border: "1px solid red"}}>Test 2</div>
    //     <div style={{top: "100px", left: "20px", display: "inline-block", position: "absolute", border: "1px solid red"}}>Test 3</div>
    //     <div style={{top: "140px", left: "0px", display: "inline-block", position: "absolute", border: "1px solid red"}}>Test 4</div>
    //     <div style={{top: "260px", left: "0px", display: "inline-block", position: "absolute", border: "1px solid red"}}>Test 5</div>
    // </Container>
);

ReactDOM.render(component, document.getElementById('app'));
