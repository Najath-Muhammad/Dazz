'use client';
import React, { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useZodValidation } from '@/hooks/useZodValidation';
import { FormError } from '@/components/ui/FormError';

const contactSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long")
});

interface ContactFormProps {
  isAr?: boolean;
}

export function ContactForm({ isAr = false }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { errors, validate, clearErrors } = useZodValidation(contactSchema);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear field error on change
    if (errors[e.target.name as keyof typeof errors]) {
      clearErrors();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(formData, isAr)) return;
    
    setStatus('loading');
    setErrorMessage('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';
      const res = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || (isAr ? 'فشل إرسال الرسالة' : 'Failed to send message'));
      }
      
      setStatus('success');
      setFormData({ fullName: '', email: '', phone: '', company: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || (isAr ? 'حدث خطأ غير متوقع.' : 'An unexpected error occurred.'));
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-dazz-navy p-12 rounded-lg flex flex-col items-center justify-center text-center space-y-6 h-full min-h-[400px] animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-dazz-gold/20 rounded-full flex items-center justify-center text-dazz-gold">
          <CheckCircle size={40} />
        </div>
        <div>
          <h3 className={`text-2xl font-bold text-white mb-2 font-serif ${isAr ? 'font-arabic' : ''}`}>
            {isAr ? 'تم استلام الرسالة' : 'MESSAGE RECEIVED'}
          </h3>
          <p className={`text-slate-300 ${isAr ? 'font-arabic' : ''}`}>
            {isAr 
              ? 'شكرًا لتواصلك مع داز. سنعود إليك في أقرب وقت ممكن.' 
              : 'Thank you for contacting Dazz. We\'ll get back to you as soon as possible.'}
          </p>
        </div>
        <button 
          onClick={() => setStatus('idle')}
          className={`px-6 py-3 border border-slate-600 hover:border-dazz-gold text-slate-300 hover:text-dazz-gold rounded-sm transition-colors text-sm font-bold tracking-wider ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}
        >
          {isAr ? 'إرسال رسالة أخرى' : 'Send Another Message'}
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-lg shadow-xl shadow-dazz-navy/5 border border-slate-100">
      <h3 className={`text-2xl font-bold text-slate-900 mb-6 font-serif ${isAr ? 'font-arabic text-right' : ''}`}>
        {isAr ? 'أرسل لنا استفسارًا' : 'Send Us an Inquiry'}
      </h3>
      
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md flex items-start gap-3 text-sm">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className={`space-y-6 ${isAr ? 'text-right' : ''}`}>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isAr ? 'text-right' : ''}`}>
          <div className="space-y-2">
            <label className={`block text-sm font-bold text-slate-700 tracking-wider text-xs ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
              {isAr ? 'الاسم الكامل *' : 'Full Name *'}
            </label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full border-b px-0 py-3 bg-transparent focus:outline-none transition-colors ${errors.fullName ? 'border-red-500 text-red-900 focus:border-red-500' : 'border-slate-300 focus:border-dazz-navy'}`}
              placeholder={isAr ? 'الاسم الكامل' : 'John Doe'}
            />
            <FormError message={errors.fullName} isAr={isAr} />
          </div>
          <div className="space-y-2">
            <label className={`block text-sm font-bold text-slate-700 tracking-wider text-xs ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
              {isAr ? 'البريد الإلكتروني *' : 'Email *'}
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border-b px-0 py-3 bg-transparent focus:outline-none transition-colors ${errors.email ? 'border-red-500 text-red-900 focus:border-red-500' : 'border-slate-300 focus:border-dazz-navy'}`}
              placeholder="john@example.com"
            />
            <FormError message={errors.email} isAr={isAr} />
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isAr ? 'text-right' : ''}`}>
          <div className="space-y-2">
            <label className={`block text-sm font-bold text-slate-700 tracking-wider text-xs ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
              {isAr ? 'رقم الهاتف' : 'Phone Number'}
            </label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border-b px-0 py-3 bg-transparent focus:outline-none transition-colors text-left ${errors.phone ? 'border-red-500 text-red-900 focus:border-red-500' : 'border-slate-300 focus:border-dazz-navy'}`}
              dir="ltr"
              placeholder="+966 5X XXX XXXX"
            />
            <FormError message={errors.phone} isAr={isAr} />
          </div>
          <div className="space-y-2">
            <label className={`block text-sm font-bold text-slate-700 tracking-wider text-xs ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
              {isAr ? 'الشركة' : 'Company'}
            </label>
            <input 
              type="text" 
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full border-b px-0 py-3 bg-transparent focus:outline-none transition-colors ${errors.company ? 'border-red-500 text-red-900 focus:border-red-500' : 'border-slate-300 focus:border-dazz-navy'}`}
              placeholder={isAr ? 'اسم شركتك' : 'Your Company Name'}
            />
            <FormError message={errors.company} isAr={isAr} />
          </div>
        </div>

        <div className="space-y-2">
          <label className={`block text-sm font-bold text-slate-700 tracking-wider text-xs ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
            {isAr ? 'الموضوع *' : 'Subject *'}
          </label>
          <input 
            type="text" 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full border-b px-0 py-3 bg-transparent focus:outline-none transition-colors ${errors.subject ? 'border-red-500 text-red-900 focus:border-red-500' : 'border-slate-300 focus:border-dazz-navy'}`}
            placeholder={isAr ? 'موضوع رسالتك' : 'How can we help you?'}
          />
          <FormError message={errors.subject} isAr={isAr} />
        </div>

        <div className="space-y-2">
          <label className={`block text-sm font-bold text-slate-700 tracking-wider text-xs ${isAr ? 'font-arabic uppercase-none' : 'uppercase'}`}>
            {isAr ? 'الرسالة *' : 'Message *'}
          </label>
          <textarea 
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={`w-full border-b px-0 py-3 bg-transparent focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500 text-red-900 focus:border-red-500' : 'border-slate-300 focus:border-dazz-navy'}`}
            placeholder={isAr ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
          ></textarea>
          <FormError message={errors.message} isAr={isAr} />
        </div>

        <button 
          type="submit"
          disabled={status === 'loading'}
          className={`group w-full md:w-auto mt-4 px-10 py-4 bg-dazz-navy text-white text-sm font-bold tracking-wider rounded-sm hover:bg-slate-900 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed ${isAr ? 'font-arabic uppercase-none flex-row-reverse' : 'uppercase'}`}
        >
          {status === 'loading' ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              {isAr ? 'إرسال الرسالة' : 'Send Message'}
              <ArrowRight size={18} className={`group-hover:${isAr ? '-translate-x-1' : 'translate-x-1'} transition-transform ${isAr ? 'rotate-180' : ''}`} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
