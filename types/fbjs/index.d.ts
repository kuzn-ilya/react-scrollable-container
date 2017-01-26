interface EmptyFunction {
    (): void;
    thatReturns<T>(arg: T): () => T;
    thatReturnsFalse(): false;
    thatReturnsTrue(): true;
    thatReturnsNull(): null;
    thatReturnsThis(): any;
    thatReturnsArgument<T>(arg: T): () => T;
}

declare var warning: (condition: boolean, format: string, ...args: any[]) => void;
declare var emptyFunction: EmptyFunction;


declare module "fbjs/lib/warning" {
    export = warning;
}

declare module "fbjs/lib/emptyFunction" {
    export = emptyFunction;
}