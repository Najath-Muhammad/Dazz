import { useState, useCallback } from 'react';
import { z, ZodType } from 'zod';

export function useZodValidation<T>(schema: ZodType<T>) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = useCallback((data: unknown, isAr: boolean = false): boolean => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof T, string>> = {};
        
        err.issues.forEach(issue => {
          const path = issue.path[0] as keyof T;
          if (!fieldErrors[path]) {
            // Very simple English/Arabic error mapping based on Zod error codes
            let message = issue.message;
            
            if (isAr) {
              const anyIssue = issue as any;
              if (anyIssue.code === 'invalid_type' && anyIssue.received === 'undefined') {
                message = 'هذا الحقل مطلوب';
              } else if (anyIssue.code === 'invalid_string' && anyIssue.validation === 'email') {
                message = 'بريد إلكتروني غير صالح';
              } else if (anyIssue.code === 'too_small') {
                message = `يجب أن يحتوي على الأقل على ${anyIssue.minimum} حرف`;
              } else if (anyIssue.code === 'too_big') {
                message = `يجب أن لا يتجاوز ${anyIssue.maximum} حرف`;
              } else {
                message = 'إدخال غير صالح';
              }
            }
            
            fieldErrors[path] = message;
          }
        });
        
        setErrors(fieldErrors);
      }
      return false;
    }
  }, [schema]);

  const clearErrors = useCallback(() => setErrors({}), []);

  return { errors, validate, clearErrors, setErrors };
}
