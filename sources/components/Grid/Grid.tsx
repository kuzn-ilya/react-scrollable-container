import * as React from 'react';

import { GridProps, gridPropTypes } from './GridProps';
import { Layout } from '../Layout';
import { warning } from '../../utils/warning';

export class Grid extends React.PureComponent<GridProps, {}> {

    static propTypes = gridPropTypes;
    static defaultProps: GridProps = {
        fixedColumnCount: 0,
        fixedRowCount: 0
    };

    constructor(props?: GridProps) {
        super(props);
        this.checkProps(props);
    }

    componentWillReceiveProps(nextProps: GridProps): void {
        this.checkProps(nextProps);
    }

    render(): JSX.Element {
        return <Layout />;
    }

    checkProps(props?: GridProps): void {
        if (!props) {
            return;
        }
        if (typeof props.getRowCount === 'undefined' && typeof props.rowCount === 'undefined') {
            warning('Component <Grid />: Either getRowCount or rowCount should be defined');
        }
    }
}
