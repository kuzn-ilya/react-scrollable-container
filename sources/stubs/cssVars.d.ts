interface CssVars<T> {
    [key: string]: T;
}

export const CSS_STRING_VARS: CssVars<string>;
export const CSS_NUMBER_VARS: CssVars<number>;
