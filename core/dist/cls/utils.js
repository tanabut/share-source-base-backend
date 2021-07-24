"use strict";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
// Based on `cls-rtracer`'s implementation
// ref: https://github.com/puzpuzpuz/cls-rtracer/blob/master/src/util.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapEmitter = void 0;
const isWrappedSymbol = Symbol('cls-rtracer-is-wrapped');
const wrappedSymbol = Symbol('cls-rtracer-wrapped-function');
const addMethods = [
    'on',
    'addListener',
    'prependListener',
];
const removeMethods = ['off', 'removeListener'];
function wrapEmitterMethod(emitter, method, wrapper) {
    // @ts-expect-error
    // Error due to appending new key to original interface
    if (emitter[method][isWrappedSymbol]) {
        return;
    }
    const original = emitter[method];
    const wrapped = wrapper(original, method);
    wrapped[isWrappedSymbol] = true;
    emitter[method] = wrapped;
    return wrapped;
}
/**
 * Wraps EventEmitter listener registration methods of the
 * given emitter, so that all listeners are run in scope of
 * the provided async resource.
 */
function wrapEmitter(emitter, asyncResource) {
    // eslint-disable-next-line no-restricted-syntax
    for (const method of addMethods) {
        wrapEmitterMethod(emitter, method, (original) => function (name, handler) {
            handler[wrappedSymbol] = asyncResource.runInAsyncScope.bind(asyncResource, handler, emitter);
            // @ts-expect-error
            return original.call(this, name, handler[wrappedSymbol]);
        });
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const method of removeMethods) {
        wrapEmitterMethod(emitter, method, (original) => function (name, handler) {
            // @ts-expect-error
            return original.call(this, name, handler[wrappedSymbol] || handler);
        });
    }
}
exports.wrapEmitter = wrapEmitter;
//# sourceMappingURL=utils.js.map