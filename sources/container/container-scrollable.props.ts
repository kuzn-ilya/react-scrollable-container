import { HTMLProps } from 'react';
import { Overflow, Size } from './../utils/types';

export interface ContainerScrollableProps extends HTMLProps<HTMLDivElement> {
    contentWidth?: Size;
    contentHeight?: Size;
    overflowX: Overflow;
    overflowY: Overflow;

    scrollLeft?: number;
    scrollTop?: number;

    onScrollPosChanged?: (left: number, top: number) => void;

}
