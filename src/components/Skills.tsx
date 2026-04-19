import { useEffect, useRef, useState } from 'react';
import { softSkills } from '../data/portfolioData';

import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact,
  SiTailwindcss, SiNextdotjs, SiNodedotjs, SiWordpress,
  SiFigma, SiGit, SiVite, SiLinux, SiFirebase, SiSupabase,
  SiVercel, SiCplusplus, SiFramer, SiSparkpost,
} from 'react-icons/si';
import {
  FaNetworkWired, FaSearch, FaReact, FaLightbulb, FaUsers,
  FaRocket, FaSyncAlt, FaComments, FaMobileAlt, FaMagic,
} from 'react-icons/fa';
import { MdPsychology } from 'react-icons/md';
import { TbBrandAdobePhotoshop, TbBrandAdobeXd } from 'react-icons/tb';
import { DiIllustrator } from 'react-icons/di';
import { IconType } from 'react-icons';
import { Fade } from 'react-awesome-reveal';

type SkillItem = { name: string; level: number; icon: string };

const toolCategories = [
  { key: 'design', label: 'Design' },
  { key: 'dev', label: 'Dev' },
  { key: 'network', label: 'Réseaux' },
  { key: 'other', label: 'Outils' },
];

const ICON_MAP: Record<string, { Component: IconType; color: string }> = {
  html5: { Component: SiHtml5, color: '#e34f26' },
  css3: { Component: SiCss, color: '#264de4' },
  javascript: { Component: SiJavascript, color: '#f7df1e' },
  typescript: { Component: SiTypescript, color: '#3178c6' },
  react: { Component: SiReact, color: '#61dafb' },
  tailwindcss: { Component: SiTailwindcss, color: '#06b6d4' },
  nextdotjs: { Component: SiNextdotjs, color: '#ffffff' },
  nodejs: { Component: SiNodedotjs, color: '#5fa04e' },
  wordpress: { Component: SiWordpress, color: '#21759b' },
  reactnative: { Component: FaReact, color: '#61dafb' },
  firebase: { Component: SiFirebase, color: '#ffca28' },
  supabase: { Component: SiSupabase, color: '#3ecf8e' },
  framermotion: { Component: SiFramer, color: '#bb4be3' },
  awesomereveal: { Component: SiSparkpost, color: '#f59e0b' },
  animation: { Component: FaMagic, color: '#f472b6' },
  responsive: { Component: FaMobileAlt, color: '#22d3ee' },
  git: { Component: SiGit, color: '#f05032' },
  vite: { Component: SiVite, color: '#646cff' },
  vercel: { Component: SiVercel, color: '#ffffff' },
  figma: { Component: SiFigma, color: '#f24e1e' },
  adobeillustrator: { Component: DiIllustrator, color: '#ff9a00' },
  adobephotoshop: { Component: TbBrandAdobePhotoshop, color: '#31a8ff' },
  adobexd: { Component: TbBrandAdobeXd, color: '#ff61f6' },
  cisco: { Component: FaNetworkWired, color: '#1ba0d7' },
  linux: { Component: SiLinux, color: '#fcc624' },
  tcpip: { Component: FaNetworkWired, color: '#00b4d8' },
  cplusplus: { Component: SiCplusplus, color: '#00599c' },
  seo: { Component: FaSearch, color: '#22d3ee' },
};

const SOFT_SKILLS: { name: string; Component: IconType; color: string }[] = [
  { name: 'Créativité', Component: FaLightbulb, color: '#f59e0b' },
  { name: 'Résolution de problèmes', Component: MdPsychology, color: '#a78bfa' },
  { name: 'Communication', Component: FaComments, color: '#34d399' },
  { name: 'Travail en équipe', Component: FaUsers, color: '#60a5fa' },
  { name: 'Adaptabilité', Component: FaSyncAlt, color: '#f472b6' },
  { name: 'Autonomie', Component: FaRocket, color: '#fb923c' },
];

function TechIcon({ id, size = 28 }: { id: string; size?: number }) {
  const entry = ICON_MAP[id];
  if (!entry) return <span style={{ fontSize: size * 0.6, color: '#94a3b8' }}>?</span>;
  const { Component, color } = entry;
  return <Component size={size} color={color} />;
}

function CircleSkill({
  skill, visible, delay = 0, size = 100,
}: {
  skill: SkillItem; visible: boolean; delay?: number; size?: number;
}) {
  const CYAN = '#22d3ee';
  const radius = size * 0.42;
  const circumference = 2 * Math.PI * radius;
  const iconSize = Math.max(size * 0.22, 14);

  const [displayedPct, setDisplayedPct] = useState(0);
  const [progress, setProgress] = useState(0);
  const animRef = useRef<number | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!visible) {
      started.current = false;
      setDisplayedPct(0);
      setProgress(0);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || started.current) return;
    const timer = setTimeout(() => {
      started.current = true;
      const duration = 1400;
      const startTime = performance.now();
      const run = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplayedPct(Math.round(eased * skill.level));
        setProgress(eased * (skill.level / 100) * circumference);
        if (t < 1) animRef.current = requestAnimationFrame(run);
      };
      animRef.current = requestAnimationFrame(run);
    }, delay);
    return () => { clearTimeout(timer); if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [visible]);

  return (
    <div className="flex flex-col items-center gap-1 cursor-default">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="absolute inset-0 -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="2" />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={CYAN} strokeWidth="2" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <TechIcon id={skill.icon} size={iconSize} />
          <p className="font-bold leading-none" style={{ color: CYAN, fontSize: `${Math.max(size * 0.11, 9)}px` }}>
            {displayedPct}%
          </p>
        </div>
      </div>
      <p className="text-slate-400 text-center leading-tight" style={{ maxWidth: size, fontSize: `${Math.max(size * 0.11, 9)}px` }}>
        {skill.name}
      </p>
    </div>
  );
}

export default function Skills() {
  const [activeToolTab, setActiveToolTab] = useState('design');
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [circleVisible, setCircleVisible] = useState(false);

  // Taille des cercles selon la largeur d'écran
  const [circleSize, setCircleSize] = useState(100);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 360) setCircleSize(64);
      else if (w < 480) setCircleSize(72);
      else if (w < 640) setCircleSize(80);
      else if (w < 768) setCircleSize(88);
      else setCircleSize(100);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCircleVisible(true); },
      { threshold: 0.1 }
    );
    if (circleRef.current) observer.observe(circleRef.current);
    return () => observer.disconnect();
  }, []);

  const handleToolTabChange = (key: string) => {
    setCircleVisible(false);
    setActiveToolTab(key);
    setTimeout(() => setCircleVisible(true), 50);
  };

  const allToolSections: Record<string, { tools: SkillItem[] }> = {
    dev: {
      tools: [
        { name: 'HTML5', level: 100, icon: 'html5' },
        { name: 'CSS3', level: 100, icon: 'css3' },
        { name: 'JavaScript', level: 100, icon: 'javascript' },
        { name: 'React.js', level: 100, icon: 'react' },
        { name: 'TypeScript', level: 100, icon: 'typescript' },
        { name: 'Tailwind CSS', level: 100, icon: 'tailwindcss' },
        { name: 'Next.js', level: 80, icon: 'nextdotjs' },
        { name: 'Node.js', level: 50, icon: 'nodejs' },
        { name: 'WordPress', level: 100, icon: 'wordpress' },
        { name: 'React Native', level: 80, icon: 'reactnative' },
        { name: 'Firebase', level: 90, icon: 'firebase' },
        { name: 'Supabase', level: 90, icon: 'supabase' },
        { name: 'Framer Motion', level: 100, icon: 'framermotion' },
        { name: 'Animation', level: 100, icon: 'animation' },
        { name: 'Responsive', level: 100, icon: 'responsive' },
        { name: 'Awesome Reveal', level: 100, icon: 'awesomereveal' },
      ],
    },
    design: {
      tools: [
        { name: 'Figma', level: 100, icon: 'figma' },
        { name: 'Illustrator', level: 60, icon: 'adobeillustrator' },
        { name: 'Photoshop', level: 85, icon: 'adobephotoshop' },
        { name: 'Adobe XD', level: 60, icon: 'adobexd' },
      ],
    },
    network: {
      tools: [
        { name: 'Cisco / CCNA', level: 75, icon: 'cisco' },
        { name: 'Linux / Unix', level: 78, icon: 'linux' },
        { name: 'TCP/IP', level: 80, icon: 'tcpip' },
        { name: 'C++', level: 70, icon: 'cplusplus' },
      ],
    },
    other: {
      tools: [
        { name: 'Git & GitHub', level: 100, icon: 'git' },
        { name: 'Vite', level: 95, icon: 'vite' },
        { name: 'SEO', level: 95, icon: 'seo' },
        { name: 'Vercel', level: 100, icon: 'vercel' },
      ],
    },
  };

  const currentTools = allToolSections[activeToolTab].tools;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: 'rgba(7, 13, 28, 0.5)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.03) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-16 animate-on-scroll">
          <p className="text-cyan-400 font-medium text-sm tracking-widest uppercase mb-3">
            03 — Compétences
          </p>
          <h2 className="section-title text-white mb-4">
            Mon<span className="gradient-text"> Arsenal</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto px-2" style={{ lineHeight: '1.7' }}>
            Des compétences techniques solides, combinées à une sensibilité design affûtée.
          </p>
        </div>

        {/* ── Cercles ── */}
        <Fade direction="right" cascade damping={0.1}>

          <div className="animate-on-scroll mb-6 sm:mb-8" style={{ animationDelay: '150ms' }}>
            <div
              className="glass-card"
              style={{ padding: '20px 14px 24px', background: 'rgba(7, 13, 28, 0.5)' }}
              ref={circleRef}
            >
              {/* Onglets */}
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 justify-center">
                {toolCategories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => handleToolTabChange(cat.key)}
                    className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
                    style={{
                      background: activeToolTab === cat.key ? 'rgba(34,211,238,0.15)' : 'transparent',
                      border: activeToolTab === cat.key
                        ? '1px solid rgba(34,211,238,0.5)'
                        : '1px solid rgba(255,255,255,0.1)',
                      color: activeToolTab === cat.key ? '#22d3ee' : '#94a3b8',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>


              <div key={activeToolTab} style={{ animation: 'fadeUp 0.4s ease forwards' }}>
                <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5 justify-items-center">
                  {currentTools.map((tool, i) => (
                    <CircleSkill
                      key={tool.name}
                      skill={tool}
                      visible={circleVisible}
                      delay={i * 80}
                      size={circleSize}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ── Soft Skills + Langues ── */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">

          {/* Soft Skills */}
                  <Fade direction="left" cascade damping={0.1}>
          <div className="animate-on-scroll" style={{ animationDelay: '100ms' }}>
            <div className="glass-card h-full" style={{ padding: '20px' }}>
              <h3 className="text-white font-display font-600 mb-4 text-base">Soft Skills</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-3">
                {SOFT_SKILLS.map((s) => (
                  <div
                    key={s.name}
                    className="flex flex-col items-center gap-2 p-2.5 sm:p-3 rounded-xl text-center transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <s.Component size={20} color={s.color} />
                    <span className="text-slate-300 text-xs font-medium leading-tight">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div></Fade>

          {/* Langues */}
                  <Fade direction="right" cascade damping={0.1}>

          <div className="animate-on-scroll" style={{ animationDelay: '150ms' }}>
            <div className="glass-card h-full" style={{ padding: '20px' }}>
              <h3 className="text-white font-display font-600 mb-4 text-base">Langues</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { lang: 'Français', level: 'Courant', pct: 90 },
                  { lang: 'Anglais', level: '', pct: 50 },
                  { lang: 'Fon', level: '', pct: 95 },
                  { lang: 'Zraman', level: '', pct: 60 },
                ].map((l) => (
                  <div key={l.lang}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-slate-200 text-sm font-medium">{l.lang}</span>
                      <span className="text-cyan-400 text-xs font-semibold">{l.level}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="skill-bar-fill" style={{ width: visible ? `${l.pct}%` : '0%' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-5 sm:mt-6 p-3 sm:p-4 rounded-xl"
                style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.15)' }}
              >
                <p className="text-slate-300 text-xs mb-2 font-medium flex items-center gap-2" style={{ lineHeight: '1.6' }}>
                  <FaRocket color="#22d3ee" size={14} />
                  Toujours en apprentissage continu
                </p>
                <p className="text-slate-400 text-xs" style={{ lineHeight: '1.5' }}>
                  Formation ingénieur réseaux en cours, explorant les dernières tendances tech.
                </p>
              </div>
            </div>
          </div>
</Fade>
        </div>


      </div>
    </section>
  );
}