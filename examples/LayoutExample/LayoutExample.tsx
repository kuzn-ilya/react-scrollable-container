import * as React from 'react';

import { Layout, LayoutPanel, LayoutSplitter } from '../../sources/components';

interface CompState {
}

export class LayoutExample extends React.Component<{}, CompState> {
    constructor(props: {}) {
        super(props);
        this.state = {
        };
    }

    render(): JSX.Element {
        return (
            <Layout width="100%" height="100%">
                <LayoutPanel align="top" height={50}>
                    <div style={{backgroundColor: 'yellow', height: '100%', width: '100%'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="top" height={50}>
                    <div style={{backgroundColor: 'lightgray', height: '100%', width: '100%'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="left" width={50}>
                    <div style={{backgroundColor: 'yellow', height: '100%', width: '100%'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="left" width={50}>
                    <div style={{backgroundColor: 'white', height: '100%', width: '100%'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="client">
                    <div style={{backgroundColor: 'pink', height: '100%', width: '100%'}}>
                    </div>
                </LayoutPanel>
            </Layout>
        );
    }
}
