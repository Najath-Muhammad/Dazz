'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { BilingualField } from '@/components/admin/BilingualField';
import DynamicListInput from '@/components/admin/DynamicListInput';
import { Sparkles, Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: { en: '', ar: '' },
    slug: '',
    department: '',
    location: '',
    type: 'Full-Time',
    description: { en: '', ar: '' },
    responsibilities: [] as { en: string; ar: string }[],
    requirements: [] as { en: string; ar: string }[],
    qualifications: [] as { en: string; ar: string }[],
    experience: { en: '', ar: '' },
    skills: [] as { en: string; ar: string }[],
    salary: '',
    benefits: '',
    deadline: '',
    status: 'DRAFT',
    publishedAt: ''
  });

  const handleLocalizedChange = (field: string, lang: 'en' | 'ar', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...(prev as SafeAny)[field], [lang]: value }
    }));
  };

  const handleTranslateAll = async () => {
    setTranslating(true);
    try {
      const textsToTranslate = [
        { key: 'title', text: formData.title.en },
        { key: 'description', text: formData.description.en },
        { key: 'experience', text: formData.experience.en },
        ...formData.responsibilities.map((r, i) => ({ key: `res_${i}`, text: r.en })),
        ...formData.requirements.map((r, i) => ({ key: `req_${i}`, text: r.en })),
        ...formData.qualifications.map((r, i) => ({ key: `qual_${i}`, text: r.en })),
        ...formData.skills.map((r, i) => ({ key: `skill_${i}`, text: r.en })),
      ].filter(t => t.text.trim() !== '');

      if (textsToTranslate.length === 0) return;

      const fieldsToTranslate = textsToTranslate.reduce((acc, t) => {
        acc[t.key] = t.text;
        return acc;
      }, {} as Record<string, string>);

      const res: SafeAny = await api.post('/admin/translate/batch', {
        fields: fieldsToTranslate
      });

      const translations = res.translations;
      const newFormData = { ...formData };
      
      if (formData.title.en.trim()) { newFormData.title.ar = translations['title'] || ''; }
      if (formData.description.en.trim()) { newFormData.description.ar = translations['description'] || ''; }
      if (formData.experience.en.trim()) { newFormData.experience.ar = translations['experience'] || ''; }
      
      newFormData.responsibilities = formData.responsibilities.map((r, i) => r.en.trim() ? { ...r, ar: translations[`res_${i}`] || '' } : r);
      newFormData.requirements = formData.requirements.map((r, i) => r.en.trim() ? { ...r, ar: translations[`req_${i}`] || '' } : r);
      newFormData.qualifications = formData.qualifications.map((r, i) => r.en.trim() ? { ...r, ar: translations[`qual_${i}`] || '' } : r);
      newFormData.skills = formData.skills.map((r, i) => r.en.trim() ? { ...r, ar: translations[`skill_${i}`] || '' } : r);

      setFormData(newFormData);
    } catch (err) {
      console.error('Translation failed', err);
      alert('Translation failed. Please try again.');
    } finally {
      setTranslating(false);
    }
  };

  const generateSlug = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleEnChange = (val: string) => {
    handleLocalizedChange('title', 'en', val);
    if (!formData.slug) {
      setFormData(prev => ({ ...prev, slug: generateSlug(val) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const payload: SafeAny = { ...formData };
      if (payload.status === 'PUBLISHED' && !payload.publishedAt) {
        payload.publishedAt = new Date().toISOString();
      }
      if (!payload.deadline) {
        delete payload.deadline;
      }
      if (!payload.publishedAt) {
        delete payload.publishedAt;
      }

      await api.post('/jobs', payload);
      router.push('/admin/careers');
    } catch (err: SafeAny) {
      setError(err.response?.data?.message || err.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/careers" className="p-2 bg-white text-slate-500 hover:text-dazz-navy rounded-full border border-slate-200 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Post New Job</h1>
            <p className="text-slate-500 mt-1">Create a new career opportunity</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleTranslateAll}
            disabled={translating}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 font-semibold rounded-md hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            {translating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            Auto-Translate Arabic
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-dazz-navy text-white font-semibold rounded-md hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Job
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Basic Information</h2>
            
            <BilingualField
              label="Job Title"
              nameEn="titleEn"
              nameAr="titleAr"
              valueEn={formData.title.en}
              valueAr={formData.title.ar}
              onChangeEn={handleTitleEnChange}
              onChangeAr={(v) => handleLocalizedChange('title', 'ar', v)}
              required
            />
            
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-700">URL Slug <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.slug}
                onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase()})}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-dazz-navy font-mono"
                required
              />
              <p className="text-xs text-slate-500 mt-1">Unique identifier for the URL (e.g., senior-project-engineer)</p>
            </div>

            <BilingualField
              label="Job Description (Short Summary)"
              nameEn="descEn"
              nameAr="descAr"
              valueEn={formData.description.en}
              valueAr={formData.description.ar}
              onChangeEn={(v) => handleLocalizedChange('description', 'en', v)}
              onChangeAr={(v) => handleLocalizedChange('description', 'ar', v)}
              type="textarea"
              required
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Job Details</h2>
            
            <DynamicListInput
              label="Responsibilities"
              items={formData.responsibilities}
              onChange={(items) => setFormData(prev => ({...prev, responsibilities: items}))}
              placeholderEn="e.g. Manage project timelines and deliverables"
              placeholderAr="إدارة الجداول الزمنية للمشروع والمخرجات"
            />

            <DynamicListInput
              label="Requirements"
              items={formData.requirements}
              onChange={(items) => setFormData(prev => ({...prev, requirements: items}))}
              placeholderEn="e.g. Minimum 5 years of experience in construction"
              placeholderAr="خبرة لا تقل عن 5 سنوات في مجال البناء"
            />

            <DynamicListInput
              label="Qualifications (Optional)"
              items={formData.qualifications}
              onChange={(items) => setFormData(prev => ({...prev, qualifications: items}))}
            />

            <DynamicListInput
              label="Skills (Optional)"
              items={formData.skills}
              onChange={(items) => setFormData(prev => ({...prev, skills: items}))}
              placeholderEn="e.g. AutoCAD, Project Management"
              placeholderAr="أوتوكاد، إدارة المشاريع"
            />

            <BilingualField
              label="Experience Level (Optional)"
              nameEn="expEn"
              nameAr="expAr"
              valueEn={formData.experience.en}
              valueAr={formData.experience.ar}
              onChangeEn={(v) => handleLocalizedChange('experience', 'en', v)}
              onChangeAr={(v) => handleLocalizedChange('experience', 'ar', v)}
              placeholder="e.g. 5-7 Years"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-5">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Classification</h2>
            
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-700">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-dazz-navy bg-slate-50"
              >
                <option value="DRAFT">Draft (Hidden)</option>
                <option value="PUBLISHED">Published (Visible)</option>
                <option value="CLOSED">Closed (Hidden, No Applications)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-700">Department <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.department}
                onChange={e => setFormData({...formData, department: e.target.value})}
                placeholder="e.g. Engineering"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-dazz-navy"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-700">Location <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="e.g. Riyadh, SA"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-dazz-navy"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-700">Employment Type <span className="text-red-500">*</span></label>
              <select
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-dazz-navy"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-5">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Additional Info (Optional)</h2>
            
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-700">Salary Range</label>
              <input
                type="text"
                value={formData.salary}
                onChange={e => setFormData({...formData, salary: e.target.value})}
                placeholder="e.g. Competitive"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-dazz-navy"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-700">Benefits Summary</label>
              <input
                type="text"
                value={formData.benefits}
                onChange={e => setFormData({...formData, benefits: e.target.value})}
                placeholder="e.g. Health Insurance, Annual Flight"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-dazz-navy"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-slate-700">Application Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={e => setFormData({...formData, deadline: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-dazz-navy"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
