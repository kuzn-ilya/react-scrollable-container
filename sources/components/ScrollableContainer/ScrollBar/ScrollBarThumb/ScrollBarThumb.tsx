import * as React from 'react';

import { ScrollBarThumbProps } from './ScrollBarThumbProps';
import { CSS_NUMBER_VARS } from '../../../../stubs/cssVars';

import '../../../../styles/scroll-bar.css';

export class ScrollBarThumb extends React.PureComponent<ScrollBarThumbProps, {}> {
    ref: HTMLDivElement;

    render(): JSX.Element {
        // tslint:disable-next-line:no-string-literal
        let scrollBarThumbMargin = CSS_NUMBER_VARS['SCROLLBAR_THUMB_OFFSET'];

        return (
            <div className="scrollbar-thumb"
                style={{
                    height: this.props.orientation === 'vertical' ? this.props.size : this.props.thickness - 2 * scrollBarThumbMargin,
                    left: this.props.orientation === 'horizontal' ? this.props.position : scrollBarThumbMargin,
                    top: this.props.orientation === 'vertical' ? this.props.position : scrollBarThumbMargin,
                    width: this.props.orientation === 'horizontal' ? this.props.size : this.props.thickness - 2 * scrollBarThumbMargin
                }}
                ref={(ref) => this.ref = ref}
            >
            </div>
        );
    }
}
