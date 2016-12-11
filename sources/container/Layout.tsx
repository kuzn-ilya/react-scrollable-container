import * as React from 'react';

import { LayoutProps } from  './LayoutProps';

import './layout.css';

export class Layout extends React.PureComponent<LayoutProps, void> {

    static defaultProps: LayoutProps = {
        height: '100%',
        orientation: 'vertical',
        showSplitter: false,
        width: '100%'
    };

    constructor(props: LayoutProps) {
        super(props);
    }

    render(): JSX.Element | null {
        let first: React.ReactChild | null = null;
        let second: React.ReactChild | null = null;

        React.Children.forEach(this.props.children, (child: React.ReactChild, index: number) => {
            switch (index) {
                case 0:
                    first = child;
                    break;
                case 1:
                    second = child;
                    break;
                default:
            }
        });

        let layoutFirstStyle = this.props.orientation === 'vertical' ? {
                height: this.props.firstChildHeight
            } : {
                width: this.props.firstChildHeight
            };

        let splitter = this.props.showSplitter ? (
            <div className={this.props.orientation === 'vertical' ? 'layout-vert-splitter' : 'layout-horz-splitter'}></div>
        ) : null;

        return (
            <div className={this.props.orientation === 'vertical' ? 'layout-vert-container' : 'layout-horz-container'}
                style={{
                    height: this.props.height,
                    width: this.props.width
                }}
            >
                <div className={this.props.orientation === 'vertical' ? 'layout-vert-first' : 'layout-horz-first'}
                    style={layoutFirstStyle}
                >
                    {first}
                    {splitter}
                </div>
                <div className="layout-second" >
                    {second}
                </div>
            </div>
        );
    }
}
