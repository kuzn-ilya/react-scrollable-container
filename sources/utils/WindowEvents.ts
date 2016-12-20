export class WindowEvents {
    static addResizeEventListener(handler: () => void): void {
        window.addEventListener('resize', handler);
    }

    static removeResizeEventListener(handler: () => void): void {
        window.removeEventListener('resize', handler);
    }

    static addMouseMoveEventListener(handler: (e: MouseEvent) => void, useCapture?: boolean): void {
        window.addEventListener('mousemove', handler, useCapture);
    }

    static removeMouseMoveEventListener(handler: (e: MouseEvent) => void, useCapture?: boolean): void {
        window.removeEventListener('mousemove', handler, useCapture);
    }

    static addMouseUpEventListener(handler: (e: MouseEvent) => void, useCapture?: boolean): void {
        window.addEventListener('mouseup', handler, useCapture);
    }

    static removeMouseUpEventListener(handler: (e: MouseEvent) => void, useCapture?: boolean): void {
        window.removeEventListener('mouseup', handler, useCapture);
    }
}
