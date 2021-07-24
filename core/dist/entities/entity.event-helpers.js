"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromStore = exports.cmsUpdatedBy = exports.cmsCreatedBy = void 0;
/**
 * Created/UpdatedBy functions must be called using the entity's 'this' scope
 * @example
 *  cmsUpdatedBy.call(this, cls)
 */
function cmsCreatedBy(cls) {
    const store = cls.als.getStore();
    if (store?.user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.createdBy = store?.user;
    }
}
exports.cmsCreatedBy = cmsCreatedBy;
function cmsUpdatedBy(cls) {
    const store = cls.als.getStore();
    if (store?.user) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.updatedBy = store?.user;
    }
}
exports.cmsUpdatedBy = cmsUpdatedBy;
function getUserFromStore(cls) {
    const store = cls.als.getStore();
    return store?.user;
}
exports.getUserFromStore = getUserFromStore;
//# sourceMappingURL=entity.event-helpers.js.map