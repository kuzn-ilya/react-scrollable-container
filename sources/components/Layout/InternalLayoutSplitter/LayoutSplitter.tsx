import * as React from 'react';

import { LayoutSplitterProps, layoutSplitterPropTypes } from  './LayoutSplitterProps';
import { MouseCapture } from  '../../../utils';

import '../../../styles/layout-splitter.css';

export namespace Internal {
    export class LayoutSplitter extends React.PureComponent<LayoutSplitterProps, {}> {
        static propTypes = layoutSplitterPropTypes;

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
            let pageCoord = isVertical(this.props.orientation) ? e.pageY : e.pageX;
            // tslint:disable-next-line:no-use-before-declare
            this.startCoord = MULTIPLIER[this.props.orientation] * pageCoord - this.props[this.props.orientation];
        }

        handleWindowMouseMove: (e: MouseEvent) => void = (e) => {
            let pageCoord = isVertical(this.props.orientation) ? e.pageY : e.pageX;
            // tslint:disable-next-line:no-use-before-declare
            let newCoord = MULTIPLIER[this.props.orientation] * pageCoord - this.startCoord;
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
            return isVertical(this.props.orientation) ? 'layout-vert-splitter' : 'layout-horz-splitter';
        }

        getStyle(): React.CSSProperties {
            switch (this.props.orientation) {
                case 'top':
                    return {
                        heigth: 6,
                        left: this.props.left,
                        right: this.props.right,
                        top: this.props.top - 3
                    };
                case 'bottom':
                    return {
                        bottom: this.props.bottom - 3,
                        heigth: 6,
                        left: this.props.left,
                        right: this.props.right
                    };
                case 'left':
                    return {
                        bottom: this.props.bottom,
                        left: this.props.left - 3,
                        top: this.props.top,
                        width: 6
                    };
                case 'right':
                    return {
                        bottom: this.props.bottom,
                        right: this.props.right - 3,
                        top: this.props.top,
                        width: 6
                    };
                default:
                    return {
                    };
            }
        }

        render(): JSX.Element {
            return (
                <div className={this.getClassName()}
                    style={this.getStyle()}
                    onMouseDown={this.handleMouseDown}>
                </div>
            );
        }
    }
}

function isVertical(align: 'left' | 'right' | 'top' | 'bottom'): boolean {
    return align === 'top' || align === 'bottom';
}

const MULTIPLIER = {
    bottom: -1,
    left: 1,
    right: -1,
    top: 1
};
