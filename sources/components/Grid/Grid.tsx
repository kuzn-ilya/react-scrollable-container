import * as React from 'react';

import { GridProps, gridPropTypes } from './GridProps';
import { GridState } from './GridState';
import { Column } from './Column';
import { ColumnProps } from './Column/ColumnProps';
import { Layout } from '../Layout';
import { ScrollableContainer } from '../ScrollableContainer';
import { HeaderCell } from './HeaderCell';
import { Row } from './Row';

export class Grid extends React.PureComponent<GridProps, GridState> {

    static propTypes = gridPropTypes;
    static defaultProps: GridProps = {
        fixedColumnCount: 0,
        fixedRowCount: 0,
        rowData: []
    };

    constructor(props?: GridProps) {
        super(props);
        this.state = this.calculateState();
    }

    render(): JSX.Element {
        return <Layout orientation="horizontal" />;
    }

    renderHeader(data: ColumnProps[]): React.ReactNode {
        return data.map((columnProps: ColumnProps, index: number) =>
            <HeaderCell key={index} width={columnProps.width} caption={columnProps.caption} />
        );
    }

    // tslint:disable-next-line:no-any
    renderRows(rowData: {data: any[], columnProps: ColumnProps[]}): React.ReactNode {
        // tslint:disable-next-line:no-any
        return rowData.data.map((value: any, index: number) =>
            <Row data={value} key={index} rowIndex={index} columnProps={rowData.columnProps}/>
        );
    }

    renderFixedColumns(): JSX.Element | null {
        let { fixedColumnsWidth, fixedColumns } = this.state;
        let { rowData } = this.props;

        return !fixedColumnsWidth ? null :
            <Layout width={fixedColumnsWidth} showSplitter orientation="vertical">
                <Layout height="20px">
                    <ScrollableContainer
                        key="header"
                        contentWidth={fixedColumnsWidth}
                        contentHeight="auto"
                        overflowX="hidden" overflowY="hidden"
                        data={fixedColumns}
                        dataRenderer={this.renderHeader}
                        width="100%"
                        height="100%"
                    />
                </Layout>
                <Layout height="100%">
                    <ScrollableContainer
                        key="body"
                        contentWidth={fixedColumnsWidth}
                        contentHeight="auto"
                        overflowX="hidden" overflowY="hidden"
                        data={{rowData, fixedColumns}}
                        dataRenderer={this.renderRows}
                        width="100%"
                        height="100%"
                    />
                </Layout>
            </Layout>;

                        // horzScrollBarReplacerHeight={this.state.colsThumbHeight}
                        // onVerticalScrollVisibilityChanged={this.handleVerticallScrollVisibilityChanged}
                        // scrollTop={this.state.y}
    }

    renderScrollableColumns(): JSX.Element {
        let { scrollableColumnsWidth, scrollableColumns } = this.state;
        let { rowData } = this.props;

        return (
            <Layout width="100%" orientation="vertical">
                <Layout height="20px">
                    <ScrollableContainer
                        key="header"
                        contentWidth={scrollableColumnsWidth}
                        contentHeight="auto"
                        overflowX="hidden" overflowY="hidden"
                        data={scrollableColumns}
                        dataRenderer={this.renderHeader}
                        width="100%"
                        height="100%"
                    />
                </Layout>
                <Layout height="100%">
                    <ScrollableContainer
                        key="body"
                        contentWidth={scrollableColumnsWidth}
                        contentHeight="auto"
                        overflowX="auto" overflowY="auto"
                        data={{rowData, scrollableColumns}}
                        dataRenderer={this.renderRows}
                        width="100%"
                        height="100%"
                    />
                </Layout>
            </Layout>
                        // scrollLeft={this.state.x}
                        // vertScrollBarReplacerWidth={this.state.rowsThumbWidth}
                        //
                        // onScrollPosChanged={this.handleHorizontalScrollPosChanged}
                        // onVerticalScrollVisibilityChanged={this.handleVerticallScrollVisibilityChanged}
                        // onHorizontalScrollVisibilityChanged={this.handleHorizontalScrollVisibilityChanged}
                        // scrollLeft={this.state.x}
                        // scrollTop={this.state.y}
        );
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

        let fixedColumnsWidth = fixedColumns
            .map((value: ColumnProps): number => value.width)
            .reduce((prevValue: number, currValue: number) => prevValue + currValue, 0);
        let scrollableColumnsWidth = scrollableColumns
            .map((value: ColumnProps): number => value.width)
            .reduce((prevValue: number, currValue: number) => prevValue + currValue, 0);

        let headerHeight = 0;

        return {
            fixedColumnsWidth,
            fixedColumns,
            headerHeight,
            scrollableColumnsWidth,
            scrollableColumns
        };
    }
}
