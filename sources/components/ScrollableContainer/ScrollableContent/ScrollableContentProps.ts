import { PropTypes } from 'react';
import { Size, sizePropType } from '../../../utils';
import { ValidationMap } from '../../../react';

export interface ScrollableContentProps {
    readonly contentWidth?: Size;
    readonly contentHeight?: Size;
    // tslint:disable-next-line:no-any
    readonly dataRenderer?: (data: any) => React.ReactNode;
    // tslint:disable-next-line:no-any
    readonly data?: any;
    readonly onResize?: (newWidth: number, newHeight: number) => void;
}

export const scrollableContentPropTypes: ValidationMap<ScrollableContentProps> = {
    contentHeight: sizePropType,
    contentWidth: sizePropType,
    data: PropTypes.any,
    dataRenderer: PropTypes.func,
    onResize: PropTypes.func
};
