import * as React from 'react';
import { RightContentProps } from './right-content.props';

export class RightContent extends React.Component<RightContentProps, void> {
    render(): JSX.Element {
        return (
            <div style={{
                    overflowX: "auto", 
                    overflowY: "auto",
                    position: "absolute",
                    outline: "1px solid green",
                    top: this.props.headerHeight,
                    bottom: 0,
                    left: 0,
                    right: 0
            }} >
                {this.props.children}
            </div>
        );
    }
}