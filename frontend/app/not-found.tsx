import Link from 'next/link';
import { Hexagon, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden selection:bg-dazz-gold selection:text-slate-950">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)', backgroundSize: '100px 100px' }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[20vh] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-[20vh] bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <div className="relative mb-12 flex items-center justify-center">
          <Hexagon size={180} strokeWidth={0.5} className="text-dazz-gold animate-[spin_20s_linear_infinite] opacity-20" />
          <Hexagon size={220} strokeWidth={0.5} className="text-white absolute animate-[spin_30s_linear_infinite_reverse] opacity-10" />
          <h1 className="absolute text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter">
            404
          </h1>
        </div>
        
        <div className="w-16 h-[2px] bg-dazz-gold mb-8" />
        
        <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest mb-3">
          Page Not Found
        </h2>
        <h2 className="text-xl md:text-2xl font-bold text-slate-300 mb-8" dir="rtl">
          الصفحة غير موجودة
        </h2>
        
        <p className="text-slate-400 font-light max-w-md mx-auto mb-12 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link 
          href="/" 
          className="group flex items-center gap-3 px-8 py-4 bg-white text-slate-950 font-bold uppercase tracking-widest text-sm hover:bg-dazz-gold transition-all duration-300"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Return Home / العودة للرئيسية</span>
        </Link>
      </div>
    </div>
  );
}
