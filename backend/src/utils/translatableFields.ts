/**
 * Central registry of translatable field paths per model.
 *
 * Syntax:
 *   - 'field'           → top-level LocalizedString
 *   - 'a.b'             → nested LocalizedString
 *   - 'a[].b'           → LocalizedString inside an array
 *   - 'a.b[].c'         → LocalizedString inside a nested array
 *
 * NEVER include: slugs, URLs, email, phone, media objects, coords, IDs, dates.
 */

export const TRANSLATABLE_FIELDS: Record<string, string[]> = {
  Blog: [
    'title',
    'excerpt',
    'content',
    'category',
    'metaTitle',
    'metaDescription',
  ],

  Job: [
    'title',
    'description',
    'responsibilities[]',
    'requirements[]',
    'qualifications[]',
    'experience',
    'skills[]',
  ],

  Service: [
    'name',
    'shortDescription',
    'hero.eyebrow',
    'hero.title',
    'hero.subtitle',
    'hero.description',
    'hero.ctaPrimary.text',
    'hero.ctaSecondary.text',
    'introduction.sectionLabel',
    'introduction.title',
    'introduction.mainDescription',
    'introduction.paragraphs[]',
    'capabilities[].title',
    'capabilities[].description',
    'solutions[].title',
    'solutions[].description',
    'solutions[].ctaText',
    'categories[].title',
    'categories[].description',
    'applications[].title',
    'applications[].description',
    'process[].title',
    'process[].description',
    'equipment[].name',
    'equipment[].description',
    'equipment[].specification',
    'whyChooseUs[].title',
    'whyChooseUs[].description',
    'highlights[].title',
    'highlights[].description',
    'gallery[].caption',
    'cta.title',
    'cta.description',
    'cta.buttonText',
    'seo.title',
    'seo.description',
  ],

  Project: [
    'title',
    'category',
    'description',
    'location',
    'metaTitle',
    'metaDescription',
  ],

  Location: [
    'name',
    'type',
    'country',
    'city',
    'address',
    'description',
  ],

  SiteSettings: [
    'companyName',
    'address',
    'workingHours',
    'careers.hero.title',
    'careers.hero.subtitle',
    'careers.whyWorkWithUs.title',
    'careers.whyWorkWithUs.benefits[].title',
    'careers.whyWorkWithUs.benefits[].description',
    'careers.culture.title',
    'careers.culture.description',
    'contactPage.hero.title',
    'contactPage.hero.description',
    'contactPage.contactHeading',
    'contactPage.cta.heading',
    'contactPage.cta.description',
    'contactPage.cta.buttonText',
    'aboutUsPage.missionVision.mission.title',
    'aboutUsPage.missionVision.mission.description',
    'aboutUsPage.missionVision.vision.title',
    'aboutUsPage.missionVision.vision.description',
  ],
};
