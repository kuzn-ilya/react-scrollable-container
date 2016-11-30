import { Size } from './../utils/types';

export interface ScrollableContainerContentProps {
    contentWidth?: Size;
    contentHeight?: Size;
    dataRenderer?: (childState: any) => React.ReactNode;
    data?: any;
}
