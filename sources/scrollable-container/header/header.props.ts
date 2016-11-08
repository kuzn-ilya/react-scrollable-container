import * as React from 'react';

export interface HeaderProps {
    height: number | string;
    children: React.ReactNode;
    childWidth: number;
    spaceWidth?: number;
    scrollLeft?: number;
}