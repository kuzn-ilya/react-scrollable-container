import * as React from 'react';
import * as ReactDOM from 'react-dom';


import './app.less';

//import { fakeData } from './data/fake.data';
//import { ScrollableContainer, Header, Content } from '../../sources';
//import { Row } from './row/row.component';
//import { Header as GridHeader } from './header/header.component';
//import { HeaderCell } from './header-cell/header-cell.component';
import { Container } from '../../sources/container/container';
import * as assign from 'object-assign';

// const component = (
//     <div style={{
//         width: "100%",
//         height: "100%"
//     }}>
//         <Container style={{
//             width: "100%",
//             height: "39px"
//         }}
//             contentWidth={2190}
//             contentHeight="auto"
//             overflowX="auto"
//             overflowY="auto"
//         >
//             <HeaderCell width={30} caption="id" />
//             <HeaderCell width={150} caption="firstName" />
//             <HeaderCell width={150} caption="lastName" />
//             <HeaderCell width={250} caption="email" />
//             <HeaderCell width={80} caption="gender" />
//             <HeaderCell width={150} caption="ipAddress" />
//             <HeaderCell width={200} caption="creditCardType" />
//             <HeaderCell width={150} caption="creditCardNumber" />
//             <HeaderCell width={80} caption="creditCardExpires" />
//             <HeaderCell width={250} caption="city" />
//             <HeaderCell width={150} caption="company" />
//             <HeaderCell width={250} caption="department" />
//             <HeaderCell width={150} caption="currency" />
//         </Container>
//         <Container style={{
//             width: "100%",
//             height: "90%"
//         }}
//             contentWidth={2190}
//             contentHeight="auto"
//             overflowX="auto"
//             overflowY="auto"
//         >
//             {fakeData.map((item) => (<Row model={item} />))}
//         </Container>
//     </div>
// );
class Comp extends React.Component<{}, { x: number, y: number }> {
    constructor(props: {}) {
        super(props);
        this.handleScrollPosChanged = this.handleScrollPosChanged.bind(this);
        this.state = { x: 0, y: 0 };
    }

    handleScrollPosChanged: (x: number, y: number) => void = (x, y) => {
        console.log("x", x, "y", y);
        this.setState(assign(this.state, { x, y }));
    };

    render() {
        return (
            <div>
                <Container id="container1" style={{left: "40px", top: "40px", width: "200px", height: "200px"}}
                    overflowX="auto" overflowY="auto"
                    onScrollPosChanged={this.handleScrollPosChanged}
                    scrollLeft={this.state.x}
                    scrollTop={this.state.y} >
                    <div style={{left: 300, top: 300, width: 10, height: 10, backgroundColor: "red", position: "absolute", display: "inline-block"}} />
                </Container>
                <Container id="container2" style={{left: "40px", top: "240px", width: "200px", height: "200px"}}
                    overflowX="auto" overflowY="auto"
                    onScrollPosChanged={this.handleScrollPosChanged}
                    scrollLeft={this.state.x}
                    scrollTop={this.state.y} >
                    <div style={{left: 300, top: 300, width: 10, height: 10, backgroundColor: "red", position: "absolute", display: "inline-block"}} />
                </Container>
            </div>
        );
    }

}

const component = (
    <Comp />
);

ReactDOM.render(component, document.getElementById('app'));
