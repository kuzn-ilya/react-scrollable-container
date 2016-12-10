import { PropTypes } from 'react';
import { Size, sizePropType } from './../utils/types';

export interface ScrollableContainerContentProps {
    readonly contentWidth?: Size;
    readonly contentHeight?: Size;
    // tslint:disable-next-line:no-any
    readonly dataRenderer?: (data: any) => React.ReactNode;
    // tslint:disable-next-line:no-any
    readonly data?: any;
}

export const scrollableContainerContentPropTypes = {
    contentWidth: sizePropType,
    contentHeight: sizePropType,
    dataRenderer: PropTypes.func,
    data: PropTypes.any
}