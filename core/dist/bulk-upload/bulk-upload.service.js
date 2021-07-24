"use strict";
// import { DEALER_USER_ACCOUNTS_BULK_UPLOAD_FIELDS } from '../user-accounts/user-account.entity';
// import { handleDealerUserAccountsBulkUpload } from '../user-accounts/user-account.service';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBulkUploadColumns = exports.bulkUpload = void 0;
const bulk_upload_history_entity_1 = require("./bulk-upload-history.entity");
const uploadEntityMap = {
// productChangFamilyReward: {
//   columns: PRODUCT_CHANG_FAMILY_REWARD_BULK_UPLOAD_FIELDS,
//   handleBulkUpload: handleProductChangFamilyRewardBulkUpload,
// },
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function bulkUpload(entity, data) {
    const bulkUpdateHistory = bulk_upload_history_entity_1.BulkUploadHistory.create({
        entity: entity,
        data,
    });
    await bulkUpdateHistory.save();
    try {
        const handleBulkUpload = uploadEntityMap[entity]?.handleBulkUpload;
        if (!handleBulkUpload)
            throw new Error(`Bulk Upload is not support for ${entity}`);
        await handleBulkUpload(data);
        await bulk_upload_history_entity_1.BulkUploadHistory.update(bulkUpdateHistory.id, {
            syncStatus: bulk_upload_history_entity_1.ProgressStatus.Success,
            lastSyncedDate: new Date(),
        });
    }
    catch (err) {
        await bulk_upload_history_entity_1.BulkUploadHistory.update(bulkUpdateHistory.id, {
            syncStatus: bulk_upload_history_entity_1.ProgressStatus.Error,
            syncError: err.message,
        });
        throw err;
    }
}
exports.bulkUpload = bulkUpload;
async function getBulkUploadColumns(entity) {
    return uploadEntityMap[entity]?.columns || [];
}
exports.getBulkUploadColumns = getBulkUploadColumns;
//# sourceMappingURL=bulk-upload.service.js.map