import * as React from 'react';
import { List } from 'immutable';
import { CellProps, cellPropTypes } from '../Cell/CellProps';
import { GanttColumnProps } from '../GanttColumn/GanttColumnProps';
import { isEntityInPeriod, calculateEntityGeometry, EntityModel } from '../../../utils';
import { Shift } from './Shift';

import '../../../styles/grid.css';

export class GanttCell extends React.PureComponent<CellProps<GanttColumnProps>, {}> {
    static propTypes = cellPropTypes;

    render(): JSX.Element {
        let entities: List<JSX.Element> = List<JSX.Element>([]);

        let timeline = this.props.columnProps.timelineModel;

        let periodEntities = List<EntityModel>(
            this.props.value ? this.props.value
                .map((item: {startDateTime: string, endDateTime: string}) => {
                    return { endDateTime: new Date(item.endDateTime), startDateTime: new Date(item.startDateTime) };
                })
                .filter((entity: EntityModel) => isEntityInPeriod(entity, timeline))
                : []);

        entities = periodEntities.map((entity: EntityModel) => {
            let geometry = calculateEntityGeometry(entity, false, timeline);

            return (
                <Shift
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
