"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_joi_router_1 = __importDefault(require("koa-joi-router"));
// import authRoutes from "./auth/auth.routes";
// import * as middlewares from "./middlewares";
const routes = koa_joi_router_1.default();
// routes.use(authRoutes.middleware());
const allRoutes = [];
// routes.use(middlewares.authentication());
// allRoutes.forEach(route => {
//   routes.use(route.middleware());
// });
routes.prefix("/api");
exports.default = routes;
//# sourceMappingURL=routes.js.map