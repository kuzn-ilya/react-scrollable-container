import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List } from 'immutable';
import * as objectAssign from 'object-assign';

import { ColumnGroupProps, columnGroupPropTypes } from './ColumnGroupProps';
import { ColumnGroupState, RowState } from './ColumnGroupState';
import { ColumnProps } from '../Columns/Column/ColumnProps';
import { ScrollableContainer } from '../../ScrollableContainer';
import { Layout, LayoutPanel } from '../../Layout';
import { classNames } from '../../../utils';

import * as emptyFunction from 'fbjs/lib/emptyFunction';

export class ColumnGroup extends React.PureComponent<ColumnGroupProps, ColumnGroupState> {
    static propTypes = columnGroupPropTypes;

    static defaultProps: Partial<ColumnGroupProps> = {
        customScrollBars: false,
        onResize: emptyFunction,
        onScrollPosChanged: emptyFunction
    };

    constructor(props?: ColumnGroupProps) {
        super(props);
        this.state = objectAssign({}, this.calculateColumnState(this.props.columnProps, 0), {
            rowState: {
                data: this.props.rowData,
                selectedIndexes: []
            },
            scrollLeft: 0,
            scrollTop: 0
        }) as ColumnGroupState;
    }

    componentWillReceiveProps(nextProps: ColumnGroupProps): void {
        if (nextProps.columnProps !== this.props.columnProps || nextProps.customScrollBars !== this.props.customScrollBars) {
            this.updateColumnState(nextProps, this.state.rowsThumbWidth || 0);
        }

        if (nextProps.rowData !== this.props.rowData || nextProps.selectedRowIndexes !== this.props.selectedRowIndexes
            || nextProps.focusedCellPropName !== this.props.focusedCellPropName
            || nextProps.focusedCellRowIndex !== this.props.focusedCellRowIndex) {
            let rowState = objectAssign({}, this.state.rowState);

            if (nextProps.rowData !== this.props.rowData) {
                rowState.data = nextProps.rowData;
            }

            if (nextProps.selectedRowIndexes !== this.props.selectedRowIndexes) {
                rowState.selectedIndexes = nextProps.selectedRowIndexes || [];
            }

            if (nextProps.focusedCellPropName !== this.props.focusedCellPropName) {
                rowState.focusedCellPropName = nextProps.focusedCellPropName;
            }

            if (nextProps.focusedCellRowIndex !== this.props.focusedCellRowIndex) {
                rowState.focusedCellRowIndex = nextProps.focusedCellRowIndex;
            }

            this.setState({
                rowState
            } as ColumnGroupState);
        }
    }

    componentDidMount(): void {
        this.updateColumnState(this.props, this.state.rowsThumbWidth || 0);
    }

    updateColumnState(props: ColumnGroupProps, rowsThumbWidth: number): void {
        this.setState(this.calculateColumnState(props.columnProps, rowsThumbWidth) as ColumnGroupState);
    }

    // tslint:disable-next-line:no-any
    calculateColumnState(props: List<ColumnProps<any>>, rowsThumbWidth: number): Partial<ColumnGroupState> {
        let columnsWidth = props
            // tslint:disable-next-line:no-any
            .map((value: ColumnProps<any>): number => value.width)
            .reduce((prevValue: number, currValue: number) => prevValue + currValue, 0);
        let columnProps = props;
        let width = this.state ? this.state.width : 0;

        if (props.size > 0 && this.ref) {
            let refDom = ReactDOM.findDOMNode(this.ref) as HTMLElement;
            width = refDom.offsetWidth;
            if (columnsWidth < width - rowsThumbWidth) {
                let lastColumnProps = props.last();
                let newLastcolumnProps = objectAssign({}, lastColumnProps);

                newLastcolumnProps.width = width - columnsWidth + newLastcolumnProps.width - rowsThumbWidth;
                columnsWidth = width - rowsThumbWidth;

                let newProps = props.set(props.size - 1, newLastcolumnProps);
                columnProps = newProps;
            }
        }
        return {
            columnProps,
            columnsWidth,
            width
        };
    }

    renderHeader = (data: undefined): React.ReactNode => {
        // tslint:disable-next-line:variable-name
        let HeaderRow = this.props.headerRowClass;
        return <HeaderRow columnProps={this.state.columnProps}
            showEdgeForTheLeftCell={this.props.showEdgeForTheLeftCell}
            height={this.props.headerHeight}
        />;
    }

    // tslint:disable-next-line:no-any
    renderRows = (rowData: RowState): React.ReactNode => {
        // tslint:disable-next-line:variable-name
        let Row = this.props.rowClass;
        // tslint:disable-next-line:no-any
        return Array.prototype.map.call(rowData.data, (value: any, index: number) =>
            <Row data={value}
                key={index}
                rowIndex={index}
                columnProps={this.state.columnProps}
                height={this.props.rowHeight}
                showEdgeForTheLeftCell={this.props.showEdgeForTheLeftCell}
                selected={!!(rowData.selectedIndexes && (rowData.selectedIndexes.indexOf(index) >= 0))}
                onClick={this.props.onRowClick}
                onMove={this.handleRowMove}
                focusedCellPropName={rowData.focusedCellRowIndex === index && rowData.focusedCellPropName
                    ? rowData.focusedCellPropName : undefined}
            />
        );
    }

    handleRowMove = (direction: 'left' | 'right' | 'down' | 'up', rowIndex: number, propName: string): void => {
        let index = this.props.columnProps.findIndex((columnProps) =>
            (columnProps && columnProps.propName) === propName
        );

        let nextCellPropName = propName;
        if (direction === 'left' || direction === 'right') {
            if (index > 0 && direction === 'left') {
                nextCellPropName = this.props.columnProps.get(index - 1).propName;
            } else if (index < this.props.columnProps.size - 1 && direction === 'right') {
                nextCellPropName = this.props.columnProps.get(index + 1).propName;
            }

            this.setState({
                rowState: {
                    data: this.state.rowState.data,
                    focusedCellPropName: nextCellPropName,
                    focusedCellRowIndex: rowIndex,
                    selectedIndexes: this.state.rowState.selectedIndexes
                }
            } as ColumnGroupState);
        } else if (direction === 'down' && rowIndex < this.props.rowData.length - 1) {
            this.setState({
                rowState: {
                    data: this.state.rowState.data,
                    focusedCellPropName: propName,
                    focusedCellRowIndex: rowIndex + 1,
                    selectedIndexes: this.state.rowState.selectedIndexes
                }
            } as ColumnGroupState);
        } else if (direction === 'up' && rowIndex > 0) {
            this.setState({
                rowState: {
                    data: this.state.rowState.data,
                    focusedCellPropName: propName,
                    focusedCellRowIndex: rowIndex - 1,
                    selectedIndexes: this.state.rowState.selectedIndexes
                }
            } as ColumnGroupState);
        }
        if (this.props.onRowMove) {
            this.props.onRowMove(direction, rowIndex, propName);
        }
    }

    handleVerticalScrollVisibilityChanged = (visible: boolean, thumbWidth: number): void => {
        this.setState({
            rowsThumbWidth: thumbWidth
        } as ColumnGroupState);
        this.updateColumnState(this.props, thumbWidth);
    }

    header: ScrollableContainer;
    rows: ScrollableContainer;
    ref: Layout;

    handleScrollPosChanged = (scrollLeft: number, scrollTop: number): void => {
        this.setState({
            scrollLeft,
            scrollTop
        } as ColumnGroupState);
        this.props.onScrollPosChanged!(scrollLeft, scrollTop);
    }

    handleResize = (): void => {
        this.updateColumnState(this.props, this.state.rowsThumbWidth || 0);
        this.props.onResize!();
    }

    render(): JSX.Element | null {
        return this.state.columnsWidth ?
            <Layout height="100%"
                width={this.props.width}
                className={classNames({
                    'right-shadow': Boolean(this.props.showRightShadow)
                })}
                onResize={this.handleResize}
                ref={(ref: Layout) => this.ref = ref}
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
                        vertScrollBarReplacerWidth={this.state.rowsThumbWidth}
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
                        contentHeight={this.state.rowState.data.length * this.props.rowHeight}
                        overflowX={this.props.overflowX}
                        overflowY={this.props.overflowY}
                        data={this.state.rowState}
                        dataRenderer={this.renderRows}
                        width="100%"
                        height="100%"
                        horzScrollBarReplacerHeight={this.props.colsThumbHeight }
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
