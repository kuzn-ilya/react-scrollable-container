import * as React from 'react';

import './styles.css';
import { Layout, LayoutPanel, LayoutSplitter } from '../../sources/components';

import { Example } from './Example';
import { ExamplesList } from './ExamplesList';

export interface ExamplesPageProps {
    examples: Example[];
}

interface ExamplesPageState {
    selectedIndex: number;
}

export class ExamplesPage extends React.PureComponent<ExamplesPageProps, ExamplesPageState> {
    constructor(props: ExamplesPageProps) {
        super(props);
        this.state = {
            selectedIndex: 0
        };

        this.handleSelectedIndexChanged = this.handleSelectedIndexChanged.bind(this);
    }

    handleSelectedIndexChanged: (index: number) => void = (index) => {
        this.setState({
            selectedIndex: index
        });
    }

    render(): JSX.Element {
        let selectedExample: Example = this.props.examples[this.state.selectedIndex];
        let Comp = selectedExample.componentClass;
        return (
            <Layout width="100%" height="100%">
                <LayoutPanel align="left" width={200}>
                    <ExamplesList examples={this.props.examples} onSelectedIndexChanged={this.handleSelectedIndexChanged}/>
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="top" height={30}>
                    {selectedExample.name}
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="client">
                    <Comp />
                </LayoutPanel>
            </Layout>
        );
    }
}
