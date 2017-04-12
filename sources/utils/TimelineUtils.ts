import { calculateDaysDifference, addSeconds } from './DateTimeUtils';

export interface TimelineModel {
    readonly zoomStartDate: Date;
    readonly zoomEndDate: Date;
    readonly startDate: Date;
    readonly endDate: Date;
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

const MAX_DAY_SIZE = 155;

export function calculateTimeline(startDate: Date, endDate: Date, zoomStartDate: Date, zoomEndDate: Date, width: number): TimelineModel {
    let dayWidth: number = calculateDayWidth(zoomStartDate, zoomEndDate, width);
    let hourWidth: number = calculateHourWidth(zoomStartDate, zoomEndDate, width);

    let fullWidth = calculateDaysDifference(startDate, addSeconds(endDate, 1)) * dayWidth;
    let horizontalScrollPosition: number = (zoomStartDate.getTime() - startDate.getTime()) / (60 * 60 * 1000) * hourWidth;
    let timeline = {
        zoomStartDate,
        zoomEndDate,
        startDate,
        endDate,
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

export function isEntityInPeriod(entity: EntityModel, timeline: TimelineModel): boolean {
    let stateStartDate = timeline.startDate;
    let stateEndDate = timeline.endDate;

    return (entity.startDateTime >= stateStartDate && entity.startDateTime < stateEndDate)
        || (entity.endDateTime > stateStartDate && entity.endDateTime <= stateEndDate);
}

export function calculateEntityGeometry(entity: EntityModel, isTabularView: boolean, timeline: TimelineModel): EntityGeometry {
    let width = 0;
    let left = -1;

    let timelineStartDate = timeline.startDate;
    let entityStartDate = entity.startDateTime;
    let entityEndDate = entity.endDateTime;
    let daysDifference = calculateDaysDifference(timelineStartDate, entityEndDate);

    if (isTabularView) {
        width = 24 * timeline.hourWidth;
        left = daysDifference <= 0 ? 0 : daysDifference * timeline.dayWidth;
    } else {
        // TODO move calc into DateTimeService
        let hourDifference = (entity.endDateTime.getTime() - entity.startDateTime.getTime()) / (60 * 60 * 1000);
        width = hourDifference * timeline.hourWidth;
        left = daysDifference < 0 ? 0 : (daysDifference * timeline.dayWidth) + timeline.hourWidth * entityStartDate.getHours();
    }

    return {
        left,
        width
    };
}
