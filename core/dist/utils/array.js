"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueMap = void 0;
const get_1 = __importDefault(require("lodash/get"));
function uniqueMap(arr, keys) {
    const uMap = {};
    return arr.reduce((acc, curr) => {
        const key = keys.reduce((s, k) => `${s}__${get_1.default(curr, k)}`, '');
        if (uMap[key] !== undefined) {
            acc[uMap[key]] = curr;
            return acc;
        }
        acc.push(curr);
        uMap[key] = acc.length - 1;
        return acc;
    }, []);
}
exports.uniqueMap = uniqueMap;
//# sourceMappingURL=array.js.map