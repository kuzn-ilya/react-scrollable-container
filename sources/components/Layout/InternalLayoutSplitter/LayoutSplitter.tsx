import * as React from 'react';

import { LayoutSplitterProps, layoutSplitterPropTypes } from  './LayoutSplitterProps';
import { LayoutSplitterState } from  './LayoutSplitterState';
import { classNames, MouseCapture, isVertical } from  '../../../utils';

import '../../../styles/layout-splitter.css';

export namespace Internal {
    export class LayoutSplitter extends React.PureComponent<LayoutSplitterProps, LayoutSplitterState> {
        static propTypes = layoutSplitterPropTypes;

        constructor(props?: LayoutSplitterProps) {
            super(props);
            this.handleMouseDown = this.handleMouseDown.bind(this);
            this.handleWindowMouseMove = this.handleWindowMouseMove.bind(this);
            this.handleReleaseMouseCapture = this.handleReleaseMouseCapture.bind(this);
            this.state = {
                isActive: false
            };
        }

        startCoord: number = 0;
        mouseCapture?: MouseCapture = undefined;

        handleMouseDown: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
            this.mouseCapture = MouseCapture.captureMouseEvents(e.nativeEvent, this.handleWindowMouseMove, this.handleReleaseMouseCapture);
            let pageCoord = isVertical(this.props.align) ? e.pageY : e.pageX;
            // tslint:disable-next-line:no-use-before-declare
            this.startCoord = MULTIPLIER[this.props.align] * pageCoord - this.props[this.props.align];
            this.setState({
                isActive: true
            });
        }

        handleWindowMouseMove: (e: MouseEvent) => void = (e) => {
            let pageCoord = isVertical(this.props.align) ? e.pageY : e.pageX;
            // tslint:disable-next-line:no-use-before-declare
            let newCoord = MULTIPLIER[this.props.align] * pageCoord - this.startCoord;
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
                this.setState({
                    isActive: false
                });
            }
        }

        getClassName(): string | undefined {
            return classNames({
                'layout-vert-splitter': isVertical(this.props.align),
                'layout-horz-splitter': !isVertical(this.props.align),
                'layout-splitter-active': this.state.isActive
            });
        }

        getStyle(): React.CSSProperties {
            switch (this.props.align) {
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
                    throw new Error('Unexpected error.');
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

const MULTIPLIER = {
    bottom: -1,
    left: 1,
    right: -1,
    top: 1
};
