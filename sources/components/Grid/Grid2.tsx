import * as React from 'react';

import { Grid2Props, grid2PropTypes } from './Grid2Props';
import { Grid2State } from './Grid2State';
import { Column } from './Column';
import { ColumnGroup2 } from './ColumnGroup2';
import { ColumnProps } from './Column/ColumnProps';
import { Layout, LayoutPanel, LayoutSplitter } from '../Layout';

// import { classNames } from '../../utils/classNames';

import '../../styles/common.css';

export class Grid2 extends React.PureComponent<Grid2Props, Grid2State> {

    static propTypes = grid2PropTypes;

    static defaultProps: Grid2Props = {
        fixedColumnCount: 0,
        fixedRowCount: 0,
        headerHeight: 0,
        rowData: [],
        rowHeight: 0
    };

    constructor(props?: Grid2Props) {
        super(props);

        this.handleVerticalScrollPosChanged = this.handleVerticalScrollPosChanged.bind(this);
        this.handleHorizontalScrollVisibilityChanged = this.handleHorizontalScrollVisibilityChanged.bind(this);
        this.state = this.calculateState();
    }

    handleVerticalScrollPosChanged: (scrollLeft: number, scrollTop: number) => void = (scrollLeft, scrollTop) => {
        if (this.state.scrollTop !== scrollTop || this.state.scrollLeft !== scrollLeft) {
            this.setState({
                scrollLeft,
                scrollTop
            });
        }
    }

    render(): JSX.Element {
        return (
            <Layout height="100%" width="100%">
                <LayoutPanel align="left" width={this.state.fixedColumnsWidth || 0} showRightShadow={this.state.scrollLeft > 0}>
                    <ColumnGroup2 width={this.state.fixedColumnsWidth || 0}
                        headerHeight={this.props.headerHeight}
                        showEdgeForTheLeftCell
                        rowData={this.props.rowData}
                        columnProps={this.state.fixedColumns!}
                        rowHeight={this.props.rowHeight}
                        colsThumbHeight={this.state.colsThumbHeight}
                        overflowX="hidden"
                        overflowY="hidden"
                        scrollTop={this.state.scrollTop}
                    />
                </LayoutPanel>
                <LayoutSplitter />
                <LayoutPanel align="client">
                    <ColumnGroup2 width="100%"
                        headerHeight={this.props.headerHeight}
                        rowData={this.props.rowData}
                        columnProps={this.state.scrollableColumns!}
                        rowHeight={this.props.rowHeight}
                        overflowX="auto"
                        overflowY="auto"
                        onScrollPosChanged={this.handleVerticalScrollPosChanged}
                        onHorizontalScrollVisibilityChanged={this.handleHorizontalScrollVisibilityChanged}
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

    calculateState(): Grid2State {
        let columns = React.Children
            .toArray(this.props.children).filter((value: React.ReactChild): boolean =>
                typeof value !== 'string' && typeof value !== 'number' && value.type === Column
            )
            .map((value: React.ReactChild) =>
                (value as React.ReactElement<ColumnProps>).props
            );

        let fixedColumns = columns.slice(0, this.props.fixedColumnCount);
        let scrollableColumns = columns.slice(this.props.fixedColumnCount);

        // TODO calculate columnsWidth whether columnProps is changed
        let fixedColumnsWidth = fixedColumns
            .map((value: ColumnProps): number => value.width)
            .reduce((prevValue: number, currValue: number) => prevValue + currValue, 0);

        return {
            fixedColumns,
            fixedColumnsWidth,
            scrollableColumns
        };
    }
}
