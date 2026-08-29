import React, { useEffect, useState } from 'react';

interface VesperLandingPageProps {
  onGoToEditor: () => void;
}

export const VesperLandingPage: React.FC<VesperLandingPageProps> = ({ onGoToEditor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.title = 'Vesper.ai — Operational AI Infrastructure';

    const timer = setTimeout(() => {
      const appears = document.querySelectorAll('.appear, .hero-photo, .hero-video');
      appears.forEach((el) => {
        el.classList.add('is-in');
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`vesper-root ${isMenuOpen ? 'menu-open' : ''}`}>
      {/* Base CSS & Tokens */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&family=Instrument+Serif:ital@1&display=swap');

        html, body {
          background: #000000 !important;
          color: #ffffff !important;
          overflow: hidden !important;
          margin: 0;
          padding: 0;
        }

        .vesper-root {
          background: #000000 !important;
          color: #ffffff;
          height: 100vh;
          height: 100dvh;
          width: 100vw;
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          overflow: hidden;
          position: relative;
          box-sizing: border-box;

          --bg: #000000;
          --text: #ffffff;
          --muted: #a0a0a0;
          --stat: #d8d8d8;
          --border: rgba(255, 255, 255, 0.18);
          --border-soft: rgba(255, 255, 255, 0.12);

          --logo: 16px;
          --nav: 12px;
          --nav-h: 31px;
          --btn: 12px;
          --btn-h: 31px;
          --hero-btn-h: 42px;
          --h1: 58px;
          --lede: 14.5px;
          --badge: 12px;
          --stat-size: 13.5px;
          --header-y: 22px;
          --header-x: 48px;
          --stats-x: 72px;
          --stats-y: 28px;
          --copy-max: 960px;
          --lede-max: 480px;
        }

        .vesper-root *, .vesper-root *::before, .vesper-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* Grain Overlay */
        .vesper-root .grain {
          position: absolute;
          inset: 0;
          z-index: 100;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* Full Viewport Particle Wave Video Background */
        .vesper-root .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          opacity: 0.95;
          pointer-events: none;
        }

        .vesper-root .page {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100vh;
          height: 100dvh;
        }

        /* Header Bar at Top */
        .vesper-root .header {
          position: relative;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: var(--header-y) var(--header-x) 10px;
          z-index: 50;
          background: transparent;
        }

        .vesper-root .logo {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          justify-self: start;
          font-size: var(--logo);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #fff;
          cursor: pointer;
          text-decoration: none;
        }

        .vesper-root .logo-suffix {
          font-weight: 300;
          opacity: 0.85;
        }

        .vesper-root #site-nav {
          display: flex;
          align-items: center;
          gap: 5px;
          justify-self: center;
        }

        /* Compact Liquid Metal Nav Pills */
        .vesper-root .nav-link {
          height: var(--nav-h);
          padding: 0 14px;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(198,198,198,0.45);
          background: linear-gradient(105deg, rgba(5,5,5,0.75) 0%, rgba(42,42,42,0.75) 48%, rgba(74,74,74,0.75) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #f3f3f3;
          font-size: var(--nav);
          font-weight: 350;
          letter-spacing: -0.01em;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
          cursor: pointer;
        }

        .vesper-root .nav-link::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.16) 50%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 0.6s ease;
        }

        .vesper-root .nav-link:hover::before {
          transform: translateX(120%);
        }

        .vesper-root .nav-link:hover {
          border-color: rgba(235,235,235,0.9);
          background: linear-gradient(105deg, rgba(17,17,17,0.85) 0%, rgba(58,58,58,0.85) 45%, rgba(106,106,106,0.85) 100%);
          box-shadow: 0 0 18px rgba(200,210,230,0.18);
        }

        .vesper-root .header-cta {
          justify-self: end;
          height: var(--btn-h);
          padding: 0 14px;
          font-size: var(--btn);
        }

        /* Burger Menu Button */
        .vesper-root .burger {
          display: none;
          width: 42px;
          height: 42px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: rgba(8,8,8,0.55);
          z-index: 60;
          cursor: pointer;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: border-color 0.25s, background 0.25s;
        }

        .vesper-root .burger span {
          width: 16px;
          height: 1.5px;
          background: #ffffff;
          border-radius: 1px;
          transition: transform 0.25s, opacity 0.2s;
        }

        .vesper-root .burger:hover {
          border-color: rgba(255,255,255,0.32);
          background: rgba(255,255,255,0.05);
        }

        .vesper-root.menu-open .burger span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .vesper-root.menu-open .burger span:nth-child(2) {
          opacity: 0;
        }
        .vesper-root.menu-open .burger span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* Buttons (Liquid Glass) */
        .vesper-root .btn {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: var(--btn-h);
          padding: 0 16px;
          border-radius: 6px;
          font-size: var(--btn);
          font-weight: 450;
          letter-spacing: -0.015em;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
          border: 1px solid transparent;
          transition: transform 0.25s cubic-bezier(0.2,0.8,0.2,1), border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }

        .vesper-root .btn::after {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(255,255,255,0.22) 0%, transparent 40%, rgba(255,255,255,0.08) 100%);
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: destination-out;
        }

        .vesper-root .btn-solid {
          background: linear-gradient(180deg, #ffffff 0%, #e7e7e7 48%, #cfcfcf 100%);
          color: #050505;
          font-weight: 500;
          border-color: rgba(255,255,255,0.9);
          box-shadow: 0 4px 20px rgba(255,255,255,0.15);
        }

        .vesper-root .btn-solid:hover {
          transform: translateY(-1px);
          background: linear-gradient(180deg, #ffffff 0%, #f0f0f0 48%, #dfdfdf 100%);
          box-shadow: 0 6px 24px rgba(255,255,255,0.22);
        }

        .vesper-root .btn-ghost {
          background: rgba(12,12,12,0.65);
          color: #efefef;
          border-color: var(--border);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .vesper-root .btn-ghost:hover {
          transform: translateY(-1px);
          background: rgba(24,24,24,0.85);
          border-color: rgba(255,255,255,0.32);
          color: #ffffff;
        }

        /* Hero Lower Middle Vertical Position */
        .vesper-root .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          text-align: center;
          padding: 0 24px 28px;
        }

        .vesper-root .hero-copy {
          max-width: var(--copy-max);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .vesper-root .badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          height: 26px;
          padding: 0 13px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-size: var(--badge);
          font-weight: 350;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.9);
          margin-bottom: 22px;
        }

        .vesper-root h1 {
          font-size: var(--h1);
          font-weight: 400;
          line-height: 1.06;
          letter-spacing: -0.04em;
          color: #ffffff;
          margin-bottom: 16px;
          text-align: center;
        }

        .vesper-root h1 em {
          font-family: "Instrument Serif", Georgia, serif;
          font-style: italic;
          font-weight: 300;
          color: #a3a3a3;
          padding-right: 0.12em;
        }

        .vesper-root .lede {
          font-size: var(--lede);
          line-height: 1.55;
          letter-spacing: -0.015em;
          color: #d8d8d8;
          text-shadow: 0 2px 10px rgba(0,0,0,0.9);
          max-width: var(--lede-max);
          margin-bottom: 28px;
          font-weight: 350;
        }

        .vesper-root .hero-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .vesper-root .hero-btn {
          height: var(--hero-btn-h);
          padding: 0 24px;
          font-size: 13.5px;
        }

        /* Stats Footer at Bottom Edge */
        .vesper-root .stats {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--stats-y) var(--stats-x);
          background: transparent;
          gap: 20px;
        }

        .vesper-root .stat {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: var(--stat-size);
          color: var(--stat);
          letter-spacing: -0.015em;
          text-shadow: 0 1px 6px rgba(0,0,0,0.9);
          font-weight: 350;
        }

        /* Appear Animation Utility */
        .vesper-root .appear {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--d, 0s);
        }

        .vesper-root .appear.is-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="grain"></div>

      {/* Full Viewport Particle Wave Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4"
          type="video/mp4"
        />
      </video>

      <div className="page">
        <header className="header">
          <div className="logo appear is-in" aria-label="Vesper.ai">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <g transform="rotate(-30 12 12)">
                <circle cx="7.3" cy="3.2" r="1.45" />
                <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
                <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
                <circle cx="16.7" cy="20.8" r="1.45" />
              </g>
            </svg>
            <span>Vesper<span className="logo-suffix">.ai</span></span>
          </div>

          <nav id="site-nav" aria-label="Primary">
            <button onClick={onGoToEditor} className="nav-link appear is-in">Benefits</button>
            <button onClick={onGoToEditor} className="nav-link appear is-in">How It Works</button>
            <button onClick={onGoToEditor} className="nav-link appear is-in">FAQs</button>
            <button onClick={onGoToEditor} className="nav-link appear is-in">Pricing</button>
          </nav>

          {/* Header CTA: Start for Free */}
          <button
            onClick={onGoToEditor}
            className="btn btn-solid header-cta appear is-in"
          >
            Start for Free
          </button>

          <button
            className="burger appear is-in"
            aria-controls="site-nav"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </header>

        <main className="hero">
          <div className="hero-copy">
            <div className="badge appear is-in">
              <svg className="badge-star" width="18" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
              </svg>
              <span>Operational AI Infrastructure</span>
            </div>

            <h1>
              Train <em>AI agents</em> on your<br />
              workflows in minutes.
            </h1>

            <p className="lede appear is-in">
              Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business.
            </p>

            <div className="hero-actions">
              {/* Primary Action Button: Start for Free */}
              <button
                onClick={onGoToEditor}
                className="btn btn-solid hero-btn appear is-in"
              >
                Start for Free
              </button>

              <button
                onClick={onGoToEditor}
                className="btn btn-ghost hero-btn appear is-in"
              >
                See it in action
              </button>
            </div>
          </div>
        </main>

        <footer className="stats">
          <div className="stat appear is-in">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="grad1" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38"/>
                  <stop offset="100%" stopColor="#3a3a3a" stopOpacity="0.62"/>
                </linearGradient>
                <linearGradient id="grad2" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.38"/>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.62"/>
                </linearGradient>
              </defs>
              <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#grad1)"/>
              <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#grad2)"/>
              <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a"/>
            </svg>
            <span>4.2M+ workflows automated</span>
          </div>

          <div className="stat appear is-in">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff"/>
              <path d="M12 7.1v7.4M8.15 12.35L12 16.2l3.85-3.85" stroke="#111" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <span>92% reduction in manual operations</span>
          </div>

          <div className="stat appear is-in">
            <svg width="38" height="21" viewBox="0 0 40 22" className="stat-icon-wide">
              <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b"/>
              <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4"/>
              <circle cx="8.8" cy="11" r="0.7" fill="#1a1a1a"/>
              <circle cx="11.6" cy="11" r="0.7" fill="#1a1a1a"/>
              <circle cx="20.2" cy="11" r="9.2" fill="#ffffff"/>
              <circle cx="17.8" cy="10" r="1.7" fill="#111111"/>
              <circle cx="22.6" cy="10" r="1.7" fill="#111111"/>
              <path d="M17.5 14c1.2 1.2 4.2 1.2 5.4 0" stroke="#111" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d"/>
              <text x="30.2" y="15.1" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="12.5" fill="#ffffff" textAnchor="middle">e</text>
            </svg>
            <span>180+ operational teams onboarded</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
