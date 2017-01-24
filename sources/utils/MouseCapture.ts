import { WindowEvents } from './WindowEvents';

export class MouseCapture {
    private constructor(e: Event, mouseMoveHandler?: (e: MouseEvent) => void,
        releaseCaptureHandler?: (e: MouseEvent) => void) {
        this.mouseUpListener = this.mouseUpListener.bind(this);
        this.mouseMoveListener = this.mouseMoveListener.bind(this);

        this.mouseMoveHandler = mouseMoveHandler;
        this.releaseCaptureHandler = releaseCaptureHandler;

        MouseCapture.preventGlobalMouseEvents();

        WindowEvents.addMouseUpEventListener(this.mouseUpListener, true);
        WindowEvents.addMouseMoveEventListener(this.mouseMoveListener, true);

        e.preventDefault();
        e.stopPropagation();
    }

    private releaseCaptureHandler?: (e: MouseEvent) => void;
    private mouseMoveHandler?: (e: MouseEvent) => void;

    private static preventGlobalMouseEvents(): void {
        document.body.style.pointerEvents = 'none';
    }

    private static restoreGlobalMouseEvents(): void {
        document.body.style.pointerEvents = 'auto';
    }

    private mouseMoveListener: (e: MouseEvent) => void = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.mouseMoveHandler) {
            this.mouseMoveHandler(e);
        }
    }

    private mouseUpListener: (e: MouseEvent) => void = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.releaseCapture(e);
    }

    releaseCapture(e: MouseEvent): void {
        MouseCapture.restoreGlobalMouseEvents();

        WindowEvents.removeMouseUpEventListener(this.mouseUpListener, true);
        WindowEvents.removeMouseMoveEventListener(this.mouseMoveListener, true);

        if (this.releaseCaptureHandler) {
            this.releaseCaptureHandler(e);
        }
    }

    static captureMouseEvents(e: Event, mouseMoveHandler?: (e: MouseEvent) => void,
        releaseCaptureHandler?: (e: MouseEvent) => void): MouseCapture {
        return new MouseCapture(e, mouseMoveHandler, releaseCaptureHandler);
    }
}
