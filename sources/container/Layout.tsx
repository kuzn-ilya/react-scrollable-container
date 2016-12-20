import * as React from 'react';

import { LayoutProps } from  './LayoutProps';
import { WindowEvents } from  '../utils/WindowEvents';
import { LayoutChildContext, layoutChildContextTypes } from './LayoutChildContext';

import './layout.css';

export class Layout extends React.PureComponent<LayoutProps, {}> {

    static defaultProps: LayoutProps = {
        height: undefined,
        orientation: undefined,
        showSplitter: false,
        width: undefined
    };

    static contextTypes = layoutChildContextTypes;
    static childContextTypes = layoutChildContextTypes;

    constructor(props?: LayoutProps, context?: LayoutChildContext) {
        super(props, context);
        this.handleSplitterMouseDown = this.handleSplitterMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    getChildContext(): LayoutChildContext {
        return {
            orientation: this.props.orientation ? this.props.orientation : this.context.orientation,
            parent: this
        };
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
        if (this.dragging) {
            this.dragging = false;
            WindowEvents.removeMouseMoveEventListener(this.handleMouseMove);
        }
    }

    updatePane(e: MouseEvent): void {
        if (this.ref) {
            if (this.context.orientation === 'vertical') {
                this.ref.style.height = (e.pageY - this.startY) + 'px';
            } else if (this.context.orientation === 'horizontal') {
                this.ref.style.width = (e.pageX - this.startX) + 'px';
            }
        }
    }

    componentDidMount(): void {
        WindowEvents.addMouseMoveUpEventListener(this.handleMouseUp);
    }

    componentWillUnmount(): void {
        WindowEvents.removeMouseUpEventListener(this.handleMouseUp);
    }

    render(): JSX.Element | null {
        let layoutPaneStyle: {};
        let className: string;
        if (this.context.orientation === 'vertical') {
            className = this.props.height === '100%' ? 'layout-second' : 'layout-vert-first';
            layoutPaneStyle = {
                height: this.props.height
            };
        } else {
            className = this.props.width === '100%' ? 'layout-second' : 'layout-horz-first';
            if (this.props.width !== '100%') {
                layoutPaneStyle = {
                    width: this.props.width
                };
            } else {
                layoutPaneStyle = {};
            }
        }

        let splitter = this.props.showSplitter ? (
            <div className={this.context.orientation === 'vertical' ? 'layout-vert-splitter' : 'layout-horz-splitter'}
                onMouseDown={this.handleSplitterMouseDown}>
            </div>
        ) : null;

        let child = this.props.orientation ? (
            <div className={this.props.orientation === 'vertical' ? 'layout-vert-container' : 'layout-horz-container'}
                style={{
                    height: this.context.parent ? '100%' : this.props.height,
                    width: this.context.parent ? '100%' : this.props.width
                }}
            >
                {this.props.children}
            </div>
        ) : null;

        let component = this.props.orientation && !this.context.parent ? child : (
            <div className={className}
                style={layoutPaneStyle}
                ref={(ref: HTMLDivElement) => this.ref = ref}
            >
                {this.props.orientation ? child : this.props.children}
                {splitter}
            </div>
        );

        return component;
    }
}
