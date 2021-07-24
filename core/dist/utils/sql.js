"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRunInTransactionHelper = exports.generateConflictSetValueString = void 0;
const typeorm_1 = require("typeorm");
function generateConflictSetValueString(attrs) {
    return attrs.reduce((setQuery, curr, index) => {
        let newSetQuery = setQuery;
        newSetQuery += `"${curr}" = excluded."${curr}"`;
        if (index !== attrs.length - 1) {
            newSetQuery += ', ';
        }
        return newSetQuery;
    }, '');
}
exports.generateConflictSetValueString = generateConflictSetValueString;
function createRunInTransactionHelper(entity, initFn) {
    return (fn) => {
        return typeorm_1.getConnection().manager.transaction(async (tManager) => {
            const repo = tManager.getRepository(entity);
            await initFn(tManager, repo);
            await fn(repo);
            tManager.queryRunner?.rollbackTransaction();
        });
    };
}
exports.createRunInTransactionHelper = createRunInTransactionHelper;
//# sourceMappingURL=sql.js.map