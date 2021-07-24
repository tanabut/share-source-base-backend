import { CMSCLSType, ContinuationLocalStorage } from '../cls';

/**
 * Created/UpdatedBy functions must be called using the entity's 'this' scope
 * @example
 *  cmsUpdatedBy.call(this, cls)
 */
export function cmsCreatedBy(cls: ContinuationLocalStorage<CMSCLSType>) {
  const store = cls.als.getStore();
  if (store?.user) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.createdBy = store?.user;
  }
}

export function cmsUpdatedBy(cls: ContinuationLocalStorage<CMSCLSType>) {
  const store = cls.als.getStore();
  if (store?.user) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.updatedBy = store?.user;
  }
}

export function getUserFromStore(cls: ContinuationLocalStorage<CMSCLSType>) {
  const store = cls.als.getStore();

  return store?.user;
}
