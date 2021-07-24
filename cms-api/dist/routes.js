"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_joi_router_1 = __importDefault(require("koa-joi-router"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const bulk_upload_routes_1 = __importDefault(require("./bulk-upload/bulk-upload.routes"));
const routes = koa_joi_router_1.default();
const cmsRoutes = [
    bulk_upload_routes_1.default,
    user_routes_1.default,
];
// Exclude authentication route from checking token existance
// routes.use(authenticationRoutes.middleware());
// routes.use(validateAccessTokenMiddleware);
cmsRoutes.forEach(route => {
    routes.use(route.middleware());
});
routes.prefix('/cms-api');
exports.default = routes;
//# sourceMappingURL=routes.js.map