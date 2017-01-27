import * as React from 'react';

import { LayoutPanelProps, layoutPanelPropTypes } from  './LayoutPanelProps';
import { classNames } from '../../../utils';

import * as warning from 'fbjs/lib/warning';

import '../../../styles/layout.css';
import '../../../styles/common.css';

export namespace Internal {
    export class LayoutPanel extends React.PureComponent<LayoutPanelProps, {}> {

        static propTypes = layoutPanelPropTypes;

        render(): JSX.Element {
            if (React.Children.count(this.props.children) !== 1) {
                warning(false, '<LayoutPanel /> should have only one child.');
            }

            let layoutPaneStyle: React.CSSProperties = {
                bottom: this.props.bottom,
                height: this.props.height,
                left: this.props.left,
                maxHeight: this.props.maxHeight,
                maxWidth: this.props.maxWidth,
                minHeight: this.props.minHeight,
                minWidth: this.props.minWidth,
                right: this.props.right,
                top: this.props.top,
                width: this.props.width
            };

            return (
                <div className={classNames({
                        'layout-panel': true,
                        'bottom-shadow': Boolean(this.props.showBottomShadow),
                        'right-shadow': Boolean(this.props.showRightShadow)
                    })}
                    style={layoutPaneStyle}
                >
                    {this.props.children}
                </div>
            );
        }
    }
}
