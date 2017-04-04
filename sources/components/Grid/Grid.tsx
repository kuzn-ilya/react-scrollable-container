import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List } from 'immutable';
import * as objectAssign from 'object-assign';

import { GridProps, gridPropTypes } from './GridProps';
import { GridState } from './GridState';
import { Column } from './Column';
import { ColumnGroup } from './ColumnGroup';
import { ColumnProps } from './Column/ColumnProps';
import { Layout, LayoutPanel, LayoutSplitter } from '../Layout';

import '../../styles/common.css';

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
        this.handleScrollableColumnsResize = this.handleScrollableColumnsResize.bind(this);
        this.state = this.calculateState();
    }

    handleVerticalScrollPosChanged: (scrollLeft: number, scrollTop: number) => void = (scrollLeft, scrollTop) => {
        if (this.fixedColumnGroup) {
            this.fixedColumnGroup.setScrollTop(scrollTop);
        }
        if (this.state.scrollTop !== scrollTop || this.state.scrollLeft !== scrollLeft) {
            this.setState({
                scrollLeft,
                scrollTop
            });
        }
    }

    fixedColumnGroup: ColumnGroup;
    scrollableColumnGroup: ColumnGroup;
    ref: Layout;

    render(): JSX.Element {
        return (
            <Layout height="100%" width="100%"
                ref={(ref) => this.ref = ref}
            >
                <LayoutPanel align="left"
                    width={this.state.fixedColumnsWidth || 0}
                    showRightShadow={(this.state.scrollLeft || 0)  > 0}
                >
                    <ColumnGroup width={this.state.fixedColumnsWidth || 0}
                        ref={(ref: ColumnGroup) => this.fixedColumnGroup = ref }
                        headerHeight={this.props.headerHeight}
                        showEdgeForTheLeftCell
                        rowData={this.props.rowData}
                        columnProps={this.state.fixedColumns!}
                        rowHeight={this.props.rowHeight}
                        colsThumbHeight={this.state.colsThumbHeight}
                        overflowX="hidden"
                        overflowY="hidden"
                    />
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="client"
                >
                    <ColumnGroup width="100%"
                        ref={(ref: ColumnGroup) => this.scrollableColumnGroup = ref }
                        headerHeight={this.props.headerHeight}
                        rowData={this.props.rowData}
                        columnProps={this.state.scrollableColumns!}
                        rowHeight={this.props.rowHeight}
                        overflowX="auto"
                        overflowY="auto"
                        onScrollPosChanged={this.handleVerticalScrollPosChanged}
                        onHorizontalScrollVisibilityChanged={this.handleHorizontalScrollVisibilityChanged}
                        onResize={this.handleScrollableColumnsResize}
                    />
                </LayoutPanel>
            </Layout>
        );
    }

    handleHorizontalScrollVisibilityChanged: (visible: boolean, thumbHeight: number) => void = (visible: boolean, thumbHeight: number) => {
        this.setState({
            colsThumbHeight: thumbHeight
        });
    }

    handleScrollableColumnsResize: () => void = () => {
        if (this.scrollableColumnGroup && this.fixedColumnGroup && this.ref) {
            let layoutDom = ReactDOM.findDOMNode(this.ref);
            let scrollableColumnGroupDom = ReactDOM.findDOMNode(this.scrollableColumnGroup);
            let lastFixedColumn: ColumnProps = objectAssign({}, this.state.fixedColumns!.last());
            let oldFixedColumnsWidth = this.state.fixedColumnsWidth || 0;
            let newFixedColumnsWidth = layoutDom.clientWidth - scrollableColumnGroupDom.clientWidth;
            lastFixedColumn.width = lastFixedColumn.width - oldFixedColumnsWidth + newFixedColumnsWidth;
            let fixedColumns = this.state.fixedColumns!.set(this.state.fixedColumns!.size - 1, lastFixedColumn);
            this.setState({
                fixedColumns,
                fixedColumnsWidth: newFixedColumnsWidth
            });
        }
    }

    getColumnProps(): ColumnProps[] {
        return React.Children
            .toArray(this.props.children).filter((value: React.ReactChild): boolean =>
                typeof value !== 'string' && typeof value !== 'number' && value.type === Column
            )
            .map((value: React.ReactChild) =>
                (value as React.ReactElement<ColumnProps>).props
            );
    }

    calculateState(): GridState {
        let columns = this.getColumnProps();

        let fixedColumns = columns.slice(0, this.props.fixedColumnCount);
        let scrollableColumns = columns.slice(this.props.fixedColumnCount);

        // TODO calculate columnsWidth whether columnProps is changed
        let fixedColumnsWidth = fixedColumns
            .map((value: ColumnProps): number => value.width)
            .reduce((prevValue: number, currValue: number) => prevValue + currValue, 0);

        let fixedColumnMinWidth = fixedColumns
            .slice(0, -1)
            .map((value: ColumnProps): number => value.width)
            .reduce((prevValue: number, currValue: number) => prevValue + currValue, 0);

        return {
            fixedColumns: List(fixedColumns),
            fixedColumnMinWidth,
            fixedColumnsWidth,
            scrollableColumns: List(scrollableColumns)
        };
    }
}
