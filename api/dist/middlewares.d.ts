import { Context } from "koa";
export declare function responseTime(): (ctx: Context, next: () => Promise<void>) => Promise<void>;
export declare function errorHandling(): (ctx: Context, next: () => Promise<void>) => Promise<void>;
export declare function httpLogger(): (ctx: Context, next: () => Promise<void>) => Promise<void>;
//# sourceMappingURL=middlewares.d.ts.map