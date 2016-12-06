/**
 * Combines multiple className strings into one.
 *
 * @param {...?string} classNames
 * @return {string}
 */
export function classNames(...classNames: string[]): string {
    let result = '';
    for (let i = 0; i < classNames.length; i++) {
        let nextClass = classNames[i];
        if (nextClass) {
            result = (result ? result + ' ' : '') + nextClass;
        }
    }
    return result;
}
