import { useState } from 'react';
import { Mail, Github, Linkedin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { Fade } from 'react-awesome-reveal';

const socialLinks = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#22d3ee',
  },
  {
    icon: <Github size={20} />,
    label: 'GitHub',
    value: 'Fried bocovo',
    href: personalInfo.github,
    color: '#f1f5f9',
  },
  {
    icon: <Linkedin size={20} />,
    label: 'LinkedIn',
    value: 'Fried BOCOVO',
    href: personalInfo.linkedin,
    color: '#0077b5',
  },
  {
    icon: <MessageCircle size={20} />,
    label: 'WhatsApp',
    value: '+229 52 35 34 84',
    href: personalInfo.whatsapp,
    color: '#25d366',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  const inputClass = `
    w-full px-4 py-3 rounded-xl text-slate-200 text-sm outline-none
    transition-all duration-300 placeholder-slate-500
  `;
  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.target as HTMLElement).style.borderColor = 'rgba(34,211,238,0.4)';
    (e.target as HTMLElement).style.boxShadow = '0 0 0 3px rgba(34,211,238,0.08)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
    (e.target as HTMLElement).style.boxShadow = 'none';
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{ background: 'rgba(7, 13, 28, 0.4)' }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[700px] sm:h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-16 animate-on-scroll">
          <p className="text-cyan-400 font-medium text-sm tracking-widest uppercase mb-3">
            05 — Contact
          </p>
          <h2 className="section-title text-white mb-4">
            Travaillons
            <span className="gradient-text"> Ensemble</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto px-2" style={{ lineHeight: '1.7' }}>
            Un projet en tête ? Une collaboration ? Ou juste envie d&apos;échanger ? Je suis là.
          </p>
        </div>

        {/* ── Grid principal ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">

          {/* ── Colonne gauche : Infos de contact ── */}
          <div className="lg:col-span-2 animate-on-scroll-left">
            <div className="glass-card h-full" style={{ padding: '20px' }}>
              <Fade direction="left" cascade damping={0.1}>

                <h3 className="text-white font-display font-600 text-lg sm:text-xl mb-2">
                  Restons en contact
                </h3>
                <p className="text-slate-400 text-sm mb-5" style={{ lineHeight: '1.7' }}>
                  Réactif, engagé et toujours partant pour de nouveaux défis créatifs.
                </p>

                {/* Liens sociaux — 2 colonnes sur mobile/tablette, 1 colonne sur desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 mb-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${link.color}30`;
                        (e.currentTarget as HTMLElement).style.background = `${link.color}0a`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${link.color}15`, color: link.color }}
                      >
                        {link.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-slate-300 text-sm font-medium">{link.label}</p>
                        <p className="text-slate-500 text-xs truncate">{link.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Badge disponibilité */}
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: 'rgba(34,211,238,0.06)',
                    border: '1px solid rgba(34,211,238,0.15)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="glow-dot" />
                    <span className="text-cyan-400 text-sm font-medium">Disponible actuellement</span>
                  </div>
                  <p className="text-slate-400 text-xs" style={{ lineHeight: '1.6' }}>
                    Ouvert aux missions freelance, stages et collaborations créatives.
                  </p>
                </div>

              </Fade>
            </div>
          </div>

          {/* ── Colonne droite : Formulaire ── */}
          <div className="lg:col-span-3 animate-on-scroll-right">
            <div className="glass-card" style={{ padding: '20px' }}>
              <Fade direction="right" cascade damping={0.1}>

                <h3 className="text-white font-display font-600 text-lg sm:text-xl mb-5">
                  Envoyer un message
                </h3>

                {sent ? (
                  <div
                    className="flex flex-col items-center justify-center py-10 sm:py-12 gap-4"
                    style={{ animation: 'fadeUp 0.5s ease forwards' }}
                  >
                    <CheckCircle size={52} className="text-cyan-400" />
                    <p className="text-white font-medium text-lg">Message envoyé !</p>
                    <p className="text-slate-400 text-sm text-center px-4">
                      Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>

                    {/* Nom + Email — empilés sur mobile, côte à côte sur sm+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Votre nom"
                          required
                          className={inputClass}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="votre@email.com"
                          required
                          className={inputClass}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
                        Sujet
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Objet de votre message"
                        required
                        className={inputClass}
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>

                    <div className="mb-5 sm:mb-6">
                      <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Décrivez votre projet ou votre demande..."
                        required
                        rows={5}
                        className={inputClass}
                        style={{ ...inputStyle, resize: 'none' }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary w-full justify-center text-sm sm:text-base"
                      style={{ opacity: sending ? 0.7 : 1 }}
                    >
                      {sending ? (
                        <>
                          <div
                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                            style={{ animation: 'spin 0.8s linear infinite' }}
                          />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Envoyer le message
                        </>
                      )}
                    </button>

                  </form>
                )}

              </Fade>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}