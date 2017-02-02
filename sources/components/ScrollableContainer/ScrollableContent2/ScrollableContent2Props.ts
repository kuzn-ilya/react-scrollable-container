import { PropTypes } from 'react';
import { Size, sizePropType } from '../../../utils';
import { ValidationMap } from '../../../react';

export interface ScrollableContent2Props {
    readonly contentWidth?: Size;
    readonly contentHeight?: Size;
    // tslint:disable-next-line:no-any
    readonly dataRenderer?: (data: any) => React.ReactNode;
    // tslint:disable-next-line:no-any
    readonly data?: any;
    readonly onResize?: (newWidth: number, newHeight: number) => void;
    readonly scrollLeft?: number;
    readonly scrollTop?: number;
}

export const scrollableContent2PropTypes: ValidationMap<ScrollableContent2Props> = {
    contentHeight: sizePropType,
    contentWidth: sizePropType,
    data: PropTypes.any,
    dataRenderer: PropTypes.func,
    onResize: PropTypes.func,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number
};
