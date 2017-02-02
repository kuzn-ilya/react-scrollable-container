import * as invariant from 'fbjs/lib/invariant';
import * as ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import * as getStyleProperty from 'fbjs/lib/getStyleProperty';
import * as EventListener from 'fbjs/lib/EventListener';
import * as requestAnimationFrame from 'fbjs/lib/requestAnimationFrame';
import { cancelAnimationFrame } from './cancelAnimationFrame';

class EventQueue {
    private queue: Array<() => void> = [];

    add(ev: () => void): void {
        this.queue.push(ev);
    }

    call(): void {
        this.queue.forEach((ev) => ev());
    }

    remove(ev: () => void): void {
        this.queue = this.queue.filter((value) => value !== ev);
    }

    length(): number {
        return this.queue.length;
    }
}

interface HTMLElementAux {
    resizedAttached?: EventQueue;
    resizeSensor?: HTMLDivElement;
    removeOnScroll1?: () => void;
    removeOnScroll2?: () => void;
}

export function listenToResize(element: HTMLElement & HTMLElementAux, resized: () => void): () => void {
    invariant(ExecutionEnvironment.canUseDOM, 'listenToResize cannot be used in a windowless environment');

    let rafId = 0;

    let remove: () => void = () => {
        if (rafId) {
            cancelAnimationFrame.call(window, rafId);
        }
        if (element.resizedAttached) {
            element.resizedAttached.remove(resized);
            if (element.resizedAttached.length()) {
                return;
            }
            delete element.resizedAttached;
        }

        if (element.removeOnScroll1) {
            element.removeOnScroll1();
            delete element.removeOnScroll1;
        }

        if (element.removeOnScroll2) {
            element.removeOnScroll2();
            delete element.removeOnScroll2;
        }

        if (element.resizeSensor) {
            if (element.contains(element.resizeSensor)) {
                element.removeChild(element.resizeSensor);
            }
            delete element.resizeSensor;
        }
    };

    if (!element.resizedAttached) {
        element.resizedAttached = new EventQueue();
        element.resizedAttached.add(resized);
    } else if (element.resizedAttached) {
        element.resizedAttached.add(resized);
        return remove;
    }

    element.resizeSensor = document.createElement('div');
    element.resizeSensor.className = 'resize-sensor';
    const style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
    const styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';

    element.resizeSensor.style.cssText = style;
    element.resizeSensor.innerHTML =
        '<div class="resize-sensor-expand" style="' + style + '">' +
            '<div style="' + styleChild + '"></div>' +
        '</div>' +
        '<div class="resize-sensor-shrink" style="' + style + '">' +
            '<div style="' + styleChild + ' width: 200%; height: 200%"></div>' +
        '</div>';
    element.appendChild(element.resizeSensor);

    if (getStyleProperty(element, 'position') === 'static') {
        element.style.position = 'relative';
    }

    const expand = element.resizeSensor.childNodes[0] as HTMLElement;
    const expandChild = expand.childNodes[0] as HTMLElement;
    const shrink = element.resizeSensor.childNodes[1] as HTMLElement;

    let dirty = false;
    let newWidth = element.offsetWidth;
    let newHeight = element.offsetWidth;

    let lastWidth = newWidth;
    let lastHeight = newHeight;

    let reset: () => void = () => {
        expandChild.style.width = '100000px';
        expandChild.style.height = '100000px';

        expand.scrollLeft = 100000;
        expand.scrollTop = 100000;

        shrink.scrollLeft = 100000;
        shrink.scrollTop = 100000;
    };

    reset();

    let onResized: () => void = () => {
        rafId = 0;

        if (!dirty) {
            return;
        }

        lastWidth = newWidth;
        lastHeight = newHeight;

        if (element.resizedAttached) {
            element.resizedAttached.call();
        }
    };

    let onScroll: () => void = () => {
        newWidth = element.offsetWidth;
        newHeight = element.offsetHeight;
        dirty = newWidth !== lastWidth || newHeight !== lastHeight;

        if (dirty && !rafId) {
            rafId = requestAnimationFrame.call(window, onResized);
        }

        reset();
    };

    element.removeOnScroll1 = EventListener.listen(expand, 'scroll', onScroll).remove;
    element.removeOnScroll2 = EventListener.listen(shrink, 'scroll', onScroll).remove;

    return remove;
}
