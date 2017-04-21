import * as React from 'react';

import { LayoutSplitterProps, layoutSplitterPropTypes } from  './LayoutSplitterProps';
import { LayoutSplitterState } from  './LayoutSplitterState';
import { classNames, MouseCapture, isVertical } from  '../../../utils';

import * as emptyFunction from 'fbjs/lib/emptyFunction';

import '../../../styles/layout-splitter.css';

export namespace Internal {
    export class LayoutSplitter extends React.PureComponent<LayoutSplitterProps, LayoutSplitterState> {
        static propTypes = layoutSplitterPropTypes;

        static defaultProps: Partial<LayoutSplitterProps> = {
            onResizeEnd: emptyFunction,
            onResizing: emptyFunction
        };

        constructor(props?: LayoutSplitterProps) {
            super(props);
            this.state = {
                isActive: false
            };
        }

        mouseCapture?: MouseCapture = undefined;

        handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
            if (e.button !== 0) {
                return;
            }

            this.mouseCapture = MouseCapture.captureMouseEvents(e.nativeEvent as MouseEvent, this.handleMouseMove, this.handleMouseUp);

            this.setState({
                isActive: true
            });
        }

        handleMouseMove = (deltaX: number, deltaY: number): void => {
            let newPosition = this.calcNewPosition(deltaX, deltaY);
            this.props.onResizing!(newPosition);
        }

        handleMouseUp = (): void => {
            if (this.mouseCapture) {
                this.mouseCapture = undefined;
                this.props.onResizeEnd!();
                this.setState({
                    isActive: false
                });
            }
        }

        calcNewPosition(deltaX: number, deltaY: number): number {
            let delta = isVertical(this.props.align) ? deltaY : deltaX;
            // tslint:disable-next-line:no-use-before-declare
            return MULTIPLIER[this.props.align] * delta + (this.props[this.props.align] || 0);
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
                        top: (this.props.top || 0) - 3
                    };
                case 'bottom':
                    return {
                        bottom: (this.props.bottom || 0) - 3,
                        heigth: 6,
                        left: this.props.left,
                        right: this.props.right
                    };
                case 'left':
                    return {
                        bottom: this.props.bottom,
                        left: (this.props.left || 0) - 3,
                        top: this.props.top,
                        width: 6
                    };
                case 'right':
                    return {
                        bottom: this.props.bottom,
                        right: (this.props.right || 0) - 3,
                        top: this.props.top,
                        width: 6
                    };
                default:
                    throw new Error('Got unexpected null or undefined');
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
