import * as React from 'react';

export interface ContentProps {
    children?: React.ReactNode;
    top?: number | string;
    contentWidth?: number;
    contentHeight?: number;
    onScrollBarThumbSizeChanged?: (horizontalScrollThumbHeight: number, verticalScrollThumbWidth: number) => void;
    onScroll?: (scrollLeft: number, scrollTop: number) => void;
}