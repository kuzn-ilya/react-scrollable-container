import { WindowEvents } from './WindowEvents';
import { cancelAnimationFrame } from './cancelAnimationFrame';
import * as requestAnimationFrame from 'fbjs/lib/requestAnimationFrame';
import * as emptyFunction from 'fbjs/lib/emptyFunction';

export class MouseCapture {
    private constructor(event: MouseEvent, mouseMoveHandler?: (deltaX: number, deltaY: number) => void,
        mouseUpHandler?: () => void) {
        this.mouseUpListener = this.mouseUpListener.bind(this);
        this.mouseMoveListener = this.mouseMoveListener.bind(this);
        this.didMouseMove = this.didMouseMove.bind(this);

        this.mouseMoveHandler = mouseMoveHandler || emptyFunction;
        this.mouseUpHandler = mouseUpHandler || emptyFunction;

        MouseCapture.preventGlobalMouseEvents();

        this.removeMouseUpEventListener = WindowEvents.captureMouseUp(this.mouseUpListener);
        this.removeMouseMoveEventListener = WindowEvents.captureMouseMove(this.mouseMoveListener);

        this.deltaX = 0;
        this.deltaY = 0;
        this.x = event.clientX;
        this.y = event.clientY;

        event.preventDefault();
    }

    private removeMouseUpEventListener: () => void;
    private removeMouseMoveEventListener: () => void;

    private mouseUpHandler: () => void;
    private mouseMoveHandler: (deltaX: number, deltaY: number) => void;

    private animationFrameID?: number;

    private static preventGlobalMouseEvents(): void {
        document.body.style.pointerEvents = 'none';
    }

    private static restoreGlobalMouseEvents(): void {
        document.body.style.pointerEvents = 'auto';
    }

    private mouseMoveListener: (e: MouseEvent) => void = (event) => {
        let x = event.clientX;
        let y = event.clientY;

        this.deltaX += (x - this.x);
        this.deltaY += (y - this.y);

        if (this.animationFrameID === undefined) {
            // The mouse may move faster then the animation frame does.
            // Use `requestAnimationFramePolyfill` to avoid over-updating.
            this.animationFrameID = requestAnimationFrame(this.didMouseMove);
        }

        this.x += (x - this.x);
        this.y += (y - this.y);

        event.preventDefault();
    }

    private deltaX: number;
    private deltaY: number;
    private x: number;
    private y: number;

    private mouseUpListener: (e: MouseEvent) => void = (e) => {
        if (this.animationFrameID) {
            this.didMouseMove();
        }

        this.mouseUpHandler();

        e.preventDefault();
        this.releaseCapture();
    }

    private didMouseMove: () => void = () => {
        this.animationFrameID = undefined;
        this.mouseMoveHandler(this.deltaX, this.deltaY);
        this.deltaX = 0;
        this.deltaY = 0;
    }

    releaseCapture(): void {
        MouseCapture.restoreGlobalMouseEvents();

        this.removeMouseUpEventListener();
        this.removeMouseMoveEventListener();

        if (this.animationFrameID !== undefined) {
            cancelAnimationFrame(this.animationFrameID);
            this.animationFrameID = undefined;
        }
    }

    static captureMouseEvents(e: MouseEvent, mouseMoveHandler?: (deltaX: number, deltaY: number) => void,
        mouseUpHandler?: () => void): MouseCapture {
        return new MouseCapture(e, mouseMoveHandler, mouseUpHandler);
    }
}
