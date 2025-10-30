import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Sections from './components/Sections';
import Footer from './components/Footer';

export default function App() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    // Load Playfair Display for headings
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth');
    const ids = ['hero', 'about', 'skills', 'projects', 'resume', 'contact'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.5, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-[#A59DB8] relative" style={{ background: 'linear-gradient(180deg, #0E0817 0%, #1A0F2C 100%)' }}>
      <style>{`
        .font-serif { font-family: 'Playfair Display', ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif; }
        .animate-in { transition: all 700ms cubic-bezier(0.22, 1, 0.36, 1); }
        .glow-ring { box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 10px 30px rgba(156,106,222,0.15); }
      `}</style>
      {/* Subtle background ornaments */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[20%] h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, rgba(156,106,222,0.35) 0%, transparent 60%)' }} />
        <div className="absolute right-[-10%] top-[10%] h-80 w-80 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, rgba(200,159,235,0.28) 0%, transparent 60%)' }} />
      </div>

      <Header active={active} />
      <main>
        <Hero />
        <Sections />
      </main>
      <Footer />
    </div>
  );
}
