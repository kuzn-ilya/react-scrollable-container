interface EmptyFunction {
    (...args: any[]): void;
    thatReturns<T>(arg: T): (...args: any[]) => T;
    thatReturnsFalse(...args: any[]): false;
    thatReturnsTrue(...args: any[]): true;
    thatReturnsNull(...args: any[]): null;
    thatReturnsThis(...args: any[]): any;
    thatReturnsArgument<T>(arg: T): (...args: any[]) => T;
}

declare var warning: (condition: boolean, format: string, ...args: any[]) => void;
declare var emptyFunction: EmptyFunction;


declare module "fbjs/lib/warning" {
    export = warning;
}

declare module "fbjs/lib/emptyFunction" {
    export = emptyFunction;
}