import * as React from 'react';
import { CellProps, cellPropTypes } from '../Cell/CellProps';
import { TextColumnProps } from '../../Columns/TextColumn/TextColumnProps';

import * as classes from '../../../../styles/grid.css';

export class TextCell extends React.PureComponent<CellProps<TextColumnProps, string>, {}> {
    static propTypes = cellPropTypes;

    render(): JSX.Element {
        return (
            <div className={classes.textCell}
                style={{
                    textAlign: this.props.columnProps.align
                }}
            >
                {this.props.value ? this.props.value.toString() : '' }
            </div>
        );
    }
}
