export interface ITranslationService {
  translate(text: string): Promise<{ success: boolean; message: string; data?: { translation: string } }>;
  translateBatch(fields: Record<string, string>): Promise<{ success: boolean; message: string; data?: { translations: Record<string, string> } }>;
}
