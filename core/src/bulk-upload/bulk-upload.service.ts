// import { DEALER_USER_ACCOUNTS_BULK_UPLOAD_FIELDS } from '../user-accounts/user-account.entity';
// import { handleDealerUserAccountsBulkUpload } from '../user-accounts/user-account.service';

import {
  BulkUploadHistory,
  BulkUploadEntity,
  ProgressStatus,
} from './bulk-upload-history.entity';

interface BulkUploadEntityMap {
  [key: string]: {
    columns: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleBulkUpload: (data: any[]) => Promise<void>;
  };
}

const uploadEntityMap: BulkUploadEntityMap = {
  // productChangFamilyReward: {
  //   columns: PRODUCT_CHANG_FAMILY_REWARD_BULK_UPLOAD_FIELDS,
  //   handleBulkUpload: handleProductChangFamilyRewardBulkUpload,
  // },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function bulkUpload(entity: string, data: any) {
  const bulkUpdateHistory = BulkUploadHistory.create({
    entity: entity as BulkUploadEntity,
    data,
  });

  await bulkUpdateHistory.save();

  try {
    const handleBulkUpload = uploadEntityMap[entity]?.handleBulkUpload;

    if (!handleBulkUpload)
      throw new Error(`Bulk Upload is not support for ${entity}`);

    await handleBulkUpload(data);

    await BulkUploadHistory.update(bulkUpdateHistory.id, {
      syncStatus: ProgressStatus.Success,
      lastSyncedDate: new Date(),
    });
  } catch (err) {
    await BulkUploadHistory.update(bulkUpdateHistory.id, {
      syncStatus: ProgressStatus.Error,
      syncError: err.message,
    });

    throw err;
  }
}

export async function getBulkUploadColumns(entity: string) {
  return uploadEntityMap[entity]?.columns || [];
}
