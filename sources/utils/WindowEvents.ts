import * as EventListener from 'fbjs/lib/EventListener';

export class WindowEvents {
    static listenToResize(handler: () => void): () => void {
        return EventListener.listen(window, 'resize', handler).remove;
    }

    static captureMouseMove(handler: (e: MouseEvent) => void): () => void {
        return EventListener.capture(window, 'mousemove', handler).remove;
    }

    static captureMouseUp(handler: (e: MouseEvent) => void): () => void {
        return EventListener.capture(window, 'mouseup', handler).remove;
    }
}
