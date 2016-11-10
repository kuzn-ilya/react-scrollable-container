import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import { ScrollableContainer, Header, Content } from '../../sources';

import './app.less';

// import { fakeData } from './data/fake.data';
// import { Row } from './row/row.component';
// import { Header as GridHeader } from './header/header.component';
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
    <Container height="200px" width="200px" style={{left: "40px", top: "40px"}}>
        <div style={{top: "0px", left: "200px", display: "inline-block", position: "absolute", border: "1px solid red", whiteSpace: "nowrap"}}>Test 1</div>
        <div style={{top: "20px", left: "20px", display: "inline-block", position: "absolute", border: "1px solid red", whiteSpace: "nowrap"}}>Test 2</div>
        <div style={{top: "100px", left: "20px", display: "inline-block", position: "absolute", border: "1px solid red", whiteSpace: "nowrap"}}>Test 3</div>
        <div style={{top: "140px", left: "0px", display: "inline-block", position: "absolute", border: "1px solid red", whiteSpace: "nowrap"}}>Test 4</div>
        <div style={{top: "260px", left: "0px", display: "inline-block", position: "absolute", border: "1px solid red", whiteSpace: "nowrap"}}>Test 5</div>
    </Container>
);

ReactDOM.render(component, document.getElementById('app'));
