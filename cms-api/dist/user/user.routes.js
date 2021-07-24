"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_role_1 = require("@share-source-base/core/dist/user/user-role");
const user_service_1 = require("@share-source-base/core/dist/user/user.service");
const koa_joi_router_1 = __importStar(require("koa-joi-router"));
const joiStringNoWhitespace = koa_joi_router_1.Joi.string().regex(/^\S+$/);
const joiUserRole = koa_joi_router_1.Joi.string().valid(...Object.values(user_role_1.UserRole));
const joiEmptyString = koa_joi_router_1.Joi.string().allow('');
const joiRelationObjectOptional = koa_joi_router_1.Joi.object({
    code: koa_joi_router_1.Joi.string().required(),
})
    .optional()
    .allow(null);
const userUpdateRequestBody = koa_joi_router_1.Joi.object({
    password: joiStringNoWhitespace,
    firstname: joiEmptyString,
    lastname: joiEmptyString,
    role: joiUserRole,
    regions: koa_joi_router_1.Joi.array().items(joiRelationObjectOptional).optional(),
    isActive: koa_joi_router_1.Joi.boolean(),
});
const userCreateRequestBody = koa_joi_router_1.Joi.object({
    username: joiStringNoWhitespace.required(),
    password: joiStringNoWhitespace.required(),
    firstname: joiEmptyString.default(''),
    lastname: joiEmptyString.default(''),
    role: joiUserRole.required(),
    regions: koa_joi_router_1.Joi.array().items(joiRelationObjectOptional).optional(),
    isActive: koa_joi_router_1.Joi.boolean().default(false),
});
const router = koa_joi_router_1.default();
router.prefix('/users');
router.route({
    method: 'get',
    path: '/',
    handler: async (ctx) => {
        const users = await user_service_1.fetchAllUsers();
        ctx.body = users;
    },
});
router.route({
    method: 'post',
    path: '/',
    validate: {
        body: userCreateRequestBody,
        type: 'json',
    },
    handler: async (ctx) => {
        const user = await user_service_1.createUser(ctx.request.body);
        ctx.body = user;
    },
});
router.route({
    method: 'put',
    path: '/:id',
    validate: {
        params: {
            id: koa_joi_router_1.Joi.number().required(),
        },
        body: userUpdateRequestBody,
        type: 'json',
    },
    handler: async (ctx) => {
        // TODO: proper way to handle errors/DB errors from `core` service
        // e.g. separate notFound and badrequest status codes
        const user = await user_service_1.updateUser(Number(ctx.request.params.id), ctx.request.body);
        ctx.body = user;
    },
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map