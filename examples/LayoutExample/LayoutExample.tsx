import * as React from 'react';

import { Layout, LayoutPanel, LayoutSplitter } from '../../sources/components';
import * as classes from '../page/styles.css';

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
                    <div className={classes.divText} style={{backgroundColor: 'yellow'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter liveUpdate />
                <LayoutPanel align="left" width={50} minWidth={20} maxWidth={300}>
                    <div className={classes.divText} style={{backgroundColor: 'white'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter liveUpdate />
                <LayoutPanel align="right" width={50} minWidth={20} maxWidth={300}>
                    <div className={classes.divText} style={{backgroundColor: 'white'}}>
                    </div>
                </LayoutPanel>
                <LayoutSplitter liveUpdate />
                <LayoutPanel align="client" minWidth={100} minHeight={20}>
                    <div className={classes.divText} style={{backgroundColor: 'pink'}}>
                    </div>
                </LayoutPanel>
            </Layout>
        );
    }
}
