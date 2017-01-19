import * as React from 'react';

export class ReactChildrenHelpers {
    static childrenOfType<P>(children: React.ReactNode, type: React.ComponentClass<P>): React.ReactElement<P>[] {
        return React.Children
            .toArray(children)
            .filter((child: React.ReactChild): boolean =>
                typeof child !== 'string' && typeof child !== 'number' && child.type === type
            ) as React.ReactElement<P>[];
    }
}
