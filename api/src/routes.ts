import koaJoiRouter from "koa-joi-router";

// import authRoutes from "./auth/auth.routes";
// import * as middlewares from "./middlewares";

const routes = koaJoiRouter();

// routes.use(authRoutes.middleware());

const allRoutes = [];

// routes.use(middlewares.authentication());

// allRoutes.forEach(route => {
//   routes.use(route.middleware());
// });

routes.prefix("/api");

export default routes;