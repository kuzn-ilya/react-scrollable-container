import * as React from 'react';

import { ScrollBar, Layout, LayoutPanel } from '../../sources/components';

interface CompState {
    orientation: 'horizontal' | 'vertical';
    largeChange: number;
    min: number;
    max: number;
    pageSize: number;
    position: number;
    smallChange: number;
}

export class ScrollBarExample extends React.Component<{}, CompState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            largeChange: 20,
            max: 100,
            min: 1,
            orientation: 'vertical',
            pageSize: 20,
            position: 1,
            smallChange: 1
        };

        this.handleOrientationChanged = this.handleOrientationChanged.bind(this);

        this.handleMinChanged = this.handleNumberPropChanged.bind(this, 'min');
        this.handleMaxChanged = this.handleNumberPropChanged.bind(this, 'max');
        this.handlePositionChanged = this.handleNumberPropChanged.bind(this, 'position');
        this.handlePageSizeChanged = this.handleNumberPropChanged.bind(this, 'pageSize');
        this.handleSmallChangeChanged = this.handleNumberPropChanged.bind(this, 'smallChange');
        this.handleLargeChangeChanged = this.handleNumberPropChanged.bind(this, 'largeChange');
    }

    handleOrientationChanged: (e: React.FormEvent<HTMLInputElement>) => void = (e) => {
        if (e.currentTarget.value === 'horizontal' || e.currentTarget.value === 'vertical') {
            this.setState({
                orientation: e.currentTarget.value
            } as CompState);
        }
    }

    handleNumberPropChanged: (propName: keyof CompState, e: React.FormEvent<HTMLInputElement>) => void = (propName, e) => {
        let newPos = Number.parseInt(e.currentTarget.value, 10);
        if (!isNaN(newPos)) {
            let state: Partial<CompState> = {
                [propName]: newPos
            };
            this.setState(state as CompState);
        }
    }

    handleMinChanged: (e: React.FormEvent<HTMLInputElement>) => void;
    handleMaxChanged: (e: React.FormEvent<HTMLInputElement>) => void;
    handlePositionChanged: (e: React.FormEvent<HTMLInputElement>) => void;
    handlePageSizeChanged: (e: React.FormEvent<HTMLInputElement>) => void;
    handleLargeChangeChanged: (e: React.FormEvent<HTMLInputElement>) => void;
    handleSmallChangeChanged: (e: React.FormEvent<HTMLInputElement>) => void;

    render(): JSX.Element {
        return (
            <Layout height="100%" width="100%">
                <LayoutPanel align="top" height={30}>
                    <input
                        type="radio"
                        name="orientation"
                        value="vertical"
                        checked={this.state.orientation === 'vertical'}
                        onChange={this.handleOrientationChanged}
                    />
                    vertical
                    <input
                        type="radio"
                        name="orientation"
                        value="horizontal"
                        checked={this.state.orientation === 'horizontal'}
                        onChange={this.handleOrientationChanged}
                    />
                    horizontal minPosition:
                    <input
                        style={{width: 30}}
                        type="text"
                        value={this.state.min}
                        onChange={this.handleMinChanged}
                    />
                    maxPosition:
                    <input
                        style={{width: 30}}
                        type="text"
                        value={this.state.max}
                        onChange={this.handleMaxChanged}
                    />
                    position:
                    <input
                        style={{width: 30}}
                        type="text"
                        value={this.state.position}
                        onChange={this.handlePositionChanged}
                    />
                    pageSize:
                    <input
                        style={{width: 30}}
                        type="text"
                        value={this.state.pageSize}
                        onChange={this.handlePageSizeChanged}
                    />
                    smallChange:
                    <input
                        style={{width: 30}}
                        type="text"
                        value={this.state.smallChange}
                        onChange={this.handleSmallChangeChanged}
                    />
                    largeChange:
                    <input
                        style={{width: 30}}
                        type="text"
                        value={this.state.largeChange}
                        onChange={this.handleLargeChangeChanged}
                    />
                </LayoutPanel>
                <LayoutPanel align="client">
                    <ScrollBar
                        orientation={this.state.orientation}
                        min={this.state.min}
                        max={this.state.max}
                        pageSize={this.state.pageSize}
                        position={this.state.position}
                        height={this.state.orientation === 'vertical' ? '100%' : 17}
                        width={this.state.orientation === 'horizontal' ? '100%' : 17}
                        smallChange={this.state.smallChange}
                        largeChange={this.state.largeChange}
                    />
                </LayoutPanel>
            </Layout>
        );
    }
}
