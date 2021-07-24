import { AsyncLocalStorage, AsyncResource } from 'async_hooks';
import { Middleware } from 'koa';
import { v1 as uuidv1 } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { wrapEmitter } from './utils';
import { UserAttributes } from '../user/user.types';

// Extended `cls-rtracer` to create multiple instances of AsyncLocalStorage
// and allow saving other data types
// ref: https://github.com/puzpuzpuz/cls-rtracer

export interface BaseCLSType {
  requestId: string;
}

export interface CMSCLSType extends BaseCLSType {
  user?: Partial<UserAttributes>;
}

export class ContinuationLocalStorage<T extends BaseCLSType> {
  name: string;

  isWrappedSymbol: symbol;

  wrappedSymbol: symbol;

  als: AsyncLocalStorage<T>;

  constructor(name: string) {
    this.name = name;
    this.isWrappedSymbol = Symbol(`${name}-is-wrapped`);
    this.wrappedSymbol = Symbol(`${name}-wrapped-function`);

    this.als = new AsyncLocalStorage();
  }

  wrapHttpEmitters = (req: IncomingMessage, res: ServerResponse) => {
    const asyncResource = new AsyncResource(this.name);
    wrapEmitter(req, asyncResource);
    wrapEmitter(res, asyncResource);
  };

  koaMiddleware = ({
    useHeader = false,
    requestIdHeaderName = 'X-Request-Id',
    echoRequestIdHeader = true,
  } = {}): Middleware => {
    return (ctx, next) => {
      let requestId = '';
      if (useHeader) {
        const headerRequestId =
          ctx.request.headers[requestIdHeaderName.toLowerCase()];
        if (typeof headerRequestId === 'string') {
          requestId = headerRequestId;
        }
      }
      requestId = requestId || uuidv1();

      if (echoRequestIdHeader) {
        ctx.set(requestIdHeaderName, requestId);
      }

      return this.als.run({ requestId } as T, () => {
        this.wrapHttpEmitters(ctx.req, ctx.res);
        return next();
      });
    };
  };

  get store() {
    return this.als.getStore();
  }
}

export const CmsApiCLS = new ContinuationLocalStorage<CMSCLSType>('cms-api');
