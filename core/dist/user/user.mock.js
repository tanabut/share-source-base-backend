"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearMockUsers = exports.insertMockUsers = exports.mockUsers = void 0;
const user_role_1 = require("./user-role");
const user_entity_1 = require("./user.entity");
exports.mockUsers = [
    {
        username: 'admin',
        password: 'admin',
        firstname: 'Admin 1',
        lastname: '',
        role: user_role_1.UserRole.Admin,
        isActive: true,
    },
    {
        username: 'Inactive',
        password: 'admin',
        firstname: 'Inactive 1',
        lastname: '',
        role: user_role_1.UserRole.Admin,
        isActive: false,
    },
    {
        username: 'maintainer',
        password: 'maintainer',
        firstname: 'Maintainer 1',
        lastname: '',
        role: user_role_1.UserRole.Maintainer,
        isActive: true,
    },
    {
        username: 'viewer',
        password: 'viewer',
        firstname: 'Viewer 1',
        lastname: '',
        role: user_role_1.UserRole.Viewer,
        isActive: true,
    },
];
async function insertMockUsers(tManager) {
    const userRepo = tManager.getRepository(user_entity_1.User);
    await userRepo.save(userRepo.create(exports.mockUsers));
}
exports.insertMockUsers = insertMockUsers;
async function clearMockUsers(tManager) {
    const userRepo = tManager.getRepository(user_entity_1.User);
    await userRepo.delete({ isActive: true });
    await userRepo.delete({ isActive: false });
}
exports.clearMockUsers = clearMockUsers;
//# sourceMappingURL=user.mock.js.map