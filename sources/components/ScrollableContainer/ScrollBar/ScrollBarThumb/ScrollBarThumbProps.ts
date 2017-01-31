export interface ScrollBarThumbProps {
    readonly orientation: 'horizontal' | 'vertical';
    readonly position: number;
    readonly size: number;
    readonly thickness: number;

    readonly onDragging?: (newPosition: number) => void;
    readonly onDragEnd?: (newPosition: number) => void;
}
