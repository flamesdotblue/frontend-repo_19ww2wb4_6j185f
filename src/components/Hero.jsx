import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowDown, Rocket, Download, Sparkles } from 'lucide-react';

function useTypewriter(text, speed = 80) {
  const [out, setOut] = useState('');
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setOut((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

function MagneticButton({ children, className = '', ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    };
    const onLeave = () => {
      el.style.transform = 'translate(0px, 0px)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return (
    <button
      ref={ref}
      className={`relative inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-[#E6E1EF] transition-all hover:bg-white/15 hover:shadow-[0_10px_30px_rgba(156,106,222,0.25)] ${className}`}
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity [background:radial-gradient(200px_circle_at_var(--x)_var(--y),rgba(200,159,235,0.25),transparent_60%)] group-hover:opacity-100" />
    </button>
  );
}

export default function Hero() {
  const type = useTypewriter("Hi, I'm Sihab Hasan", 60);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Track mouse for subtle glow on buttons container
  const containerRef = useRef(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty('--x', `${x}px`);
      el.style.setProperty('--y', `${y}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 overflow-hidden">
      {/* Spline background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/myxXfbNiwnbTpGFp/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient vignettes that don't block interaction */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_20%_20%,rgba(156,106,222,0.12),transparent),radial-gradient(40%_30%_at_80%_20%,rgba(200,159,235,0.10),transparent)]" />
        <div className="absolute -bottom-1/3 left-1/2 h-[60vh] w-[90vw] -translate-x-1/2 rounded-[100%] blur-3xl opacity-30" style={{ background: 'linear-gradient(45deg, rgba(156,106,222,0.25), rgba(200,159,235,0.25))' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Glass intro card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#A59DB8] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C89FEB]" /> THE FRAGRANCE OF CREATIVITY
            </p>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#E6E1EF]">
              {type}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="mt-4 text-[#A59DB8] text-base sm:text-lg">
              Creative Developer crafting elegant, performant experiences with a love for minimalist, glass-inspired aesthetics.
            </p>
            <div ref={containerRef} className="group mt-6 flex flex-wrap items-center gap-4">
              <MagneticButton onClick={scrollToProjects}>
                <Rocket className="w-4 h-4" /> View My Work
              </MagneticButton>
              <MagneticButton onClick={() => window.open('#resume', '_self')} className="bg-gradient-to-r from-[#9C6ADE]/20 to-[#C89FEB]/20">
                <Download className="w-4 h-4" /> Download CV
              </MagneticButton>
            </div>
            <div className="mt-8 flex items-center gap-2 text-[#A59DB8]">
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span>Scroll to explore</span>
            </div>
          </div>

          {/* Right side: minimal floating caption card to complement light Spline bg */}
          <div className="hidden lg:block">
            <div className="ml-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
              <p className="text-sm text-[#E6E1EF] font-medium">Minimal, modern, and product-inspired.</p>
              <p className="mt-2 text-sm text-[#A59DB8]">
                The hero showcases two glass perfume bottles with an iridescent sheen — a metaphor for polished, fragrant ideas in motion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
