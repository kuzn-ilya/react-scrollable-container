import { Environment } from './Environment';

export let warning: (message: string) => void = (params: string) => { return; };

if (!Environment.isProduction()) {
    warning = (message: string) => {
        if (typeof console !== 'undefined') {
            console.error(message);
        }
        try {
            throw new Error(message);
        } catch (x) {
            // tslint:disable-next-line:no-empty
        }
    };
}
