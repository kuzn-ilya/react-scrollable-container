import * as React from 'react';

import { TransformableContainerProps, transformableContainerPropTypes } from './TransformableContainerProps';

import { updateCSSPosition } from '../../../utils';

export class TransformableContainer extends React.PureComponent<TransformableContainerProps, {}> {

    static defaultProps: TransformableContainerProps = {
        contentHeight: '100%',
        contentWidth: '100%',
        scrollLeft: 0,
        scrollTop: 0
    };

    static propTypes = transformableContainerPropTypes;
    constructor(props?: TransformableContainerProps) {
        super(props);
    }

    componentWillReceiveProps(nextProps: TransformableContainerProps): void {
        if (this.props.onScrollPosChanged
            && (nextProps.scrollLeft !== this.props.scrollLeft || nextProps.scrollTop !== this.props.scrollTop)) {
            this.props.onScrollPosChanged(nextProps.scrollLeft || 0, nextProps.scrollTop || 0);
        }
    }

    render(): JSX.Element {
        let style = {
            height: this.props.contentHeight,
            width: this.props.contentWidth
        };

        updateCSSPosition(style, -this.props.scrollLeft!, -this.props.scrollTop!);

        return (
            <div style={style}
            >
                {this.props.children}
            </div>
        );
    }
}
