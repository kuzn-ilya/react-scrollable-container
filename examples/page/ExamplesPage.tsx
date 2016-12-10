import * as React from 'react';

import './styles.css';
import { Layout } from '../../sources/container/Layout';

import { Example } from './Example';

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
            <Layout orientation="horizontal" firstChildHeight="200px">
                <ul>
                    {this.props.examples.map((example: Example, index: number) => (
                        <li key={index}>{example.name}</li>
                    ))}
                </ul>
                <Layout orientation="vertical">
                    {selectedExample.name}
                    <Comp />
                </Layout>
            </Layout>
        );
    }
}
