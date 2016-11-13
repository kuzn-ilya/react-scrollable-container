import { CSSProperties } from 'react';

export interface ContainerProps {
    overflowX: 'auto' | 'hidden' | 'scroll' | 'visible';
    overflowY: 'auto' | 'hidden' | 'scroll' | 'visible';
    style?: CSSProperties;
}