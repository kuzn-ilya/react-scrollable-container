import * as React from 'react';

export interface ScrollableContainerProps {
    children: React.ReactNode;
    height?: string | number;
    width?: string | number;
    headerHeight?: number | string;
    headerChildren: React.ReactNode;
    childWidth: number;
    childHeight: number;
}