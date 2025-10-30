import { useEffect, useState } from 'react';
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

export default function Hero() {
  const type = useTypewriter("Hi, I'm Sihab Hasan", 60);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 overflow-hidden">
      {/* Spline scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Background ornaments (non-blocking) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(circle at center, rgba(156,106,222,0.25), transparent 60%)' }} />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-40" style={{ background: 'radial-gradient(circle at center, rgba(200,159,235,0.22), transparent 60%)' }} />
        <div className="absolute left-1/2 top-1/3 h-24 w-24 -translate-x-1/2 rounded-full blur-2xl opacity-30" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 60%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight text-[#E6E1EF]">
            {type}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="mt-3 text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#9C6ADE] to-[#C89FEB]">
            Creative Developer from AUST
          </p>
          <p className="mt-2 text-[#A59DB8] text-base sm:text-lg">
            I craft elegant, performant experiences with a focus on clarity and usability.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button onClick={scrollToProjects} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-[#E6E1EF] transition-colors hover:bg-white/15">
              <Rocket className="w-4 h-4" /> View My Work
            </button>
            <button onClick={() => window.open('#resume', '_self')} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-[#E6E1EF] transition-colors hover:bg-white/15">
              <Download className="w-4 h-4" /> Download CV
            </button>
          </div>
          <div className="mt-8 flex items-center gap-2 text-[#A59DB8]">
            <ArrowDown className="w-4 h-4 animate-bounce" />
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
