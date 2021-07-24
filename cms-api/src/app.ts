import cors from '@koa/cors';
import { CmsApiCLS } from '@share-source-base/core/dist/cls';
import { initDb } from '@share-source-base/core/dist/db';
import Koa from 'koa';
import serve from 'koa-static';

import { CMS_FRONTEND_BUILD_DIR, CORE_STATIC_DIR, NODE_ENV } from './config';
import { errorMiddleware } from './error/error-handler';
import routes from './routes';

export async function initApp() {
  const app = new Koa();

  const dbConnection = await initDb();

  app.use(cors());
  app.use(CmsApiCLS.koaMiddleware());
  app.use(errorMiddleware);

  app.use(routes.middleware());

  if (NODE_ENV === 'production') {
    const serveFrontendMiddleware = serve(CMS_FRONTEND_BUILD_DIR);

    app.use(serveFrontendMiddleware);
    app.use(async (ctx, next) => {
      return serveFrontendMiddleware(
        Object.assign(ctx, { path: 'index.html' }),
        next,
      );
    });
  }

  app.use(serve(CORE_STATIC_DIR));

  return { app, dbConnection };
}
