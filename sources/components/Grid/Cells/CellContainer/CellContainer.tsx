import * as React from 'react';
import { CellContainerProps, cellContainerPropTypes } from './CellContainerProps';
import { CellContainerState } from './CellContainerState';
import { classNames, KeyConsts, Direction } from '../../../../utils';

import * as classes from '../../../../styles/grid.css';

export class CellContainer<V> extends React.PureComponent<CellContainerProps<V>, CellContainerState> {
    static propTypes = cellContainerPropTypes;

    componentDidMount(): void {
        if (this.props.columnProps.readonly && this.props.focused && this.ref) {
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

        e.preventDefault();
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        let direction: Direction | undefined = undefined;
        switch (e.keyCode) {
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

        if (direction) {
            e.preventDefault();
            if (this.props.onMove) {
                this.props.onMove(direction, this.props.rowIndex, this.props.columnProps.propName);
            }
        }
    }

    handleInplaceEditMove = (direction: Direction): void => {
        if (this.props.onMove) {
            this.props.onMove(direction, this.props.rowIndex, this.props.columnProps.propName);
        }
    }

    handleBlur = (e: React.FocusEvent<HTMLElement>): void => {
        if (this.props.onBlur) {
            this.props.onBlur(this.props.rowIndex, this.props.columnProps.propName, e);
        }

    }

    handleFocus = (e: React.FocusEvent<HTMLElement>): void => {
        e.preventDefault();
        if (this.props.onFocus) {
            this.props.onFocus(this.props.rowIndex, this.props.columnProps.propName, this);
        }
    }

    // tslint:disable-next-line:no-any
    handleChange = (newValue: any) => {
        if (this.props.onChange) {
            this.props.onChange(this.props.rowIndex, this.props.columnProps.propName, newValue);
        }
    }

    private ref: HTMLDivElement | null;

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
            <div
                className={classNames({
                    [classes.cellWrapperFirst]: !!this.props.firstCell,
                    [classes.cellWrapper]: true,
                    [classes.cellWrapperFocused]: true
                })}
            >
                <InplaceEdit value={this.props.value}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onMove={this.handleInplaceEditMove}
                />
            </div>
            :
            <div
                className={classNames({
                    [classes.cellWrapperFirst]: !!this.props.firstCell,
                    [classes.cellWrapper]: true
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
                className={classes.cellContainer}
                onClick={this.handleClick}
            >
                {innerComponent}
            </div>
        );
    }
}
