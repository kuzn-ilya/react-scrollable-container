import { ValidationMap as ReactValidationMap, Validator } from 'react';
import { StripModifiers } from '../utils';

export type ValidationMap<T> = ReactValidationMap<T> & {
    [P in keyof StripModifiers<T>]: Validator<T>;
};
