export interface ScrollBarProps {
    orientation: 'horizontal' | 'vertical';
    minPosition: number;
    maxPosition: number;
    position: number;
    pageSize: number;
    width: '100%' | number;
    height: '100%' | number;
}
