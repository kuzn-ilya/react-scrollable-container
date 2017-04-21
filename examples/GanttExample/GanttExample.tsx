import * as React from 'react';

import { fakeData } from '../GridExample/data/fake.data';
import { Layout, LayoutPanel, LayoutSplitter, Grid, TextColumn, GanttColumn, HeaderRow, Row } from '../../sources/components';

interface CompState {
    // tslint:disable-next-line:no-any
    data: any[];
    customScrollBar?: boolean;
}

export class GanttExample extends React.Component<{}, CompState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            customScrollBar: false,
            data: fakeData
        };
    }

    removeLastItem = (): void => {
        this.setState({
            data: this.state.data!.slice(0, this.state.data!.length - 1)
        });
    }

    handleCustomScrollBarChanged = (e: React.FormEvent<HTMLInputElement>): void => {
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
                    <Grid fixedHeaderRowClass={HeaderRow}
                        fixedRowClass={Row}
                        scrollableHeaderRowClass={HeaderRow}
                        scrollableRowClass={Row}
                        customScrollBars={this.state.customScrollBar}
                        rowData={this.state.data}
                        fixedColumnCount={3}
                        rowHeight={20}
                        headerHeight={51}
                    >
                        <TextColumn caption="id" propName="id" width={30} align="right" />
                        <TextColumn caption="firstName" propName="firstName" width={150} />
                        <TextColumn caption="lastName" propName="lastName" width={150} />
                        <GanttColumn caption="shifts"
                            propName="shifts"
                            width={500}
                            startDate={new Date(2017, 3, 11)}
                            endDate={new Date(2017, 3, 13)}
                            zoomStartDate={new Date(2017, 3, 11)}
                            zoomEndDate={new Date(2017, 3, 13)}
                        />
                    </Grid>
                </LayoutPanel>
            </Layout>
        );
    }
}
