"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNullOrWhere = void 0;
const typeorm_1 = require("typeorm");
function isNullOrWhere({ field, value, valueAlias, }) {
    return new typeorm_1.Brackets(qb => {
        qb.where(`${field} IS NULL`);
        qb.orWhere(`${field} = :${valueAlias}`, {
            [valueAlias]: value,
        });
    });
}
exports.isNullOrWhere = isNullOrWhere;
//# sourceMappingURL=querybuilder.js.map