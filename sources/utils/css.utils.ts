export function parseMeasureInPixels(value: string): number {
    let match = /^(\d+)px$/.exec(value);
    return match.length > 1 ? Number.parseInt(match[1], 10) : null;
}