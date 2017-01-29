export interface ScrollBarProps {
    orientation: 'horizontal' | 'vertical';
    min: number;
    max: number;
    position: number;
    pageSize: number;
    smallChange: number;
    largeChange: number;
    width: '100%' | number;
    height: '100%' | number;
}
