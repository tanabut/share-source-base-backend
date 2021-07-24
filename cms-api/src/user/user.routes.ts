import { UserRole } from '@share-source-base/core/dist/user/user-role';
import {
  createUser,
  fetchAllUsers,
  updateUser,
} from '@share-source-base/core/dist/user/user.service';
import koaJoiRouter, { Joi } from 'koa-joi-router';

const joiStringNoWhitespace = Joi.string().regex(/^\S+$/);
const joiUserRole = Joi.string().valid(...Object.values(UserRole));
const joiEmptyString = Joi.string().allow('');
const joiRelationObjectOptional = Joi.object({
  code: Joi.string().required(),
})
  .optional()
  .allow(null);

const userUpdateRequestBody = Joi.object({
  password: joiStringNoWhitespace,
  firstname: joiEmptyString,
  lastname: joiEmptyString,
  role: joiUserRole,
  regions: Joi.array().items(joiRelationObjectOptional).optional(),
  isActive: Joi.boolean(),
});

const userCreateRequestBody = Joi.object({
  username: joiStringNoWhitespace.required(),
  password: joiStringNoWhitespace.required(),
  firstname: joiEmptyString.default(''),
  lastname: joiEmptyString.default(''),
  role: joiUserRole.required(),
  regions: Joi.array().items(joiRelationObjectOptional).optional(),
  isActive: Joi.boolean().default(false),
});

const router = koaJoiRouter();

router.prefix('/users');

router.route({
  method: 'get',
  path: '/',
  handler: async ctx => {
    const users = await fetchAllUsers();

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

  handler: async ctx => {
    const user = await createUser(ctx.request.body);

    ctx.body = user;
  },
});

router.route({
  method: 'put',
  path: '/:id',
  validate: {
    params: {
      id: Joi.number().required(),
    },
    body: userUpdateRequestBody,
    type: 'json',
  },
  handler: async ctx => {
    // TODO: proper way to handle errors/DB errors from `core` service
    // e.g. separate notFound and badrequest status codes
    const user = await updateUser(
      Number(ctx.request.params.id),
      ctx.request.body,
    );

    ctx.body = user;
  },
});

export default router;
