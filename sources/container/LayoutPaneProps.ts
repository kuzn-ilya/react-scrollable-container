import { Orientation } from './../utils/types';

export interface LayoutPaneProps {
    height?: number | string;
    orientation: Orientation;
    showSplitter?: boolean;
    width?: number | string;
}
