import { Heart, Github, Linkedin, Mail, ArrowUp, Phone, Instagram } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { Fade } from 'react-awesome-reveal';

// Icône Dribbble SVG inline (pas dans lucide)
function DribbbleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.502 8.502 0 0 1 1.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 0 0-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0 1 12 3.475zm-3.633.803a53.896 53.896 0 0 1 3.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 0 1 4.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 0 1-2.19-5.705zM12 20.547a8.482 8.482 0 0 1-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 0 1 1.823 6.475 8.4 8.4 0 0 1-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 0 1-3.655 5.715z" />
    </svg>
  );
}

// Icône Behance SVG inline
function BehanceIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.14 1.4-.43 1.96-.29.55-.67 1.01-1.16 1.36-.49.35-1.05.61-1.69.78-.63.17-1.28.25-1.95.25H0V4.51h6.938v-.007zM16.94 6.044h5.714v1.488H16.94V6.044zm-10.01 4.552c.596 0 1.087-.14 1.478-.418.39-.28.583-.72.583-1.33 0-.34-.06-.62-.18-.843a1.48 1.48 0 0 0-.48-.527 1.96 1.96 0 0 0-.698-.28 3.78 3.78 0 0 0-.845-.09H2.62v3.49h4.31v-.002zm.427 4.983c.32 0 .624-.03.912-.09a2.1 2.1 0 0 0 .752-.3 1.55 1.55 0 0 0 .513-.57c.127-.24.19-.54.19-.9 0-.71-.2-1.23-.597-1.54-.397-.31-.935-.47-1.618-.47H2.62v3.87h4.737zm12.706-.396c.4.39.977.587 1.728.587.538 0 1-.135 1.39-.408.39-.273.627-.568.716-.887h2.48c-.396 1.23-1.005 2.11-1.83 2.64-.82.53-1.81.796-2.966.796-.805 0-1.53-.13-2.18-.39a4.68 4.68 0 0 1-1.657-1.1 4.93 4.93 0 0 1-1.057-1.69 5.96 5.96 0 0 1-.37-2.14c0-.77.125-1.49.376-2.15a5.02 5.02 0 0 1 1.072-1.7 4.87 4.87 0 0 1 1.665-1.12c.648-.27 1.37-.4 2.15-.4.878 0 1.645.17 2.297.51a4.55 4.55 0 0 1 1.598 1.38c.42.58.718 1.24.895 1.99.18.75.24 1.53.18 2.35H19.2c0 .84.24 1.46.863 1.932zm3.024-5.21c-.32-.353-.84-.53-1.562-.53-.46 0-.84.077-1.14.23-.3.154-.54.343-.72.57a2.1 2.1 0 0 0-.37.75 3.84 3.84 0 0 0-.13.787h4.65c-.1-.793-.41-1.453-.728-1.806z" />
    </svg>
  );
}

const navLinks = [
  { label: 'Accueil',      href: '#home' },
  { label: 'À propos',     href: '#about' },
  { label: 'Compétences',  href: '#skills' },
  { label: 'Projets',      href: '#projects' },
  { label: 'Contact',      href: '#contact' },
];

const socialLinks = [
  { label: 'LinkedIn',  href: personalInfo.linkedin,             icon: <Linkedin size={17} /> },
  { label: 'GitHub',    href: personalInfo.github,               icon: <Github size={17} /> },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const iconBase: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
  };

  return (
    <Fade direction="up" cascade damping={0.1}>
    <footer
      className="relative pt-12 pb-6 border-t"
      style={{ borderColor: 'rgba(34,211,238,0.1)' }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Ligne 1 : Nom + Titre + bouton scroll-top ── */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="font-display font-700 text-white text-xl">
              {personalInfo.fullName}
              <span className="text-cyan-400">.</span>
            </p>
            <p className="text-slate-500 text-sm mt-0.5">{personalInfo.title}</p>
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-cyan-400 transition-all duration-300 hover:scale-110"
            style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.15)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(34,211,238,0.08)'; }}
            aria-label="Retour en haut"
          >
            <ArrowUp size={18} />
          </button>
        </div>

        {/* ── Ligne 2 : Navigation ── */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-400 text-sm transition-colors duration-200 hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Ligne 3 : Icônes réseaux sociaux ── */}
        <div className="flex justify-center gap-3 mb-8">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 transition-all duration-300"
              style={iconBase}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.3)';
                (e.currentTarget as HTMLElement).style.color = '#22d3ee';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLElement).style.color = '#94a3b8';
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* ── Ligne 4 : Email + Téléphone ── */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mb-8">
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-2 text-slate-400 text-sm transition-colors duration-200 hover:text-cyan-400"
          >
            <Mail size={15} />
            {personalInfo.email}
          </a>
          <a
            href="tel:+22952353484"
            className="flex items-center gap-2 text-slate-400 text-sm transition-colors duration-200 hover:text-cyan-400"
          >
            <Phone size={15} />
            +229 52 35 34 84
          </a>
        </div>

        {/* ── Séparateur ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} className="mb-6" />

        {/* ── Ligne 5 : Copyright ── */}
        <p className="text-slate-500 text-sm text-center flex flex-wrap items-center justify-center gap-1.5">
          Fait pas
          <span className="text-cyan-400 font-medium">@fried</span>
          UI/UX designer
        </p>

      </div>
    </footer>
    </Fade>
  );
}