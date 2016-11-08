import * as React from 'react';

export interface ContentProps {
    headerHeight: number | string;
    children: React.ReactNode;
    childWidth: number;
    childHeight: number;
    onScrollBarThumbSizeChanged?: (horizontalScrollThumbHeight: number, verticalScrollThumbWidth: number) => void; 
    onScroll?: (scrollLeft: number, scrollTop: number) => void; 
}