import * as React from 'react';

export interface ContentProps {
    headerHeight: number | string;
    children: React.ReactNode;
    childWidth: number | string;
    childHeight: number | string;
    onScrollBarThumbSizeChanged?: (horizontalScrollThumbHeight: number, verticalScrollThumbWidth: number) => void; 
    onScroll?: (scrollLeft: number, scrollTop: number) => void; 
}