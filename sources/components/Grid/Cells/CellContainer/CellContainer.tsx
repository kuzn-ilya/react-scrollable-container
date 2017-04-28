import * as React from 'react';
import { CellContainerProps, cellContainerPropTypes } from './CellContainerProps';
import { CellContainerState } from './CellContainerState';
import * as KeyConsts from '../../../../utils/KeyConsts';
import { classNames } from '../../../../utils';

import '../../../../styles/grid.css';

export class CellContainer<V> extends React.PureComponent<CellContainerProps<V>, CellContainerState> {
    static propTypes = cellContainerPropTypes;

    componentDidMount(): void {
        if (this.props.columnProps.readonly && this.props.focused) {
            this.ref.focus();
        }
    }

    componentDidUpdate(prevProps: CellContainerProps<V>, prevState: CellContainerState): void {
        if (this.props.columnProps.readonly && this.props.focused) {
            if (this.ref) {
                this.ref.focus();
            }
        }
    }

    handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (this.ref) {
            this.ref.focus();
        }

        if (this.props.onClick) {
            this.props.onClick(this.props.rowIndex, this.props.columnProps.propName, e);
        }

        if (this.props.columnProps.onCellClick) {
            this.props.columnProps.onCellClick(this.props.rowIndex, this.props.columnProps.propName);
        }
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        let direction: undefined | 'down' | 'left' | 'right' | 'up' = undefined;
        switch (e.key) {
            case KeyConsts.ARROW_DOWN:
                direction = 'down';
                break;
            case KeyConsts.ARROW_LEFT:
                direction = 'left';
                break;
            case KeyConsts.ARROW_RIGHT:
                direction = 'right';
                break;
            case KeyConsts.ARROW_UP:
                direction = 'up';
                break;
            default:
                break;
        }

        if (direction && this.props.onMove) {
            this.props.onMove(direction, this.props.rowIndex, this.props.columnProps.propName);
        }
    }

    handleInplaceEditMove = (direction: 'down' | 'left' | 'right' | 'up'): void => {
        if (this.props.onMove) {
            this.props.onMove(direction, this.props.rowIndex, this.props.columnProps.propName);
        }
    }

    handleBlur = (e: React.FocusEvent<HTMLElement>): void => {
        if (this.props.onBlur) {
            this.props.onBlur(this.props.rowIndex, this.props.columnProps.propName);
        }

    }

    handleFocus = (e: React.FocusEvent<HTMLElement>): void => {
        if (this.props.onFocus) {
            this.props.onFocus(this.props.rowIndex, this.props.columnProps.propName);
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

        let isEditing = this.props.focused && !this.props.columnProps.readonly;
        let innerComponent = isEditing
            ?
            <div className={this.props.firstCell ? 'cell-wrapper-first' : 'cell-wrapper'}>
                <InplaceEdit value={this.props.value}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    onMove={this.handleInplaceEditMove}
                />
            </div>
            :
            <div
                className={classNames({
                    'cell-wrapper-first': !!this.props.firstCell,
                    'cell-wrapper': !this.props.firstCell
                })}
                onKeyDown={this.handleKeyDown}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                tabIndex={0}
                ref={(ref) => this.ref = ref}
            >
                <Cell rowIndex={this.props.rowIndex}
                    value={this.props.value}
                    columnProps={this.props.columnProps}
                />
            </div>;
        return (
            <div style={style}
                className="cell-container"
                onClick={this.handleClick}
            >
                {innerComponent}
            </div>
        );
    }
}
