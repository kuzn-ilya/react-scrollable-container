const classPrefix = 'react-grid-viewport';

export function addPrefixToClass(className: string): string {
    return `${classPrefix}-${className}`;
}
