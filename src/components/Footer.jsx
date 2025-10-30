import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="border-t border-white/10 bg-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#A59DB8]">
        <p className="text-sm">© {new Date().getFullYear()} Sihab Hasan. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <a aria-label="GitHub" href="https://github.com/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"><Github className="w-4 h-4" /></a>
          <a aria-label="LinkedIn" href="https://linkedin.com/" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"><Linkedin className="w-4 h-4" /></a>
          <a aria-label="Email" href="mailto:sihab@example.com" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10"><Mail className="w-4 h-4" /></a>
          <button aria-label="Back to top" onClick={backToTop} className="p-2 rounded-full bg-gradient-to-r from-[#9C6ADE] to-[#C89FEB] text-[#0E0817] border border-white/10"><ArrowUp className="w-4 h-4" /></button>
        </div>
      </div>
    </footer>
  );
}
