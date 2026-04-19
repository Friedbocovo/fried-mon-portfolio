import { ExternalLink, Github, Star, CheckCircle, Clock, Circle } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Fade } from 'react-awesome-reveal';


type ProjectStatus = 'done' | 'inprogress' | 'planned';

// ── Badge statut  
function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = {
    done: {
      label: 'Terminé',
      icon: <CheckCircle size={11} />,
      color: '#22d3ee',
      bg: 'rgba(34,211,238,0.12)',
      border: 'rgba(34,211,238,0.3)',
    },
    inprogress: {
      label: 'En cours',
      icon: <Clock size={11} />,
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.12)',
      border: 'rgba(245,158,11,0.3)',
    },
    planned: {
      label: 'Pas encore commencé',
      icon: <Circle size={11} />,
      color: '#94a3b8',
      bg: 'rgba(148,163,184,0.08)',
      border: 'rgba(148,163,184,0.2)',
    },
  };

  const c = config[status];

  return (
    <span
      className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0"
      style={{ color: c.color, background: c.bg, border: `1px solid ${c.border}` }}
    >
      {c.icon}
      <span className="hidden sm:inline">{c.label}</span>
    </span>
  );
}

// ── Barre de progression (en cours seulement)  
function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-slate-400">Progression</span>
        <span className="text-xs font-semibold" style={{ color: '#f59e0b' }}>
          {progress}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
          }}
        />
      </div>
    </div>
  );
}

// ── Bouton lien conditionnel 
function ProjectButton({
  href,
  icon,
  label,
  variant = 'primary',
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
  variant?: 'primary' | 'outline';
}) {
  const isActive = !!href && href.trim() !== '' && href !== '#';

  const baseStyle: React.CSSProperties = {
    padding: variant === 'primary' ? '9px 12px' : '8px 12px',
    opacity: isActive ? 1 : 0.35,
    cursor: isActive ? 'pointer' : 'not-allowed',
    pointerEvents: isActive ? 'auto' : 'none',
    userSelect: 'none',
    fontSize: '0.8rem',
  };

  const inner = (
    <span
      className={
        variant === 'primary'
          ? 'btn-primary text-sm flex-1 justify-center'
          : 'btn-outline'
      }
      style={baseStyle}
      title={isActive ? undefined : 'Lien non disponible'}
    >
      {icon}
      {label}
    </span>
  );

  if (!isActive) return inner;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        variant === 'primary'
          ? 'btn-primary text-sm flex-1 justify-center'
          : 'btn-outline'
      }
      style={baseStyle}
    >
      {icon}
      {label}
    </a>
  );
}

// ── Composant principal   
export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 relative overflow-hidden">
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-16 animate-on-scroll">
          <Fade direction="up" cascade damping={0.1}>
          <p className="text-cyan-400 font-medium text-sm tracking-widest uppercase mb-3">
            04 — Projets
          </p>
          <h2 className="section-title text-white mb-4">
            Ce que j&apos;ai
            <span className="gradient-text"> Créé</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto px-2" style={{ lineHeight: '1.7' }}>
            Des projets concrets qui reflètent ma polyvalence et ma passion pour l&apos;excellence.
          </p>
          </Fade>
        </div>

        {/* ── Grille projets ── */}
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, i) => {
            const status: ProjectStatus = (project as any).status ?? 'done';
            const progress: number      = (project as any).progress ?? 0;
            const isInProgress          = status === 'inprogress';
            const isPlanned             = status === 'planned';

            return (
              <Fade direction="left" cascade damping={0.1}>
              <div
                key={project.id}
                className="glass-card animate-on-scroll"
                style={{
                  padding: '0',
                  overflow: 'hidden',
                  animationDelay: `${i * 100}ms`,
                  transitionDelay: `${i * 80}ms`,
                  filter: isPlanned ? 'saturate(0.5)' : 'none',
                  transition: 'filter 0.3s ease',
                }}
              >
                {/* ── Image ── */}
                <div className="project-image-wrapper" style={{ position: 'relative' }}>
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.technologies.join(', ')}`}
                    className="w-full"
                    style={{
                      opacity: isPlanned ? 0.5 : 1,
                      transition: 'opacity 0.3s',
                      aspectRatio: '16/9',
                      objectFit: 'cover',
                    }}
                  />

                  {/* Badge Featured */}
                  {project.featured && (
                    <div
                      className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(4,7,15,0.85)',
                        border: '1px solid rgba(34,211,238,0.3)',
                        color: '#22d3ee',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <Star size={10} fill="currentColor" />
                      Featured
                    </div>
                  )}

                  {/* Overlay "En cours" */}
                  {isInProgress && (
                    <div
                      className="absolute bottom-0 left-0 right-0"
                      style={{
                        background: 'linear-gradient(to top, rgba(4,7,15,0.9) 0%, transparent 100%)',
                        padding: '12px 14px 8px',
                      }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-amber-400 font-medium">En cours…</span>
                        <span className="text-xs font-bold text-amber-400">{progress}%</span>
                      </div>
                      <div
                        className="h-1 rounded-full overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.15)' }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Overlay "Pas encore commencé" */}
                  {isPlanned && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: 'rgba(4,7,15,0.55)', backdropFilter: 'blur(2px)' }}
                    >
                      <div
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold"
                        style={{
                          background: 'rgba(4,7,15,0.85)',
                          border: '1px solid rgba(148,163,184,0.25)',
                          color: '#94a3b8',
                        }}
                      >
                        <Circle size={13} />
                        Pas encore commencé
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Contenu ── */}
                <div style={{ padding: '14px 16px 18px' }} className="sm:p-[18px_22px_22px]">

                  {/* Titre + badge statut */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-white font-display font-600 text-lg sm:text-xl leading-tight">
                      {project.title}
                    </h3>
                    <StatusBadge status={status} />
                  </div>

                  <p className="text-slate-400 text-sm mb-3 sm:mb-4" style={{ lineHeight: '1.7' }}>
                    {project.description}
                  </p>

                  {/* Technologies — scroll horizontal sur très petit écran */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tag text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Boutons */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <ProjectButton
                      href={project.liveUrl}
                      icon={<ExternalLink size={13} />}
                      label="Voir le projet"
                      variant="primary"
                    />
                    <ProjectButton
                      href={project.githubUrl}
                      icon={<Github size={13} />}
                      label="Code"
                      variant="outline"
                    />
                  </div>
                </div>
              </div>  
              </Fade>
            );
          })}
        </div>
      </div>
    </section>
  );
}