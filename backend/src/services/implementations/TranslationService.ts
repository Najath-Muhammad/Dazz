import dotenv from 'dotenv';
import { ITranslationService } from '../interfaces/ITranslationService';
dotenv.config();

const TRANSLATION_API_KEY = process.env.TRANSLATION_API_KEY || '';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${TRANSLATION_API_KEY}`;

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
  private async callGemini(prompt: string): Promise<string> {
    if (!TRANSLATION_API_KEY) {
      throw new Error('Translation API key is not configured. Please set TRANSLATION_API_KEY in your .env file.');
    }

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `${SYSTEM_PROMPT}\\n\\nTranslate the following English content:\\n\\n${prompt}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
        }
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Gemini API error:', errBody);
      throw new Error(`Translation service error: ${response.status}`);
    }

    const data = await response.json();
    const translation = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!translation) {
      throw new Error('Translation service returned an empty response.');
    }

    return translation.trim();
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
    } catch (error: any) {
      console.error(error);
      return { success: false, message: error.message || 'Translation failed' };
    }
  }

  async translateBatch(fields: Record<string, string>): Promise<{ success: boolean; message: string; data?: { translations: Record<string, string> } }> {
    try {
      const entries = Object.entries(fields).filter(([, v]) => v && v.trim());

      if (!entries.length) {
        return { success: false, message: 'No translatable content provided.' };
      }

      const MAX_FIELDS = 30;
      if (entries.length > MAX_FIELDS) {
        return { success: false, message: `Batch translation exceeds maximum of ${MAX_FIELDS} fields.` };
      }

      const fieldList = entries
        .map(([key, value]) => `"${key}": ${JSON.stringify(value)}`)
        .join(',\\n');

      const prompt = `Translate the values in this JSON object from English to Arabic. Return ONLY valid JSON with the same keys and translated Arabic values. Do not include any explanation or markdown.\\n\\nInput:\\n{\\n${fieldList}\\n}`;

      const raw = await this.callGemini(prompt);

      const cleaned = raw.replace(/^\\s*\`\`\`(?:json)?\\n?/i, '').replace(/\\n?\`\`\`\\s*$/i, '').trim();

      let parsed: Record<string, string>;
      try {
        parsed = JSON.parse(cleaned);
      } catch {
        console.error('Failed to parse batch translation response:', cleaned);
        return { success: false, message: 'Translation service returned invalid JSON. Please try again.' };
      }

      return { success: true, message: 'Translated', data: { translations: parsed } };
    } catch (error: any) {
      console.error(error);
      return { success: false, message: error.message || 'Translation failed' };
    }
  }
}
