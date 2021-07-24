"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bulk_upload_service_1 = require("@share-source-base/core/dist/bulk-upload/bulk-upload.service");
const xlsx = __importStar(require("@share-source-base/core/dist/utils/xlsx"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_joi_router_1 = __importDefault(require("koa-joi-router"));
const logger_1 = require("../logger");
const router = koa_joi_router_1.default();
router.prefix('/bulk-upload');
router.use(koa_body_1.default({
    multipart: true,
}));
router.route({
    method: 'POST',
    path: '/:entity',
    validate: {
        type: 'multipart',
    },
    handler: async (ctx) => {
        let file = ctx.request.files?.file;
        file = Array.isArray(file) ? file[0] : file;
        if (!file) {
            throw new Error('File not found');
        }
        const { path: filePath } = file;
        const bulkUploadEntity = ctx.request.params.entity;
        logger_1.logger.info(`Bulk uploading to ${bulkUploadEntity}`);
        const data = xlsx.loadAsJSON(filePath);
        const bulkUploadHistory = await bulk_upload_service_1.bulkUpload(bulkUploadEntity, data);
        ctx.body = bulkUploadHistory;
    },
});
router.route({
    method: 'GET',
    path: '/:entity/template',
    handler: async (ctx) => {
        const entity = ctx.request.params.entity;
        const uploadColumns = await bulk_upload_service_1.getBulkUploadColumns(entity);
        ctx.body = xlsx.getBuffer([uploadColumns]);
        ctx.set('Content-disposition', `attachment; filename=${entity}__template.xlsx`);
    },
});
exports.default = router;
//# sourceMappingURL=bulk-upload.routes.js.map