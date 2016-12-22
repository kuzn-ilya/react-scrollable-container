import * as React from 'react';

import { LayoutSplitterProps } from  './LayoutSplitterProps';
import { MouseCapture } from  '../../utils/MouseCapture';

import '../../styles/layout-splitter.css';

export class LayoutSplitter extends React.PureComponent<LayoutSplitterProps, {}> {

    static defaultProps: LayoutSplitterProps = {
        coord: 0,
        orientation: 'horizontal'
    };

    constructor(props?: LayoutSplitterProps) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleWindowMouseMove = this.handleWindowMouseMove.bind(this);
        this.handleReleaseMouseCapture = this.handleReleaseMouseCapture.bind(this);
    }

    startCoord: number = 0;
    mouseCapture?: MouseCapture = undefined;

    handleMouseDown: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
        this.mouseCapture = MouseCapture.captureMouseEvents(e.nativeEvent, this.handleWindowMouseMove, this.handleReleaseMouseCapture);
        this.startCoord = (this.props.orientation === 'vertical' ? e.pageY : e.pageX) - this.props.coord;
    }

    handleWindowMouseMove: (e: MouseEvent) => void = (e) => {
        let newCoord = (this.props.orientation === 'vertical' ? e.pageY : e.pageX) - this.startCoord;
        if (this.props.onResizing) {
            this.props.onResizing(newCoord);
        }
    }

    handleReleaseMouseCapture: () => void = () => {
        if (this.mouseCapture) {
            this.mouseCapture = undefined;
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
