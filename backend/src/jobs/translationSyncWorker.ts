import mongoose from 'mongoose';
import { autoTranslate } from '../utils/autoTranslate';
import { TRANSLATABLE_FIELDS } from '../utils/translatableFields';

/**
  Self-healing background worker that automatically finds and translates any items in MongoDB with missing or failed Arabic translations.
 */
export async function runTranslationSyncWorker(): Promise<void> {
  try {
    const modelsToSync: Array<{ modelName: string; fieldsKey: string; nameField: string }> = [
      { modelName: 'Service', fieldsKey: 'Service', nameField: 'name' },
      { modelName: 'Project', fieldsKey: 'Project', nameField: 'title' },
      { modelName: 'Blog', fieldsKey: 'Blog', nameField: 'title' },
      { modelName: 'Job', fieldsKey: 'Job', nameField: 'title' },
      { modelName: 'Location', fieldsKey: 'Location', nameField: 'name' },
      { modelName: 'SiteSettings', fieldsKey: 'SiteSettings', nameField: 'companyName' },
    ];

    for (const item of modelsToSync) {
      if (!mongoose.models[item.modelName]) continue;

      const Model = mongoose.models[item.modelName];
      const fields = TRANSLATABLE_FIELDS[item.fieldsKey];
      if (!fields) continue;

      const unTranslatedDocs = await Model.find({
        $or: [
          { 'translationStatus.ar': { $in: ['failed', 'pending', 'none'] } },
          { [`${item.nameField}.ar`]: '' },
          { [`${item.nameField}.ar`]: { $exists: false } },
        ],
      }).limit(5);

      if (unTranslatedDocs.length > 0) {
        console.log(`[TranslationSyncWorker] Found ${unTranslatedDocs.length} ${item.modelName}(s) requiring Arabic translation.`);

        for (const doc of unTranslatedDocs) {
          const docData = doc.toObject ? doc.toObject() : doc;
          const existingMeta = docData.translationMeta || {};

          console.log(`[TranslationSyncWorker] Auto-repairing translation for ${item.modelName} (ID: ${doc._id})...`);
          const res = await autoTranslate(docData, fields, existingMeta, docData);

          if (res.status === 'completed') {
            await Model.findByIdAndUpdate(doc._id, {
              ...res.updatedData,
              translationStatus: { ar: 'completed' },
              translationMeta: res.translationMeta,
            });
            console.log(`[TranslationSyncWorker] Successfully translated and updated ${item.modelName} (ID: ${doc._id}).`);
          } else {
            console.warn(`[TranslationSyncWorker] Repair attempt for ${item.modelName} (ID: ${doc._id}) was postponed.`);
          }
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
    }
  } catch (err) {
    console.error('[TranslationSyncWorker] Error during background sync:', err);
  }
}

/** Starts periodic background translation sync */
export function startTranslationSyncWorker(intervalMs: number = 15 * 60 * 1000): void {
  // Run 10 seconds after server startup
  setTimeout(() => {
    runTranslationSyncWorker();
  }, 10000);

  // Run periodically
  setInterval(() => {
    runTranslationSyncWorker();
  }, intervalMs);
}
