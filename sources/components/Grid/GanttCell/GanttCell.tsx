import * as React from 'react';
import { List } from 'immutable';
import { CellProps, cellPropTypes } from '../Cell/CellProps';
import { GanttColumnProps } from '../GanttColumn/GanttColumnProps';
import { isEntityInPeriod, calculateEntityGeometry, calculateTimeline, GanttCellModel, TimelineModel } from '../../../utils';
import { Shift } from './Shift';

import '../../../styles/grid.css';

export class GanttCell extends React.PureComponent<CellProps<GanttColumnProps, Array<GanttCellModel>>, TimelineModel> {
    static propTypes = cellPropTypes;

    constructor(props: CellProps<GanttColumnProps, Array<GanttCellModel>>) {
        super(props);
        this.state = this.calcState(props);
    }

    componentWillReceiveProps(nextProps: CellProps<GanttColumnProps, Array<GanttCellModel>>): void {
        this.setState(this.calcState(nextProps));
    }

    calcState(props: CellProps<GanttColumnProps, Array<GanttCellModel>>): TimelineModel {
        return calculateTimeline(props.columnProps.startDate, props.columnProps.endDate,
            props.columnProps.zoomStartDate, props.columnProps.zoomEndDate, props.width);
    }

    render(): JSX.Element {
        let entities: List<JSX.Element> = List<JSX.Element>([]);

        let periodEntities = List<GanttCellModel>(
            this.props.value ? this.props.value
                .filter((entity: GanttCellModel) => isEntityInPeriod(this.props.columnProps.startDate,
                    this.props.columnProps.endDate, entity)) : []
                );

        // TODO: More appropriate value for key
        entities = periodEntities.map((entity: GanttCellModel, key: number) => {
            let geometry = calculateEntityGeometry(this.props.columnProps.startDate, entity, false,
                this.state.hourWidth, this.state.dayWidth);

            return (
                <Shift
                    key={key}
                    position={geometry.left}
                    width={geometry.width}
                    entity={entity}
                />
            );
        }) as List<JSX.Element>;

        let style: React.CSSProperties = {
            height: this.props.height.toString() + 'px',
            width: this.props.width.toString() + 'px'
        };

        return (
            <div style={style} className="cell-container">
                <div className={this.props.firstCell ? 'cell-first' : 'cell'}>
                    {entities}
                </div>
            </div>
       );
    }
}
