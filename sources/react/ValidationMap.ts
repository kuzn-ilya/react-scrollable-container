import { ValidationMap as ReactValidationMap, Validator } from 'react';

export type ValidationMap<T> = ReactValidationMap<T> & {
    [P in keyof Pick<T, keyof T>]: Validator<T>;
};
