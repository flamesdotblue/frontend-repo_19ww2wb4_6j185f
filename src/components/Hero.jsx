import { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowDown, Rocket, Download } from 'lucide-react';

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
    <button ref={ref} className={`relative inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-[#E6E1EF] transition-all hover:bg-white/15 hover:shadow-[0_10px_30px_rgba(156,106,222,0.25)] ${className}`} {...props}>
      {children}
    </button>
  );
}

export default function Hero() {
  const type = useTypewriter("Hi, I'm Sihab Hasan", 65);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[90vh] pt-28 overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_20%_20%,rgba(156,106,222,0.15),transparent),radial-gradient(40%_30%_at_80%_20%,rgba(200,159,235,0.12),transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">
            <p className="text-sm uppercase tracking-widest text-[#A59DB8]">Creative Developer</p>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#E6E1EF]">
              {type}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="mt-4 text-[#A59DB8] text-base sm:text-lg">Creative Developer from AUST (Ahsanullah University of Science and Technology), based in Dhaka, Bangladesh.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <MagneticButton onClick={scrollToProjects}>
                <Rocket className="w-4 h-4" /> View My Work
              </MagneticButton>
              <MagneticButton as="a" onClick={() => window.open('#resume', '_self')} className="bg-gradient-to-r from-[#9C6ADE]/20 to-[#C89FEB]/20">
                <Download className="w-4 h-4" /> Download CV
              </MagneticButton>
            </div>
            <div className="mt-8 flex items-center gap-2 text-[#A59DB8]">
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span>Scroll to explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
