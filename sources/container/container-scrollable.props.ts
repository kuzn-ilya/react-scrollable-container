import { HTMLProps } from 'react';
import { Overflow } from './../utils/types';

export interface ContainerScrollableProps extends HTMLProps<HTMLDivElement> {
    contentWidth?: 'auto' | number;
    contentHeight?: 'auto' | number;
    overflowX: Overflow;
    overflowY: Overflow;
    scrollLeft?: number;
    scrollTop?: number;

    onScrollPosChanged?: (left: number, top: number) => void;

}
