import * as React from 'react';

import { ColumnGroupProps, columnGroupPropTypes } from './ColumnGroupProps';
import { ColumnGroupState } from './ColumnGroupState';
import { ColumnProps } from '../Column/ColumnProps';
import { HeaderRow } from '../HeaderRow';
import { Row } from '../Row';
import { ScrollableContainer } from '../../ScrollableContainer';
import { Layout, LayoutPanel } from '../../Layout';
import { RowData } from '../RowData';
import { classNames } from '../../../utils';

import * as emptyFunction from 'fbjs/lib/emptyFunction';

export class ColumnGroup extends React.PureComponent<ColumnGroupProps, ColumnGroupState> {
    static propTypes = columnGroupPropTypes;

    static defaultProps: Partial<ColumnGroupProps> = {
        customScrollBars: false,
        onScrollPosChanged: emptyFunction
    };

    constructor(props?: ColumnGroupProps) {
        super(props);

        this.renderHeader = this.renderHeader.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.handleScrollPosChanged = this.handleScrollPosChanged.bind(this);
        this.handleVerticalScrollVisibilityChanged = this.handleVerticalScrollVisibilityChanged.bind(this);

        this.state = {
            columnsWidth: this.calculateColumnsWidth(this.props),
            scrollLeft: 0,
            scrollTop: 0
        };
    }

    componentWillReceiveProps(nextProps: ColumnGroupProps): void {
        this.setState({
            columnsWidth: this.calculateColumnsWidth(nextProps)
        } as ColumnGroupState);
    }

    calculateColumnsWidth(props: ColumnGroupProps): number {
        return props.columnProps
            .map((value: ColumnProps): number => value.width)
            .reduce((prevValue: number, currValue: number) => prevValue + currValue, 0);
    }

    renderHeader: (data: undefined) => React.ReactNode = (data) => {
        return <HeaderRow columnProps={this.props.columnProps}
            showEdgeForTheLeftCell={this.props.showEdgeForTheLeftCell}
            height={this.props.headerHeight}
        />;
    }

    // tslint:disable-next-line:no-any
    renderRows: (rowData: RowData<any>) => React.ReactNode = (rowData) => {
        // tslint:disable-next-line:no-any
        return Array.prototype.map.call(rowData, (value: any, index: number) =>
            <Row data={value}
                key={index}
                rowIndex={index}
                columnProps={this.props.columnProps}
                height={this.props.rowHeight}
                showEdgeForTheLeftCell={this.props.showEdgeForTheLeftCell}
            />
        );
    }

    handleVerticalScrollVisibilityChanged: (visible: boolean, thumbWidth: number) => void = (visible: boolean, thumbWidth: number) => {
        this.setState({
            columnsWidth: this.state.columnsWidth,
            rowsThumbWidth: thumbWidth
        } as ColumnGroupState);
    }

    header: ScrollableContainer;
    rows: ScrollableContainer;

    handleScrollPosChanged: (scrollLeft: number, scrollTop: number) => void = (scrollLeft, scrollTop) => {
        this.setState({
            scrollLeft,
            scrollTop
        } as ColumnGroupState);
        this.props.onScrollPosChanged!(scrollLeft, scrollTop);
    }

    render(): JSX.Element | null {
        return this.state.columnsWidth ?
            <Layout height="100%"
                width={this.props.width}
                className={classNames({
                    'right-shadow': Boolean(this.props.showRightShadow)
                })}
                onResize={this.props.onResize}
            >
                <LayoutPanel align="top" height={this.props.headerHeight}>
                    <ScrollableContainer
                        customScrollBars={this.props.customScrollBars}
                        key="header"
                        contentWidth={this.state.columnsWidth}
                        contentHeight={this.props.headerHeight}
                        overflowX="hidden" overflowY="hidden"
                        data={undefined}
                        dataRenderer={this.renderHeader}
                        width="100%"
                        height={this.props.headerHeight}
                        vertScrollBarReplacerWidth={this.props.customScrollBars
                            ? (this.props.overflowY !== 'hidden' ? 17 : 0) : this.state.rowsThumbWidth}
                        ref={(ref: ScrollableContainer) => this.header = ref}
                        showShadowForReplacer
                        scrollLeft={this.state.scrollLeft}
                    />
                </LayoutPanel>
                <LayoutPanel align="client">
                    <ScrollableContainer
                        customScrollBars={this.props.customScrollBars}
                        key="body"
                        contentWidth={this.state.columnsWidth}
                        contentHeight={this.props.rowData.length * this.props.rowHeight}
                        overflowX={this.props.overflowX}
                        overflowY={this.props.overflowY}
                        data={this.props.rowData}
                        dataRenderer={this.renderRows}
                        width="100%"
                        height="100%"
                        horzScrollBarReplacerHeight={this.props.customScrollBars
                            ? (this.props.overflowX === 'hidden' ? 17 : 0) : this.props.colsThumbHeight }
                        onScrollPosChanged={this.handleScrollPosChanged}
                        onHorizontalScrollVisibilityChanged={this.props.onHorizontalScrollVisibilityChanged}
                        onVerticalScrollVisibilityChanged={this.handleVerticalScrollVisibilityChanged}
                        ref={(ref: ScrollableContainer) => this.rows = ref}
                        showShadowForReplacer
                        scrollTop={this.props.scrollTop}
                    />
                </LayoutPanel>
            </Layout>
            : null;
    }

    setScrollTop(position: number): void {
        if (this.rows && !this.props.customScrollBars) {
            this.rows.setScrollTop(position);
        }
    }
}
