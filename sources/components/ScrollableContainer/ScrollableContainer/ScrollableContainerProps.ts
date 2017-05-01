import * as PropTypes from 'prop-types';
import { ReactInstance, CSSProperties } from 'react';
import { Overflow, overflowPropType, Size, sizePropType } from '../../../utils';
import { ValidationMap } from '../../../react';

export interface ScrollableContainerProps {
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

    readonly customScrollBars?: boolean;

    // tslint:disable-next-line:no-any
    readonly scrollToElement?: ReactInstance;
}

export const scrollableContainerPropTypes: ValidationMap<ScrollableContainerProps> = {
    className: PropTypes.string,
    contentHeight: sizePropType,
    contentWidth: sizePropType,
    customScrollBars: PropTypes.bool,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    horzScrollBarReplacerHeight: PropTypes.number,
    id: PropTypes.string,
    onHorizontalScrollVisibilityChanged: PropTypes.func,
    onScrollPosChanged: PropTypes.func,
    onVerticalScrollVisibilityChanged: PropTypes.func,
    overflowX: overflowPropType.isRequired,
    overflowY: overflowPropType.isRequired,
    scrollLeft: PropTypes.number,
    scrollToElement: PropTypes.any,
    scrollTop: PropTypes.number,
    showShadowForReplacer: PropTypes.bool,
    style: PropTypes.any,
    vertScrollBarReplacerWidth: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
