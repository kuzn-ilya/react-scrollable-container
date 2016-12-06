import { CSS_VARS } from '../stubs/cssVars';

const classPrefix = CSS_VARS['base-css-name'];

export function addPrefixToClass(className: string): string {
    return `${classPrefix}-${className}`;
}
