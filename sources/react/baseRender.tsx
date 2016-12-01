import * as React from 'react';

// https://gist.github.com/tejacques/54997ef2d6f672314d53
// tslint:disable-next-line:variable-name */
export function baseRender<P, S, S2, C extends React.Component<P, S>>(Comp: new(props?: P) => C): React.ComponentClass<P> {
    return class BaseRender extends React.Component<P, S2> {
        render(): JSX.Element {
            return <Comp {...this.props} />;
        }
    };
}
