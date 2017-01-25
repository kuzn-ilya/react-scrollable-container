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

        startPosition: number = 0;
        mouseCapture?: MouseCapture = undefined;

        handleMouseDown: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (e) => {
            if (e.button !== 0) {
                return;
            }

            this.mouseCapture = MouseCapture.captureMouseEvents(e.nativeEvent, this.handleWindowMouseMove, this.handleReleaseMouseCapture);
            let pagePosition = isVertical(this.props.align) ? e.pageY : e.pageX;
            // tslint:disable-next-line:no-use-before-declare
            this.startPosition = MULTIPLIER[this.props.align] * pagePosition - this.props[this.props.align];
            this.setState({
                isActive: true
            });
        }

        handleWindowMouseMove: (e: MouseEvent) => void = (e) => {
            if (this.props.onResizing) {
                let newPosition = this.calcNewPosition(e);
                this.props.onResizing(newPosition);
            }
        }

        handleReleaseMouseCapture: (e: MouseEvent) => void = (e) => {
            if (this.mouseCapture) {
                this.mouseCapture = undefined;
                if (this.props.onResizeEnd) {
                    let newPosition = this.calcNewPosition(e);
                    this.props.onResizeEnd(newPosition);
                }
                this.setState({
                    isActive: false
                });
            }
        }

        calcNewPosition(e: MouseEvent): number {
            let pagePosition = isVertical(this.props.align) ? e.pageY : e.pageX;
            // tslint:disable-next-line:no-use-before-declare
            return MULTIPLIER[this.props.align] * pagePosition - this.startPosition;
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
