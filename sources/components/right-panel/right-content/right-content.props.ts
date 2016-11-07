export interface RightContentProps {
    headerHeight: number | string;
    children?: JSX.Element[];
    childWidth: number;
    childHeight: number;
    onScrollBarThumbChanged?: (horizontalScrollThumbHeight: number, verticalScrollThumbWidth: number) => void; 
    onScroll?: (scrollLeft: number, scrollTop: number) => void; 
}