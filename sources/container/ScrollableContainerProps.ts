import { Overflow, Size } from './../utils/types';

export interface ScrollableContainerProps {
    id?: string;
    contentWidth?: Size;
    contentHeight?: Size;
    overflowX: Overflow;
    overflowY: Overflow;

    scrollLeft?: number;
    scrollTop?: number;

    onScrollPosChanged?: (left: number, top: number) => void;

    dataRenderer?: (data: any) => React.ReactNode;
    data?: any;
    width: string | number;
    height: string | number;
}
