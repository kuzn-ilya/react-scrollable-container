import * as React from 'react';

import { ColumnGroup2Props, columnGroup2PropTypes } from './ColumnGroup2Props';
import { ColumnGroup2State } from './ColumnGroup2State';
import { ColumnProps } from '../Column/ColumnProps';
import { HeaderRow } from '../HeaderRow';
import { Row } from '../Row';
import { ScrollableContainer2 } from '../../ScrollableContainer';
import { Layout, LayoutPanel } from '../../Layout';
import { RowData } from '../RowData';
import { classNames } from '../../../utils';

import * as emptyFunction from 'fbjs/lib/emptyFunction';

export class ColumnGroup2 extends React.PureComponent<ColumnGroup2Props, ColumnGroup2State> {
    static propTypes = columnGroup2PropTypes;

    static defaultProps: Partial<ColumnGroup2Props> = {
        onScrollPosChanged: emptyFunction
    };

    constructor(props?: ColumnGroup2Props) {
        super(props);

        this.renderHeader = this.renderHeader.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.handleScrollPosChanged = this.handleScrollPosChanged.bind(this);
        this.handleVerticalScrollVisibilityChanged = this.handleVerticalScrollVisibilityChanged.bind(this);

        // TODO calculate columnsWidth whether columnProps is changed
        this.state = {
            columnsWidth: this.props.columnProps
                .map((value: ColumnProps): number => value.width)
                .reduce((prevValue: number, currValue: number) => prevValue + currValue, 0),
            scrollLeft: 0,
            scrollTop: 0
        };
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
        } as ColumnGroup2State);
    }

    header: ScrollableContainer2;
    rows: ScrollableContainer2;

    handleScrollPosChanged: (scrollLeft: number, scrollTop: number) => void = (scrollLeft, scrollTop) => {
        this.setState({
            scrollLeft,
            scrollTop
        } as ColumnGroup2State);
        this.props.onScrollPosChanged!(scrollLeft, scrollTop);
    }

    render(): JSX.Element | null {
        return this.state.columnsWidth ?
            <Layout height="100%"
                width={this.props.width}
                className={classNames({
                    'right-shadow': Boolean(this.props.showRightShadow)
                })}
            >
                <LayoutPanel align="top" height={this.props.headerHeight}>
                    <ScrollableContainer2
                        key="header"
                        contentWidth={this.state.columnsWidth}
                        contentHeight={this.props.headerHeight}
                        overflowX="hidden" overflowY="hidden"
                        data={undefined}
                        dataRenderer={this.renderHeader}
                        width="100%"
                        height={this.props.headerHeight}
                        vertScrollBarReplacerWidth={this.props.overflowY !== 'hidden' ? 17 : 0}
                        ref={(ref: ScrollableContainer2) => this.header = ref}
                        showShadowForReplacer
                        scrollLeft={this.state.scrollLeft}
                    />
                </LayoutPanel>
                <LayoutPanel align="client">
                    <ScrollableContainer2
                        key="body"
                        contentWidth={this.state.columnsWidth}
                        contentHeight={this.props.rowData.length * this.props.rowHeight}
                        overflowX={this.props.overflowX}
                        overflowY={this.props.overflowY}
                        data={this.props.rowData}
                        dataRenderer={this.renderRows}
                        width="100%"
                        height="100%"
                        horzScrollBarReplacerHeight={this.props.overflowX === 'hidden' ? 17 : 0}
                        onScrollPosChanged={this.handleScrollPosChanged}
                        ref={(ref: ScrollableContainer2) => this.rows = ref}
                        showShadowForReplacer
                        scrollTop={this.props.scrollTop}
                    />
                </LayoutPanel>
            </Layout>
            : null;
    }

    setScrollTop(position: number): void {
        return;
        // if (this.rows) {
        //     this.rows.setScrollTop(position);
        // }
    }
}
