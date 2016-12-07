import * as React from 'react';

import { Data } from './data/data';
import { fakeData } from './data/fake.data';
import { Row } from './row/row.component';
import { HeaderCell } from './header-cell/header-cell.component';
import { ScrollableContainer } from '../../sources/container/ScrollableContainer';
import { Layout } from '../../sources/container/Layout';

interface HeaderCellModel {
    width: number;
    caption: string;
}

interface CompState {
    x: number;
    y: number;
    headerCellModels: HeaderCellModel[];
    rowModels: Data[];
    rowsThumbWidth: number;
}

export class GridExample extends React.Component<{}, CompState> {
    constructor(props: {}) {
        super(props);
        this.handleScrollPosChanged = this.handleScrollPosChanged.bind(this);
        this.handleVerticallScrollVisibilityChanged = this.handleVerticallScrollVisibilityChanged.bind(this);
        this.state = {
            headerCellModels: [
                { caption: 'id', width: 30 },
                { caption: 'firstName', width: 150 },
                { caption: 'lastName', width: 150 },
                { caption: 'email', width: 250 },
                { caption: 'gender', width: 80 },
                { caption: 'ipAddress', width: 150 },
                { caption: 'creditCardType', width: 200 },
                { caption: 'creditCardNumber', width: 150 },
                { caption: 'creditCardExpires', width: 80 },
                { caption: 'city', width: 250 },
                { caption: 'company', width: 150 },
                { caption: 'department', width: 250 },
                { caption: 'currency', width: 150 }
            ],
            rowModels: fakeData,
            rowsThumbWidth: 0,
            x: 0,
            y: 0
        };

    }

    handleScrollPosChanged: (x: number, y: number) => void = (x, y) => {
        this.setState({
            headerCellModels: this.state.headerCellModels,
            rowModels: this.state.rowModels,
            rowsThumbWidth: this.state.rowsThumbWidth,
            x,
            y
        });
    }

    mapHeader(data: HeaderCellModel[]): React.ReactNode {
        return data.map((model: HeaderCellModel) => <HeaderCell width={model.width} caption={model.caption} />);
    }

    mapRows(data: Data[]): React.ReactNode {
        return data.map((item: Data, index: number) => (<Row model={item} key={index}/>));
    }

    handleVerticallScrollVisibilityChanged: (visible: boolean, thumbWidth: number) => void = (visible: boolean, thumbWidth: number) => {
        this.setState({
            headerCellModels: this.state.headerCellModels,
            rowModels: this.state.rowModels,
            rowsThumbWidth: thumbWidth,
            x: this.state.x,
            y: this.state.y
        });
    }

    render(): JSX.Element {
        return (
            <Layout>
                <button
                    onClick={(): void => this.setState({
                        headerCellModels: this.state.headerCellModels,
                        rowModels: this.state.rowModels.slice(0, this.state.rowModels.length - 1),
                        rowsThumbWidth: this.state.rowsThumbWidth,
                        x: this.state.x,
                        y: this.state.y
                    })}>
                    Remove
                </button>
                <Layout firstChildHeight="19px">
                    <ScrollableContainer id="container1"
                        contentWidth={2190}
                        contentHeight="auto"
                        overflowX="hidden" overflowY="hidden"
                        onScrollPosChanged={this.handleScrollPosChanged}
                        scrollLeft={this.state.x}
                        data={this.state.headerCellModels}
                        dataRenderer={this.mapHeader}
                        width="100%"
                        height="100%"
                        vertScrollBarReplacerWidth={this.state.rowsThumbWidth}
                    >
                    </ScrollableContainer>
                    <ScrollableContainer id="container2"
                        contentWidth={2190}
                        contentHeight="auto"
                        overflowX="auto" overflowY="auto"
                        onScrollPosChanged={this.handleScrollPosChanged}
                        onVerticalScrollVisibilityChanged={this.handleVerticallScrollVisibilityChanged}
                        scrollLeft={this.state.x}
                        data={this.state.rowModels}
                        dataRenderer={this.mapRows}
                        width="100%"
                        height="100%"
                    >
                    </ScrollableContainer>
                </Layout>
            </Layout>
        );
    }

}
