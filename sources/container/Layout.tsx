import * as React from 'react';

import { LayoutProps } from  './LayoutProps';
import { WindowEvents } from  '../utils/WindowEvents';

import './layout.css';

export class Layout extends React.PureComponent<LayoutProps, void> {

    static defaultProps: LayoutProps = {
        height: '100%',
        orientation: 'vertical',
        showSplitter: false,
        width: '100%'
    };

    constructor(props: LayoutProps) {
        super(props);
        this.handleSplitterMouseDown = this.handleSplitterMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    dragging: boolean = false;
    startX: number = 0;
    startY: number = 0;
    firstPane: HTMLDivElement | undefined = undefined;

    handleSplitterMouseDown: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
        this.dragging = true;
        let left = this.firstPane ? this.firstPane.offsetWidth : 0;
        let top = this.firstPane ? this.firstPane.offsetHeight : 0;
        this.startX = e.pageX - left;
        this.startY = e.pageY - top;
        WindowEvents.addMouseMoveEventListener(this.handleMouseMove);
    }

    handleMouseMove: (e: MouseEvent) => void = (e) => {
        if (this.firstPane) {
            if (this.props.orientation === 'vertical') {
                this.firstPane.style.height = (e.pageY - this.startY) + 'px';
            } else if (this.props.orientation === 'horizontal') {
                this.firstPane.style.width = (e.pageX - this.startX) + 'px';
            }
        }
    }

    handleMouseUp: (e: MouseEvent) => void = (e) => {
        if (true === this.dragging) {
            console.log('mouseup', e);
            this.dragging = false;
            WindowEvents.removeMouseMoveEventListener(this.handleMouseMove);
        }
    }

    componentDidMount() {
        WindowEvents.addMouseMoveUpEventListener(this.handleMouseUp);
    }

    componentWillUnmount() {
        WindowEvents.removeMouseUpEventListener(this.handleMouseUp);
    }

    render(): JSX.Element | null {
        let first: React.ReactChild | null = null;
        let second: React.ReactChild | null = null;

        React.Children.forEach(this.props.children, (child: React.ReactChild, index: number) => {
            switch (index) {
                case 0:
                    first = child;
                    break;
                case 1:
                    second = child;
                    break;
                default:
            }
        });

        let layoutFirstStyle = this.props.orientation === 'vertical' ? {
                height: this.props.firstChildHeight
            } : {
                width: this.props.firstChildHeight
            };

        let splitter = this.props.showSplitter ? (
            <div className={this.props.orientation === 'vertical' ? 'layout-vert-splitter' : 'layout-horz-splitter'}
                onMouseDown={this.handleSplitterMouseDown}>
            </div>
        ) : null;

        return (
            <div className={this.props.orientation === 'vertical' ? 'layout-vert-container' : 'layout-horz-container'}
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
            >
                <div className={this.props.orientation === 'vertical' ? 'layout-vert-first' : 'layout-horz-first'}
                    style={layoutFirstStyle}
                    ref={(ref: HTMLDivElement) => this.firstPane = ref}
                >
                    {first}
                    {splitter}
                </div>
                <div className="layout-second" >
                    {second}
                </div>
            </div>
        );
    }
}
