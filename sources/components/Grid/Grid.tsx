import * as React from 'react';

import { GridProps, gridPropTypes } from './GridProps';
import { GridState } from './GridState';
import { Column } from './Column';
import { ColumnProps } from './Column/ColumnProps';
import { Layout } from '../Layout';
import { warning } from '../../utils/warning';

export class Grid extends React.PureComponent<GridProps, GridState> {

    static propTypes = gridPropTypes;
    static defaultProps: GridProps = {
        fixedColumnCount: 0,
        fixedRowCount: 0
    };

    constructor(props?: GridProps) {
        super(props);
        this.checkProps(props);
        this.state = this.calculateState();
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

    calculateState(): GridState {
        let columns = React.Children
            .toArray(this.props.children).filter((value: React.ReactChild): boolean =>
                typeof value !== 'string' && typeof value !== 'number' && value.type === Column
            )
            .map((value: React.ReactChild) =>
                value as React.ReactElement<ColumnProps>
            );

        let fixedColumns = columns.slice(0, this.props.fixedColumnCount);
        // let scrollableColumns = columns.slice(this.props.fixedColumnCount);

        let fixedColumnsWidth = fixedColumns
            .map((value: React.ReactElement<ColumnProps>): number => value.props.width)
            .reduce((prevValue: number, currValue: number) => prevValue + currValue, 0);

        let headerHeight = 0;

        return {
            fixedColumnsWidth,
            headerHeight
        };
    }
}
