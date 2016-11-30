import { HTMLProps, CSSProperties } from 'react';
import { Overflow, Size } from '../utils/types';

export interface ContainerProps extends HTMLProps<HTMLDivElement> {
    overflowX: Overflow;
    overflowY: Overflow;
    contentWidth?: Size;
    contentHeight?: Size;
    style?: CSSProperties;
    scrollLeft?: number;
    scrollTop?: number;
    children: (childState: any) => React.ReactNode;
    childState: any;

    onScrollPosChanged?: (left: number, top: number) => void;
}
