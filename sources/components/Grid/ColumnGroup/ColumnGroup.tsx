import * as React from 'react';

import { ColumnGroupProps, columnGroupPropTypes } from './ColumnGroupProps';
import { ColumnGroupState } from './ColumnGroupState';
import { ColumnProps } from '../Column/ColumnProps';
import { HeaderRow } from '../HeaderRow';
import { Row } from '../Row';
import { ScrollableContainer } from '../../ScrollableContainer';

import '../../../styles/layout2.css';

export class ColumnGroup extends React.PureComponent<ColumnGroupProps, ColumnGroupState> {
    static propTypes = columnGroupPropTypes;

    constructor(props?: ColumnGroupProps) {
        super(props);

        this.renderHeader = this.renderHeader.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.handleHorizontalScrollPosChanged = this.handleHorizontalScrollPosChanged.bind(this);
        this.handleVerticalScrollVisibilityChanged = this.handleVerticalScrollVisibilityChanged.bind(this);

        // TODO calculate columnsWidth whether columnProps is changed
        this.state = {
            columnsWidth: this.props.columnProps
                .map((value: ColumnProps): number => value.width)
                .reduce((prevValue: number, currValue: number) => prevValue + currValue, 0)
        };
    }

    renderHeader: (data: undefined) => React.ReactNode = (data: undefined) => {
        return <HeaderRow columnProps={this.props.columnProps}
            showEdgeForTheLeftCell={this.props.showEdgeForTheLeftCell}
            height={this.props.headerHeight}
        />;
    }

    // tslint:disable-next-line:no-any
    renderRows: (rowData: any[]) => React.ReactNode = (rowData: any[]) => {
        // tslint:disable-next-line:no-any
        return rowData.map((value: any, index: number) =>
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
            rowsThumbWidth: thumbWidth,
        });
    }

    scrollTop: number = 0;
    scrollLeft: number = 0;
    header: ScrollableContainer;

    handleHorizontalScrollPosChanged: (scrollLeft: number, scrollTop: number) => void = (scrollLeft, scrollTop) => {
        if (this.scrollLeft !== scrollLeft) {
            this.scrollLeft = scrollLeft;
            this.header.setScrollLeft(scrollLeft);
        }

        if (this.scrollTop !== scrollTop && this.props.onScrollPosChanged) {
            this.scrollTop = scrollTop;
            this.props.onScrollPosChanged(scrollTop);
        }
    }

    render(): JSX.Element | null {
        return this.state.columnsWidth ?
            <div className="layout2-container" style={{
                height: '100%',
                width: this.props.width === 'auto' ? this.state.columnsWidth + 'px' : this.props.width
            }}>
                <div className="layout2-vert-first" style={{
                    height: this.props.headerHeight
                }}>
                    <ScrollableContainer
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
                    />
                </div>
                <div className="layout2-vert-second"  style={{
                    top: this.props.headerHeight
                }}>
                    <ScrollableContainer
                        key="body"
                        contentWidth={this.state.columnsWidth}
                        contentHeight="auto"
                        overflowX={this.props.overflowX}
                        overflowY={this.props.overflowY}
                        data={this.props.rowData}
                        dataRenderer={this.renderRows}
                        width="100%"
                        height="100%"
                        scrollTop={this.props.scrollTop}
                        horzScrollBarReplacerHeight={this.props.colsThumbHeight}
                        onScrollPosChanged={this.handleHorizontalScrollPosChanged}
                        onHorizontalScrollVisibilityChanged={this.props.onHorizontalScrollVisibilityChanged}
                        onVerticalScrollVisibilityChanged={this.handleVerticalScrollVisibilityChanged}
                    />
                </div>
            </div>
            : null;
    }
}
