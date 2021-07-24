"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remapKey = void 0;
const set_1 = __importDefault(require("lodash/set"));
function remapKey(address) {
    return Object.keys(address).reduce((acc, key) => {
        set_1.default(acc, key, address[key]);
        return acc;
    }, {});
}
exports.remapKey = remapKey;
//# sourceMappingURL=remapKey.js.map