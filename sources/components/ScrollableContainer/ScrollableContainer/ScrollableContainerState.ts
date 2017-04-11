import { CSSProperties } from 'react';

export interface ScrollableContainerState {
    readonly vertScrollThumbWidth: number;
    readonly horzScrollThumbHeight: number;

    readonly containerWidth: number;
    readonly contentWidth: number;
    readonly containerHeight: number;
    readonly contentHeight: number;

    readonly scrollLeft: number;
    readonly scrollTop: number;
    readonly style: CSSProperties;
}
