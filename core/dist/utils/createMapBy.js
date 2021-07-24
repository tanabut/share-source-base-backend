"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMapBy = void 0;
function createMapBy(array, key, onCall) {
    const temp = array.reduce((acc, current) => {
        acc[current[key]] = current;
        if (onCall)
            onCall(current);
        return acc;
    }, {});
    return temp;
}
exports.createMapBy = createMapBy;
//# sourceMappingURL=createMapBy.js.map