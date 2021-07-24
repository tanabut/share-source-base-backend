"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = exports.chunkedRequest = void 0;
const chunk_1 = __importDefault(require("lodash/chunk"));
function chunkedRequest(collection, chunkSize = 10, requestFn, onChunkSuccess) {
    const chunkedCollection = chunk_1.default(collection, chunkSize);
    return new Promise((resolve, reject) => {
        let index = 0;
        let isFetching = false;
        const iRef = setInterval(() => {
            if (isFetching) {
                return;
            }
            if (index >= chunkedCollection.length) {
                clearInterval(iRef);
                resolve();
                return;
            }
            const currentChunk = chunkedCollection[index] || [];
            Promise.all(currentChunk.map(requestFn))
                .then(async (responses) => {
                if (onChunkSuccess) {
                    await onChunkSuccess(currentChunk.map((c, i) => ({
                        row: c,
                        response: responses[i],
                    })));
                }
                index += 1;
                isFetching = false;
            })
                .catch(e => {
                clearInterval(iRef);
                reject(e);
            });
            isFetching = true;
        }, 10);
    });
}
exports.chunkedRequest = chunkedRequest;
function withRetry(fn) {
    const fnWithRetry = async (params, retryCountLeft = 3) => {
        try {
            const res = await fn(params);
            return res;
        }
        catch (err) {
            retryCountLeft -= 1;
            if (retryCountLeft <= 0) {
                throw err;
            }
            const res = await fnWithRetry(params, retryCountLeft);
            return res;
        }
    };
    return fnWithRetry;
}
exports.withRetry = withRetry;
//# sourceMappingURL=request.js.map