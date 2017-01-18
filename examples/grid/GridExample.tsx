import * as React from 'react';

import { fakeData } from './data/fake.data';
import { Layout, LayoutPanel, Grid, Column } from '../../sources/components';

interface CompState {
    // tslint:disable-next-line:no-any
    data: any[];
}

export class GridExample extends React.Component<{}, CompState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            data: fakeData
        };
        this.removeLastItem = this.removeLastItem.bind(this);
    }

    removeLastItem: () => void = () => {
        this.setState({
            data: this.state.data!.slice(0, this.state.data!.length - 1)
        });
    }

    render(): JSX.Element {
        return (
            <Layout width="100%" height="100%">
                <LayoutPanel align="top" height={50}>
                    <button onClick={this.removeLastItem}>Remove Last</button>
                </LayoutPanel>
                <LayoutPanel align="client">
                    <Grid rowData={this.state.data} fixedColumnCount={2} rowHeight={20} headerHeight={20}>
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
