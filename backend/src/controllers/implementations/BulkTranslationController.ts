import { Request, Response } from 'express';
import { HTTP_STATUS } from '../../utils/constants';
import { handleError } from '../../utils/errorHandler';
import { autoTranslate } from '../../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../../utils/translatableFields';

import Blog from '../../models/Blog';
import Job from '../../models/Job';
import Project from '../../models/Project';
import Location from '../../models/Location';
import Service from '../../models/Service';

const MODEL_MAP: Record<string, { model: SafeAny; fields: string[] }> = {
  Blog: { model: Blog, fields: TRANSLATABLE_FIELDS.Blog },
  Job: { model: Job, fields: TRANSLATABLE_FIELDS.Job },
  Project: { model: Project, fields: TRANSLATABLE_FIELDS.Project },
  Location: { model: Location, fields: TRANSLATABLE_FIELDS.Location },
  Service: { model: Service, fields: TRANSLATABLE_FIELDS.Service },
};

export class BulkTranslationController {
  /**
   * GET /api/admin/translate/status
   * Returns counts per model: completed, pending, failed, none
   */
  getStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const results: Record<string, SafeAny> = {};

      for (const [modelName, { model }] of Object.entries(MODEL_MAP)) {
        const total = await model.countDocuments({});
        const completed = await model.countDocuments({ 'translationStatus.ar': 'completed' });
        const failed = await model.countDocuments({ 'translationStatus.ar': 'failed' });
        const pending = await model.countDocuments({ 'translationStatus.ar': 'pending' });
        const missing = total - completed - failed - pending;
        results[modelName] = { total, completed, failed, pending, missing };
      }

      res.status(HTTP_STATUS.OK).json({ success: true, data: results });
    } catch (error) {
      handleError(res, error);
    }
  };

  /**
   * POST /api/admin/translate/bulk-migrate
   * Body: { model?: string } — omit model to run all
   * Translates all records with missing/failed Arabic
   */
  bulkMigrate = async (req: Request, res: Response): Promise<void> => {
    const { model: modelFilter } = req.body;
    const modelsToProcess = modelFilter
      ? { [modelFilter]: MODEL_MAP[modelFilter] }
      : MODEL_MAP;

    if (modelFilter && !MODEL_MAP[modelFilter]) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: `Unknown model: ${modelFilter}` });
      return;
    }

    const report: Record<string, { processed: number; succeeded: number; failed: number; skipped: number }> = {};

    for (const [modelName, { model, fields }] of Object.entries(modelsToProcess)) {
      report[modelName] = { processed: 0, succeeded: 0, failed: 0, skipped: 0 };

      // Find records that need translation: status is not 'completed'
      const records = await model.find({
        $or: [
          { 'translationStatus.ar': { $ne: 'completed' } },
          { 'translationStatus.ar': { $exists: false } },
        ]
      }).lean();

      for (const record of records) {
        report[modelName].processed++;
        const existingMeta = record.translationMeta || {};

        try {
          const { updatedData, translationMeta, status } = await autoTranslate(record, fields, existingMeta);

          if (status === 'completed') {
            await model.findByIdAndUpdate(record._id, {
              ...updatedData,
              translationStatus: { ar: 'completed' },
              translationMeta,
            });
            report[modelName].succeeded++;
          } else {
            await model.findByIdAndUpdate(record._id, { 'translationStatus.ar': 'failed' });
            report[modelName].failed++;
          }
        } catch (err) {
          console.error(`[BulkMigrate] Error translating ${modelName} ${record._id}:`, err);
          await model.findByIdAndUpdate(record._id, { 'translationStatus.ar': 'failed' });
          report[modelName].failed++;
        }
      }
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Bulk migration completed',
      data: report,
    });
  };

  /**
   * POST /api/admin/translate/regenerate
   * Body: { model: string, id: string }
   * Force-retranslate a specific record, ignoring change detection
   */
  regenerate = async (req: Request, res: Response): Promise<void> => {
    try {
      const { model: modelName, id } = req.body;

      if (!modelName || !id) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'model and id are required' });
        return;
      }

      const entry = MODEL_MAP[modelName];
      if (!entry) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: `Unknown model: ${modelName}` });
        return;
      }

      const record = await entry.model.findById(id).lean();
      if (!record) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Record not found' });
        return;
      }

      // Force regeneration: pass empty meta so all fields are re-translated
      const { updatedData, translationMeta, status } = await autoTranslate(record, entry.fields, {});

      await entry.model.findByIdAndUpdate(id, {
        ...updatedData,
        translationStatus: { ar: status },
        translationMeta,
      });

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: `Arabic regenerated (${status}) for ${modelName} ${id}`,
        data: { status },
      });
    } catch (error) {
      handleError(res, error);
    }
  };
}
