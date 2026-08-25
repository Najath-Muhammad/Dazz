'use client';
import React from 'react';
import { Button } from './Button';

interface ErrorStateProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorState({ error, reset }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] p-8 text-center bg-red-50/50 rounded-lg">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-500">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-3">Something went wrong!</h2>
      <p className="text-slate-600 mb-6 max-w-md mx-auto">
        {error.message || 'We encountered an unexpected error while processing your request.'}
      </p>
      <Button variant="primary" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
