'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { api, apiClient } from '@/lib/api';
import { MediaUploader } from '@/components/admin/MediaUploader';
import { BilingualField } from '@/components/admin/BilingualField';
import { useTranslation } from '@/hooks/useTranslation';

type LocalizedField = { en: string; ar: string };
type Capability = { icon: string; title: LocalizedField; description: LocalizedField };
type Application = { icon: string; label: LocalizedField };
type Stat = { icon: string; value: LocalizedField; sub: LocalizedField };

const empty = (): LocalizedField => ({ en: '', ar: '' });

function makeCapability(): Capability {
  return { icon: '✅', title: empty(), description: empty() };
}
function makeApplication(): Application {
  return { icon: '🔹', label: empty() };
}
function makeStat(): Stat {
  return { icon: '📊', value: empty(), sub: empty() };
}

export default function AdminNewServicePage() {
  const router = useRouter();
  const { translateBatch, isTranslating } = useTranslation();

  const [form, setForm] = useState({
    title: empty(),
    slug: '',
    tagline: empty(),
    description: [empty()],
    heroImage: null as any,
    aboutImage: null as any,
    capabilities: [makeCapability()],
    applications: [makeApplication()],
    stats: [makeStat()],
    commitmentQuote: empty(),
    isPublished: true,
    order: 0,
    metaTitle: empty(),
    metaDescription: empty(),
  });

  const [saving, setSaving] = useState(false);
  const [batchProgress, setBatchProgress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ─── Localized field helpers ───────────────────────────────────────────────
  const setLoc = (path: string, lang: 'en' | 'ar', value: string) => {
    setForm(prev => {
      const next = { ...prev } as any;
      const parts = path.split('.');
      let obj = next;
      for (let i = 0; i < parts.length - 1; i++) {
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]][lang] = value;
      return { ...next };
    });
    // If English changed, mark status (future enhancement)
  };

  const setLocArr = (arrPath: string, index: number, fieldPath: string, lang: 'en' | 'ar', value: string) => {
    setForm(prev => {
      const next = { ...prev } as any;
      next[arrPath][index][fieldPath][lang] = value;
      return { ...next };
    });
  };

  const autoSlug = (en: string) =>
    en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  // ─── Generate All Arabic ───────────────────────────────────────────────────
  const handleGenerateAll = async () => {
    const fields: Record<string, string> = {};

    if (form.title.en) fields['title'] = form.title.en;
    if (form.tagline.en) fields['tagline'] = form.tagline.en;
    if (form.commitmentQuote.en) fields['commitmentQuote'] = form.commitmentQuote.en;
    if (form.metaTitle.en) fields['metaTitle'] = form.metaTitle.en;
    if (form.metaDescription.en) fields['metaDescription'] = form.metaDescription.en;

    form.description.forEach((d, i) => {
      if (d.en) fields[`desc_${i}`] = d.en;
    });
    form.capabilities.forEach((c, i) => {
      if (c.title.en) fields[`cap_title_${i}`] = c.title.en;
      if (c.description.en) fields[`cap_desc_${i}`] = c.description.en;
    });
    form.applications.forEach((a, i) => {
      if (a.label.en) fields[`app_label_${i}`] = a.label.en;
    });
    form.stats.forEach((s, i) => {
      if (s.value.en) fields[`stat_val_${i}`] = s.value.en;
      if (s.sub.en) fields[`stat_sub_${i}`] = s.sub.en;
    });

    setBatchProgress(`Translating ${Object.keys(fields).length} fields...`);
    const translations = await translateBatch(fields);
    setBatchProgress('');

    if (!translations) return;

    setForm(prev => {
      const next = { ...prev };

      if (translations['title']) next.title = { ...next.title, ar: translations['title'] };
      if (translations['tagline']) next.tagline = { ...next.tagline, ar: translations['tagline'] };
      if (translations['commitmentQuote']) next.commitmentQuote = { ...next.commitmentQuote, ar: translations['commitmentQuote'] };
      if (translations['metaTitle']) next.metaTitle = { ...next.metaTitle, ar: translations['metaTitle'] };
      if (translations['metaDescription']) next.metaDescription = { ...next.metaDescription, ar: translations['metaDescription'] };

      next.description = prev.description.map((d, i) => ({
        ...d,
        ar: translations[`desc_${i}`] ?? d.ar
      }));
      next.capabilities = prev.capabilities.map((c, i) => ({
        ...c,
        title: { ...c.title, ar: translations[`cap_title_${i}`] ?? c.title.ar },
        description: { ...c.description, ar: translations[`cap_desc_${i}`] ?? c.description.ar },
      }));
      next.applications = prev.applications.map((a, i) => ({
        ...a,
        label: { ...a.label, ar: translations[`app_label_${i}`] ?? a.label.ar },
      }));
      next.stats = prev.stats.map((s, i) => ({
        ...s,
        value: { ...s.value, ar: translations[`stat_val_${i}`] ?? s.value.ar },
        sub: { ...s.sub, ar: translations[`stat_sub_${i}`] ?? s.sub.ar },
      }));

      return next;
    });

    setSuccess('✓ Arabic translation completed.');
    setTimeout(() => setSuccess(''), 4000);
  };

  // ─── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await api.post('/admin/services', { ...form, isPublished: publish });
      router.push('/admin/services');
    } catch (err: any) {
      setError(err.message || 'Failed to create service.');
      setSaving(false);
    }
  };

  const sectionClass = 'bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-sm';
  const labelClass = 'block text-xs font-bold text-slate-500 tracking-widest uppercase mb-1';

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/services" className="text-slate-400 hover:text-slate-700 text-sm">← Back</Link>
        <h1 className="text-2xl font-bold text-slate-900">Create Service Page</h1>
      </div>

      {error && <div className="mb-4 bg-red-50 text-red-600 p-4 rounded-md text-sm">{error}</div>}
      {success && <div className="mb-4 bg-green-50 text-green-700 p-4 rounded-md text-sm">{success}</div>}

      {/* Generate All Arabic button — top-level */}
      <div className="mb-6 flex items-center justify-between border border-dashed border-dazz-gold/40 rounded-lg px-5 py-4 bg-amber-50/30">
        <div>
          <p className="text-sm font-bold text-slate-700">✨ Auto-Translate All Fields</p>
          <p className="text-xs text-slate-400 mt-0.5">Fills all Arabic fields from the English content you've entered.</p>
          {batchProgress && <p className="text-xs text-dazz-navy font-semibold mt-1 animate-pulse">{batchProgress}</p>}
        </div>
        <button
          type="button"
          onClick={handleGenerateAll}
          disabled={isTranslating}
          className="px-5 py-2 bg-dazz-navy text-white rounded-md text-sm font-bold hover:bg-dazz-navy/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isTranslating ? '⏳ Translating...' : '✨ Generate All Arabic'}
        </button>
      </div>

      <form className="space-y-8">

        {/* ── Basic Info ── */}
        <div className={sectionClass}>
          <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">Basic Information</h2>

          <BilingualField
            label="Service Title *"
            nameEn="title_en" nameAr="title_ar"
            valueEn={form.title.en} valueAr={form.title.ar}
            onChangeEn={(v) => { setLoc('title', 'en', v); setForm(p => ({ ...p, slug: autoSlug(v) })); }}
            onChangeAr={(v) => setLoc('title', 'ar', v)}
            required
            placeholder="e.g., Ready Mix Concrete"
          />

          <div>
            <label className={labelClass}>URL Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm(p => ({ ...p, slug: e.target.value }))}
              className="w-full border border-slate-300 rounded-md px-4 py-2 text-sm font-mono"
              placeholder="ready-mix-concrete"
            />
          </div>

          <BilingualField
            label="Tagline / Subtitle"
            nameEn="tagline_en" nameAr="tagline_ar"
            valueEn={form.tagline.en} valueAr={form.tagline.ar}
            onChangeEn={(v) => setLoc('tagline', 'en', v)}
            onChangeAr={(v) => setLoc('tagline', 'ar', v)}
            placeholder="e.g., Quality Concrete. Reliable Supply. Every Project."
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublished"
              checked={form.isPublished}
              onChange={(e) => setForm(p => ({ ...p, isPublished: e.target.checked }))}
              className="w-4 h-4"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-slate-700">Published</label>
          </div>
        </div>

        {/* ── Media ── */}
        <div className={sectionClass}>
          <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">Images</h2>
          <MediaUploader
            label="Hero Background Image"
            folder="dazz/services"
            value={form.heroImage}
            onChange={(m) => setForm(p => ({ ...p, heroImage: m }))}
          />
          <MediaUploader
            label="About / Section Image"
            folder="dazz/services"
            value={form.aboutImage}
            onChange={(m) => setForm(p => ({ ...p, aboutImage: m }))}
          />
        </div>

        {/* ── Description ── */}
        <div className={sectionClass}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-base font-bold text-slate-800">Description Paragraphs</h2>
            <button
              type="button"
              onClick={() => setForm(p => ({ ...p, description: [...p.description, empty()] }))}
              className="text-xs font-bold text-dazz-navy hover:text-dazz-gold"
            >
              + Add Paragraph
            </button>
          </div>
          {form.description.map((d, i) => (
            <div key={i} className="border border-slate-100 rounded-md p-4 relative">
              {form.description.length > 1 && (
                <button type="button" onClick={() => setForm(p => ({ ...p, description: p.description.filter((_, j) => j !== i) }))}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs font-bold">✕</button>
              )}
              <BilingualField
                label={`Paragraph ${i + 1}`}
                nameEn={`desc_en_${i}`} nameAr={`desc_ar_${i}`}
                valueEn={d.en} valueAr={d.ar}
                type="textarea" rows={3}
                onChangeEn={(v) => { const n = [...form.description]; n[i] = { ...n[i], en: v }; setForm(p => ({ ...p, description: n })); }}
                onChangeAr={(v) => { const n = [...form.description]; n[i] = { ...n[i], ar: v }; setForm(p => ({ ...p, description: n })); }}
              />
            </div>
          ))}
        </div>

        {/* ── Capabilities ── */}
        <div className={sectionClass}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-base font-bold text-slate-800">Capabilities</h2>
            <button type="button" onClick={() => setForm(p => ({ ...p, capabilities: [...p.capabilities, makeCapability()] }))}
              className="text-xs font-bold text-dazz-navy hover:text-dazz-gold">+ Add Capability</button>
          </div>
          {form.capabilities.map((cap, i) => (
            <div key={i} className="border border-slate-100 rounded-md p-4 space-y-4 relative">
              {form.capabilities.length > 1 && (
                <button type="button" onClick={() => setForm(p => ({ ...p, capabilities: p.capabilities.filter((_, j) => j !== i) }))}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs font-bold">✕</button>
              )}
              <div>
                <label className={labelClass}>Icon (Emoji)</label>
                <input type="text" value={cap.icon}
                  onChange={(e) => { const n = [...form.capabilities]; n[i] = { ...n[i], icon: e.target.value }; setForm(p => ({ ...p, capabilities: n })); }}
                  className="w-24 border border-slate-300 rounded-md px-3 py-2 text-sm text-center"
                />
              </div>
              <BilingualField
                label="Capability Title"
                nameEn={`cap_title_en_${i}`} nameAr={`cap_title_ar_${i}`}
                valueEn={cap.title.en} valueAr={cap.title.ar}
                onChangeEn={(v) => setLocArr('capabilities', i, 'title', 'en', v)}
                onChangeAr={(v) => setLocArr('capabilities', i, 'title', 'ar', v)}
              />
              <BilingualField
                label="Capability Description"
                nameEn={`cap_desc_en_${i}`} nameAr={`cap_desc_ar_${i}`}
                valueEn={cap.description.en} valueAr={cap.description.ar}
                type="textarea" rows={2}
                onChangeEn={(v) => setLocArr('capabilities', i, 'description', 'en', v)}
                onChangeAr={(v) => setLocArr('capabilities', i, 'description', 'ar', v)}
              />
            </div>
          ))}
        </div>

        {/* ── Applications ── */}
        <div className={sectionClass}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-base font-bold text-slate-800">Applications</h2>
            <button type="button" onClick={() => setForm(p => ({ ...p, applications: [...p.applications, makeApplication()] }))}
              className="text-xs font-bold text-dazz-navy hover:text-dazz-gold">+ Add Application</button>
          </div>
          {form.applications.map((app, i) => (
            <div key={i} className="border border-slate-100 rounded-md p-4 space-y-3 relative">
              {form.applications.length > 1 && (
                <button type="button" onClick={() => setForm(p => ({ ...p, applications: p.applications.filter((_, j) => j !== i) }))}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs font-bold">✕</button>
              )}
              <div>
                <label className={labelClass}>Icon (Emoji)</label>
                <input type="text" value={app.icon}
                  onChange={(e) => { const n = [...form.applications]; n[i] = { ...n[i], icon: e.target.value }; setForm(p => ({ ...p, applications: n })); }}
                  className="w-24 border border-slate-300 rounded-md px-3 py-2 text-sm text-center"
                />
              </div>
              <BilingualField
                label="Application Label"
                nameEn={`app_label_en_${i}`} nameAr={`app_label_ar_${i}`}
                valueEn={app.label.en} valueAr={app.label.ar}
                onChangeEn={(v) => { const n = [...form.applications]; n[i] = { ...n[i], label: { ...n[i].label, en: v } }; setForm(p => ({ ...p, applications: n })); }}
                onChangeAr={(v) => { const n = [...form.applications]; n[i] = { ...n[i], label: { ...n[i].label, ar: v } }; setForm(p => ({ ...p, applications: n })); }}
              />
            </div>
          ))}
        </div>

        {/* ── Stats ── */}
        <div className={sectionClass}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-base font-bold text-slate-800">Stats / Highlights</h2>
            <button type="button" onClick={() => setForm(p => ({ ...p, stats: [...p.stats, makeStat()] }))}
              className="text-xs font-bold text-dazz-navy hover:text-dazz-gold">+ Add Stat</button>
          </div>
          {form.stats.map((stat, i) => (
            <div key={i} className="border border-slate-100 rounded-md p-4 space-y-3 relative">
              {form.stats.length > 1 && (
                <button type="button" onClick={() => setForm(p => ({ ...p, stats: p.stats.filter((_, j) => j !== i) }))}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs font-bold">✕</button>
              )}
              <div>
                <label className={labelClass}>Icon (Emoji)</label>
                <input type="text" value={stat.icon}
                  onChange={(e) => { const n = [...form.stats]; n[i] = { ...n[i], icon: e.target.value }; setForm(p => ({ ...p, stats: n })); }}
                  className="w-24 border border-slate-300 rounded-md px-3 py-2 text-sm text-center"
                />
              </div>
              <BilingualField
                label="Value (e.g. QUALITY)"
                nameEn={`stat_val_en_${i}`} nameAr={`stat_val_ar_${i}`}
                valueEn={stat.value.en} valueAr={stat.value.ar}
                onChangeEn={(v) => { const n = [...form.stats]; n[i] = { ...n[i], value: { ...n[i].value, en: v } }; setForm(p => ({ ...p, stats: n })); }}
                onChangeAr={(v) => { const n = [...form.stats]; n[i] = { ...n[i], value: { ...n[i].value, ar: v } }; setForm(p => ({ ...p, stats: n })); }}
              />
              <BilingualField
                label="Sub-label (e.g. Consistent Production)"
                nameEn={`stat_sub_en_${i}`} nameAr={`stat_sub_ar_${i}`}
                valueEn={stat.sub.en} valueAr={stat.sub.ar}
                onChangeEn={(v) => { const n = [...form.stats]; n[i] = { ...n[i], sub: { ...n[i].sub, en: v } }; setForm(p => ({ ...p, stats: n })); }}
                onChangeAr={(v) => { const n = [...form.stats]; n[i] = { ...n[i], sub: { ...n[i].sub, ar: v } }; setForm(p => ({ ...p, stats: n })); }}
              />
            </div>
          ))}
        </div>

        {/* ── Commitment Quote ── */}
        <div className={sectionClass}>
          <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">Commitment Quote</h2>
          <BilingualField
            label="Quote"
            nameEn="quote_en" nameAr="quote_ar"
            valueEn={form.commitmentQuote.en} valueAr={form.commitmentQuote.ar}
            type="textarea" rows={2}
            onChangeEn={(v) => setLoc('commitmentQuote', 'en', v)}
            onChangeAr={(v) => setLoc('commitmentQuote', 'ar', v)}
          />
        </div>

        {/* ── SEO ── */}
        <div className={sectionClass}>
          <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">SEO</h2>
          <BilingualField
            label="Meta Title"
            nameEn="meta_title_en" nameAr="meta_title_ar"
            valueEn={form.metaTitle.en} valueAr={form.metaTitle.ar}
            onChangeEn={(v) => setLoc('metaTitle', 'en', v)}
            onChangeAr={(v) => setLoc('metaTitle', 'ar', v)}
          />
          <BilingualField
            label="Meta Description"
            nameEn="meta_desc_en" nameAr="meta_desc_ar"
            valueEn={form.metaDescription.en} valueAr={form.metaDescription.ar}
            type="textarea" rows={2}
            onChangeEn={(v) => setLoc('metaDescription', 'en', v)}
            onChangeAr={(v) => setLoc('metaDescription', 'ar', v)}
          />
        </div>

        {/* ── Actions ── */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" disabled={saving}
            onClick={(e) => handleSubmit(e as any, false)}>
            {saving ? 'Saving...' : 'Save as Draft'}
          </Button>
          <Button type="button" variant="primary" disabled={saving}
            onClick={(e) => handleSubmit(e as any, true)}>
            {saving ? 'Publishing...' : 'Publish Service'}
          </Button>
        </div>

      </form>
    </div>
  );
}
