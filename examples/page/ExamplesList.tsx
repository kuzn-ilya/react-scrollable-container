import * as React from 'react';

import { Example } from './Example';

interface ExamplesListProps {
    examples: Example[];
}

export class ExamplesList extends React.PureComponent<ExamplesListProps, {}> {

    render(): JSX.Element {
        return (
            <ul>
                {this.props.examples.map((example: Example, index: number) => (
                    <li key={index}>{example.name}</li>
                ))}
            </ul>
        );
    }
}
