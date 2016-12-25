export class Environment {
    static isProduction(): boolean {
        return process.env.NODE_ENV === 'production';
    }
}
