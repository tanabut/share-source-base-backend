export declare function createMapBy<T extends {
    [key: string]: any;
}, K extends string | number = string>(array: T[], key: string, onCall?: (current: T) => void): Record<K, T>;
//# sourceMappingURL=createMapBy.d.ts.map