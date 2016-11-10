import * as React from 'react';
import { addPrefixToClass } from './../utils/css.utils';

import { ContainerWrapper } from './container-wrapper';
import { ContainerScrollableProps } from  './container-scrollable.props';

export class ContainerScrollable extends React.Component<ContainerScrollableProps, void> {

    static contextTypes: React.ValidationMap<any> = {
        height: React.PropTypes.number,
        width: React.PropTypes.number
    };

    static childContextTypes: React.ValidationMap<any> = {
        height: React.PropTypes.number,
        width: React.PropTypes.number
    };

    render(): JSX.Element {
        return (
            <div className={addPrefixToClass('container-scrollable')}
                style={{
                    overflowX: this.props.overflowX,
                    overflowY: this.props.overflowY
                }}>
                <ContainerWrapper>
                    {this.props.children}
                </ContainerWrapper>
            </div>
        );
    }
}
