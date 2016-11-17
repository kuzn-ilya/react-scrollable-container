import { HTMLProps, CSSProperties } from 'react';
import { Overflow, Size } from '../utils/types';

export interface ContainerProps extends HTMLProps<HTMLDivElement> {
    overflowX: Overflow;
    overflowY: Overflow;
    contentWidth?: Size;
    contentHeight?: Size;
    scrollLeft?: number;
    scrollTop?: number;
    style?: CSSProperties;

    onScrollPosChanged?: (left: number, top: number) => void;
}
