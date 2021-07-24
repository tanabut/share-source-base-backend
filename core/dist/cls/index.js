"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsApiCLS = exports.ContinuationLocalStorage = void 0;
const async_hooks_1 = require("async_hooks");
const uuid_1 = require("uuid");
const utils_1 = require("./utils");
class ContinuationLocalStorage {
    constructor(name) {
        this.wrapHttpEmitters = (req, res) => {
            const asyncResource = new async_hooks_1.AsyncResource(this.name);
            utils_1.wrapEmitter(req, asyncResource);
            utils_1.wrapEmitter(res, asyncResource);
        };
        this.koaMiddleware = ({ useHeader = false, requestIdHeaderName = 'X-Request-Id', echoRequestIdHeader = true, } = {}) => {
            return (ctx, next) => {
                let requestId = '';
                if (useHeader) {
                    const headerRequestId = ctx.request.headers[requestIdHeaderName.toLowerCase()];
                    if (typeof headerRequestId === 'string') {
                        requestId = headerRequestId;
                    }
                }
                requestId = requestId || uuid_1.v1();
                if (echoRequestIdHeader) {
                    ctx.set(requestIdHeaderName, requestId);
                }
                return this.als.run({ requestId }, () => {
                    this.wrapHttpEmitters(ctx.req, ctx.res);
                    return next();
                });
            };
        };
        this.name = name;
        this.isWrappedSymbol = Symbol(`${name}-is-wrapped`);
        this.wrappedSymbol = Symbol(`${name}-wrapped-function`);
        this.als = new async_hooks_1.AsyncLocalStorage();
    }
    get store() {
        return this.als.getStore();
    }
}
exports.ContinuationLocalStorage = ContinuationLocalStorage;
exports.CmsApiCLS = new ContinuationLocalStorage('cms-api');
//# sourceMappingURL=index.js.map