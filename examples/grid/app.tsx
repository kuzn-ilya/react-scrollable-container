import * as React from 'react';
import * as ReactDOM from 'react-dom';


import './app.less';

import { fakeData } from './data/fake.data';
import { Row } from './row/row.component';
import { HeaderCell } from './header-cell/header-cell.component';
import { Container } from '../../sources/container/container';
import * as assign from 'object-assign';

class Comp extends React.Component<{}, { x: number, y: number }> {
    constructor(props: {}) {
        super(props);
        this.handleScrollPosChanged = this.handleScrollPosChanged.bind(this);
        this.state = { x: 0, y: 0 };
    }

    handleScrollPosChanged: (x: number, y: number) => void = (x, y) => {
        this.setState(assign(this.state, { x, y }));
    };

    render() {
        return (
            <div style={{
                width: "100%",
                height: "100%"
            }}>
                <Container id="container1" style={{
                    width: "100%",
                    height: "39px"
                }}
                    contentWidth={2190}
                    contentHeight="auto"
                    overflowX="auto" overflowY="auto"
                    onScrollPosChanged={this.handleScrollPosChanged}
                    scrollLeft={this.state.x}
                    scrollTop={this.state.y} 
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
                <Container id="container2" style={{
                        width: "100%",
                        height: "90%"
                    }}
                    contentWidth={2190}
                    contentHeight="auto"
                    overflowX="auto" overflowY="auto"
                    onScrollPosChanged={this.handleScrollPosChanged}
                    scrollLeft={this.state.x}
                    scrollTop={this.state.y} 
                >
                     {fakeData.map((item) => (<Row model={item} />))}
                </Container>
            </div>
        );
    }

}

const component = (
    <Comp />
);

ReactDOM.render(component, document.getElementById('app'));
