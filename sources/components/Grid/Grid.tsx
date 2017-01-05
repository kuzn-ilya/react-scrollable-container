import * as React from 'react';

import { GridProps, gridPropTypes } from './GridProps';
import { GridState } from './GridState';
import { Column } from './Column';
import { ColumnProps } from './Column/ColumnProps';
import { Layout } from '../Layout';
import { ScrollableContainer } from '../ScrollableContainer';
import { HeaderCell } from './HeaderCell';
import { Row } from './Row';

interface HeaderRowData {
    columnProps: ColumnProps[];
    showEdgeForTheFirstCell: boolean;
}

interface RowData extends HeaderRowData {
    // tslint:disable-next-line:no-any
    data: any[];
}

export class Grid extends React.PureComponent<GridProps, GridState> {

    static propTypes = gridPropTypes;

    static defaultProps: GridProps = {
        fixedColumnCount: 0,
        fixedRowCount: 0,
        rowData: [],
        rowHeight: 0
    };

    constructor(props?: GridProps) {
        super(props);

        this.handleHorizontalScrollPosChanged = this.handleHorizontalScrollPosChanged.bind(this);
        this.handleHorizontalScrollVisibilityChanged = this.handleHorizontalScrollVisibilityChanged.bind(this);
        this.handleVerticalScrollVisibilityChanged = this.handleVerticalScrollVisibilityChanged.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.state = this.calculateState();
    }

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

    renderHeader(data: HeaderRowData): React.ReactNode {
        return data.columnProps.map((columnProps: ColumnProps, index: number) =>
            <HeaderCell key={index}
                width={columnProps.width}
                caption={columnProps.caption}
                firstCell={index === 0 && data.showEdgeForTheFirstCell}
            />
        );
    }

    renderRows: (rowData: RowData) => React.ReactNode = (rowData: RowData) => {
        // tslint:disable-next-line:no-any
        return rowData.data.map((value: any, index: number) =>
            <Row data={value}
                key={index}
                rowIndex={index}
                columnProps={rowData.columnProps}
                height={this.props.rowHeight}
                showEdgeForTheFirstCell={rowData.showEdgeForTheFirstCell}
            />
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
                        data={{columnProps: fixedColumns, showEdgeForTheFirstCell: true}}
                        dataRenderer={this.renderHeader}
                        width="100%"
                        height="20px"
                    />
                </Layout>
                <Layout height="100%">
                    <ScrollableContainer
                        key="body"
                        contentWidth={fixedColumnsWidth}
                        contentHeight="auto"
                        overflowX="hidden" overflowY="hidden"
                        data={{columnProps: fixedColumns, data: rowData, showEdgeForTheFirstCell: true}}
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
        let { rowData } = this.props;

        return (
            <Layout width="100%" orientation="vertical">
                <Layout height="20px">
                    <ScrollableContainer
                        key="header"
                        contentWidth={scrollableColumnsWidth}
                        contentHeight="auto"
                        overflowX="hidden" overflowY="hidden"
                        data={{columnProps: scrollableColumns, showEdgeForTheFirstCell: false}}
                        dataRenderer={this.renderHeader}
                        width="100%"
                        height="20px"
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
                        data={{columnProps: scrollableColumns, data: rowData}}
                        dataRenderer={this.renderRows}
                        width="100%"
                        height="100%"
                        onScrollPosChanged={this.handleHorizontalScrollPosChanged}
                        onVerticalScrollVisibilityChanged={this.handleVerticalScrollVisibilityChanged}
                        onHorizontalScrollVisibilityChanged={this.handleHorizontalScrollVisibilityChanged}
                        scrollLeft={this.state.scrollLeft}
                        scrollTop={this.state.scrollTop}
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
            scrollableColumns
        };
    }
}
