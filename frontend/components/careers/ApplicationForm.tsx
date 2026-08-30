'use client';
import React, { useState } from 'react';
import { api } from '@/lib/api';
import { Upload, X, Loader2, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';
import { useZodValidation } from '@/hooks/useZodValidation';
import { FormError } from '@/components/ui/FormError';

const applicationSchema = z.object({
  candidateName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  location: z.string().min(2, "Location is required"),
  coverLetter: z.string().optional(),
  linkedInProfile: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  portfolioUrl: z.string().url("Must be a valid URL").optional().or(z.literal(''))
});

interface ApplicationFormProps {
  lang: string;
  isAr: boolean;
  jobId?: string; // Optional: If not provided, it's a general application
}

export default function ApplicationForm({ lang, isAr, jobId }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    candidateName: '',
    email: '',
    phone: '',
    location: '',
    coverLetter: '',
    linkedInProfile: '',
    portfolioUrl: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { errors, validate, clearErrors } = useZodValidation(applicationSchema);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      // Check file type (PDF, DOC, DOCX)
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(selected.type)) {
        setError(isAr ? 'يرجى رفع ملف بصيغة PDF أو DOC.' : 'Please upload a PDF or DOC file.');
        return;
      }
      // Check file size (max 5MB)
      if (selected.size > 5 * 1024 * 1024) {
        setError(isAr ? 'حجم الملف يجب أن يكون أقل من 5 ميجابايت.' : 'File size must be less than 5MB.');
        return;
      }
      setError('');
      setFile(selected);
    }
  };

  const uploadFileToCloudinary = async (fileToUpload: File) => {
    const fd = new FormData();
    fd.append('file', fileToUpload);
    fd.append('folder', 'dazz/resumes');
    fd.append('resourceType', 'image');
    
    const res: SafeAny = await api.post('/careers/upload-resume', fd);
    return res; // api.post unwraps the response data, so res is the media object
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(formData, isAr)) return;
    
    setError('');
    
    if (!file) {
      setError(isAr ? 'يرجى إرفاق السيرة الذاتية.' : 'Please attach your resume.');
      return;
    }

    setIsSubmitting(true);
    try {
      setIsUploading(true);
      const uploadedResume = await uploadFileToCloudinary(file);
      setIsUploading(false);

      const payload: SafeAny = {
        candidateName: formData.candidateName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        resume: uploadedResume
      };
      
      if (jobId) payload.jobId = jobId;
      if (formData.coverLetter) payload.coverLetter = formData.coverLetter;
      if (formData.linkedInProfile) payload.linkedInProfile = formData.linkedInProfile;
      if (formData.portfolioUrl) payload.portfolioUrl = formData.portfolioUrl;

      await api.post('/careers/apply', payload);
      setSuccess(true);
      setFormData({ candidateName: '', email: '', phone: '', location: '', coverLetter: '', linkedInProfile: '', portfolioUrl: '' });
      setFile(null);
    } catch (err: SafeAny) {
      setError(err.response?.data?.message || err.message || (isAr ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.'));
    } finally {
      setIsUploading(false);
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 p-8 rounded-xl border border-green-200 text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className={`text-2xl font-bold text-green-800 ${isAr ? 'font-arabic' : ''}`}>
          {isAr ? 'تم استلام طلبك بنجاح!' : 'Application Received!'}
        </h3>
        <p className={`text-green-700 ${isAr ? 'font-arabic' : ''}`}>
          {isAr ? 'شكراً لاهتمامك بالانضمام إلى فريقنا. سنقوم بمراجعة طلبك والرد عليك قريباً.' : 'Thank you for your interest in joining our team. We will review your application and get back to you soon.'}
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className={`mt-6 text-sm font-bold text-green-700 hover:text-green-900 underline ${isAr ? 'font-arabic' : ''}`}
        >
          {isAr ? 'تقديم طلب آخر' : 'Submit another application'}
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${isAr ? 'text-right' : ''}`}>
        <div className="space-y-2">
          <label className={`block text-[11px] font-bold text-slate-500 tracking-widest ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'الاسم الكامل *' : 'Full Name *'}</label>
          <input 
            type="text" 
            value={formData.candidateName}
            onChange={e => {
              setFormData({...formData, candidateName: e.target.value});
              if(errors.candidateName) clearErrors();
            }}
            className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 outline-none transition-colors ${errors.candidateName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-dazz-gold focus:ring-1 focus:ring-dazz-gold'}`}
          />
          <FormError message={errors.candidateName} isAr={isAr} />
        </div>
        <div className="space-y-2">
          <label className={`block text-[11px] font-bold text-slate-500 tracking-widest ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={e => {
              setFormData({...formData, email: e.target.value});
              if(errors.email) clearErrors();
            }}
            className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 outline-none transition-colors ${errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-dazz-gold focus:ring-1 focus:ring-dazz-gold'}`}
          />
          <FormError message={errors.email} isAr={isAr} />
        </div>
        <div className="space-y-2">
          <label className={`block text-[11px] font-bold text-slate-500 tracking-widest ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'رقم الهاتف *' : 'Phone Number *'}</label>
          <input 
            type="tel" 
            value={formData.phone}
            onChange={e => {
              setFormData({...formData, phone: e.target.value});
              if(errors.phone) clearErrors();
            }}
            className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 outline-none transition-colors ${errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-dazz-gold focus:ring-1 focus:ring-dazz-gold'}`}
          />
          <FormError message={errors.phone} isAr={isAr} />
        </div>
        <div className="space-y-2">
          <label className={`block text-[11px] font-bold text-slate-500 tracking-widest ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'الموقع/المدينة *' : 'Location / City *'}</label>
          <input 
            type="text" 
            value={formData.location}
            onChange={e => {
              setFormData({...formData, location: e.target.value});
              if(errors.location) clearErrors();
            }}
            className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 outline-none transition-colors ${errors.location ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-dazz-gold focus:ring-1 focus:ring-dazz-gold'}`}
          />
          <FormError message={errors.location} isAr={isAr} />
        </div>
      </div>

      <div className={`space-y-2 ${isAr ? 'text-right' : ''}`}>
        <label className={`block text-[11px] font-bold text-slate-500 tracking-widest ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'رسالة تعريفية (اختياري)' : 'Cover Letter (Optional)'}</label>
        <textarea 
          rows={4}
          value={formData.coverLetter}
          onChange={e => setFormData({...formData, coverLetter: e.target.value})}
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 outline-none focus:border-dazz-gold focus:ring-1 focus:ring-dazz-gold transition-colors resize-none"
        />
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${isAr ? 'text-right' : ''}`}>
        <div className="space-y-2">
          <label className={`block text-[11px] font-bold text-slate-500 tracking-widest ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'رابط لينكد إن (اختياري)' : 'LinkedIn Profile (Optional)'}</label>
          <input 
            type="url" 
            value={formData.linkedInProfile}
            onChange={e => {
              setFormData({...formData, linkedInProfile: e.target.value});
              if(errors.linkedInProfile) clearErrors();
            }}
            placeholder="https://linkedin.com/in/..."
            className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 outline-none transition-colors ${errors.linkedInProfile ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-dazz-gold focus:ring-1 focus:ring-dazz-gold'}`}
          />
          <FormError message={errors.linkedInProfile} isAr={isAr} />
        </div>
        <div className="space-y-2">
          <label className={`block text-[11px] font-bold text-slate-500 tracking-widest ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>{isAr ? 'رابط محفظة الأعمال (اختياري)' : 'Portfolio URL (Optional)'}</label>
          <input 
            type="url" 
            value={formData.portfolioUrl}
            onChange={e => {
              setFormData({...formData, portfolioUrl: e.target.value});
              if(errors.portfolioUrl) clearErrors();
            }}
            placeholder="https://..."
            className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 outline-none transition-colors ${errors.portfolioUrl ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-dazz-gold focus:ring-1 focus:ring-dazz-gold'}`}
          />
          <FormError message={errors.portfolioUrl} isAr={isAr} />
        </div>
      </div>

      <div className="space-y-2">
        <label className={`block text-[11px] font-bold text-slate-500 tracking-widest ${isAr ? 'font-arabic uppercase-none text-right' : 'uppercase'}`}>{isAr ? 'السيرة الذاتية *' : 'Resume / CV *'}</label>
        
        {!file ? (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer bg-slate-50/50 hover:bg-slate-50 hover:border-dazz-gold/50 transition-all duration-300">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload size={24} className="text-slate-400 mb-2" />
              <p className={`text-sm text-slate-600 ${isAr ? 'font-arabic' : ''}`}><span className="font-bold text-dazz-navy">{isAr ? 'اضغط للرفع' : 'Click to upload'}</span> {isAr ? 'أو اسحب الملف هنا' : 'or drag and drop'}</p>
              <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX (MAX. 5MB)</p>
            </div>
            <input type="file" className="hidden" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileChange} />
          </label>
        ) : (
          <div className="flex items-center justify-between p-4 bg-white border border-dazz-gold/50 rounded-lg">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 bg-dazz-gold/10 rounded-lg flex items-center justify-center text-dazz-gold flex-shrink-0">
                <Upload size={18} />
              </div>
              <div className="truncate">
                <p className="text-sm font-bold text-slate-900 truncate">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setFile(null)}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex justify-center items-center gap-2 py-4 px-6 border border-transparent rounded-lg shadow-sm text-base font-bold text-dazz-navy bg-dazz-gold hover:bg-white hover:text-dazz-navy transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dazz-gold disabled:opacity-50 ${isAr ? 'font-arabic' : ''}`}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            {isUploading ? (isAr ? 'جاري رفع الملف...' : 'Uploading File...') : (isAr ? 'جاري الإرسال...' : 'Submitting...')}
          </>
        ) : (
          isAr ? 'إرسال الطلب' : 'Submit Application'
        )}
      </button>
    </form>
  );
}
