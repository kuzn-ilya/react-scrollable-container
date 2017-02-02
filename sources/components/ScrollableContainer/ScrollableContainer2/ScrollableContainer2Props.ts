import { CSSProperties, PropTypes } from 'react';
import { Overflow, overflowPropType, Size, sizePropType } from '../../../utils';
import { ValidationMap } from '../../../react';

export interface ScrollableContainer2Props {
    readonly id?: string;
    readonly contentWidth?: Size;
    readonly contentHeight?: Size;
    readonly overflowX: Overflow;
    readonly overflowY: Overflow;

    readonly scrollLeft?: number;
    readonly scrollTop?: number;

    readonly onScrollPosChanged?: (left: number, top: number) => void;
    readonly onHorizontalScrollVisibilityChanged?: (visible: boolean, thumbHeight: number) => void;
    readonly onVerticalScrollVisibilityChanged?: (visible: boolean, thumbWidth: number) => void;

    // tslint:disable-next-line:no-any
    readonly dataRenderer?: (data: any) => React.ReactNode;
    // tslint:disable-next-line:no-any
    readonly data?: any;
    readonly width: string | number;
    readonly height: string | number;

    readonly horzScrollBarReplacerHeight?: number;
    readonly vertScrollBarReplacerWidth?: number;

    /**
     * Applied to the ScrollableContainer's root element.
     */
    readonly className?: string;

    /**
     * Override the inline-styles of the root element.
     */
    readonly style?: CSSProperties;
    readonly showShadowForReplacer?: boolean;
}

export const scrollableContainer2PropTypes: ValidationMap<ScrollableContainer2Props> = {
    className: PropTypes.string,
    contentHeight: sizePropType,
    contentWidth: sizePropType,
    data: PropTypes.any,
    dataRenderer: PropTypes.func,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    horzScrollBarReplacerHeight: PropTypes.number,
    id: PropTypes.string,
    onHorizontalScrollVisibilityChanged: PropTypes.func,
    onScrollPosChanged: PropTypes.func,
    onVerticalScrollVisibilityChanged: PropTypes.func,
    overflowX: overflowPropType.isRequired,
    overflowY: overflowPropType.isRequired,
    scrollLeft: PropTypes.number,
    scrollTop: PropTypes.number,
    showShadowForReplacer: PropTypes.bool,
    style: PropTypes.any,
    vertScrollBarReplacerWidth: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
