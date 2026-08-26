export interface LocalizedString {
  en: string;
  ar: string;
}

export const LocalizedStringSchema = {
  en: { type: String, required: true },
  ar: { type: String, required: true }
};
