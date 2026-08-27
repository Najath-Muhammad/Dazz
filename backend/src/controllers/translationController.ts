import { Request, Response } from 'express';
import { TranslationService } from '../services/TranslationService';
import { ApiResponse } from '../utils/ApiResponse';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants';

// Fields that should NEVER be translated (slugs, IDs, URLs, media metadata)
const NON_TRANSLATABLE_KEYS = new Set([
  'slug', 'url', 'publicId', 'public_id', 'id', '_id',
  'resourceType', 'format', 'width', 'height', 'duration',
  'displayOrder', 'order', 'status', 'isPublished',
  'createdAt', 'updatedAt', 'translatedAt'
]);

function isTranslatableKey(key: string): boolean {
  return !NON_TRANSLATABLE_KEYS.has(key) && !key.toLowerCase().includes('url') && !key.toLowerCase().includes('id');
}

export const translateSingle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, sourceLanguage = 'en', targetLanguage = 'ar' } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(
        ApiResponse.error('Text field is required and cannot be empty.')
      );
      return;
    }

    if (sourceLanguage !== 'en' || targetLanguage !== 'ar') {
      res.status(HTTP_STATUS.BAD_REQUEST).json(
        ApiResponse.error('Only English to Arabic translation is supported (en → ar).')
      );
      return;
    }

    const result = await TranslationService.translate(text);
    res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, result));
  } catch (error: any) {
    console.error('Translation error:', error?.message);
    const message = error?.message?.includes('API key')
      ? 'Translation service is not configured. Please contact your administrator.'
      : 'Translation failed. Please try again.';
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(message));
  }
};

export const translateBatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fields, sourceLanguage = 'en', targetLanguage = 'ar' } = req.body;

    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(
        ApiResponse.error('fields must be an object of key-value pairs.')
      );
      return;
    }

    if (sourceLanguage !== 'en' || targetLanguage !== 'ar') {
      res.status(HTTP_STATUS.BAD_REQUEST).json(
        ApiResponse.error('Only English to Arabic translation is supported (en → ar).')
      );
      return;
    }

    // Filter out non-translatable fields
    const translatableFields: Record<string, string> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (isTranslatableKey(key) && typeof value === 'string' && value.trim()) {
        translatableFields[key] = value as string;
      }
    }

    if (!Object.keys(translatableFields).length) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(
        ApiResponse.error('No translatable text fields found in the request.')
      );
      return;
    }

    const result = await TranslationService.translateBatch(translatableFields);
    res.status(HTTP_STATUS.OK).json(ApiResponse.success(RESPONSE_MESSAGES.SUCCESS, result));
  } catch (error: any) {
    console.error('Batch translation error:', error?.message);
    const message = error?.message?.includes('API key')
      ? 'Translation service is not configured. Please contact your administrator.'
      : (error?.message || 'Batch translation failed. Please try again.');
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(message));
  }
};
