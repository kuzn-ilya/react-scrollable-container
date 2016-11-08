import * as React from 'react';

export interface HeaderProps {
    children?: React.ReactNode;
    height?: number | string;
    contentWidth?: number | string;
    spaceWidth?: number | string;
    scrollLeft?: number;
}