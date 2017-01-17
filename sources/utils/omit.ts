export function omit<T, K extends keyof T>(obj: T, ...omitKeys: K[]): Partial<T> {
    let result = {} as Partial<T>;
    for (const key in obj) {
        if (omitKeys.every((omitKey: K) => omitKey !== key)) {
            result[key] = obj[key];
        }
    }

    return result;
}
