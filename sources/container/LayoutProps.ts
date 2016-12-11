import { Orientation } from './../utils/types';

export interface LayoutProps {
    firstChildHeight?: number | string;
    height?: number | string;
    orientation: Orientation;
    showSplitter?: boolean;
    width?: number | string;
}
