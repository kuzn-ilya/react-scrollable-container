const classPrefix = 'react-container';

export function addPrefixToClass(className: string): string {
    return `${classPrefix}-${className}`;
}
