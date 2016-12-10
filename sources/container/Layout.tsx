import * as React from 'react';

import { LayoutProps } from  './LayoutProps';

import './layout.css';

export class Layout extends React.PureComponent<LayoutProps, void> {

    static defaultProps: LayoutProps = {
        height: '100%',
        orientation: 'vertical',
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

        return (
            <div className="layout-container" style={{
                flexDirection: this.props.orientation === 'vertical' ? 'column' : 'row',
                height: this.props.height,
                width: this.props.width
            }}>
                <div className="layout-first" style={{
                    height: this.props.orientation === 'vertical' ? this.props.firstChildHeight : '100%',
                    width: this.props.orientation === 'vertical' ? '100%' : this.props.firstChildHeight
                }}>
                    {first}
                </div>
                <div className="layout-second" style={{
                    height: '100%',
                    width: '100%'
                }}>
                    {second}
                </div>
            </div>
        );
    }
}
