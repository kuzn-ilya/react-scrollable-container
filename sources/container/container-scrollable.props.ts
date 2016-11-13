import { CSSProperties } from 'react';

export interface ContainerScrollableProps {
    contentWidth?: 'auto' | number;
    contentHeight?: 'auto' | number;
    overflowX: 'auto' | 'hidden' | 'scroll' | 'visible';
    overflowY: 'auto' | 'hidden' | 'scroll' | 'visible';
    style?: CSSProperties;
}
