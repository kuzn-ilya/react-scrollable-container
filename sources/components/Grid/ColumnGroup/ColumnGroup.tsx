import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List } from 'immutable';
import * as objectAssign from 'object-assign';

import { ColumnGroupProps, columnGroupPropTypes } from './ColumnGroupProps';
import { ColumnGroupState } from './ColumnGroupState';
import { ColumnProps } from '../Columns/Column/ColumnProps';
import { Rows } from '../Rows';
import { ScrollableContainer } from '../../ScrollableContainer';
import { Layout, LayoutPanel } from '../../Layout';
import { classNames, Direction } from '../../../utils';

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
            scrollLeft: 0,
            scrollTop: 0,
            selectedIndexes: []
        }) as ColumnGroupState;
    }

    componentWillReceiveProps(nextProps: ColumnGroupProps): void {
        if (nextProps.columnProps !== this.props.columnProps || nextProps.customScrollBars !== this.props.customScrollBars) {
            this.updateColumnState(nextProps, this.state.rowsThumbWidth || 0);
        }

        if (nextProps.selectedRowIndexes !== this.props.selectedRowIndexes
            || nextProps.focusedCellPropName !== this.props.focusedCellPropName
            || nextProps.focusedCellRowIndex !== this.props.focusedCellRowIndex) {
            let newState = {
                focusedCellPropName: nextProps.focusedCellPropName,
                focusedCellRowIndex: nextProps.focusedCellRowIndex,
                selectedIndexes: nextProps.selectedRowIndexes
            };
            this.setState(newState as ColumnGroupState);
        }

        if (nextProps.scrollTop !== this.props.scrollTop) {
            let newState = {
                scrollTop: nextProps.scrollTop
            };
            this.setState(newState as ColumnGroupState);
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

    handleRowClick = (rowIndex: number, propName: string, e: React.MouseEvent<HTMLElement>) => {
        if (this.props.onRowClick) {
            this.props.onRowClick(rowIndex, propName, e);
        }

        this.setState({
            focusedCellPropName: propName,
            focusedCellRowIndex: rowIndex
        } as ColumnGroupState);
    }

    handleRowMove = (direction: Direction, rowIndex: number, propName: string): void => {
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
                focusedCellPropName: nextCellPropName,
                focusedCellRowIndex: rowIndex
            } as ColumnGroupState);
        } else if (direction === 'down' && rowIndex < this.props.rowData.length - 1) {
            this.setState({
                focusedCellPropName: propName,
                focusedCellRowIndex: rowIndex + 1
            } as ColumnGroupState);
        } else if (direction === 'up' && rowIndex > 0) {
            this.setState({
                focusedCellPropName: propName,
                focusedCellRowIndex: rowIndex - 1
            } as ColumnGroupState);
        }
        if (this.props.onRowMove) {
            this.props.onRowMove(direction, rowIndex, propName);
        }
    }

    handleCellFocus = (rowIndex: number, propName: string): void => {
        this.setState({
            focusedCellPropName: propName,
            focusedCellRowIndex: rowIndex
        } as ColumnGroupState);

        if (this.rows) {
            if (this.state.scrollTop / this.props.rowHeight > rowIndex) {
                this.setState({
                    scrollTop: this.props.rowHeight * rowIndex
                } as ColumnGroupState);
            } else {
                let element = ReactDOM.findDOMNode(this.rows) as HTMLElement;
                if ((this.state.scrollTop + element.offsetHeight) / this.props.rowHeight < rowIndex) {
                    this.setState({
                        scrollTop: this.props.rowHeight * rowIndex
                    } as ColumnGroupState);
                }
            }
        }

        if (this.props.onCellFocus) {
            this.props.onCellFocus(rowIndex, propName);
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
        // tslint:disable-next-line:variable-name
        let HeaderRow = this.props.headerRowClass;
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
                        width="100%"
                        height={this.props.headerHeight}
                        vertScrollBarReplacerWidth={this.state.rowsThumbWidth}
                        ref={(ref: ScrollableContainer) => this.header = ref}
                        showShadowForReplacer
                        scrollLeft={this.state.scrollLeft}
                    >
                        <HeaderRow columnProps={this.state.columnProps}
                            showEdgeForTheLeftCell={this.props.showEdgeForTheLeftCell}
                            height={this.props.headerHeight}
                        />;
                    </ScrollableContainer>
                </LayoutPanel>
                <LayoutPanel align="client">
                    <ScrollableContainer
                        customScrollBars={this.props.customScrollBars}
                        key="body"
                        contentWidth={this.state.columnsWidth}
                        contentHeight={this.props.rowData.length * this.props.rowHeight}
                        overflowX={this.props.overflowX}
                        overflowY={this.props.overflowY}
                        width="100%"
                        height="100%"
                        horzScrollBarReplacerHeight={this.props.colsThumbHeight }
                        onScrollPosChanged={this.handleScrollPosChanged}
                        onHorizontalScrollVisibilityChanged={this.props.onHorizontalScrollVisibilityChanged}
                        onVerticalScrollVisibilityChanged={this.handleVerticalScrollVisibilityChanged}
                        ref={(ref: ScrollableContainer) => this.rows = ref}
                        showShadowForReplacer
                        scrollLeft={this.state.scrollLeft}
                        scrollTop={this.state.scrollTop}
                    >
                        <Rows
                            columnProps={this.props.columnProps}
                            rowData={this.props.rowData}
                            selectedIndexes={this.state.selectedIndexes}
                            rowClass={this.props.rowClass}
                            rowHeight={this.props.rowHeight}
                            onCellFocus={this.handleCellFocus}
                            onRowClick={this.handleRowClick}
                            onRowMove={this.handleRowMove}
                            showEdgeForTheLeftCell={this.props.showEdgeForTheLeftCell}
                            focusedCellPropName={this.state.focusedCellPropName}
                            focusedCellRowIndex={this.state.focusedCellRowIndex}
                        />
                    </ScrollableContainer>
                </LayoutPanel>
            </Layout>
            : null;
    }

    // TODO: Now setScrollTop is not used anymore.
    setScrollTop(position: number): void {
        if (this.rows && !this.props.customScrollBars) {
            this.rows.setScrollTop(position);
        }
    }
}
