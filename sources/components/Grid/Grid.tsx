import * as React from 'react';

import { GridProps, gridPropTypes } from './GridProps';
import { GridState } from './GridState';
import { Column } from './Column';
import { ColumnProps } from './Column/ColumnProps';
import { Layout } from '../Layout';
import { ScrollableContainer } from '../ScrollableContainer';
import { HeaderRow } from './HeaderRow';
import { Row } from './Row';

interface HeaderData {
    columnProps: ColumnProps[];
    height: number;
    showEdgeForTheLeftCell: boolean;
}

interface RowData {
    columnProps: ColumnProps[];
    // tslint:disable-next-line:no-any
    data: any[];
    showEdgeForTheLeftCell: boolean;
}

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

        this.handleHorizontalScrollPosChanged = this.handleHorizontalScrollPosChanged.bind(this);
        this.handleHorizontalScrollVisibilityChanged = this.handleHorizontalScrollVisibilityChanged.bind(this);
        this.handleVerticalScrollVisibilityChanged = this.handleVerticalScrollVisibilityChanged.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.state = this.calculateState();
    }

    fixedColumnsHeaderData?: HeaderData;
    fixedColumnsRowData?: RowData;
    scrollableColumnsHeaderData?: HeaderData;
    scrollableColumnsRowData?: RowData;

    handleHorizontalScrollPosChanged: (scrollLeft: number, scrollTop: number) => void = (scrollLeft, scrollTop) => {
        if (this.state.scrollLeft !== scrollLeft) {
            this.setState({
                scrollLeft
            });
        }

        if (this.state.scrollTop !== scrollTop) {
            this.setState({
                scrollTop
            });
        }
    }

    render(): JSX.Element {
        return (
            <Layout orientation="horizontal" height="100%">
                {this.renderFixedColumns()}
                {this.renderScrollableColumns()}
            </Layout>
        );
    }

    renderHeader: (data: HeaderData) => React.ReactNode = (data: HeaderData) => {
        return <HeaderRow columnProps={data.columnProps}
            showEdgeForTheLeftCell={data.showEdgeForTheLeftCell}
            height={data.height}
        />;
    }

    renderRows: (rowData: RowData) => React.ReactNode = (rowData: RowData) => {
        // tslint:disable-next-line:no-any
        return rowData.data.map((value: any, index: number) =>
            <Row data={value}
                key={index}
                rowIndex={index}
                columnProps={rowData.columnProps}
                height={this.props.rowHeight}
                showEdgeForTheLeftCell={rowData.showEdgeForTheLeftCell}
            />
        );
    }

    renderFixedColumns(): JSX.Element | null {
        let { fixedColumnsWidth, fixedColumns } = this.state;
        let { rowData, headerHeight } = this.props;

        if (!this.fixedColumnsHeaderData || this.fixedColumnsHeaderData.columnProps !== fixedColumns
            || this.fixedColumnsHeaderData.height !== headerHeight) {
            this.fixedColumnsHeaderData = {
                columnProps: fixedColumns!,
                height: headerHeight,
                showEdgeForTheLeftCell: true
            };
        }

        if (!this.fixedColumnsRowData || this.fixedColumnsRowData.columnProps !== fixedColumns
            || this.fixedColumnsRowData.data !== rowData) {
            this.fixedColumnsRowData = {
                columnProps: fixedColumns!,
                data: rowData,
                showEdgeForTheLeftCell: true
            };
        }

        return !fixedColumnsWidth ? null :
            <Layout width={fixedColumnsWidth} orientation="vertical">
                <Layout height={this.props.headerHeight}>
                    <ScrollableContainer
                        key="header"
                        contentWidth={fixedColumnsWidth}
                        contentHeight={this.props.headerHeight}
                        overflowX="hidden" overflowY="hidden"
                        data={this.fixedColumnsHeaderData}
                        dataRenderer={this.renderHeader}
                        width="100%"
                        height={this.props.headerHeight}
                    />
                </Layout>
                <Layout height="100%">
                    <ScrollableContainer
                        key="body"
                        contentWidth={fixedColumnsWidth}
                        contentHeight="auto"
                        overflowX="hidden" overflowY="hidden"
                        data={this.fixedColumnsRowData}
                        dataRenderer={this.renderRows}
                        width="100%"
                        height="100%"
                        scrollTop={this.state.scrollTop}
                        horzScrollBarReplacerHeight={this.state.colsThumbHeight}
                    />
                </Layout>
            </Layout>;
    }

    renderScrollableColumns(): JSX.Element {
        let { scrollableColumnsWidth, scrollableColumns } = this.state;
        let { headerHeight, rowData } = this.props;

        if (!this.scrollableColumnsHeaderData || this.scrollableColumnsHeaderData.columnProps !== scrollableColumns
            || this.scrollableColumnsHeaderData.height !== headerHeight) {
            this.scrollableColumnsHeaderData = {
                columnProps: scrollableColumns!,
                height: headerHeight,
                showEdgeForTheLeftCell: true
            };
        }

        if (!this.scrollableColumnsRowData || this.scrollableColumnsRowData.columnProps !== scrollableColumns
            || this.scrollableColumnsRowData.data !== rowData) {
            this.scrollableColumnsRowData = {
                columnProps: scrollableColumns!,
                data: rowData,
                showEdgeForTheLeftCell: true
            };
        }

        return (
            <Layout width="100%" orientation="vertical">
                <Layout height={this.props.headerHeight}>
                    <ScrollableContainer
                        key="header"
                        contentWidth={scrollableColumnsWidth}
                        contentHeight={this.props.headerHeight}
                        overflowX="hidden" overflowY="hidden"
                        data={this.scrollableColumnsHeaderData}
                        dataRenderer={this.renderHeader}
                        width="100%"
                        height={this.props.headerHeight}
                        scrollLeft={this.state.scrollLeft}
                        vertScrollBarReplacerWidth={this.state.rowsThumbWidth}
                    />
                </Layout>
                <Layout height="100%">
                    <ScrollableContainer
                        key="body"
                        contentWidth={scrollableColumnsWidth}
                        contentHeight="auto"
                        overflowX="auto" overflowY="auto"
                        data={this.scrollableColumnsRowData}
                        dataRenderer={this.renderRows}
                        width="100%"
                        height="100%"
                        onScrollPosChanged={this.handleHorizontalScrollPosChanged}
                        onVerticalScrollVisibilityChanged={this.handleVerticalScrollVisibilityChanged}
                        onHorizontalScrollVisibilityChanged={this.handleHorizontalScrollVisibilityChanged}
                    />
                </Layout>
            </Layout>
        );
    }

    handleVerticalScrollVisibilityChanged: (visible: boolean, thumbWidth: number) => void = (visible: boolean, thumbWidth: number) => {
        this.setState({
            rowsThumbWidth: thumbWidth
        });
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
            scrollableColumns,
            scrollLeft: 0,
            scrollTop: 0
        };
    }
}
