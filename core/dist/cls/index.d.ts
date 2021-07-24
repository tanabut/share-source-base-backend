/// <reference types="node" />
import { AsyncLocalStorage } from 'async_hooks';
import { Middleware } from 'koa';
import { IncomingMessage, ServerResponse } from 'http';
import { UserAttributes } from '../user/user.types';
export interface BaseCLSType {
    requestId: string;
}
export interface CMSCLSType extends BaseCLSType {
    user?: Partial<UserAttributes>;
}
export declare class ContinuationLocalStorage<T extends BaseCLSType> {
    name: string;
    isWrappedSymbol: symbol;
    wrappedSymbol: symbol;
    als: AsyncLocalStorage<T>;
    constructor(name: string);
    wrapHttpEmitters: (req: IncomingMessage, res: ServerResponse) => void;
    koaMiddleware: ({ useHeader, requestIdHeaderName, echoRequestIdHeader, }?: {
        useHeader?: boolean | undefined;
        requestIdHeaderName?: string | undefined;
        echoRequestIdHeader?: boolean | undefined;
    }) => Middleware;
    get store(): T | undefined;
}
export declare const CmsApiCLS: ContinuationLocalStorage<CMSCLSType>;
//# sourceMappingURL=index.d.ts.map