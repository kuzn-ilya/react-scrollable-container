import * as React from 'react';

import { Data } from './data/data';
import { fakeData } from './data/fake.data';
import { Row } from './row/row.component';
import { RowLeft } from './row/row-left.component';
import { HeaderCell } from './header-cell/header-cell.component';
import { Layout, ScrollableContainer } from '../../sources/components';

interface HeaderCellModel {
    width: number;
    caption: string;
}

interface CompState {
    x?: number;
    y?: number;
    leftHeaderCellModels?: HeaderCellModel[];
    rightHeaderCellModels?: HeaderCellModel[];
    rowModels?: Data[];
    rowsThumbWidth?: number;
    colsThumbHeight?: number;
}

export class GridExample extends React.Component<{}, CompState> {
    constructor(props: {}) {
        super(props);
        this.handleHorizontalScrollPosChanged = this.handleHorizontalScrollPosChanged.bind(this);
        this.handleVerticallScrollVisibilityChanged = this.handleVerticallScrollVisibilityChanged.bind(this);
        this.handleHorizontalScrollVisibilityChanged = this.handleHorizontalScrollVisibilityChanged.bind(this);
        this.state = {
            colsThumbHeight: 0,
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
        if (this.state.x !== x) {
            this.setState({ x });
        }

        if (this.state.y !== y) {
            this.setState({ y });
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

    handleHorizontalScrollVisibilityChanged: (visible: boolean, thumbWidth: number) => void = (visible: boolean, thumbHeight: number) => {
        if (this.state.colsThumbHeight !== thumbHeight) {
            this.setState({
                colsThumbHeight: thumbHeight
            });
        }
    }

    handleVerticallScrollVisibilityChanged: (visible: boolean, thumbWidth: number) => void = (visible: boolean, thumbWidth: number) => {
        if (this.state.rowsThumbWidth !== thumbWidth) {
            this.setState({
                rowsThumbWidth: thumbWidth
            });
        }
    }

    render(): JSX.Element {
        return (
            <Layout width="100%" height="100%" orientation="vertical">
                <Layout>
                    <button
                        onClick={(): void => this.setState({
                            rowModels: this.state.rowModels!.slice(0, this.state.rowModels!.length - 1)
                        })}>
                        Remove
                    </button>
                </Layout>
                <Layout height="100%" orientation="horizontal">
                    <Layout width="210px" showSplitter orientation="vertical">
                        <Layout height="20px">
                            <ScrollableContainer
                                key="header"
                                contentWidth={210}
                                contentHeight="auto"
                                overflowX="hidden" overflowY="hidden"
                                data={this.state.leftHeaderCellModels}
                                dataRenderer={this.mapHeader}
                                width="100%"
                                height="100%"
                            />
                        </Layout>
                        <Layout height="100%">
                            <ScrollableContainer
                                key="body"
                                contentWidth={210}
                                contentHeight="auto"
                                horzScrollBarReplacerHeight={this.state.colsThumbHeight}
                                overflowX="hidden" overflowY="hidden"
                                onVerticalScrollVisibilityChanged={this.handleVerticallScrollVisibilityChanged}
                                scrollTop={this.state.y}
                                data={this.state.rowModels}
                                dataRenderer={this.mapLeftRows}
                                width="100%"
                                height="100%"
                            />
                        </Layout>
                    </Layout>
                    <Layout width="100%" orientation="vertical">
                        <Layout height="20px">
                            <ScrollableContainer id="container1"
                                key="header"
                                contentWidth={2010}
                                contentHeight="auto"
                                overflowX="hidden" overflowY="hidden"
                                scrollLeft={this.state.x}
                                data={this.state.rightHeaderCellModels}
                                dataRenderer={this.mapHeader}
                                width="100%"
                                height="100%"
                                vertScrollBarReplacerWidth={this.state.rowsThumbWidth}
                            />
                        </Layout>
                        <Layout height="100%">
                            <ScrollableContainer id="container2"
                                key="body"
                                contentWidth={2010}
                                contentHeight="auto"
                                overflowX="auto" overflowY="auto"
                                onScrollPosChanged={this.handleHorizontalScrollPosChanged}
                                onVerticalScrollVisibilityChanged={this.handleVerticallScrollVisibilityChanged}
                                onHorizontalScrollVisibilityChanged={this.handleHorizontalScrollVisibilityChanged}
                                scrollLeft={this.state.x}
                                scrollTop={this.state.y}
                                data={this.state.rowModels}
                                dataRenderer={this.mapRightRows}
                                width="100%"
                                height="100%"
                            />
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
