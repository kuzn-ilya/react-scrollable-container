import * as React from 'react';

import { Data } from './data/data';
import { fakeData } from './data/fake.data';
import { Row } from './row/row.component';
import { RowLeft } from './row/row-left.component';
import { HeaderCell } from './header-cell/header-cell.component';
import { ScrollableContainer } from '../../sources/container/ScrollableContainer';
import { Layout } from '../../sources/container/Layout';
import { LayoutPane } from '../../sources/container/LayoutPane';

interface HeaderCellModel {
    width: number;
    caption: string;
}

interface CompState {
    x: number;
    y: number;
    leftHeaderCellModels: HeaderCellModel[];
    rightHeaderCellModels: HeaderCellModel[];
    rowModels: Data[];
    rowsThumbWidth: number;
}

export class GridExample extends React.Component<{}, CompState> {
    constructor(props: {}) {
        super(props);
        this.handleHorizontalScrollPosChanged = this.handleHorizontalScrollPosChanged.bind(this);
        this.handleVerticallScrollVisibilityChanged = this.handleVerticallScrollVisibilityChanged.bind(this);
        this.state = {
            leftHeaderCellModels: [
                { caption: 'id', width: 30 },
                { caption: 'firstName', width: 150 }
            ],
            rightHeaderCellModels: [
                { caption: 'lastName', width: 150 },
                { caption: 'email', width: 150 },
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

    handleHorizontalScrollPosChanged: (x: number, y: number) => void = (x, y) => {
        if (this.state.x !== x || this.state.y !== y) {
            this.setState({
                leftHeaderCellModels: this.state.leftHeaderCellModels,
                rightHeaderCellModels: this.state.rightHeaderCellModels,
                rowModels: this.state.rowModels,
                rowsThumbWidth: this.state.rowsThumbWidth,
                x,
                y
            });
        }
    }

    mapHeader(data: HeaderCellModel[]): React.ReactNode {
        return data.map((model: HeaderCellModel, index: number) => <HeaderCell key={index} width={model.width} caption={model.caption} />);
    }

    mapRightRows(data: Data[]): React.ReactNode {
        return data.map((item: Data, index: number) => (<Row model={item} key={index}/>));
    }

    mapLeftRows(data: Data[]): React.ReactNode {
        return data.map((item: Data, index: number) => (<RowLeft model={item} key={index}/>));
    }

    handleVerticallScrollVisibilityChanged: (visible: boolean, thumbWidth: number) => void = (visible: boolean, thumbWidth: number) => {
        if (this.state.rowsThumbWidth !== thumbWidth) {
            this.setState({
                leftHeaderCellModels: this.state.leftHeaderCellModels,
                rightHeaderCellModels: this.state.rightHeaderCellModels,
                rowModels: this.state.rowModels,
                rowsThumbWidth: thumbWidth,
                x: this.state.x,
                y: this.state.y
            });
        }
    }

    render(): JSX.Element {
        return (
            <Layout orientation="vertical">
                <LayoutPane orientation="vertical">
                    <button
                        onClick={(): void => this.setState({
                            leftHeaderCellModels: this.state.leftHeaderCellModels,
                            rightHeaderCellModels: this.state.rightHeaderCellModels,
                            rowModels: this.state.rowModels.slice(0, this.state.rowModels.length - 1),
                            rowsThumbWidth: this.state.rowsThumbWidth,
                            x: this.state.x,
                            y: this.state.y
                        })}>
                        Remove
                    </button>
                </LayoutPane>
                <LayoutPane orientation="vertical" height="100%">
                    <Layout orientation="horizontal">
                        <LayoutPane orientation="horizontal" width="210px" showSplitter>
                            <Layout orientation="vertical">
                                <LayoutPane orientation="vertical" height="20px">
                                    <ScrollableContainer
                                        key="header"
                                        contentWidth={210}
                                        contentHeight="auto"
                                        overflowX="hidden" overflowY="hidden"
                                        onScrollPosChanged={this.handleHorizontalScrollPosChanged}
                                        data={this.state.leftHeaderCellModels}
                                        dataRenderer={this.mapHeader}
                                        width="100%"
                                        height="100%"
                                    />
                                </LayoutPane>
                                <LayoutPane orientation="vertical" height="100%">
                                    <ScrollableContainer
                                        key="body"
                                        contentWidth={210}
                                        contentHeight="auto"
                                        overflowX="hidden" overflowY="hidden"
                                        onScrollPosChanged={this.handleHorizontalScrollPosChanged}
                                        onVerticalScrollVisibilityChanged={this.handleVerticallScrollVisibilityChanged}
                                        scrollTop={this.state.y}
                                        data={this.state.rowModels}
                                        dataRenderer={this.mapLeftRows}
                                        width="100%"
                                        height="100%"
                                    />
                                </LayoutPane>
                            </Layout>
                        </LayoutPane>
                        <LayoutPane orientation="horizontal" width="100%">
                            <Layout orientation="vertical">
                                <LayoutPane orientation="vertical" height="20px">
                                    <ScrollableContainer id="container1"
                                        key="header"
                                        contentWidth={2010}
                                        contentHeight="auto"
                                        overflowX="hidden" overflowY="hidden"
                                        onScrollPosChanged={this.handleHorizontalScrollPosChanged}
                                        scrollLeft={this.state.x}
                                        data={this.state.rightHeaderCellModels}
                                        dataRenderer={this.mapHeader}
                                        width="100%"
                                        height="100%"
                                        vertScrollBarReplacerWidth={this.state.rowsThumbWidth}
                                    />
                                </LayoutPane>
                                <LayoutPane orientation="vertical" height="100%">
                                    <ScrollableContainer id="container2"
                                        key="body"
                                        contentWidth={2010}
                                        contentHeight="auto"
                                        overflowX="auto" overflowY="auto"
                                        onScrollPosChanged={this.handleHorizontalScrollPosChanged}
                                        onVerticalScrollVisibilityChanged={this.handleVerticallScrollVisibilityChanged}
                                        scrollLeft={this.state.x}
                                        data={this.state.rowModels}
                                        dataRenderer={this.mapRightRows}
                                        width="100%"
                                        height="100%"
                                    />
                                </LayoutPane>
                            </Layout>
                        </LayoutPane>
                    </Layout>
                </LayoutPane>
            </Layout>
        );
    }

}
