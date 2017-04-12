import { List } from 'immutable';
import * as invariant from 'fbjs/lib/invariant';

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

const WEEK_DAYS = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
];

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export function addDays(date: Date, dayCount: number): Date {
    let result = new Date(date);
    result.setTime(date.getTime() + dayCount * MILLISECONDS_PER_DAY);
    return result;
}

export function addSeconds(date: Date, secondCount: number): Date {
    let result = new Date(date);
    result.setTime(date.getTime() + secondCount * 1000);
    return result;
}

export function isSameDay(dateA: Date, dateB: Date): boolean {
    return dateA.getFullYear() === dateB.getFullYear()
        && dateA.getMonth() === dateB.getMonth()
        && dateA.getDate() === dateB.getDate();
}

export function isDateBetween(dateToTest: Date, startDate: Date, endDate: Date): boolean {
    invariant(startDate <= endDate, 'isDateBetween: Parameter "startDate" should be less than parameter "endDate"');
    return startDate <= dateToTest && dateToTest <= endDate;
}

export function toDayAndMonthString(day: Date): string {
    return day.getDate() + ' ' + MONTHS[day.getMonth()];
}

export function toHourAndMinutesString(date: Date): string {
    let minutes: string = date.getMinutes() >= 10 ? date.getMinutes().toString() : '0' + date.getMinutes();
    return date.getHours() + ':' + minutes;
}

export function getWeekDayName(day: Date): string {
    return WEEK_DAYS[day.getDay()];
}

export function toWeekDayAndMonthDayString(day: Date): string {
    return WEEK_DAYS[day.getDay()] + ' ' + day.getDate() + '/' + (day.getMonth() + 1);
}

export function calculateDaysDifference(startDate: Date, endDate: Date): number {
    invariant(startDate <= endDate, 'calculateDaysDifference: Parameter "startDate" should be less than parameter "endDate"');
    return Math.floor((endDate.getTime() - startDate.getTime()) / MILLISECONDS_PER_DAY);
}

export function createDateListBetweenTwoDates(startDate: Date, endDate: Date): List<Date> {
    invariant(startDate <= endDate, 'createDateListBetweenTwoDates: Parameter "startDate" should be less than parameter "endDate"');

    let result: List<Date> = List<Date>([]);
    let daysCount = calculateDaysDifference(startDate, endDate);

    if (daysCount) {
        for (let i = 0; i <= daysCount; i++) {
            let newDate = new Date(addDays(startDate, i));
            result = result.push(newDate);
        }
    } else {
        result = result.push(startDate);
    }

    return result;
}
