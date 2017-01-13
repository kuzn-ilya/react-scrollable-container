import * as React from 'react';

import './styles.css';
import { Layout2 } from '../../sources/components';

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
    }

    render(): JSX.Element {
        let selectedExample: Example = this.props.examples[this.state.selectedIndex];
        let Comp = selectedExample.componentClass;
        return (
            <Layout2 orientation="horizontal" width="100%" height="100%">
                <Layout2 width={200}>
                    <ExamplesList examples={this.props.examples}/>
                </Layout2>
                <Layout2 orientation="vertical" height="100%">
                    <Layout2 height={30}>
                        {selectedExample.name}
                    </Layout2>
                    <Layout2 height="100%" >
                        <Comp />
                    </Layout2>
                </Layout2>
            </Layout2>
        );
    }
}
