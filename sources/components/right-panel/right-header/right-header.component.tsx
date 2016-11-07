import * as React from 'react';
import { RightHeaderProps } from './right-header.props';

export class RightHeader extends React.Component<RightHeaderProps, void> {
    render(): JSX.Element {
        return (
            <div style={{ height: this.props.height}}>
                {this.props.child}
            </div>
        );
    }
}