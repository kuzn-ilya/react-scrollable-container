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
                <LayoutPanel align="top" height={50} minHeight={20} maxHeight={200}>
                    <div className="div-text" style={{backgroundColor: 'yellow'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="left" width={50} minWidth={20} maxWidth={300}>
                    <div className="div-text" style={{backgroundColor: 'white'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="right" width={50} minWidth={20} maxWidth={300}>
                    <div className="div-text" style={{backgroundColor: 'white'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="client" minWidth={20} minHeight={20}>
                    <div className="div-text" style={{backgroundColor: 'pink'}}>
                    </div>
                </LayoutPanel>
            </Layout>
        );
    }
}
