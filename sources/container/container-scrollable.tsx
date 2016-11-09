import * as React from 'react';
import { addPrefixToClass } from './../utils/css.utils';

import { ContainerWrapper } from './container-wrapper';
import { ContainerContext } from './container.context';
import { ContainerScrollableContext } from './container-scrollable.context';

export class ContainerScrollable extends React.Component<void, void> implements React.ChildContextProvider<ContainerScrollableContext> {

    static contextTypes: React.ValidationMap<any> = {
        height: React.PropTypes.number,
        width: React.PropTypes.number
    };

    static childContextTypes: React.ValidationMap<any> = {
        height: React.PropTypes.number,
        width: React.PropTypes.number
    };

    getChildContext(): ContainerScrollableContext {
        return this.context as ContainerContext;
    }

    render(): JSX.Element {
        return (
            <div className={addPrefixToClass('container-scrollable')}>
                <ContainerWrapper>
                    {this.props.children}
                </ContainerWrapper>
            </div>
        );
    }
}
