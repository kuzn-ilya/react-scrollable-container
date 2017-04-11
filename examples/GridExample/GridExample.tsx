import * as React from 'react';

import { fakeData } from './data/fake.data';
import { Layout, LayoutPanel, LayoutSplitter, Grid, Column, HeaderRow, Row } from '../../sources/components';

interface CompState {
    // tslint:disable-next-line:no-any
    data: any[];
    customScrollBar?: boolean;
}

export class GridExample extends React.Component<{}, CompState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            customScrollBar: false,
            data: fakeData
        };
        this.removeLastItem = this.removeLastItem.bind(this);
        this.handleCustomScrollBarChanged = this.handleCustomScrollBarChanged.bind(this);
    }

    removeLastItem: () => void = () => {
        this.setState({
            data: this.state.data!.slice(0, this.state.data!.length - 1)
        });
    }

    handleCustomScrollBarChanged: (e: React.FormEvent<HTMLInputElement>) => void = (e) => {
        this.setState({
            customScrollBar: e.currentTarget.checked
        } as CompState);
    }

    render(): JSX.Element {
        return (
            <Layout width="100%" height="100%">
                <LayoutPanel align="top" height={50}>
                    <div>
                        <button onClick={this.removeLastItem}>Remove Last</button>
                        <input type="checkbox" checked={this.state.customScrollBar}
                            onChange={this.handleCustomScrollBarChanged}/>Custom ScrollBars <br/>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="client">
                    <Grid headerRowClass={HeaderRow} rowClass={Row}
                        customScrollBars={this.state.customScrollBar}
                        rowData={this.state.data} fixedColumnCount={2} rowHeight={20} headerHeight={21}
                    >
                        <Column caption="id" propName="id" width={30} align="right" />
                        <Column caption="firstName" propName="firstName" width={150} />
                        <Column caption="id" propName="id" width={30} align="right" />
                        <Column caption="lastName" propName="lastName" width={150} />
                        <Column caption="email" propName="email" width={150} />
                        <Column caption="gender" propName="gender" width={80} />
                        <Column caption="ipAddress" propName="ipAddress" width={150} align="center" />
                        <Column caption="creditCardType" propName="creditCardType" width={200} />
                        <Column caption="creditCardNumber" propName="creditCardNumber" width={150} />
                        <Column caption="creditCardExpires" propName="creditCardExpires" width={80} align="center" />
                        <Column caption="city" propName="city" width={250} />
                        <Column caption="company" propName="company" width={150} />
                        <Column caption="department" propName="department" width={250} />
                        <Column caption="currency" propName="currency" width={150} />
                    </Grid>
                </LayoutPanel>
            </Layout>
        );
    }
}
