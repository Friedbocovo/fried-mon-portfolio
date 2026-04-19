import { useEffect, useRef } from 'react';
import { ArrowDown, Download } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTypewriter } from '../hooks/useIntersectionObserver';
import { useCountUp } from '../hooks/useCountUp';
import { Fade } from 'react-awesome-reveal';


export default function Hero() {
  const typedRef = useTypewriter(personalInfo.roles, 75, 2200);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orb1Ref.current || !orb2Ref.current) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      orb1Ref.current.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
      orb2Ref.current.style.transform = `translate(${-x * 20}px, ${-y * 20}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Vidéo de fond ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/coding_background.mp4" type="video/mp4" />
      </video>

      {/* ── Overlay sombre ── */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(5,15,30,0.80) 0%, rgba(5,15,30,0.70) 60%, rgba(5,15,30,0.90) 100%)',
        }}
      />

      {/* ── Orbes interactives ── */}
      <div
        ref={orb1Ref}
        className="absolute pointer-events-none transition-transform duration-700 ease-out hidden sm:block"
        style={{
          zIndex: 2,
          top: '15%',
          right: '10%',
          width: 'clamp(200px, 40vw, 500px)',
          height: 'clamp(200px, 40vw, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute pointer-events-none transition-transform duration-700 ease-out hidden sm:block"
        style={{
          zIndex: 2,
          bottom: '20%',
          left: '5%',
          width: 'clamp(150px, 30vw, 400px)',
          height: 'clamp(150px, 30vw, 400px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Particules flottantes ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              background: 'rgba(34,211,238,0.5)',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* ── Contenu principal ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20">

          {/* ── Texte ── */}
          <Fade direction="left" damping={0.1}>
            <div className="flex-1 text-center lg:text-left w-full">

              <h1
                className="font-display font-900 leading-none mb-4"
                style={{
                  fontSize: 'clamp(2.2rem, 7vw, 6rem)',
                  animation: 'fadeUp 0.8s ease 0.1s both',
                }}
              >
                <span className="text-white">Bonjour, je suis</span>
                <br />
                <span className="gradient-text">{personalInfo.fullName}</span>
              </h1>

              {/* Typewriter */}
              <div
                className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start mb-6 flex-wrap"
                style={{ animation: 'fadeUp 0.8s ease 0.2s both' }}
              >
                <span className="text-slate-400 text-base sm:text-xl font-light">Je suis</span>
                <span
                  className="text-base sm:text-xl font-semibold text-white min-h-[1.5em] min-w-[160px] sm:min-w-[220px] inline-block"
                  ref={typedRef}
                />
                <span
                  ref={cursorRef}
                  className="text-cyan-400 text-base sm:text-xl font-normal"
                  style={{ animation: 'blink 1s step-end infinite' }}
                >
                  |
                </span>
              </div>

              {/* Bio */}
              <p
                className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
                style={{ animation: 'fadeUp 0.8s ease 0.3s both', lineHeight: '1.7' }}
              >
                {personalInfo.bio}
              </p>

              {/* CTA */}
              <div
                className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
                style={{ animation: 'fadeUp 0.8s ease 0.4s both' }}
              >
                <button
                  className="btn-primary text-sm sm:text-base"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Voir mes projets
                  <ArrowDown size={16} />
                </button>
              </div>

              {/* Stats */}
              <div
                className="flex items-center gap-4 sm:gap-6 mt-8 sm:mt-10 justify-center lg:justify-start flex-wrap"
                style={{ animation: 'fadeUp 0.8s ease 0.5s both' }}
              >
                {personalInfo.stats.map((stat, i) => (
                  <StatCounter key={stat.label} stat={stat} index={i} />
                ))}
              </div>
            </div>
          </Fade>

          {/* ── Photo ── */}
          <Fade direction="right">
            <div
              className="relative flex-shrink-0"
              style={{ animation: 'fadeIn 1s ease 0.3s both' }}
            >
              <div
                className="relative mx-auto"
                style={{
                  width: 'clamp(220px, 48vw, 420px)',
                  height: 'clamp(220px, 48vw, 420px)',
                  animation: 'float 6s ease-in-out infinite',
                }}
              >
                {/* Halo */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34,211,238,0.3) 0%, rgba(56,189,248,0.1) 100%)',
                    filter: 'blur(30px)',
                    transform: 'scale(1.1)',
                  }}
                />
                {/* Image */}
                <div
                  className="relative w-full h-full rounded-full overflow-hidden"
                  style={{
                    border: '2px solid rgba(34,211,238,0.3)',
                    boxShadow: '0 0 60px rgba(34,211,238,0.15), inset 0 0 30px rgba(34,211,238,0.05)',
                  }}
                >
                  <img
                    src={personalInfo.photo}
                    alt={`Photo de ${personalInfo.fullName} — Frontend Developer & Designer UX/UI`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Fade>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="hidden md:flex absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors group"
        style={{ zIndex: 10, animation: 'fadeIn 1s ease 1s both' }}
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <div className="w-6 h-9 rounded-full border border-current flex items-start justify-center p-1.5">
          <div
            className="w-1 h-2 bg-current rounded-full"
            style={{ animation: 'float 1.5s ease-in-out infinite' }}
          />
        </div>
      </button>
    </section>
  );
}


function StatCounter({ stat, index }: { stat: { value: string; label: string }; index: number }) {
  const numValue = parseInt(stat.value);
  const { count, elementRef } = useCountUp(numValue, 2400);

  return (
    <div ref={elementRef} className="text-center">
      <p className="font-display font-700 text-xl sm:text-2xl text-white">
        {isNaN(numValue) ? stat.value : count}
        {stat.value.includes('+') && '+'}
        {stat.value.includes('%') && '%'}
        {stat.value === '∞' && '∞'}
      </p>
      <p className="text-slate-500 text-xs mt-0.5">{stat.label}</p>
    </div>
  );
}