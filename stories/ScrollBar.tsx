import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ScrollBar } from '../sources/components';

interface CompProps {
    readonly orientation: 'horizontal' | 'vertical';
    readonly onScroll: (newPosition: number) => void;
    readonly showButtons?: boolean;
}

const ScrollBarExample = ({orientation, onScroll, showButtons = true}: CompProps) => (
    <ScrollBar
        orientation={orientation}
        min={1}
        max={100}
        pageSize={20}
        position={1}
        smallChange={1}
        largeChange={20}
        onScroll={onScroll}
        showButtons={showButtons}
    />
);

storiesOf('ScrollBar', module)
    .add('vertical', () => (
        <ScrollBarExample orientation="vertical" onScroll={action('scroll')} />
    ))
    .add('horizontal', () => (
        <ScrollBarExample orientation="horizontal" onScroll={action('scroll')} />
    ))
    .add('hide buttons', () => (
        <ScrollBarExample orientation="horizontal" onScroll={action('scroll')} showButtons={false} />
    ));
