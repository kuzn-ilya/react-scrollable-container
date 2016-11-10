import { CSSProperties } from 'react';

export interface ContainerScrollableProps {
    overflowX: 'auto' | 'hidden' | 'scroll' | 'visible';
    overflowY: 'auto' | 'hidden' | 'scroll' | 'visible';
    style?: CSSProperties;
}
