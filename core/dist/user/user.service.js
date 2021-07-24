"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.updateUser = exports.createUser = exports.findOneUser = exports.fetchAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_entity_1 = require("./user.entity");
function comparePassword(user, password) {
    return bcrypt_1.default.compareSync(password, user.password);
}
async function fetchAllUsers() {
    return user_entity_1.User.find();
}
exports.fetchAllUsers = fetchAllUsers;
async function findOneUser(conditions, options) {
    return user_entity_1.User.findOne(conditions, options);
}
exports.findOneUser = findOneUser;
async function createUser(attrs) {
    return user_entity_1.User.create(attrs).save();
}
exports.createUser = createUser;
async function updateUser(id, attrs) {
    attrs.regions = attrs.regions || [];
    const user = await user_entity_1.User.findOne({ id });
    if (!user) {
        throw new Error('User not found');
    }
    Object.assign(user, attrs);
    if (attrs.password) {
        user.encryptPassword();
    }
    return user.save();
}
exports.updateUser = updateUser;
async function loginUser({ username, password, }) {
    const user = await findOneUser({ username, isActive: true }, { relations: ['regions'] });
    if (!user) {
        throw new Error('User not found');
    }
    if (!comparePassword(user, password)) {
        throw new Error('Incorrect password');
    }
    return user;
}
exports.loginUser = loginUser;
//# sourceMappingURL=user.service.js.map