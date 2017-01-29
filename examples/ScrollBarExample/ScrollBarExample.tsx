import * as React from 'react';

import { ScrollBar, Layout, LayoutPanel } from '../../sources/components';

interface CompState {
    orientation: 'horizontal' | 'vertical';
    minPosition: number;
    maxPosition: number;
    pageSize: number;
    position: number;
}

export class ScrollBarExample extends React.Component<{}, CompState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            maxPosition: 100,
            minPosition: 1,
            orientation: 'vertical',
            pageSize: 20,
            position: 1
        };

        this.handleOrientationChanged = this.handleOrientationChanged.bind(this);

        this.handleMinPositionChanged = this.handleNumberPropChanged.bind(this, 'minPosition');
        this.handleMaxPositionChanged = this.handleNumberPropChanged.bind(this, 'maxPosition');
        this.handlePositionChanged = this.handleNumberPropChanged.bind(this, 'position');
        this.handlePageSizeChanged = this.handleNumberPropChanged.bind(this, 'pageSize');
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

    handleMinPositionChanged: (e: React.FormEvent<HTMLInputElement>) => void;
    handleMaxPositionChanged: (e: React.FormEvent<HTMLInputElement>) => void;
    handlePositionChanged: (e: React.FormEvent<HTMLInputElement>) => void;
    handlePageSizeChanged: (e: React.FormEvent<HTMLInputElement>) => void;

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
                        value={this.state.minPosition}
                        onChange={this.handleMinPositionChanged}
                    />
                    maxPosition:
                    <input
                        style={{width: 30}}
                        type="text"
                        value={this.state.maxPosition}
                        onChange={this.handleMaxPositionChanged}
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
                </LayoutPanel>
                <LayoutPanel align="client">
                    <ScrollBar
                        orientation={this.state.orientation}
                        minPosition={this.state.minPosition}
                        maxPosition={this.state.maxPosition}
                        pageSize={this.state.pageSize}
                        position={this.state.position}
                        height={this.state.orientation === 'vertical' ? '100%' : 17}
                        width={this.state.orientation === 'horizontal' ? '100%' : 17}
                    />
                </LayoutPanel>
            </Layout>
        );
    }
}
