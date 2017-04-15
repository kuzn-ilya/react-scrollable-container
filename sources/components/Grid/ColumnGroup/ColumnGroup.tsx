import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { List } from 'immutable';
import * as objectAssign from 'object-assign';

import { ColumnGroupProps, columnGroupPropTypes } from './ColumnGroupProps';
import { ColumnGroupState } from './ColumnGroupState';
import { ColumnProps } from '../Column/ColumnProps';
import { ScrollableContainer } from '../../ScrollableContainer';
import { Layout, LayoutPanel } from '../../Layout';
import { RowData } from '../RowData';
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

        this.renderHeader = this.renderHeader.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.handleScrollPosChanged = this.handleScrollPosChanged.bind(this);
        this.handleVerticalScrollVisibilityChanged = this.handleVerticalScrollVisibilityChanged.bind(this);
        this.handleResize = this.handleResize.bind(this);

        this.state = objectAssign(this.calculateColumnState(this.props.columnProps, 0), {
            scrollLeft: 0,
            scrollTop: 0
        }) as ColumnGroupState;
    }

    componentWillReceiveProps(nextProps: ColumnGroupProps): void {
        if (nextProps.columnProps !== this.props.columnProps || nextProps.customScrollBars !== this.props.customScrollBars) {
            this.updateColumnState(nextProps, this.state.rowsThumbWidth || 0);
        }
    }

    componentDidMount(): void {
        this.updateColumnState(this.props, this.state.rowsThumbWidth || 0);
    }

    updateColumnState(props: ColumnGroupProps, rowsThumbWidth: number): void {
        this.setState(this.calculateColumnState(props.columnProps, rowsThumbWidth) as ColumnGroupState);
    }

    calculateColumnState(props: List<ColumnProps>, rowsThumbWidth: number): Partial<ColumnGroupState> {
        let columnsWidth = props
            .map((value: ColumnProps): number => value.width)
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

    renderHeader: (data: undefined) => React.ReactNode = (data) => {
        // tslint:disable-next-line:variable-name
        let HeaderRow = this.props.headerRowClass;
        return <HeaderRow columnProps={this.state.columnProps}
            showEdgeForTheLeftCell={this.props.showEdgeForTheLeftCell}
            height={this.props.headerHeight}
        />;
    }

    // tslint:disable-next-line:no-any
    renderRows: (rowData: RowData<any>) => React.ReactNode = (rowData) => {
        // tslint:disable-next-line:variable-name
        let Row = this.props.rowClass;
        // tslint:disable-next-line:no-any
        return Array.prototype.map.call(rowData, (value: any, index: number) =>
            <Row data={value}
                key={index}
                rowIndex={index}
                columnProps={this.state.columnProps}
                height={this.props.rowHeight}
                showEdgeForTheLeftCell={this.props.showEdgeForTheLeftCell}
            />
        );
    }

    handleVerticalScrollVisibilityChanged: (visible: boolean, thumbWidth: number) => void = (visible: boolean, thumbWidth: number) => {
        this.setState({
            rowsThumbWidth: thumbWidth
        } as ColumnGroupState);
        this.updateColumnState(this.props, thumbWidth);
    }

    header: ScrollableContainer;
    rows: ScrollableContainer;
    ref: Layout;

    handleScrollPosChanged: (scrollLeft: number, scrollTop: number) => void = (scrollLeft, scrollTop) => {
        this.setState({
            scrollLeft,
            scrollTop
        } as ColumnGroupState);
        this.props.onScrollPosChanged!(scrollLeft, scrollTop);
    }

    handleResize: () => void = () => {
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
                        contentHeight={this.props.rowData.length * this.props.rowHeight}
                        overflowX={this.props.overflowX}
                        overflowY={this.props.overflowY}
                        data={this.props.rowData}
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
