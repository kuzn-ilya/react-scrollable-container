// tslint:disable:no-any
import { getCSSPropertyNameWithVendorPrefix } from './getCSSPropertyNameWithVendorPrefix';

const TRANSFORM = getCSSPropertyNameWithVendorPrefix('transform');
const BACKFACE_VISIBILITY = getCSSPropertyNameWithVendorPrefix('backfaceVisibility');
const PERSPECTIVE = getCSSPropertyNameWithVendorPrefix('perspective');

export const updateCSSPosition: (style: any, x: number, y: number) => void = (() => {
    if (TRANSFORM) {
        const ua = window ? window.navigator.userAgent : 'UNKNOWN';
        const isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);

        // It appears that Safari messes up the composition order
        // of GPU-accelerated layers
        // (see bug https://bugs.webkit.org/show_bug.cgi?id=61824).
        // Use 2D translation instead.
        if (!isSafari && PERSPECTIVE) {
            return (style: any, x: number, y: number) => {
                style[TRANSFORM] = 'translate3d(' + x + 'px,' + y + 'px,0)';
                if (BACKFACE_VISIBILITY) {
                    style[BACKFACE_VISIBILITY] = 'hidden';
                }
            };
        } else {
            return (style: any, x: number, y: number) => {
                style[TRANSFORM] = 'translate(' + x + 'px,' + y + 'px)';
            };
        }
    } else {
        return (style: any, x: number, y: number) => {
            style.left = x + 'px';
            style.top = y + 'px';
        };
    }
})();
