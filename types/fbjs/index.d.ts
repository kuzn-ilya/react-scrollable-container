declare module "fbjs/lib/invariant" {
    /**
     * Use invariant() to assert state which your program assumes to be true.
     *
     * Provide sprintf-style format (only %s is supported) and arguments
     * to provide information about what broke and what you were
     * expecting.
     *
     * The invariant message will be stripped in production, but the invariant
     * will remain to ensure logic does not differ in production.
     */
    var invariant: (condition: boolean, format?: string, a?: any, b?: any, c?: any, d?: any, e?: any, f?: any) => void;
    export = invariant;
}

declare module "fbjs/lib/warning" {
    /**
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */ 
    var warning: (condition: boolean, format: string, ...args: any[]) => void;
    export = warning;
}

declare module "fbjs/lib/emptyFunction" {
    interface EmptyFunction {
        (...args: any[]): void;
        thatReturns<T>(arg: T): (...args: any[]) => T;
        thatReturnsFalse(...args: any[]): false;
        thatReturnsTrue(...args: any[]): true;
        thatReturnsNull(...args: any[]): null;
        thatReturnsThis(...args: any[]): any;
        thatReturnsArgument<T>(arg: T): (...args: any[]) => T;
    }

    /**
     * This function accepts and discards inputs; it has no side effects. This is
     * primarily useful idiomatically for overridable function endpoints which
     * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
     */ 
    var emptyFunction: EmptyFunction;
    export = emptyFunction;
}

declare module "fbjs/lib/shallowEqual" {
    /**
     * Performs equality by iterating through keys on an object and returning false
     * when any key has values which are not strictly equal between the arguments.
     * Returns true when the values of all keys are strictly equal.
     */
    function shallowEqual<T>(objA: T, objB: T): boolean;
    namespace shallowEqual {}
    export = shallowEqual;
}

declare module "fbjs/lib/nullthrows" {
    function nullthrows<T>(obj: T | undefined | null): T;
    namespace nullthrows {}
    export = nullthrows;
}

declare module "fbjs/lib/sprintf" {
    /**
     * Simple function for formatting strings.
     *
     * Replaces placeholders with values passed as extra arguments
     *
     * @param {string} format the base string
     * @param ...args the values to insert
     * @return {string} the replaced string
     */
    var sprintf: (format: string, ...args: any[]) => string;
    export = sprintf;
}

declare module "fbjs/lib/EventListener" {
    interface RemoveListener {
        remove: () => void;
    }

    interface EventListener  {
        /**
         * Listen to DOM events during the bubble phase.
         *
         * @param {DOMEventTarget} target DOM element to register listener on.
         * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
         * @param {function} callback Callback function.
         * @return {object} Object with a `remove` method.
         */
        listen: (target: EventTarget, eventType: string, callback: EventListenerOrEventListenerObject) => RemoveListener;

        /**
         * Listen to DOM events during the capture phase.
         *
         * @param {DOMEventTarget} target DOM element to register listener on.
         * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
         * @param {function} callback Callback function.
         * @return {object} Object with a `remove` method.
         */
        capture: (target: EventTarget, eventType: string, callback: EventListenerOrEventListenerObject) => RemoveListener;

        registerDefault: () => void;
    }

    /**
     * Upstream version of event listener. Does not take into account specific
     * nature of platform.
     */
    var EventListener: EventListener;
    export = EventListener;
}

declare module "fbjs/lib/requestAnimationFrame" {
    var requestAnimationFrame: (callback: FrameRequestCallback) => number;
    export = requestAnimationFrame;
}

declare module "fbjs/lib/ExecutionEnvironment" {
    /**
     * Simple, lightweight module assisting with the detection and context of
     * Worker. Helps avoid circular dependencies and allows code to reason about
     * whether or not they are in a Worker, even if they never include the main
     * `ReactWorker` dependency.
     */
    interface ExecutionEnvironment {
        canUseDOM: boolean;
        canUseWorkers: boolean;
        canUseEventListeners: boolean;
        canUseViewport: boolean;
        isInWorker: boolean;
    }
    var ExecutionEnvironment: ExecutionEnvironment;
    export = ExecutionEnvironment;
}

declare module "fbjs/lib/camelize" {
    /**
     * Camelcases a hyphenated string, for example:
     *
     *   > camelize('background-color')
     *   < "backgroundColor"
     *
     * @param {string} string
     * @return {string}
     */
    var camelize: (str: string) => string;
    export = camelize;
}
