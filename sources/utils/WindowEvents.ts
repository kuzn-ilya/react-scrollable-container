export class WindowEvents {
    static addResizeEventListener(handler: () => void) {
        window.addEventListener('resize', handler);
    }

    static removeResizeEventListener(handler: () => void) {
        window.removeEventListener('resize', handler);
    }

    static addMouseMoveEventListener(handler: (e: MouseEvent) => void) {
        window.addEventListener('mousemove', handler);
    }

    static removeMouseMoveEventListener(handler: (e: MouseEvent) => void) {
        window.removeEventListener('mousemove', handler);
    }

    static addMouseMoveUpEventListener(handler: (e: MouseEvent) => void) {
        window.addEventListener('mouseup', handler);
    }

    static removeMouseUpEventListener(handler: (e: MouseEvent) => void) {
        window.removeEventListener('mouseup', handler);
    }
}
