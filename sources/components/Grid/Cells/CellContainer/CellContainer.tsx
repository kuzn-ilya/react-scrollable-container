import * as React from 'react';
import { CellContainerProps, cellContainerPropTypes } from './CellContainerProps';
import { CellContainerState } from './CellContainerState';

import '../../../../styles/grid.css';

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;


export class CellContainer<V> extends React.PureComponent<CellContainerProps<V>, CellContainerState> {
    static propTypes = cellContainerPropTypes;

    constructor(props: CellContainerProps<V>) {
        super(props);
        this.state = {
            editing: false
        };
    }

    handleBlur = (): void => {
        if (this.state.editing) {
            this.setState({
                editing: false
            });
        }
    }

    handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (this.props.columnProps.onCellClick) {
            this.props.columnProps.onCellClick(this.props.rowIndex, this.props.columnProps.propName);
        }

        if (this.props.columnProps.readonly) {
            if (this.ref) {
                this.ref.focus();
            }
        } else {
            this.setState({
                editing: true
            });
        }
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        switch (e.keyCode) {
            case ARROW_DOWN:
                break;
            case ARROW_LEFT:
                break;
            case ARROW_RIGHT:
                break;
            case ARROW_UP:
                break;
            default:
                break;
        }
    }

    private ref: HTMLDivElement;

    render(): JSX.Element {
        let style: React.CSSProperties = {
            height: this.props.height.toString() + 'px',
            width: this.props.width.toString() + 'px'
        };

        // tslint:disable-next-line:variable-name
        let InplaceEdit = this.props.columnProps.inplaceEditClass!;
        // tslint:disable-next-line:variable-name
        let Cell = this.props.columnProps.cellClass!;

        let innerComponent = this.state.editing
            ? <InplaceEdit value={this.props.value} onBlur={this.handleBlur} />
            : (
                <div className={this.props.firstCell ? 'cell-first' : 'cell'}
                    onBlur={this.handleBlur}
                    onKeyDown={this.handleKeyDown}
                    ref={(ref) => this.ref = ref}
                    tabIndex={0}
                >
                    <Cell rowIndex={this.props.rowIndex}
                        value={this.props.value}
                        columnProps={this.props.columnProps}
                    />
                </div>
            );
        return (
            <div style={style} className="cell-container" onClick={this.handleClick}>
                {innerComponent}
            </div>
        );
    }
}
