import Koa from 'koa';
export declare function initApp(): Promise<{
    app: Koa<Koa.DefaultState, Koa.DefaultContext>;
    dbConnection: import("typeorm").Connection;
}>;
//# sourceMappingURL=app.d.ts.map