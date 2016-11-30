import * as React from 'react';
import * as ReactDOM from 'react-dom';


import './app.less';

import { fakeData } from './data/fake.data';
import { Row } from './row/row.component';
import { HeaderCell } from './header-cell/header-cell.component';
import { ContainerScrollable } from '../../sources/container/container-scrollable';

interface HeaderCellModel {
    width: number;
    caption: string;
}

interface CompState {
    x: number;
    y: number;
    headerCellModels: HeaderCellModel[];
    rowModels: any[];
}

class Comp extends React.Component<{}, CompState> {
    constructor(props: {}) {
        super(props);
        this.handleScrollPosChanged = this.handleScrollPosChanged.bind(this);
        this.state = {
            x: 0,
            y: 0,
            headerCellModels: [
                { width: 30, caption: "id" },
                { width: 150, caption: "firstName" },
                { width: 150, caption: "lastName" },
                { width: 250, caption: "email" },
                { width: 80, caption: "gender" },
                { width: 150, caption: "ipAddress" },
                { width: 200, caption: "creditCardType" },
                { width: 150, caption: "creditCardNumber" },
                { width: 80, caption: "creditCardExpires" },
                { width: 250, caption: "city" },
                { width: 150, caption: "company" },
                { width: 250, caption: "department" },
                { width: 150, caption: "currency" }
            ],
            rowModels: fakeData
        };

    }

    handleScrollPosChanged: (x: number, y: number) => void = (x, y) => {
        this.setState( {x, y, headerCellModels: this.state.headerCellModels, rowModels: this.state.rowModels} );
    }

    mapHeader(childState: HeaderCellModel[]) {
        return childState.map((model) => <HeaderCell width={model.width} caption={model.caption} />);
    }
    mapRows(childState: any[]) {
        return childState.map((item, index) => (<Row model={item} key={index}/>));
    }

    render() {
        return (
            <div style={{
                width: "100%",
                height: "100%"
            }}>
                <button onClick={() => this.setState({x: this.state.x, y: this.state.y, headerCellModels: this.state.headerCellModels, rowModels: this.state.rowModels.slice(0, this.state.rowModels.length - 1)})}>Remove</button>
                <ContainerScrollable id="container1"
                    contentWidth={2190}
                    contentHeight="auto"
                    overflowX="auto" overflowY="auto"
                    onScrollPosChanged={this.handleScrollPosChanged}
                    scrollLeft={this.state.x}
                    childState={this.state.headerCellModels}
                    children= {this.mapHeader}
                    width="100%"
                    height="39px"
                >
                </ContainerScrollable>
                <ContainerScrollable id="container2"
                    contentWidth={2190}
                    contentHeight="auto"
                    overflowX="auto" overflowY="auto"
                    onScrollPosChanged={this.handleScrollPosChanged}
                    scrollLeft={this.state.x}
                    childState={this.state.rowModels}
                    children={this.mapRows}
                    width="100%"
                    height="90%"
                >
                </ContainerScrollable>
            </div>
        );
    }

}

ReactDOM.render(<Comp />, document.getElementById('app'));
