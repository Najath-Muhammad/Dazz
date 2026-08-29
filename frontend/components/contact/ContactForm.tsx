'use client';
import React, { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          <h3 className="text-2xl font-bold text-white mb-2 font-serif">
            {isAr ? 'تم استلام الرسالة' : 'MESSAGE RECEIVED'}
          </h3>
          <p className="text-slate-300">
            {isAr 
              ? 'شكرًا لتواصلك مع داز. سنعود إليك في أقرب وقت ممكن.' 
              : 'Thank you for contacting Dazz. We\'ll get back to you as soon as possible.'}
          </p>
        </div>
        <button 
          onClick={() => setStatus('idle')}
          className="px-6 py-3 border border-slate-600 hover:border-dazz-gold text-slate-300 hover:text-dazz-gold rounded-sm transition-colors text-sm font-bold uppercase tracking-wider"
        >
          {isAr ? 'إرسال رسالة أخرى' : 'Send Another Message'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-lg shadow-xl shadow-dazz-navy/5 border border-slate-100">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
        {isAr ? 'أرسل لنا استفسارًا' : 'Send Us an Inquiry'}
      </h3>
      
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md flex items-start gap-3 text-sm">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider text-xs">
              {isAr ? 'الاسم الكامل *' : 'Full Name *'}
            </label>
            <input 
              type="text" 
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border-b border-slate-300 px-0 py-3 bg-transparent focus:border-dazz-navy focus:outline-none transition-colors"
              placeholder={isAr ? 'الاسم الكامل' : 'John Doe'}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider text-xs">
              {isAr ? 'البريد الإلكتروني *' : 'Email *'}
            </label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-slate-300 px-0 py-3 bg-transparent focus:border-dazz-navy focus:outline-none transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider text-xs">
              {isAr ? 'رقم الهاتف' : 'Phone Number'}
            </label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-b border-slate-300 px-0 py-3 bg-transparent focus:border-dazz-navy focus:outline-none transition-colors text-left"
              dir="ltr"
              placeholder="+966 5X XXX XXXX"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider text-xs">
              {isAr ? 'الشركة' : 'Company'}
            </label>
            <input 
              type="text" 
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border-b border-slate-300 px-0 py-3 bg-transparent focus:border-dazz-navy focus:outline-none transition-colors"
              placeholder={isAr ? 'اسم شركتك' : 'Your Company Name'}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider text-xs">
            {isAr ? 'الموضوع *' : 'Subject *'}
          </label>
          <input 
            type="text" 
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full border-b border-slate-300 px-0 py-3 bg-transparent focus:border-dazz-navy focus:outline-none transition-colors"
            placeholder={isAr ? 'موضوع رسالتك' : 'How can we help you?'}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider text-xs">
            {isAr ? 'الرسالة *' : 'Message *'}
          </label>
          <textarea 
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full border-b border-slate-300 px-0 py-3 bg-transparent focus:border-dazz-navy focus:outline-none transition-colors resize-none"
            placeholder={isAr ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
          ></textarea>
        </div>

        <button 
          type="submit"
          disabled={status === 'loading'}
          className="group w-full md:w-auto mt-4 px-10 py-4 bg-dazz-navy text-white text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-slate-900 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              {isAr ? 'إرسال الرسالة' : 'Send Message'}
              <ArrowRight size={18} className={`group-hover:${isAr ? '-translate-x-1' : 'translate-x-1'} transition-transform`} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
