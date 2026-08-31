import dotenv from 'dotenv';
import { ITranslationService } from '../interfaces/ITranslationService';
dotenv.config();

const SYSTEM_PROMPT = `You are a professional English-to-Arabic translator specializing in corporate websites, construction, infrastructure, logistics, food trading, hospitality and international business.

Translate the provided English content into professional Modern Standard Arabic.

Rules:
1. Preserve the exact meaning.
2. Do not add information.
3. Do not remove information.
4. Do not invent facts.
5. Use professional corporate Arabic.
6. Use appropriate industry terminology.
7. Preserve numbers and measurements.
8. Preserve URLs exactly as-is.
9. Preserve email addresses exactly as-is.
10. Preserve product/brand names where appropriate (e.g., "Dazz", "Dazz Tradlink International").
11. Do not translate company names unless explicitly instructed.
12. Keep the same tone as the English content.
13. Maintain the same level of formality.
14. Keep the translated text concise when the English text is concise.
15. Do not add explanations or commentary.
16. Return ONLY the translated Arabic content — no extra text, no quotation marks, no explanations.

Context: This content belongs to Dazz Tradlink International's corporate website. The company operates across construction, ready mix concrete, food trading, logistics and hospitality in Saudi Arabia.`;

export class TranslationService implements ITranslationService {
  private async callGemini(prompt: string, isJson = false, retries = 3): Promise<string> {
    const apiKey = process.env.TRANSLATION_API_KEY || '';
    if (!apiKey) {
      throw new Error('Translation API key is not configured. Please set TRANSLATION_API_KEY in your .env file.');
    }

    const models = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-3.6-flash'];

    const generationConfig: SafeAny = {
      temperature: 0.1,
      maxOutputTokens: 4096,
    };
    if (isJson) {
      generationConfig.responseMimeType = 'application/json';
    }

    for (const modelName of models) {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: `${SYSTEM_PROMPT}\n\nTranslate the following English content:\n\n${prompt}` }
                  ]
                }
              ],
              generationConfig
            }),
            signal: AbortSignal.timeout(30000),
          });

          if (response.status === 429) {
            console.warn(`[TranslationService] Rate limit 429 hit for ${modelName}. Retrying in 15s... (Attempt ${attempt}/${retries})`);
            await new Promise(res => setTimeout(res, 15000));
            continue;
          }

          if (response.status === 503) {
            console.warn(`[TranslationService] 503 High Demand for ${modelName}. Trying next model...`);
            break; // Try next model in list
          }

          if (!response.ok) {
            const errBody = await response.text();
            console.error(`Gemini API error (${modelName}):`, errBody);
            throw new Error(`Translation service error: ${response.status}`);
          }

          const data = await response.json();
          const translation = data?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (!translation) {
            throw new Error('Translation service returned an empty response.');
          }

          return translation.trim();
        } catch (err: SafeAny) {
          if (attempt === retries) {
            console.warn(`[TranslationService] Model ${modelName} failed after ${retries} attempts. Trying next model...`);
            break;
          }
          await new Promise(res => setTimeout(res, 3000));
        }
      }
    }

    throw new Error('Translation service failed: All available models were unavailable.');
  }

  async translate(text: string): Promise<{ success: boolean; message: string; data?: { translation: string } }> {
    try {
      if (!text || !text.trim()) {
        return { success: false, message: 'Input text cannot be empty.' };
      }

      const MAX_LENGTH = 5000;
      if (text.length > MAX_LENGTH) {
        return { success: false, message: `Input text exceeds maximum length of ${MAX_LENGTH} characters.` };
      }

      const translation = await this.callGemini(text.trim());
      return { success: true, message: 'Translated', data: { translation } };
    } catch (error: SafeAny) {
      console.error(error);
      return { success: false, message: error.message || 'Translation failed' };
    }
  }

  async translateBatch(fields: Record<string, string>): Promise<{ success: boolean; message: string; data?: { translations: Record<string, string> } }> {
    try {
      const entries = Object.entries(fields).filter(([, v]) => typeof v === 'string' && v.trim());

      if (!entries.length) {
        return { success: false, message: 'No translatable content provided.' };
      }

      const CHUNK_SIZE = 25;
      const allTranslations: Record<string, string> = {};

      for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
        const chunk = entries.slice(i, i + CHUNK_SIZE);
        const fieldList = chunk
          .map(([key, value]) => `"${key}": ${JSON.stringify(value)}`)
          .join(',\n');

        const prompt = `Translate the values in this JSON object from English to Arabic. Return ONLY valid JSON with the same keys and translated Arabic values. CRITICAL: Do not include literal unescaped newlines inside string values; escape them as \\n.\n\nInput:\n{\n${fieldList}\n}`;

        const raw = await this.callGemini(prompt, true);
        const cleaned = raw.replace(/^\s*```(?:json)?\n?/i, '').replace(/\n?```\s*$/i, '').trim();

        let parsed: Record<string, string>;
        try {
          parsed = JSON.parse(cleaned);
        } catch {
          try {
            const sanitized = cleaned.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (_, p1) => {
              return '"' + p1.replace(/\r?\n/g, '\\n').replace(/\t/g, '\\t') + '"';
            });
            parsed = JSON.parse(sanitized);
          } catch (err2) {
            console.error('Failed to parse batch translation response:', cleaned);
            return { success: false, message: 'Translation service returned invalid JSON. Please try again.' };
          }
        }

        Object.assign(allTranslations, parsed);
      }

      return { success: true, message: 'Translated', data: { translations: allTranslations } };
    } catch (error: SafeAny) {
      console.error(error);
      return { success: false, message: error.message || 'Translation failed' };
    }
  }
}
