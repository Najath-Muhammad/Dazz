import crypto from 'crypto';
import { TranslationService } from '../services/implementations/TranslationService';

export type TranslationStatusAr = 'pending' | 'completed' | 'failed' | 'none';

const translationService = new TranslationService();

/** MD5 hash of a string for change-detection */
function hash(text: string): string {
  return crypto.createHash('md5').update(text.trim()).digest('hex');
}

/** Safely get a nested value from an object using dot-path (no array notation) */
function getPath(obj: SafeAny, path: string): SafeAny {
  return path.split('.').reduce((cur, key) => cur?.[key], obj);
}

/** Safely set a nested value on an object using dot-path (creates missing nodes) */
function setPath(obj: SafeAny, path: string, value: SafeAny): void {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (cur[parts[i]] === undefined || cur[parts[i]] === null) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

/**
 * Parse a field path with array notation.
 * Returns: { arrayPath, itemField } when path contains '[]', otherwise null.
 * Examples:
 *   'capabilities[].title'  → { arrayPath: 'capabilities', itemField: 'title' }
 *   'a.b[].c.d'             → { arrayPath: 'a.b', itemField: 'c.d' }
 */
function parseArrayPath(fieldPath: string): { arrayPath: string; itemField: string } | null {
  const idx = fieldPath.indexOf('[]');
  if (idx === -1) return null;
  const arrayPath = fieldPath.substring(0, idx);
  const itemField = fieldPath.substring(idx + 3); // skip '[].', or just '[]'
  return { arrayPath, itemField: itemField || '' };
}

/**
 * Core function: auto-translate English → Arabic for specified fields.
 *
 * @param data          The full document data (plain object, mutable)
 * @param fieldPaths    Array of field paths from TRANSLATABLE_FIELDS config
 * @param existingMeta  Existing translationMeta hashes from the saved document
 * @returns             { updatedData, translationMeta, status }
 */
export async function autoTranslate(
  data: SafeAny,
  fieldPaths: string[],
  existingMeta: Record<string, string> = {}
): Promise<{
  updatedData: SafeAny;
  translationMeta: Record<string, string>;
  status: TranslationStatusAr;
}> {
  // 1. Build a flat map of { batchKey → englishText } for fields that NEED translation
  const toTranslate: Record<string, { path: string; index?: number; en: string; batchKey: string }> = {};
  const newMeta: Record<string, string> = { ...existingMeta };

  for (const fieldPath of fieldPaths) {
    const arrayInfo = parseArrayPath(fieldPath);

    if (arrayInfo) {
      // Array field: e.g. 'capabilities[].title'
      const arr: SafeAny[] = getPath(data, arrayInfo.arrayPath);
      if (!Array.isArray(arr)) continue;

      arr.forEach((item, index) => {
        if (!item) return;
        let enText: string;
        if (arrayInfo.itemField) {
          const localized = getPath(item, arrayInfo.itemField);
          enText = localized?.en || '';
        } else {
          // The array item IS the LocalizedString (e.g. 'responsibilities[]')
          enText = item?.en || '';
        }

        if (!enText?.trim()) return;

        const metaKey = `${fieldPath}[${index}]`;
        const enHash = hash(enText);
        const existingArText = arrayInfo.itemField
          ? getPath(item, arrayInfo.itemField)?.ar
          : item?.ar;

        // Skip if Arabic exists AND English unchanged
        if (existingArText?.trim() && existingMeta[metaKey] === enHash) return;

        const batchKey = `${fieldPath}__${index}`;
        toTranslate[batchKey] = { path: fieldPath, index, en: enText, batchKey };
        newMeta[metaKey] = enHash;
      });
    } else {
      // Simple nested field: e.g. 'title', 'hero.title'
      const localized = getPath(data, fieldPath);
      const enText: string = localized?.en || '';
      if (!enText?.trim()) continue;

      const enHash = hash(enText);
      const existingAr: string = localized?.ar || '';

      // Skip if Arabic exists AND English unchanged
      if (existingAr.trim() && existingMeta[fieldPath] === enHash) continue;

      toTranslate[fieldPath] = { path: fieldPath, en: enText, batchKey: fieldPath };
      newMeta[fieldPath] = enHash;
    }
  }

  // 2. Nothing to translate
  if (Object.keys(toTranslate).length === 0) {
    return { updatedData: data, translationMeta: newMeta, status: 'completed' };
  }

  // 3. Build flat batch payload: { batchKey → englishText }
  const batchPayload: Record<string, string> = {};
  for (const [key, info] of Object.entries(toTranslate)) {
    batchPayload[key] = info.en;
  }

  // 4. Call translation service
  let translations: Record<string, string> = {};
  try {
    const result = await translationService.translateBatch(batchPayload);
    if (!result.success || !result.data) {
      console.error('[AutoTranslate] Batch translation failed:', result.message);
      return { updatedData: data, translationMeta: existingMeta, status: 'failed' };
    }
    translations = result.data.translations;
  } catch (err) {
    console.error('[AutoTranslate] Translation error:', err);
    return { updatedData: data, translationMeta: existingMeta, status: 'failed' };
  }

  // 5. Merge Arabic translations back into data
  const updatedData = JSON.parse(JSON.stringify(data)); // deep clone

  for (const [batchKey, arabicText] of Object.entries(translations)) {
    if (!arabicText?.trim()) continue;

    const info = toTranslate[batchKey];
    if (!info) continue;

    const arrayInfo = parseArrayPath(info.path);

    if (arrayInfo && info.index !== undefined) {
      // Array item
      const arr: SafeAny[] = getPath(updatedData, arrayInfo.arrayPath);
      if (!Array.isArray(arr) || !arr[info.index]) continue;

      if (arrayInfo.itemField) {
        // Set the .ar of a nested field within the array item
        const current = getPath(arr[info.index], arrayInfo.itemField) || {};
        setPath(arr[info.index], arrayInfo.itemField, { ...current, ar: arabicText });
      } else {
        // The array item itself is LocalizedString
        arr[info.index] = { ...arr[info.index], ar: arabicText };
      }
    } else {
      // Simple field
      const current = getPath(updatedData, info.path) || {};
      setPath(updatedData, info.path, { ...current, ar: arabicText });
    }
  }

  return { updatedData, translationMeta: newMeta, status: 'completed' };
}
