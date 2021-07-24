import { BulkUploadEntity } from '@share-source-base/core/dist/bulk-upload/bulk-upload-history.entity';
import {
  bulkUpload,
  getBulkUploadColumns,
} from '@share-source-base/core/dist/bulk-upload/bulk-upload.service';
import * as xlsx from '@share-source-base/core/dist/utils/xlsx';
import { Context } from 'koa';
import koaBody from 'koa-body';
import koaJoiRouter from 'koa-joi-router';

import { logger } from '../logger';

const router = koaJoiRouter();

router.prefix('/bulk-upload');

router.use(
  koaBody({
    multipart: true,
  }),
);

router.route({
  method: 'POST',
  path: '/:entity',
  validate: {
    type: 'multipart',
  },
  handler: async (ctx: Context) => {
    let file = ctx.request.files?.file;
    file = Array.isArray(file) ? file[0] : file;

    if (!file) {
      throw new Error('File not found');
    }

    const { path: filePath } = file;

    const bulkUploadEntity = ctx.request.params.entity as BulkUploadEntity;

    logger.info(`Bulk uploading to ${bulkUploadEntity}`);

    const data = xlsx.loadAsJSON(filePath);

    const bulkUploadHistory = await bulkUpload(bulkUploadEntity, data);

    ctx.body = bulkUploadHistory;
  },
});

router.route({
  method: 'GET',
  path: '/:entity/template',
  handler: async (ctx: Context) => {
    const entity = ctx.request.params.entity as BulkUploadEntity;

    const uploadColumns = await getBulkUploadColumns(entity);

    ctx.body = xlsx.getBuffer([uploadColumns]);
    ctx.set(
      'Content-disposition',
      `attachment; filename=${entity}__template.xlsx`,
    );
  },
});

export default router;
