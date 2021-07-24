import { CMSCLSType, ContinuationLocalStorage } from '../cls';
/**
 * Created/UpdatedBy functions must be called using the entity's 'this' scope
 * @example
 *  cmsUpdatedBy.call(this, cls)
 */
export declare function cmsCreatedBy(cls: ContinuationLocalStorage<CMSCLSType>): void;
export declare function cmsUpdatedBy(cls: ContinuationLocalStorage<CMSCLSType>): void;
export declare function getUserFromStore(cls: ContinuationLocalStorage<CMSCLSType>): Partial<import("../user/user.types").UserAttributes> | undefined;
//# sourceMappingURL=entity.event-helpers.d.ts.map