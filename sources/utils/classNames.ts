/**
 * Combines multiple className strings into one.
 *
 * @param {...?string} classNames
 * @return {string}
 */
export function classNames(...classNames: (string | {[key: string]: boolean})[]): string {
    let result = '';
    for (let i = 0; i < classNames.length; i++) {
        let nextClass = classNames[i];
        if (typeof nextClass === 'string') {
            if (nextClass) {
                result = (result ? result + ' ' : '') + nextClass;
            }
        } else {
            for (let key in nextClass) {
                if (nextClass[key]) {
                    result = (result ? result + ' ' : '') + key;
                }
            }
        }
    }
    return result;
}
