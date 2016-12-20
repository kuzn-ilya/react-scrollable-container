import * as React from 'react';

import { LayoutSplitterProps } from  './LayoutSplitterProps';
import { MouseCapture } from  '../utils/MouseCapture';

import '../styles/layout-splitter.css';

export class LayoutSplitter extends React.PureComponent<LayoutSplitterProps, {}> {

    static defaultProps: LayoutSplitterProps = {
        coord: 0,
        orientation: 'horizontal'
    };

    constructor(props?: LayoutSplitterProps) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleWindowMouseMove = this.handleWindowMouseMove.bind(this);
        this.handleWindowMouseUp = this.handleWindowMouseUp.bind(this);
    }

    isMoving: boolean = false;
    startCoord: number = 0;

    handleMouseDown: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
        MouseCapture.captureMouseEvents(e.nativeEvent, this.handleWindowMouseMove, this.handleWindowMouseUp);
        this.isMoving = true;
        this.startCoord = (this.props.orientation === 'vertical' ? e.pageY : e.pageX) - this.props.coord;
    }

    handleWindowMouseMove: (e: MouseEvent) => void = (e) => {
        let newCoord = (this.props.orientation === 'vertical' ? e.pageY : e.pageX) - this.startCoord;
        if (this.props.onResizing) {
            this.props.onResizing(newCoord);
        }
    }

    handleWindowMouseUp: (e: MouseEvent) => void = (e) => {
        if (this.isMoving) {
            this.isMoving = false;
            if (this.props.onResizeEnd) {
                this.props.onResizeEnd();
            }
        }
    }

    getClassName(): string {
        return this.props.orientation === 'vertical' ? 'layout-vert-splitter' : 'layout-horz-splitter';
    }

    render(): JSX.Element {
        return (
            <div className={this.getClassName()}
                onMouseDown={this.handleMouseDown}>
            </div>
        );
    }
}
