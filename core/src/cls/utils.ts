/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
// Based on `cls-rtracer`'s implementation
// ref: https://github.com/puzpuzpuz/cls-rtracer/blob/master/src/util.js

import { AsyncResource } from 'async_hooks';

const isWrappedSymbol = Symbol('cls-rtracer-is-wrapped');
const wrappedSymbol = Symbol('cls-rtracer-wrapped-function');

type EventEmitterMethod = keyof NodeJS.EventEmitter;

const addMethods: EventEmitterMethod[] = [
  'on',
  'addListener',
  'prependListener',
];

const removeMethods: EventEmitterMethod[] = ['off', 'removeListener'];

function wrapEmitterMethod(
  emitter: NodeJS.EventEmitter,
  method: EventEmitterMethod,
  wrapper: Function,
) {
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
export function wrapEmitter(
  emitter: NodeJS.EventEmitter,
  asyncResource: AsyncResource,
) {
  // eslint-disable-next-line no-restricted-syntax
  for (const method of addMethods) {
    wrapEmitterMethod(
      emitter,
      method,
      (original: any) =>
        function (name: any, handler: any) {
          handler[wrappedSymbol] = asyncResource.runInAsyncScope.bind(
            asyncResource,
            handler,
            emitter,
          );
          // @ts-expect-error
          return original.call(this, name, handler[wrappedSymbol]);
        },
    );
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const method of removeMethods) {
    wrapEmitterMethod(
      emitter,
      method,
      (original: any) =>
        function (name: any, handler: any) {
          // @ts-expect-error
          return original.call(this, name, handler[wrappedSymbol] || handler);
        },
    );
  }
}
