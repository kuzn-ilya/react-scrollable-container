import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { ScrollBar, Layout, LayoutPanel } from '../sources/components';

interface CompProps {
    readonly orientation: 'horizontal' | 'vertical';
    readonly onScroll: (newPosition: number) => void;
    readonly showButtons?: boolean;
}

class ScrollBarExample extends React.Component<CompProps> {
    static defaultProps: Partial<CompProps> = {
        showButtons: true
    }
    
    constructor(props: CompProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <Layout height="100%" width="100%">
                <LayoutPanel align="client">
                    <ScrollBar
                        orientation={this.props.orientation}
                        min={1}
                        max={100}
                        pageSize={20}
                        position={1}
                        smallChange={1}
                        largeChange={20}
                        onScroll={this.props.onScroll}
                        showButtons={this.props.showButtons}
                    />
                </LayoutPanel>
            </Layout>
        );
    }
}

storiesOf('ScrollBar', module)
    .add('vertical', () => (
        <ScrollBarExample orientation='vertical' onScroll={action('scroll')} />
    ))
    .add('horizontal', () => (
        <ScrollBarExample orientation='horizontal' onScroll={action('scroll')} />
    ))
    .add('hide buttons', () => (
        <ScrollBarExample orientation='horizontal' onScroll={action('scroll')} showButtons={false} />
    ));
