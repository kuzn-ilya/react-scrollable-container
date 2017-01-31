export interface ScrollBarProps {
    readonly orientation: 'horizontal' | 'vertical';
    readonly min: number;
    readonly max: number;
    readonly position: number;
    readonly pageSize: number;
    readonly smallChange: number;
    readonly largeChange: number;
    readonly onScroll?: (newPosition: number) => void;
}
