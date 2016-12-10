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
            <div className="examplesPage">
                <aside className="navigationPanel">
                    <ul>
                        {this.props.examples.map((example: Example, index: number) => (
                            <li key={index}>{example.name}</li>
                        ))}
                    </ul>
                </aside>
                <div className="example">
                    <Layout>
                        {selectedExample.name}
                        <Comp />
                    </Layout>
                </div>
            </div>
        );
    }
}
