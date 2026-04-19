import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const navLinks = [
  { label: 'Accueil',      href: '#home' },
  { label: 'À Propos',     href: '#about' },
  { label: 'Compétences',  href: '#skills' },
  { label: 'Projets',      href: '#projects' },
  { label: 'Contact',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ferme le menu si on redimensionne vers desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bloque le scroll body quand menu mobile ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(4, 7, 15, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(34, 211, 238, 0.1)' : 'none',
      }}
    >
      {/* ── Barre principale ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[64px] sm:h-[72px] flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => handleNavClick('#home')}
          className="flex items-center gap-2 group flex-shrink-0"
        >
          <img
                    src={personalInfo.logo}
                    alt={`Logo de ${personalInfo.fullName} — Frontend Developer & Designer UX/UI`}
                    className="w-[150px] h-[150px] object-cover"
                  />
         
          
        </button>

        {/* Nav desktop — masqué sur tablette étroite aussi (< md) */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`nav-link text-sm lg:text-base ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('#contact')}
            className="btn-primary text-xs lg:text-sm"
            style={{ padding: '8px 14px' }}
          >
            Hire me
          </button>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden text-slate-300 hover:text-cyan-400 transition-colors p-1.5 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Menu mobile ── */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '420px' : '0',
          background: 'rgba(4, 7, 15, 0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: menuOpen ? '1px solid rgba(34, 211, 238, 0.1)' : 'none',
        }}
      >
        <nav className="flex flex-col px-4 sm:px-6 py-3 gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-left py-3 px-4 rounded-lg transition-all font-medium text-sm sm:text-base ${
                activeSection === link.href.replace('#', '')
                  ? 'text-cyan-400 bg-cyan-400/8'
                  : 'text-slate-300 hover:text-cyan-400 hover:bg-cyan-400/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="btn-primary mt-3 justify-center text-sm"
            style={{ padding: '11px 20px' }}
          >
            Me Contacter
          </button>
        </nav>
      </div>
    </header>
  );
}