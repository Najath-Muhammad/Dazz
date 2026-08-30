'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { authService } from '@/services/authService';
import { z } from 'zod';
import { useZodValidation } from '@/hooks/useZodValidation';
import { FormError } from '@/components/ui/FormError';

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required')
});

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { errors, validate, clearErrors } = useZodValidation(loginSchema);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate({ email, password })) return;
    
    setError('');
    setLoading(true);

    try {
      const data = await authService.login({ email, password });
      
      if (data.token) {
        // Set cookie for Next.js middleware and client usage
        Cookies.set('admin_token', data.token, { expires: 1 }); // 1 day
        // Redirect to admin dashboard
        router.push('/admin');
      }
    } catch (err: SafeAny) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="relative h-20 w-64">
            <Image 
              src="/images/logo-transparent.png" 
              alt="DAZZ Tradlink" 
              fill
              priority
              sizes="250px"
              className="object-contain"
            />
          </div>
        </div>
        <p className="text-sm text-slate-400">Sign in to access the control panel</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-700">
          <form className="space-y-6" onSubmit={handleLogin} noValidate>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-sm text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email address</label>
              <input
                type="email"
                className={`w-full bg-slate-900 border rounded-sm px-4 py-2 text-white focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) clearErrors();
                }}
              />
              <FormError message={errors.email} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <input
                type="password"
                className={`w-full bg-slate-900 border rounded-sm px-4 py-2 text-white focus:outline-none transition-colors ${errors.password ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) clearErrors();
                }}
              />
              <FormError message={errors.password} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 text-slate-950 font-semibold py-2 px-4 rounded-sm hover:bg-amber-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}