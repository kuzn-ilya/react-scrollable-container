import * as React from 'react';

import { ScrollBar } from '../../sources/components';

interface CompState {
}

export class ScrollBarExample extends React.Component<{}, CompState> {
    constructor(props: {}) {
        super(props);
        this.state = {
        };
    }

    render(): JSX.Element {
        return (
            <ScrollBar
                orientation="vertical"
                minPosition={0}
                maxPosition={100}
                pageSize={20}
                position={2}
                height="100%"
                width={17}
            />
        );
    }
}
