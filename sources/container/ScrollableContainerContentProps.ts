import { Size } from './../utils/types';

export interface ScrollableContainerContentProps {
    contentWidth?: Size;
    contentHeight?: Size;
    // tslint:disable-next-line:no-any
    dataRenderer?: (data: any) => React.ReactNode;
    // tslint:disable-next-line:no-any
    data?: any;
}
