import * as React from 'react';

import { fakeData } from './data/fake.data';
import { Layout } from '../../sources/components';
import { Grid, Column } from '../../sources/components';

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
    }

    render(): JSX.Element {
        return (
            <Layout width="100%" height="100%" orientation="vertical">
                <Layout>
                    <button
                        onClick={(): void => this.setState({
                            data: this.state.data!.slice(0, this.state.data!.length - 1)
                        })}>
                        Remove Last
                    </button>
                </Layout>
                <Grid rowData={this.state.data} fixedColumnCount={2} rowHeight={20}>
                    <Column caption="id" propName="id" width={30} />
                    <Column caption="firstName" propName="firstName" width={150} />
                    <Column caption="id" propName="id" width={30} />
                    <Column caption="lastName" propName="lastName" width={150} />
                    <Column caption="email" propName="email" width={150} />
                    <Column caption="gender" propName="gender" width={80} />
                    <Column caption="ipAddress" propName="ipAddress" width={150} />
                    <Column caption="creditCardType" propName="creditCardType" width={200} />
                    <Column caption="creditCardNumber" propName="creditCardNumber" width={150} />
                    <Column caption="creditCardExpires" propName="creditCardExpires" width={80} />
                    <Column caption="city" propName="city" width={250} />
                    <Column caption="company" propName="company" width={150} />
                    <Column caption="department" propName="department" width={250} />
                    <Column caption="currency" propName="currency" width={150} />
                </Grid>
            </Layout>
        );
    }
}
