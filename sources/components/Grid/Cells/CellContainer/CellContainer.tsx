import * as React from 'react';
import { CellContainerProps, cellContainerPropTypes } from './CellContainerProps';
import { CellContainerState } from './CellContainerState';
import * as KeyConsts from '../../../../utils/KeyConsts';

import '../../../../styles/grid.css';

export class CellContainer<V> extends React.PureComponent<CellContainerProps<V>, CellContainerState> {
    static propTypes = cellContainerPropTypes;

    constructor(props: CellContainerProps<V>) {
        super(props);
        this.state = {
            focused: !!this.props.focused
        };
    }

    componentDidUpdate(prevProps: CellContainerProps<V>, prevState: CellContainerState): void {
        if (this.props.columnProps.readonly) {
            if (this.ref) {
                this.ref.focus();
            }
        }
    }

    componentWillReceiveProps(nextProps: CellContainerProps<V>): void {
        if (this.props.focused !== nextProps.focused) {
            this.setState({
                focused: !!nextProps.focused
            });
        }
    }

    handleBlur = (): void => {
        if (this.state.focused) {
            this.setState({
                focused: false
            });
        }
    }

    handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (this.props.columnProps.onCellClick) {
            this.props.columnProps.onCellClick(this.props.rowIndex, this.props.columnProps.propName);
        }

        this.setState({
            focused: true
        });

        if (this.props.columnProps.readonly) {
            if (this.ref) {
                this.ref.focus();
            }
        }
    }

    handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        let direction: undefined | 'down' | 'left' | 'right' | 'up' = undefined;
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

        e.stopPropagation();
        if (direction && this.props.onMove) {
            this.props.onMove(direction, this.props.rowIndex, this.props.columnProps.propName);
        }
    }

    handleInlaceEditMove = (direction: 'down' | 'left' | 'right' | 'up'): void => {
        if (this.props.onMove) {
            this.props.onMove(direction, this.props.rowIndex, this.props.columnProps.propName);
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

        let innerComponent = this.state.focused && !this.props.columnProps.readonly
            ? <InplaceEdit value={this.props.value} onBlur={this.handleBlur} onMove={this.handleInlaceEditMove}/>
            : (
                <div className={this.props.firstCell ? 'cell-first' : 'cell'}
                    onBlur={this.handleBlur}
                    onKeyUp={this.handleKeyUp}
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
