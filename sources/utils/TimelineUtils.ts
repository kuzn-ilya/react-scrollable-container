import { List } from 'immutable';
import * as invariant from 'fbjs/lib/invariant';

import { calculateDaysDifference, addDays, addSeconds } from './DateTimeUtils';

export interface TimelineModel {
    readonly horizontalScrollPosition: number;
    readonly fullWidth: number;
    readonly hourWidth: number;
    readonly dayWidth: number;
}

export interface EntityModel {
    startDateTime: Date;
    endDateTime: Date;
}

export interface EntityGeometry {
    left: number;
    width: number;
}

export interface WeekModel {
    readonly weekStart: Date;
    readonly weekEnd: Date;
}

const MAX_DAY_SIZE = 155;

export function calculateTimeline(startDate: Date, endDate: Date, zoomStartDate: Date, zoomEndDate: Date, width: number): TimelineModel {
    let dayWidth: number = calculateDayWidth(zoomStartDate, zoomEndDate, width);
    let hourWidth: number = calculateHourWidth(zoomStartDate, zoomEndDate, width);

    let fullWidth = calculateDaysDifference(startDate, addSeconds(endDate, 1)) * dayWidth;
    let horizontalScrollPosition: number = (zoomStartDate.getTime() - startDate.getTime()) / (60 * 60 * 1000) * hourWidth;
    let timeline = {
        horizontalScrollPosition,
        fullWidth,
        hourWidth,
        dayWidth
    };

    return timeline;
}

function calculateDayWidth(startDate: Date, endDate: Date, width: number): number {
    let daysDifference: number = calculateDaysDifference(startDate, addSeconds(endDate, 1));
    return Math.max(width / daysDifference, MAX_DAY_SIZE);
}

function calculateHourWidth(startDate: Date, endDate: Date, width: number): number {
    return calculateDayWidth(startDate, endDate, width) / 24;
}

export function isEntityInPeriod(startDate: Date, endDate: Date, entity: EntityModel): boolean {
    return (entity.startDateTime >= startDate && entity.startDateTime < endDate)
        || (entity.endDateTime > startDate && entity.endDateTime <= endDate);
}

export function calculateEntityGeometry(startDate: Date,
    entity: EntityModel, isTabularView: boolean, hourWidth: number, dayWidth: number): EntityGeometry {
    let width = 0;
    let left = -1;

    let entityStartDate = entity.startDateTime;
    let entityEndDate = entity.endDateTime;
    let daysDifference = calculateDaysDifference(startDate, entityEndDate);

    if (isTabularView) {
        width = 24 * hourWidth;
        left = daysDifference <= 0 ? 0 : daysDifference * dayWidth;
    } else {
        // TODO move calc into DateTimeService
        let hourDifference = (entity.endDateTime.getTime() - entity.startDateTime.getTime()) / (60 * 60 * 1000);
        width = hourDifference * hourWidth;
        left = daysDifference < 0 ? 0 : (daysDifference * dayWidth) + hourWidth * entityStartDate.getHours();
    }

    return {
        left,
        width
    };
}

export function calculateWeeks(startDate: Date, endDate: Date): List<WeekModel> {
    invariant(startDate <= endDate, 'calculateWeeks: Parameter "startDate" should be less than parameter "endDate"');

    let result = List<WeekModel>([]);

    let startResultDate = addDays(startDate, -startDate.getDay());
    let endResultDate = addDays(endDate, 6 - endDate.getDay());

    while (startResultDate < endResultDate) {
        let nextStartDate = addDays(startResultDate, 7);
        let weekEnd = addSeconds(nextStartDate, -1);

        result = result.push({
            weekStart: startResultDate,
            weekEnd
        });

        startResultDate = nextStartDate;
    }

    return result;
}

export function calculateWeekWidth(weeks: List<WeekModel>, width: number): number {
    return width / weeks.size;
}
