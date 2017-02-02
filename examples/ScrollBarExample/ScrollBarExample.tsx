import * as React from 'react';

import { ScrollBar, Layout, LayoutPanel } from '../../sources/components';

interface CompState {
    orientation: 'horizontal' | 'vertical';
    largeChange: number;
    min: number;
    max: number;
    pageSize: number;
    initialPosition: number;
    position: number;
    smallChange: number;
    showButtons: boolean;
}

export class ScrollBarExample extends React.Component<{}, CompState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            initialPosition: 1,
            largeChange: 20,
            max: 100,
            min: 1,
            orientation: 'vertical',
            pageSize: 20,
            position: 1,
            showButtons: true,
            smallChange: 1
        };

        this.handleOrientationChanged = this.handleOrientationChanged.bind(this);
        this.handleShowButtonsChanged = this.handleShowButtonsChanged.bind(this);

        this.handleMinChanged = this.handleNumberPropChanged.bind(this, 'min');
        this.handleMaxChanged = this.handleNumberPropChanged.bind(this, 'max');
        this.handleInitialPositionChanged = this.handleNumberPropChanged.bind(this, 'initialPosition');
        this.handlePageSizeChanged = this.handleNumberPropChanged.bind(this, 'pageSize');
        this.handleSmallChangeChanged = this.handleNumberPropChanged.bind(this, 'smallChange');
        this.handleLargeChangeChanged = this.handleNumberPropChanged.bind(this, 'largeChange');

        this.handleScroll = this.handleScroll.bind(this);
    }

    handleOrientationChanged: (e: React.FormEvent<HTMLInputElement>) => void = (e) => {
        if (e.currentTarget.value === 'horizontal' || e.currentTarget.value === 'vertical') {
            this.setState({
                orientation: e.currentTarget.value
            } as CompState);
        }
    }

    handleShowButtonsChanged: (e: React.FormEvent<HTMLInputElement>) => void = (e) => {
        this.setState({
            showButtons: e.currentTarget.checked
        } as CompState);
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
    handleInitialPositionChanged: (e: React.FormEvent<HTMLInputElement>) => void;
    handlePageSizeChanged: (e: React.FormEvent<HTMLInputElement>) => void;
    handleLargeChangeChanged: (e: React.FormEvent<HTMLInputElement>) => void;
    handleSmallChangeChanged: (e: React.FormEvent<HTMLInputElement>) => void;

    handleScroll: (newPosition: number) => void = (newPosition) => {
        this.setState({
            position: newPosition
        } as CompState);
    }

    render(): JSX.Element {
        return (
            <Layout height="100%" width="100%">
                <LayoutPanel align="top" height={30}>
                    <div style={{height: '100%', width: '100%'}}>
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
                        position (init):
                        <input
                            style={{width: 30}}
                            type="text"
                            value={this.state.initialPosition}
                            onChange={this.handleInitialPositionChanged}
                        />
                        position:
                        <input
                            style={{width: 30}}
                            type="text"
                            value={this.state.position}
                            disabled
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
                        showButton:
                        <input
                            type="checkbox"
                            checked={this.state.showButtons}
                            onChange={this.handleShowButtonsChanged}
                        />
                    </div>
                </LayoutPanel>
                <LayoutPanel align="client">
                    <ScrollBar
                        orientation={this.state.orientation}
                        min={this.state.min}
                        max={this.state.max}
                        pageSize={this.state.pageSize}
                        position={this.state.initialPosition}
                        smallChange={this.state.smallChange}
                        largeChange={this.state.largeChange}
                        onScroll={this.handleScroll}
                        showButtons={this.state.showButtons}
                    />
                </LayoutPanel>
            </Layout>
        );
    }
}
