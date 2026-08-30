import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-gradient-to-r from-dazz-gold to-dazz-gold-dark text-white hover:from-dazz-gold-light hover:to-dazz-gold border border-transparent shadow-lg shadow-dazz-gold/20',
    secondary: 'bg-dazz-navy text-white hover:bg-dazz-navy-light focus:ring-dazz-navy',
    outline: 'bg-transparent text-dazz-navy border border-dazz-navy hover:bg-dazz-navy hover:text-white',
    ghost: 'bg-transparent text-dazz-navy hover:bg-slate-100',
  };
  
  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-8 text-base',
    lg: 'h-14 px-10 text-lg',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
