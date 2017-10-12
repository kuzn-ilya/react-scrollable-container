import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Layout, LayoutPanel, LayoutSplitter } from '../sources/components';
import * as classes from './styles.css';

const LayoutVerticalExample = () => (
    <Layout width="100%" height="100%">
        <LayoutPanel align="top" height={100} minHeight={0} >
            <div className={classes.divText} style={{backgroundColor: 'yellow'}}>
                Top Panel
            </div>
        </LayoutPanel>
        <LayoutSplitter liveUpdate />
        <LayoutPanel align="client" minHeight={0} >
            <div className={classes.divText} style={{backgroundColor: 'pink'}}>
                Bottom Panel
            </div>
        </LayoutPanel>
    </Layout>
)


const LayoutExample = () => (
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

const LayoutDef = () => (
    <div style={{left: 10, width: 200, height: '100%', position: 'relative'}}>
    <Layout
        width='100%'
        height='100%'
    >
        <LayoutPanel align="top" height={10}>
            x
        </LayoutPanel>
        <LayoutPanel align="client">
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            x <br />
            
        </LayoutPanel>
    </Layout>
    </div>
);

storiesOf('Layout', module)
    .add('def', () => <LayoutDef />)
    .add('vertical', () => <LayoutVerticalExample />)
    .add('second', () => <LayoutExample />);
