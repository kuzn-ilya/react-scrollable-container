import * as React from 'react';
import { HeaderRowProps, headerRowPropTypes } from './HeaderRowProps';
import { ColumnProps } from '../Columns/Column/ColumnProps';
import { HeaderCellContainer } from '../Cells';

export class HeaderRow extends React.PureComponent<HeaderRowProps, {}> {
    static propTypes = headerRowPropTypes;

    render(): JSX.Element {
        return (
            <div style={{height: this.props.height}}>
                {this.renderCells()}
            </div>
        );
    }

    renderCells(): React.ReactNode {
        // tslint:disable-next-line:no-any
        return this.props.columnProps.map((value: ColumnProps<any>, index: number) => {
            // tslint:disable-next-line:variable-name
            let HeaderCell = value.headerCellClass!;
            return (
                <HeaderCellContainer
                    key={index}
                    width={value.width}
                    firstCell={index === 0 && this.props.showEdgeForTheLeftCell}
                    height={this.props.height}
                >
                    <HeaderCell
                        caption={value.caption}
                        columnProps={value}/>
                </ HeaderCellContainer>
            );
        });
    }
}
