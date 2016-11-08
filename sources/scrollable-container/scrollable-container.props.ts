import * as React from 'react';

export interface ScrollableContainerProps {
    children?: React.ReactNode;
    height?: string | number;
    width?: string | number;
    headerHeight?: string | number;
    contentWidth?: number;
    contentHeight?: number;
}
