import * as React from 'react';

import './styles.css';
import { Layout } from '../../sources/components';

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
            <Layout orientation="horizontal" width="100%" height="100%" childrenProps={[{size: 200}, {size: '100%'}]}>
                <ExamplesList examples={this.props.examples}/>
                <Layout orientation="vertical" width="100%" height="100%" childrenProps={[{size: 30}, {size: '100%'}]}>
                    {selectedExample.name}
                    <Comp />
                </Layout>
            </Layout>
        );
    }
}
