import * as React from 'react';

import { LayoutProps } from  './LayoutProps';

import './layout.css';

export class Layout extends React.PureComponent<LayoutProps, void> {

    static defaultProps: LayoutProps = {
        firstChildHeight: 0,
        height: 0,
        width: 0
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
                height: this.props.height,
                width: this.props.width
            }}>
                <div className="layout-container-wrapper">
                    <div className="layout-first" style={{
                        height: this.props.firstChildHeight,
                        width: '100%'
                    }}>
                        <div className="layout-container-wrapper">
                            {first}
                        </div>
                    </div>
                    <div className="layout-second" style={{
                        height: '100%',
                        paddingTop: this.props.firstChildHeight,
                        width: '100%'
                    }}>
                        <div className="layout-second-wrapper" style={{
                            bottom: this.props.firstChildHeight,
                            top: this.props.firstChildHeight
                        }}>
                            {second}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
