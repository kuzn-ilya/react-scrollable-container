import * as React from 'react';

import { Layout, LayoutPanel, LayoutSplitter } from '../../sources/components';
import '../page/styles.css';

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
                    <div className="div-text" style={{backgroundColor: 'yellow'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="right" width={50}>
                    <div className="div-text" style={{backgroundColor: 'lightgray'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="top" height={70}>
                    <div className="div-text" style={{backgroundColor: 'lightgray'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="left" width={50}>
                    <div className="div-text" style={{backgroundColor: 'yellow'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="left" width={70}>
                    <div className="div-text" style={{backgroundColor: 'white'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="bottom" height={100}>
                    <div className="div-text" style={{backgroundColor: 'yellow'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="client">
                    <div className="div-text" style={{backgroundColor: 'pink'}}>
                    </div>
                </LayoutPanel>
            </Layout>
        );
    }
}
