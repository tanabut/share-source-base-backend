/// <reference types="node" />
import { AsyncResource } from 'async_hooks';
/**
 * Wraps EventEmitter listener registration methods of the
 * given emitter, so that all listeners are run in scope of
 * the provided async resource.
 */
export declare function wrapEmitter(emitter: NodeJS.EventEmitter, asyncResource: AsyncResource): void;
//# sourceMappingURL=utils.d.ts.map