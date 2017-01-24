export function range(start: number, end: number): Array<number> {
    let result = new Array<number>(end - start + 1);

    for (let i = start; i < end; i++) {
        result[i - start] = i;
    }

    return result;
}
