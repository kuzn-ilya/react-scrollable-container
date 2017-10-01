import * as React from 'react';

import { Example } from './Example';

interface ExamplesListProps {
    examples: Example[];
    onSelectedIndexChanged?: (index: number) => void;
}

interface ExamplesListState {
    selectedIndex: number;
}

export class ExamplesList extends React.PureComponent<ExamplesListProps, ExamplesListState> {
    constructor(props?: ExamplesListProps) {
        super(props);
        this.handleLinkClickArray = this.props.examples.map((example: Example, index: number) =>
            this.handleLinkClick.bind(this, index)
        );

        this.state = {
            selectedIndex: 0
        };
    }

    handleLinkClick: (index: number) => void = (index) => {
        this.setState({
            selectedIndex: index
        });
        if (this.props.onSelectedIndexChanged) {
            this.props.onSelectedIndexChanged(index);
        }
    }

    handleLinkClickArray: Array<() => void>;

    render(): JSX.Element {
        return (
            <ul>
                {this.props.examples.map((example: Example, index: number) => (
                    <li key={index}>
                        <a href="#" onClick={this.handleLinkClickArray[index]}>
                            {example.name}
                        </a>
                    </li>
                ))}
            </ul>
        );
    }
}
