import { useEffect, useMemo, useRef, useState } from 'react';
import { Github, ExternalLink, Download, MapPin, Mail, Phone, Code, Server, Wrench, GraduationCap, Briefcase, ArrowUpRight } from 'lucide-react';

function useInViewAnimation(selectors) {
  useEffect(() => {
    const els = document.querySelectorAll(selectors);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('animate-in');
            e.target.classList.remove('opacity-0', 'translate-y-6');
          }
        });
      },
      { threshold: 0.2 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selectors]);
}

function ProgressBar({ label, value, icon: Icon }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let start = 0;
    const id = setInterval(() => {
      start += 2;
      setPct((p) => Math.min(value, p + 2));
      if (start >= value) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [value]);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-[#A59DB8]">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" />} <span>{label}</span>
        </div>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-[#9C6ADE] to-[#C89FEB] transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function TechBadge({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-[#A59DB8]">{children}</span>
  );
}

function ProjectCard({ project, onMouseMove, onMouseLeave }) {
  return (
    <div
      onMouseMove={(e) => onMouseMove(e)}
      onMouseLeave={onMouseLeave}
      className="group relative rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-xl shadow-xl transition-transform will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="overflow-hidden rounded-2xl">
        <img src={project.image} alt={project.title} loading="lazy" className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-[#E6E1EF]">{project.title}</h3>
        <p className="mt-1 text-sm text-[#A59DB8]">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <TechBadge key={t}>{t}</TechBadge>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-[#E6E1EF] hover:bg-white/15">
            <ExternalLink className="w-4 h-4" /> Demo
          </a>
          <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-[#E6E1EF] hover:bg-white/15">
            <Github className="w-4 h-4" /> Code
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mx) var(--my), rgba(156,106,222,0.15), transparent 40%)' }} />
    </div>
  );
}

export default function Sections() {
  useInViewAnimation('[data-animate]');
  const cardsRef = useRef([]);
  const [filter, setFilter] = useState('All');

  const projects = useMemo(() => [
    {
      title: 'Portfolio Revamp',
      description: 'A polished developer portfolio with glass morphism and interactive 3D elements.',
      tech: ['React', 'Tailwind', 'Spline'],
      tags: ['Frontend', 'React'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
      demo: '#',
      github: '#',
    },
    {
      title: 'Realtime Chat',
      description: 'A realtime chat application using WebSockets with authentication & presence.',
      tech: ['JavaScript', 'Socket.IO', 'Node'],
      tags: ['Backend', 'Fullstack'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
      demo: '#',
      github: '#',
    },
    {
      title: 'E-commerce UI Kit',
      description: 'Responsive UI component library tailored for modern e-commerce experiences.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      tags: ['Frontend'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
      demo: '#',
      github: '#',
    },
    {
      title: 'Data Dashboard',
      description: 'Analytics dashboard with dynamic charts and role-based access control.',
      tech: ['React', 'D3', 'Firebase'],
      tags: ['Frontend', 'React'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxEYXRhJTIwRGFzaGJvYXJkfGVufDB8MHx8fDE3NjE4MjAwODR8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
      demo: '#',
      github: '#',
    },
  ], []);

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.tags.includes(filter) || p.tech.includes(filter));
  }, [projects, filter]);

  const handleCardMove = (e, idx) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
    const rx = ((y - r.height / 2) / r.height) * -10;
    const ry = ((x - r.width / 2) / r.width) * 10;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleCardLeave = (idx) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert('Thanks! Your message has been sent.');
        form.reset();
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please try again later.');
    }
  };

  return (
    <div className="relative">
      {/* About */}
      <section id="about" data-animate className="opacity-0 translate-y-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="mx-auto h-40 w-40 sm:h-56 sm:w-56 rounded-full border-2 border-white/10 p-1 bg-white/5 backdrop-blur-xl">
            <img src="https://i.pravatar.cc/300?img=15" alt="Sihab Hasan" className="h-full w-full rounded-full object-cover" loading="lazy" />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <h2 className="font-serif text-3xl text-[#E6E1EF]">About Me</h2>
            <p className="mt-3 text-[#A59DB8]">
              I'm Sihab Hasan, a Creative Developer from Dhaka, Bangladesh. I craft immersive, performant web experiences with a focus on elegant interactions, accessibility, and clean code. Proud graduate of AUST (Ahsanullah University of Science and Technology).
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#A59DB8]">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Dhaka, Bangladesh</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> sihab@example.com</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> +880 1XXX-XXXXXX</div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <a href="#resume" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-[#E6E1EF] hover:bg-white/15">
                <Download className="w-4 h-4" /> Download CV
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-[#E6E1EF] hover:bg-white/15">
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" data-animate className="opacity-0 translate-y-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <h2 className="font-serif text-3xl text-[#E6E1EF]">Skills</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="mb-4 flex items-center gap-2 font-medium text-[#E6E1EF]"><Code className="w-4 h-4" /> Frontend</h3>
            <div className="space-y-4">
              <ProgressBar label="HTML" value={95} />
              <ProgressBar label="CSS" value={92} />
              <ProgressBar label="JavaScript" value={88} />
              <ProgressBar label="React" value={85} />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="mb-4 flex items-center gap-2 font-medium text-[#E6E1EF]"><Server className="w-4 h-4" /> Backend</h3>
            <div className="space-y-4">
              <ProgressBar label="Firebase" value={80} />
              <ProgressBar label="Node.js" value={70} />
              <ProgressBar label="C++" value={75} />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="mb-4 flex items-center gap-2 font-medium text-[#E6E1EF]"><Wrench className="w-4 h-4" /> Tools</h3>
            <div className="space-y-4">
              <ProgressBar label="Git" value={85} />
              <ProgressBar label="Figma" value={70} />
              <ProgressBar label="Vite/Tailwind" value={88} />
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" data-animate className="opacity-0 translate-y-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="font-serif text-3xl text-[#E6E1EF]">Projects</h2>
          <div className="flex flex-wrap gap-2">
            {['All', 'Frontend', 'Backend', 'React', 'JavaScript'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`rounded-full border px-3 py-1 text-sm ${filter === f ? 'border-[#C89FEB] bg-white/15 text-[#E6E1EF]' : 'border-white/10 bg-white/5 text-[#A59DB8] hover:bg-white/10'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p, i) => (
            <div key={p.title} ref={(el) => (cardsRef.current[i] = el)}>
              <ProjectCard
                project={p}
                onMouseMove={(e) => handleCardMove(e, i)}
                onMouseLeave={() => handleCardLeave(i)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Resume */}
      <section id="resume" data-animate className="opacity-0 translate-y-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <h2 className="font-serif text-3xl text-[#E6E1EF]">Resume</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="mb-4 flex items-center gap-2 font-medium text-[#E6E1EF]"><GraduationCap className="w-4 h-4" /> Education</h3>
            <details className="group rounded-2xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer list-none font-medium text-[#E6E1EF]">B.Sc. in Computer Science & Engineering — AUST</summary>
              <p className="mt-2 text-sm text-[#A59DB8]">Focused on algorithms, data structures, and human-computer interaction. Participated in programming contests and tech clubs.</p>
            </details>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="mb-4 flex items-center gap-2 font-medium text-[#E6E1EF]"><Briefcase className="w-4 h-4" /> Experience</h3>
            <details className="group rounded-2xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer list-none font-medium text-[#E6E1EF]">Creative Developer — Freelance</summary>
              <p className="mt-2 text-sm text-[#A59DB8]">Built interactive interfaces, optimized performance, and collaborated with designers to craft delightful micro-interactions.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" data-animate className="opacity-0 translate-y-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="font-serif text-3xl text-[#E6E1EF]">Get In Touch</h2>
            <p className="mt-2 text-[#A59DB8]">Have a project in mind or just want to say hi? Drop a message and I’ll get back to you.</p>
            <form onSubmit={onSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-[#A59DB8]">Name</label>
                <input id="name" name="name" required className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[#E6E1EF] placeholder:text-[#A59DB8] focus:outline-none focus:ring-2 focus:ring-[#9C6ADE]" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-[#A59DB8]">Email</label>
                <input id="email" type="email" name="email" required className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[#E6E1EF] placeholder:text-[#A59DB8] focus:outline-none focus:ring-2 focus:ring-[#9C6ADE]" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-[#A59DB8]">Message</label>
                <textarea id="message" name="message" required rows={4} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[#E6E1EF] placeholder:text-[#A59DB8] focus:outline-none focus:ring-2 focus:ring-[#9C6ADE]" placeholder="How can I help?" />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-gradient-to-r from-[#9C6ADE] to-[#C89FEB] px-5 py-2.5 text-[#0E0817] font-medium hover:opacity-95">
                Send Message <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h3 className="font-medium text-[#E6E1EF]">Contact Info</h3>
            <ul className="mt-3 space-y-2 text-[#A59DB8]">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Dhaka, Bangladesh</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> sihab@example.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +880 1XXX-XXXXXX</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-[#E6E1EF] hover:bg-white/15"><Github className="w-4 h-4" /> GitHub</a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-[#E6E1EF] hover:bg-white/15">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
