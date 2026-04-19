import {
  Heart, MapPin, Zap, BookOpen, Coffee,
  GraduationCap, Award, ExternalLink, Calendar, Briefcase,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useCountUp } from '../hooks/useCountUp';
import { Fade, Zoom } from 'react-awesome-reveal';

const passions = [
  { icon: <Zap size={16} />, label: 'Innovation Tech' },
  { icon: <Heart size={16} />, label: 'Design Thinking' },
  { icon: <BookOpen size={16} />, label: 'Apprentissage continu' },
  { icon: <Coffee size={16} />, label: 'Café & Code' },
];

const experiences = [
  {
    period: '2024 - Présent',
    location: 'Bénin',
    title: 'Graphiste & Web Designer',
    company: 'Freelance',
    desc: "Création d'identités visuelles, landing pages et supports de communication digitale.",
  },
  {
    period: '2021 - Présent',
    status: 'done',
    location: 'Bénin',
    title: 'Frontend Developer & Designer',
    company: 'Projets personnels & clients',
    desc: 'Développement de projets web complexes, design de systèmes UI/UX complets.',
  },
  {
    period: '2018 - 2021',
    status: 'done' as const,
    location: 'Bénin',
    title: 'Début de parcours',
    company: 'Auto-formation',
    desc: "Premiers projets HTML/CSS/JS, découverte du design et de l'UX. La passion est née.",
  },
];

const diplomas = [
  {
    period: '2023 - Présent',
    status: 'inprogress' as const,
    location: 'Bénin',
    title: 'Genie Informatique et Télécommunications, spécialité Réseaux et Internet',
    school: "EPAC - Ecole Polytechnique d'Abomey-Calavi",
    desc: "Formation d'ingénieur en génie informatique et télécommunications, avec une spécialisation en réseaux et internet.",
  },
  {
    period: '2022 - 2023',
    status: 'done' as const,
    location: 'Bénin',
    title: 'Baccalauréat Série D',
    school: 'CEG LE MERIDIEN',
    desc: 'Baccalauréat scientifique avec mention.',
  },
];

const certificates = [
  {
    title: 'Pandas',
    issuer: 'Kaggle',
    credentialUrl: '',
    issuerColor: '#22d3ee',
  },
  {
    title: 'NASA Space Apps Challenge',
    issuer: 'NASANASA Space Apps',
    credentialUrl: '',
    issuerColor: '#22d3ee',
  },
  {
    title: 'Certificat de validation de formation',
    issuer: 'MIABE Hackathon 2026',
    credentialUrl: '',
    issuerColor: '#22d3ee',
  },
];

function StatsCard({ stat }: { stat: { value: string; label: string } }) {
  const numValue = parseInt(stat.value);
  const { count, elementRef } = useCountUp(numValue, 2400);
  return (
    <div ref={elementRef} className="glass-card text-center" style={{ padding: '12px 8px' }}>
      <p className="font-display font-700 text-xl sm:text-2xl gradient-text">
        {isNaN(numValue) ? stat.value : count}
        {stat.value.includes('+') && '+'}
        {stat.value.includes('%') && '%'}
        {stat.value === '∞' && '∞'}
      </p>
      <p className="text-slate-400 text-xs mt-1 leading-tight">{stat.label}</p>
    </div>
  );
}

type TimelineItem = {
  period: string;
  status: 'inprogress' | 'done';
  location: string;
  title: string;
  school?: string;
  company?: string;
  desc: string;
};

function TimelineCard({ item }: { item: TimelineItem }) {
  const isActive = item.status === 'inprogress';
  const sub = item.school ?? item.company ?? '';

  return (
    <div className="relative mb-4 sm:mb-5 last:mb-0">
      <div
        className="absolute top-5 w-3 h-3 rounded-full"
        style={{
          left: '-1.45rem',
          background: isActive ? '#22d3ee' : 'rgba(34,211,238,0.3)',
          boxShadow: isActive ? '0 0 10px rgba(34,211,238,0.6)' : 'none',
          border: isActive ? 'none' : '2px solid rgba(34,211,238,0.4)',
        }}
      />
      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: isActive
            ? '1px solid rgba(34,211,238,0.25)'
            : '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px',
          padding: '14px 16px',
        }}
      >
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#cbd5e1',
            }}
          >
            <Calendar size={10} />
            {item.period}
          </div>
          {isActive && (
            <span
              className="px-2 py-1 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(34,211,238,0.12)',
                border: '1px solid rgba(34,211,238,0.3)',
                color: '#22d3ee',
              }}
            >
              En cours
            </span>
          )}
          <span
            className="px-2 py-1 rounded-full text-xs"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#94a3b8',
            }}
          >
            {item.location}
          </span>
        </div>

        <h4 className="text-white font-bold text-sm sm:text-base mb-1" style={{ lineHeight: '1.3' }}>
          {item.title}
        </h4>
        {sub && (
          <p className="text-xs sm:text-sm font-medium mb-1.5" style={{ color: '#22d3ee' }}>
            {sub}
          </p>
        )}
        <p className="text-slate-400 text-xs sm:text-sm" style={{ lineHeight: '1.6' }}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 sm:mb-6">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: 'rgba(34,211,238,0.1)',
          border: '1px solid rgba(34,211,238,0.25)',
        }}
      >
        <span style={{ color: '#22d3ee' }}>{icon}</span>
      </div>
      <h3 className="text-white font-display text-lg sm:text-xl font-700">{label}</h3>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-16 animate-on-scroll">
          <Fade direction="down" damping={2}>
            <p className="text-cyan-400 font-medium text-sm tracking-widest uppercase mb-3">
              02 — À Propos
            </p>
            <h2 className="section-title text-white mb-4">
              Qui suis-je
              <span className="gradient-text"> vraiment ?</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto px-2" style={{ lineHeight: '1.7' }}>
              Un créatif digital à la croisée du code, du design et des réseaux.
            </p>
          </Fade>
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start mb-14 sm:mb-20">

          {/* Gauche — photo */}
          <Fade direction="left" cascade damping={0.1}>
            <div className="animate-on-scroll-left">
              <div
                className="relative rounded-2xl overflow-hidden mb-6 sm:mb-8"
                style={{
                  aspectRatio: '4/3',
                  border: '1px solid rgba(34,211,238,0.12)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                }}
              >
                <img
                  src="/workspace.jpg"
                  alt="Environnement de travail créatif"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(4,7,15,0.8) 0%, transparent 60%)' }}
                />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <blockquote className="text-slate-300 text-xs sm:text-sm italic" style={{ lineHeight: '1.6' }}>
                    {personalInfo.quote}
                  </blockquote>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <MapPin size={16} className="text-cyan-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">{personalInfo.location}</span>
              </div>

              {/* Passions + Stats */}
              <div className="flex flex-wrap gap-2 mb-4">
                {passions.map((p) => (
                  <span
                    key={p.label}
                    className="flex items-center gap-1.5 text-xs text-slate-300 px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <span className="text-cyan-400">{p.icon}</span>
                    {p.label}
                  </span>
                ))}
              </div>

              {/* Stats — 2 col sur mobile, 4 col sur sm+ */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {personalInfo.stats.map((stat) => (
                  <StatsCard key={stat.label} stat={stat} />
                ))}
              </div>
            </div>
          </Fade>

          {/* Droite — bio */}
          <div className="animate-on-scroll-right">
            <Fade direction="right" cascade damping={0.1}>
              <div>
                {personalInfo.longBio.split('\n\n').map((para, i) => (
                  <p key={i} className="text-slate-300 mb-4 text-sm sm:text-base" style={{ lineHeight: '1.8' }}>
                    {para}
                  </p>
                ))}
              </div>
            </Fade>
          </div>

        </div>

        {/* ── Titre Parcours ── */}
        <div className="text-center mb-8 sm:mb-12 animate-on-scroll">
          <p className="text-cyan-400 font-medium text-sm tracking-widest uppercase mb-3">
            Parcours
          </p>
        </div>

   
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 mb-12 sm:mb-16">

          <Fade direction="left" cascade damping={0.1}>
            <div className="animate-on-scroll">
              <SectionTitle icon={<GraduationCap size={18} />} label="Formation" />
              <div className="relative pl-6 sm:pl-7">
                <div
                  className="absolute md:left-2.5 left-1.5 top-2 bottom-2 w-px"
                  style={{ background: 'linear-gradient(to bottom, rgba(34,211,238,0.5), transparent)' }}
                />
                {diplomas.map((d, i) => (
                  <TimelineCard key={i} item={d} />
                ))}
              </div>
            </div>
          </Fade>

          <Fade direction="right" cascade damping={0.1}>
            <div className="animate-on-scroll" style={{ animationDelay: '100ms' }}>
              <SectionTitle icon={<Briefcase size={18} />} label="Expérience" />
              <div className="relative pl-6 sm:pl-7">
                <div
                  className="absolute md:left-2.5 left-1.5 top-2 bottom-2 w-px"
                  style={{ background: 'linear-gradient(to bottom, rgba(34,211,238,0.5), transparent)' }}
                />
                {experiences.map((e, i) => (
                  <TimelineCard key={i} item={e} />
                ))}
              </div>
            </div>
          </Fade>

        </div>

        {/* ── Certifications ──
            mobile  : 1 col
            sm      : 2 col
            lg      : 3 col (3 certificats)
        */}
        <div className="animate-on-scroll">
          <SectionTitle icon={<Award size={18} />} label="Certifications Récentes" />
          <Zoom cascade damping={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {certificates.map((c, i) => {
                const hasLink = !!c.credentialUrl && c.credentialUrl.trim() !== '';
                return (
                  <div
                    key={i}
                    className="relative flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(34,211,238,0.18)',
                      borderRadius: '14px',
                      padding: '20px 16px',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-3 sm:mb-4"
                      style={{
                        background: 'rgba(34,211,238,0.1)',
                        border: '1px solid rgba(34,211,238,0.25)',
                      }}
                    >
                      <Award size={18} style={{ color: '#22d3ee' }} />
                    </div>

                    <p className="text-white font-semibold text-sm mb-2 sm:mb-3" style={{ lineHeight: '1.4' }}>
                      {c.title}
                    </p>

                    <p className="text-sm font-medium mb-1" style={{ color: '#22d3ee' }}>
                      {c.issuer}
                    </p>

                    <p className="text-slate-500 text-xs">{(c as any).date}</p>

                    {hasLink && (
                      <a
                        href={c.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 text-slate-500 hover:text-cyan-400 transition-colors"
                        title="Voir le certificat"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </Zoom>
        </div>

      </div>
    </section>
  );
}
