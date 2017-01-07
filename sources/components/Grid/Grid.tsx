import * as React from 'react';

import { GridProps, gridPropTypes } from './GridProps';
import { GridState } from './GridState';
import { Column } from './Column';
import { ColumnGroup } from './ColumnGroup';
import { ColumnProps } from './Column/ColumnProps';
import { Layout } from '../Layout';

export class Grid extends React.PureComponent<GridProps, GridState> {

    static propTypes = gridPropTypes;

    static defaultProps: GridProps = {
        fixedColumnCount: 0,
        fixedRowCount: 0,
        headerHeight: 0,
        rowData: [],
        rowHeight: 0
    };

    constructor(props?: GridProps) {
        super(props);

        this.handleVerticalScrollPosChanged = this.handleVerticalScrollPosChanged.bind(this);
        this.handleHorizontalScrollVisibilityChanged = this.handleHorizontalScrollVisibilityChanged.bind(this);
        this.state = this.calculateState();
    }

    handleVerticalScrollPosChanged: (scrollTop: number) => void = (scrollTop) => {
        if (this.state.scrollTop !== scrollTop) {
            this.setState({
                scrollTop
            });
        }
    }

    render(): JSX.Element {
        return (
            <Layout orientation="horizontal" height="100%">
                <ColumnGroup width="auto"
                    headerHeight={this.props.headerHeight}
                    showEdgeForTheLeftCell
                    rowData={this.props.rowData}
                    columnProps={this.state.fixedColumns ? this.state.fixedColumns : []}
                    rowHeight={this.props.rowHeight}
                    scrollTop={this.state.scrollTop}
                    colsThumbHeight={this.state.colsThumbHeight}
                    overflowX="hidden"
                    overflowY="hidden"
                />
                <ColumnGroup width="100%"
                    headerHeight={this.props.headerHeight}
                    rowData={this.props.rowData}
                    columnProps={this.state.scrollableColumns ? this.state.scrollableColumns : []}
                    rowHeight={this.props.rowHeight}
                    overflowX="auto"
                    overflowY="auto"
                    onScrollPosChanged={this.handleVerticalScrollPosChanged}
                    onHorizontalScrollVisibilityChanged={this.handleHorizontalScrollVisibilityChanged}
                />
            </Layout>
        );
    }

    handleHorizontalScrollVisibilityChanged: (visible: boolean, thumbHeight: number) => void = (visible: boolean, thumbHeight: number) => {
        this.setState({
            colsThumbHeight: thumbHeight
        });
    }

    calculateState(): GridState {
        let columns = React.Children
            .toArray(this.props.children).filter((value: React.ReactChild): boolean =>
                typeof value !== 'string' && typeof value !== 'number' && value.type === Column
            )
            .map((value: React.ReactChild) =>
                (value as React.ReactElement<ColumnProps>).props
            );

        let fixedColumns = columns.slice(0, this.props.fixedColumnCount);
        let scrollableColumns = columns.slice(this.props.fixedColumnCount);

        return {
            fixedColumns,
            scrollableColumns
        };
    }
}
