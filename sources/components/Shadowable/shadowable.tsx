import * as React from 'react';
import { classNames } from '../../utils/classNames';
import { omit } from '../../utils/omit';

import '../../styles/common.css';

type HasClassName = {
    className?: string;
}

export type HasShowShadowProps = {
    showRightShadow?: boolean;
    showBottomShadow?: boolean;
}

export function shadowable<P extends HasClassName, P2 extends P & HasClassName & HasShowShadowProps, S, S2, C extends React.Component<P, S>>(
    // tslint:disable-next-line:variable-name
    Comp: new(props?: P) => C): React.ComponentClass<P2> {

        return class Mounted extends React.Component<P2, S2> {
            render(): JSX.Element {
                let className = classNames(
                    this.props.className, {
                    'right-shadow': Boolean(this.props.showRightShadow),
                    'bottom-shadow': Boolean(this.props.showBottomShadow)
                });

                let props = omit(this.props, 'className' as keyof P2);

                return <Comp className={className} {...props} />;
            }
        };
}
