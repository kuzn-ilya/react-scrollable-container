declare var warning: (condition: boolean, format: string, ...args: any[]) => void;

declare module "fbjs/lib/warning" {
    export = warning;
}
