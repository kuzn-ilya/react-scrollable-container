import { Overflow, Size } from './../utils/types';

export interface ScrollableContainerProps {
    readonly id?: string;
    readonly contentWidth?: Size;
    readonly contentHeight?: Size;
    readonly overflowX: Overflow;
    readonly overflowY: Overflow;

    readonly scrollLeft?: number;
    readonly scrollTop?: number;

    readonly onScrollPosChanged?: (left: number, top: number) => void;
    readonly onHorizontalScrollVisibilityChanged?: (visible: boolean) => void;
    readonly onVerticalScrollVisibilityChanged?: (visible: boolean, thumbWidth: number) => void;

    // tslint:disable-next-line:no-any
    readonly dataRenderer?: (data: any) => React.ReactNode;
    // tslint:disable-next-line:no-any
    readonly data?: any;
    readonly width: string | number;
    readonly height: string | number;
}
