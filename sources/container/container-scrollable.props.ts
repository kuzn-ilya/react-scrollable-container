import { Overflow, Size } from './../utils/types';

export interface ContainerScrollableProps {
    id?: string;
    contentWidth?: Size;
    contentHeight?: Size;
    overflowX: Overflow;
    overflowY: Overflow;

    scrollLeft?: number;
    scrollTop?: number;

    onScrollPosChanged?: (left: number, top: number) => void;

    children?: (childState: any) => React.ReactNode | React.ReactNode;
    childState?: any;
    width: string | number;
    height: string | number;
}
