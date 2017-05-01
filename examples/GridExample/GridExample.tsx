import * as React from 'react';

import { fakeData } from './data/fake.data';
import { Data } from './data/data';
import { Layout, LayoutPanel, LayoutSplitter, Grid, TextColumn, DateColumn, HeaderRow, Row } from '../../sources/components';

interface CompState {
    // tslint:disable-next-line:no-any
    data: Data[];
    customScrollBar?: boolean;
    selectedRowIndexes?: Array<number>;
    propSelectedRowIndexes?: Array<number>;
    multiSelectRows?: boolean;
}

export class GridExample extends React.Component<{}, CompState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            customScrollBar: false,
            multiSelectRows: false,
            data: fakeData,
            propSelectedRowIndexes: [],
            selectedRowIndexes: []
        };
    }

    handleDeleteSelectedItem = (): void => {
        let data = new Array<Data>(...this.state.data!);

        if (this.state.selectedRowIndexes) {
            let sortedIndexes = this.state.selectedRowIndexes.sort((first, second) => first === second ? 0 : (first < second ? -1 : 1));
            for (let i = 0; i < sortedIndexes.length; i++)  {
                data.splice(sortedIndexes[i], 1);
            }
        }
        this.setState({
            data,
            propSelectedRowIndexes: [],
            selectedRowIndexes: []
        });
    }

    // tslint:disable-next-line:no-any
    handleCellChange = (rowIndex: number, propName: keyof Data, newValue: any): void => {
        let data = new Array<Data>(...this.state.data!);

        let rowData = {
            ...data[rowIndex]
        };

        rowData[propName] = newValue;
        data.splice(rowIndex, 1, rowData);

        this.setState({
            data
        });
    }

    handleCustomScrollBarChanged = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            customScrollBar: e.currentTarget.checked
        } as CompState);
    }

    handleMultiSelectRowsChanged = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            multiSelectRows: e.currentTarget.checked
        } as CompState);
    }

    handleRowSelectionChanged = (rowIndex: number[]): void => {
        this.setState({
            selectedRowIndexes: rowIndex
        } as CompState)
    }

    render(): JSX.Element {
        return (
            <Layout width="100%" height="100%">
                <LayoutPanel align="top" height={50}>
                    <div>
                        <button
                            onClick={this.handleDeleteSelectedItem}
                            disabled={!this.state.selectedRowIndexes || this.state.selectedRowIndexes.length === 0}
                        >
                            Delete
                        </button>
                        <input
                            type="checkbox" checked={this.state.customScrollBar}
                            onChange={this.handleCustomScrollBarChanged}
                        />
                        Custom ScrollBars
                        <input
                            type="checkbox" checked={this.state.multiSelectRows}
                            onChange={this.handleMultiSelectRowsChanged}
                        />
                        MultiSelectRows
                        <br/>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="client">
                    <Grid fixedHeaderRowClass={HeaderRow}
                        fixedRowClass={Row}
                        scrollableHeaderRowClass={HeaderRow}
                        scrollableRowClass={Row}
                        customScrollBars={this.state.customScrollBar}
                        rowData={this.state.data}
                        fixedColumnCount={2}
                        rowHeight={20}
                        headerHeight={51}
                        onRowSelectionChanged={this.handleRowSelectionChanged}
                        multiSelectRows={this.state.multiSelectRows}
                        selectedRowIndexes={this.state.propSelectedRowIndexes}
                        onCellChange={this.handleCellChange}
                    >
                        <TextColumn caption="id" propName="id" width={30} align="right" readonly />
                        <TextColumn caption="firstName" propName="firstName" width={150} />
                        <TextColumn caption="id" propName="id" width={30} align="right" readonly />
                        <TextColumn caption="lastName" propName="lastName" width={150} readonly />
                        <TextColumn caption="email" propName="email" width={150} />
                        <TextColumn caption="gender" propName="gender" width={80} />
                        <TextColumn caption="ipAddress" propName="ipAddress" width={150} align="center" />
                        <TextColumn caption="creditCardType" propName="creditCardType" width={200} />
                        <TextColumn caption="creditCardNumber" propName="creditCardNumber" width={150} />
                        <DateColumn caption="creditCardExpires" propName="creditCardExpires" width={80} align="center" />
                        <TextColumn caption="city" propName="city" width={250} />
                        <TextColumn caption="company" propName="company" width={150} />
                        <TextColumn caption="department" propName="department" width={250} />
                        <TextColumn caption="currency" propName="currency" width={150} />
                    </Grid>
                </LayoutPanel>
            </Layout>
        );
    }
}
