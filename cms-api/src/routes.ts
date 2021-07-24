import koaJoiRouter from 'koa-joi-router';

import userRoutes from './user/user.routes';
import bulkUploadRoutes from './bulk-upload/bulk-upload.routes';

const routes = koaJoiRouter();

const cmsRoutes = [
  bulkUploadRoutes,
  userRoutes,
];

// Exclude authentication route from checking token existance
// routes.use(authenticationRoutes.middleware());
// routes.use(validateAccessTokenMiddleware);

cmsRoutes.forEach(route => {
  routes.use(route.middleware());
});

routes.prefix('/cms-api');

export default routes;
