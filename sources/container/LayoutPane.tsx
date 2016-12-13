import * as React from 'react';

import { LayoutPaneProps } from  './LayoutPaneProps';
import { WindowEvents } from  '../utils/WindowEvents';

import './layout.css';

export class LayoutPane extends React.PureComponent<LayoutPaneProps, void> {

    static defaultProps: LayoutPaneProps = {
        height: undefined,
        orientation: 'horizontal',
        showSplitter: false,
        width: undefined
    };

    constructor(props: LayoutPaneProps) {
        super(props);
        this.handleSplitterMouseDown = this.handleSplitterMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    dragging: boolean = false;
    startX: number = 0;
    startY: number = 0;
    ref: HTMLDivElement | undefined = undefined;

    handleSplitterMouseDown: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
        this.dragging = true;
        let width = this.ref ? this.ref.offsetWidth : 0;
        let height = this.ref ? this.ref.offsetHeight : 0;
        this.startX = e.pageX - width;
        this.startY = e.pageY - height;
        WindowEvents.addMouseMoveEventListener(this.handleMouseMove);
    }

    handleMouseMove: (e: MouseEvent) => void = (e) => {
        this.updatePane(e);
    }

    handleMouseUp: (e: MouseEvent) => void = (e) => {
        if (true === this.dragging) {
            this.dragging = false;
            WindowEvents.removeMouseMoveEventListener(this.handleMouseMove);
            this.updatePane(e);
        }
    }

    updatePane(e: MouseEvent) {
        if (this.ref) {
            if (this.props.orientation === 'vertical') {
                this.ref.style.height = (e.pageY - this.startY) + 'px';
            } else if (this.props.orientation === 'horizontal') {
                this.ref.style.width = (e.pageX - this.startX) + 'px';
            }
        }
    }

    componentDidMount() {
        WindowEvents.addMouseMoveUpEventListener(this.handleMouseUp);
    }

    componentWillUnmount() {
        WindowEvents.removeMouseUpEventListener(this.handleMouseUp);
    }

    render(): JSX.Element | null {
        let layoutPaneStyle: {};
        let className: string;
        if (this.props.orientation === 'vertical') {
            className = this.props.height === '100%' ? 'layout-second' : 'layout-vert-first';
            layoutPaneStyle = {
                height: this.props.height
            };
        } else {
            className = this.props.width === '100%' ? 'layout-second' : 'layout-horz-first';
            layoutPaneStyle = {
                width: this.props.width
            };
        }

        let splitter = this.props.showSplitter ? (
            <div className={this.props.orientation === 'vertical' ? 'layout-vert-splitter' : 'layout-horz-splitter'}
                onMouseDown={this.handleSplitterMouseDown}>
            </div>
        ) : null;

        return (
            <div className={className}
                style={layoutPaneStyle}
                ref={(ref: HTMLDivElement) => this.ref = ref}
            >
                {this.props.children}
                {splitter}
            </div>
        );
    }
}
