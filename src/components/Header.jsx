import { useEffect, useState } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export default function Header({ active }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNav = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-2 text-[#A59DB8] shadow-lg">
          <button onClick={() => handleNav('hero')} className="text-xl font-bold tracking-wide bg-gradient-to-r from-[#9C6ADE] to-[#C89FEB] bg-clip-text text-transparent">Sihab</button>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`relative px-2 py-1 transition-colors ${active === item.id ? 'text-[#E6E1EF]' : 'hover:text-[#E6E1EF]'}`}
              >
                <span>{item.label}</span>
                {active === item.id && (
                  <span className="absolute -bottom-2 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#9C6ADE] to-[#C89FEB]" />
                )}
              </button>
            ))}
            <div className="ml-2 flex items-center gap-3">
              <a aria-label="GitHub" href="https://github.com/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                <Github className="w-4 h-4" />
              </a>
              <a aria-label="LinkedIn" href="https://linkedin.com/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                <Linkedin className="w-4 h-4" />
              </a>
              <a aria-label="Email" href="mailto:sihab@example.com" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden inline-flex items-center justify-center rounded-xl p-2 border border-white/10 bg-white/5 backdrop-blur-xl">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="lg:hidden mx-4 mt-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 text-[#A59DB8]">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full text-left rounded-xl px-3 py-2 transition-colors ${active === item.id ? 'bg-white/10 text-[#E6E1EF]' : 'hover:bg-white/10 hover:text-[#E6E1EF]'}`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <a aria-label="GitHub" href="https://github.com/" target="_blank" rel="noreferrer" className="flex-1 text-center rounded-xl border border-white/10 bg-white/5 py-2 hover:bg-white/10">GitHub</a>
              <a aria-label="LinkedIn" href="https://linkedin.com/" target="_blank" rel="noreferrer" className="flex-1 text-center rounded-xl border border-white/10 bg-white/5 py-2 hover:bg-white/10">LinkedIn</a>
              <a aria-label="Email" href="mailto:sihab@example.com" className="flex-1 text-center rounded-xl border border-white/10 bg-white/5 py-2 hover:bg-white/10">Email</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
