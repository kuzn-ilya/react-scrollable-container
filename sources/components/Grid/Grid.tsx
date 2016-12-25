import * as React from 'react';

import { GridProps, gridPropTypes } from './GridProps';
import { Layout } from '../Layout';

export class Grid extends React.PureComponent<GridProps, {}> {

    static propTypes = gridPropTypes;
    static defaultProps: GridProps = {
        fixedColumnCount: 0,
        fixedRowCount: 0
    };

    render(): JSX.Element {
        return <Layout />;
    }
}
