import React, { useEffect, useState } from 'react';
import { TRIAL_STARTER_TEMPLATES } from '../../data/starterTemplates';
import { TemplateTreeRenderer } from '../TemplateRenderer/TemplateTreeRenderer';
import { loadPersistedTemplate } from '../../utils/templatePersistence';

interface VesperLandingPageProps {
  onGoToEditor: () => void;
  onGoToTemplates?: () => void;
}

export const VesperLandingPage: React.FC<VesperLandingPageProps> = ({
  onGoToEditor,
  onGoToTemplates,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showcaseTemplateId, setShowcaseTemplateId] = useState<'apex-ai-workflows' | 'flowith-automation'>('apex-ai-workflows');
  const [showcaseViewport, setShowcaseViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    document.title = 'Vesper.ai — AI-Powered Visual Website Builder';

    const timer = setTimeout(() => {
      const appears = document.querySelectorAll('.appear, .hero-photo, .hero-video');
      appears.forEach((el) => {
        el.classList.add('is-in');
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleTemplatesNav = () => {
    if (onGoToTemplates) {
      onGoToTemplates();
    } else {
      onGoToEditor();
    }
  };

  const handleHowItWorksClick = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBenefitsClick = () => {
    const el = document.getElementById('benefits');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePricingClick = () => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFaqsClick = () => {
    const el = document.getElementById('faqs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const faqItems = [
    {
      q: 'What is Vesper.ai?',
      a: 'Vesper.ai is an AI-powered visual website and landing-page builder that lets you select starter templates, customize content, typography, colors, layout, and spacing visually, preview responsively across devices, save changes persistently, and export or publish your site.',
    },
    {
      q: 'Do I need coding experience to use Vesper.ai?',
      a: 'No coding experience is required! You can customize every property using visual controls in the Property Panel. If you are a developer, you can also view and inspect the exact JSON code representation via the Code Surface.',
    },
    {
      q: 'Can I customize colors and typography?',
      a: 'Yes! Vesper.ai provides dedicated controls for typography (font family, weight, size, line height, letter spacing, alignment, transform, italic, text decoration) and colors (background color, text color, border color, custom HEX, RGB, and RGBA values).',
    },
    {
      q: 'Does it support responsive mobile & tablet editing?',
      a: 'Yes. You can switch between Desktop (1200px), Tablet (768px), and Mobile (375px) viewports with isolated viewport property overrides.',
    },
    {
      q: 'Can I save my changes persistently?',
      a: 'Yes! Clicking "Save Changes" persists your customized canonical template model to storage so your edits survive page refreshes and application reopens.',
    },
    {
      q: 'Can I reset a template back to its original design?',
      a: 'Yes. Every template features a safe "Reset Template" action that removes saved customizations and restores the original untouched starter seed.',
    },
    {
      q: 'How many templates are available in the trial version?',
      a: 'The trial version includes exactly two professionally designed starter templates: ApexAI Workflows (dark futuristic AI design) and Flowith Automation (light enterprise design).',
    },
  ];

  return (
    <div className={`vesper-root ${isMenuOpen ? 'menu-open' : ''}`}>
      {/* Base CSS & Tokens */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&family=Instrument+Serif:ital@1&display=swap');

        html, body {
          background: #000000 !important;
          color: #ffffff !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          margin: 0;
          padding: 0;
        }

        .vesper-root {
          background: #000000 !important;
          color: #ffffff;
          min-height: 100vh;
          width: 100vw;
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          overflow-x: hidden;
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
          --badge: 11px;
          --stat-size: 13.5px;
          --header-y: 22px;
          --header-x: 48px;
          --stats-x: 72px;
          --stats-y: 28px;
          --copy-max: 960px;
          --lede-max: 520px;
        }

        .vesper-root *, .vesper-root *::before, .vesper-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* Grain Overlay */
        .vesper-root .grain {
          position: fixed;
          inset: 0;
          z-index: 100;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* Full Viewport Particle Wave Video Background */
        .vesper-root .hero-video {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          opacity: 0.95;
          pointer-events: none;
        }

        .vesper-root .page-hero {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100vh;
          height: 100dvh;
          min-height: 100vh;
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

        .vesper-root .nav-link {
          background: transparent;
          border: none;
          color: var(--muted);
          font-size: var(--nav);
          font-family: inherit;
          font-weight: 400;
          padding: 6px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: color 0.2s, background 0.2s;
        }

        .vesper-root .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }

        .vesper-root .header-actions {
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .vesper-root .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-family: inherit;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          white-space: nowrap;
        }

        .vesper-root .btn-solid {
          background: #ffffff;
          color: #000000;
          border: 1px solid #ffffff;
          padding: 0 18px;
          height: var(--btn-h);
          font-size: var(--btn);
          border-radius: 999px;
          font-weight: 600;
        }

        .vesper-root .btn-solid:hover {
          background: #e6e6e6;
          border-color: #e6e6e6;
        }

        .vesper-root .btn-ghost {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          border: 1px solid var(--border);
          padding: 0 16px;
          height: var(--btn-h);
          font-size: var(--btn);
          border-radius: 10px;
        }

        .vesper-root .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Hero Lower Middle Vertical Position */
        .vesper-root .hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          text-align: center;
          padding: 0 24px 32px;
        }

        .vesper-root .hero-copy {
          max-width: var(--copy-max);
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 110px;
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
          font-weight: 600;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.9);
          margin-bottom: 22px;
          text-transform: uppercase;
        }

        .vesper-root h1 {
          font-size: var(--h1);
          font-weight: 500;
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
          gap: 9px;
          font-size: var(--stat-size);
          color: var(--stat);
          letter-spacing: -0.015em;
          text-shadow: 0 1px 6px rgba(0,0,0,0.9);
          font-weight: 350;
        }

        /* Sections Below Hero */
        .vesper-root .content-section {
          position: relative;
          z-index: 10;
          padding: 100px 48px 120px;
          border-top: 1px solid var(--border-soft);
          background: rgba(5, 5, 5, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        /* Floating Showcase Section (No separate background box) */
        .vesper-root #showcase {
          background: transparent !important;
          border-top: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          padding-top: 60px;
          padding-bottom: 100px;
        }

        .vesper-root .section-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .vesper-root .section-title {
          font-size: 34px;
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin-bottom: 14px;
        }

        .vesper-root .section-subtitle {
          font-size: 14.5px;
          color: var(--muted);
          max-width: 580px;
          line-height: 1.6;
          margin-bottom: 56px;
          font-weight: 350;
        }

        .vesper-root .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          width: 100%;
          text-align: left;
        }

        .vesper-root .step-card {
          background: rgba(15, 15, 15, 0.85);
          border: 1px solid var(--border-soft);
          border-radius: 16px;
          padding: 32px 24px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.25s, transform 0.25s;
        }

        .vesper-root .step-card:hover {
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-3px);
        }

        .vesper-root .step-num {
          font-family: monospace;
          font-size: 26px;
          font-weight: 700;
          color: #666666;
          margin-bottom: 16px;
        }

        .vesper-root .step-title {
          font-size: 17px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 10px;
        }

        .vesper-root .step-desc {
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.6;
        }

        /* FAQ Accordion Item */
        .vesper-root .faq-item {
          width: 100%;
          max-width: 800px;
          background: rgba(15, 15, 15, 0.85);
          border: 1px solid var(--border-soft);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 12px;
          text-align: left;
        }

        .vesper-root .faq-btn {
          width: 100%;
          padding: 20px 24px;
          background: transparent;
          border: none;
          color: #ffffff;
          font-family: inherit;
          font-size: 15px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        .vesper-root .faq-ans {
          padding: 0 24px 20px;
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.6;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 14px;
        }

        /* Footer */
        .vesper-root .footer {
          position: relative;
          z-index: 10;
          border-top: 1px solid var(--border-soft);
          padding: 48px var(--header-x) 32px;
          background: rgba(2, 2, 2, 0.98);
          font-size: 12px;
          color: #777777;
        }

        /* Appear Animation Utility */
        .vesper-root .appear {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .vesper-root .appear.is-in {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .vesper-root .header {
            padding: 16px 20px;
            grid-template-columns: 1fr auto;
          }
          .vesper-root #site-nav {
            display: none;
          }
          .vesper-root .header-actions {
            display: none;
          }
          .vesper-root h1 {
            font-size: 38px;
          }
          .vesper-root .stats {
            flex-direction: column;
            align-items: flex-start;
            padding: 20px;
          }
          .vesper-root .content-section {
            padding: 60px 24px 80px;
          }
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

      {/* FRONT HERO PAGE VIEWPORT (UNTOUCHED 100VH VIEWPORT) */}
      <div className="page-hero">
        {/* HEADER NAVBAR */}
        <header className="header">
          <div className="logo appear is-in" onClick={onGoToEditor} aria-label="Vesper.ai">
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
            <button onClick={handleBenefitsClick} className="nav-link appear is-in">Benefits</button>
            <button onClick={handleHowItWorksClick} className="nav-link appear is-in">How It Works</button>
            <button onClick={handleTemplatesNav} className="nav-link appear is-in">Templates</button>
            <button onClick={handlePricingClick} className="nav-link appear is-in">Pricing</button>
            <button onClick={handleFaqsClick} className="nav-link appear is-in">FAQs</button>
          </nav>

          <div className="header-actions appear is-in">
            <button onClick={handleTemplatesNav} className="btn btn-ghost">
              Explore Templates
            </button>
            <button onClick={onGoToEditor} className="btn btn-solid">
              <span>Start Building</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </header>

        {/* HERO MAIN CONTENT */}
        <main className="hero">
          <div className="hero-copy">
            {/* Centered Floating Pill Badge */}
            <div className="badge appear is-in">
              <svg className="badge-star" width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
              </svg>
              <span>AI-POWERED VISUAL WEBSITE BUILDER</span>
            </div>

            {/* H1 Headline with Instrument Serif Italic Accent */}
            <h1 className="appear is-in">
              Build Websites Visually.<br />
              Customize <em>every detail.</em>
            </h1>

            {/* Subtitle / Lede Text */}
            <p className="lede appear is-in">
              Start with a professional template, customize content, typography, colors, layout, and spacing visually, preview responsively across devices, save changes, and publish when ready.
            </p>

            {/* Hero Actions Row */}
            <div className="hero-actions">
              <button
                onClick={onGoToEditor}
                className="btn btn-solid hero-btn appear is-in"
              >
                <span>Start Building Now</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={handleTemplatesNav}
                className="btn btn-ghost hero-btn appear is-in"
              >
                Explore 2 Starter Templates
              </button>
            </div>
          </div>
        </main>

        {/* BOTTOM STATS FOOTER ROW */}
        <footer className="stats">
          <div className="stat appear is-in">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            <span>2 Starter Templates (ApexAI & Flowith)</span>
          </div>

          <div className="stat appear is-in">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
            <span>100% Visual Style & Typography Control</span>
          </div>

          <div className="stat appear is-in">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span>Desktop, Tablet & Mobile Responsive</span>
          </div>
        </footer>
      </div>

      {/* SHOWCASE SECTION FLOATING OVER MAIN PAGE BACKGROUND */}
      <section id="showcase" className="content-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="section-container" style={{ position: 'relative', zIndex: 5 }}>
          {/* Monochromatic Pill Badge */}
          <div className="badge appear is-in" style={{ marginBottom: 16 }}>
            <svg className="badge-star" width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            <span>LIVE EDITOR PREVIEW</span>
          </div>

          {/* Headline matching first section theme (Instrument Serif Italic Accent) */}
          <h2 className="section-title appear is-in" style={{ fontSize: 44, fontWeight: 500, lineHeight: 1.12, letterSpacing: '-0.04em', color: '#ffffff' }}>
            Powerful Visual Editor.<br />
            <em style={{ fontFamily: '"Instrument Serif", Georgia, serif', fontStyle: 'italic', fontWeight: 300, color: '#a3a3a3' }}>
              Unlimited possibilities.
            </em>
          </h2>

          {/* Subtitle */}
          <p className="section-subtitle appear is-in" style={{ fontSize: 16, color: '#d8d8d8', maxWidth: 640, marginTop: 12, marginBottom: 44, fontWeight: 350 }}>
            Design, customize, and publish stunning websites with our intuitive drag-and-drop editor and advanced design controls.
          </p>

          {/* High Resolution Mockup Display Container */}
          <div
            className="appear is-in"
            style={{
              position: 'relative',
              zIndex: 5,
              width: '100%',
              maxWidth: 1160,
              margin: '0 auto',
              borderRadius: 20,
              border: '1px solid rgba(255, 255, 255, 0.18)',
              background: 'transparent',
              boxShadow: '0 40px 120px rgba(0, 0, 0, 0.95), 0 0 50px rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onClick={onGoToEditor}
          >
            <img
              src="/editor-showcase.png"
              alt="Vesper.ai Powerful Visual Editor Showcase"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 20 }}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION BELOW HERO */}
      <section id="how-it-works" className="content-section">
        <div className="section-container">
          <div className="badge appear is-in" style={{ marginBottom: 14 }}>
            <svg className="badge-star" width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            <span>WORKFLOW</span>
          </div>

          <h2 className="section-title appear is-in">
            From Starter Template to Live Website in 4 Steps
          </h2>
          <p className="section-subtitle appear is-in">
            Our intuitive visual workflow takes you from initial template selection to a fully customized, responsive website.
          </p>

          <div className="steps-grid">
            <div className="step-card appear is-in">
              <div className="step-num">01</div>
              <h3 className="step-title">Choose a Template</h3>
              <p className="step-desc">
                Start with dark futuristic ApexAI Workflows or light clean Flowith Automation starter templates.
              </p>
            </div>

            <div className="step-card appear is-in">
              <div className="step-num">02</div>
              <h3 className="step-title">Customize Content & Style</h3>
              <p className="step-desc">
                Select elements on canvas and edit content, typography weights, custom colors, layout, and padding.
              </p>
            </div>

            <div className="step-card appear is-in">
              <div className="step-num">03</div>
              <h3 className="step-title">Preview Across Devices</h3>
              <p className="step-desc">
                Test your responsive layout seamlessly across Desktop (1200px), Tablet (768px), and Mobile (375px).
              </p>
            </div>

            <div className="step-card appear is-in">
              <div className="step-num">04</div>
              <h3 className="step-title">Save & Publish</h3>
              <p className="step-desc">
                Persist your customized template model to storage, review revision history, and export your site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION BELOW HOW IT WORKS */}
      <section id="benefits" className="content-section">
        <div className="section-container">
          <div className="badge appear is-in" style={{ marginBottom: 14 }}>
            <svg className="badge-star" width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            <span>CORE CAPABILITIES</span>
          </div>

          <h2 className="section-title appear is-in">
            Everything You Need to Build Your Website
          </h2>
          <p className="section-subtitle appear is-in">
            A complete suite of visual editing, styling, responsive previewing, persistent saving, and AI assistance built directly into one application.
          </p>

          <div className="steps-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="step-card appear is-in">
              <h3 className="step-title" style={{ fontSize: 18, marginBottom: 8 }}>Visual Element Editing</h3>
              <p className="step-desc">
                Select any headline, paragraph, button, or container directly on canvas to inspect and modify properties in real time.
              </p>
            </div>

            <div className="step-card appear is-in">
              <h3 className="step-title" style={{ fontSize: 18, marginBottom: 8 }}>Advanced Typography Controls</h3>
              <p className="step-desc">
                Full control over font size, weight (100–900), line height, letter spacing, text alignment, transform, italic, and text decoration.
              </p>
            </div>

            <div className="step-card appear is-in">
              <h3 className="step-title" style={{ fontSize: 18, marginBottom: 8 }}>Custom Colors & Theme Presets</h3>
              <p className="step-desc">
                Synchronized color pickers and HEX, RGB, RGBA inputs for background, text, and border colors with Quick Theme Presets.
              </p>
            </div>

            <div className="step-card appear is-in">
              <h3 className="step-title" style={{ fontSize: 18, marginBottom: 8 }}>Multi-Viewport Responsive Viewports</h3>
              <p className="step-desc">
                Switch seamlessly between Desktop (1200px), Tablet (768px), and Mobile (375px) viewports with isolated property overrides.
              </p>
            </div>

            <div className="step-card appear is-in">
              <h3 className="step-title" style={{ fontSize: 18, marginBottom: 8 }}>Save Changes & Revision History</h3>
              <p className="step-desc">
                Persistent template saving with dirty tracking (`isDirty`), unsaved changes modal protection, and single-element recovery.
              </p>
            </div>

            <div className="step-card appear is-in">
              <h3 className="step-title" style={{ fontSize: 18, marginBottom: 8 }}>AI-Assisted Proposals</h3>
              <p className="step-desc">
                Non-destructive AI proposal engine suggesting targeted content and design updates with independent accept/reject controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION BELOW BENEFITS */}
      <section id="pricing" className="content-section">
        <div className="section-container">
          <div className="badge appear is-in" style={{ marginBottom: 14 }}>
            <svg className="badge-star" width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            <span>PRICING PLANS</span>
          </div>

          <h2 className="section-title appear is-in">
            Flexible Plans for Every Project
          </h2>
          <p className="section-subtitle appear is-in">
            Choose the plan that fits your workflow. Upgrade or downgrade at any time.
          </p>

          <div className="steps-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', alignItems: 'stretch' }}>
            {/* Starter Plan */}
            <div className="step-card appear is-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '32px 24px' }}>
              <div>
                <div className="badge" style={{ marginBottom: 14, fontSize: 10 }}>STARTER / TRIAL</div>
                <h3 className="step-title" style={{ fontSize: 22, marginBottom: 6 }}>Starter</h3>
                <p className="step-desc" style={{ marginBottom: 20 }}>Perfect for exploring the visual editor and building your first project.</p>
                <div style={{ fontSize: 32, fontWeight: 700, fontFamily: 'monospace', marginBottom: 24, color: '#ffffff' }}>
                  $0 <span style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'sans-serif', fontWeight: 400 }}>/ month</span>
                </div>

                <div style={{ textAlign: 'left', marginBottom: 28, fontSize: 13, color: '#d0d0d0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>2 Starter Templates (ApexAI & Flowith)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>Visual Element Editing on Canvas</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>Basic Typography & Style Controls</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>Desktop, Tablet & Mobile Previews</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>Persistent Template Save Changes</span>
                  </div>
                </div>
              </div>

              <button onClick={onGoToEditor} className="btn btn-ghost" style={{ width: '100%', height: 42, fontSize: 13.5 }}>
                <span>Start Free Trial</span>
              </button>
            </div>

            {/* Pro Plan */}
            <div className="step-card appear is-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '32px 24px', border: '2px solid #ffffff', background: 'rgba(25, 25, 25, 0.95)' }}>
              <div>
                <div className="badge" style={{ marginBottom: 14, fontSize: 10, background: '#ffffff', color: '#000000' }}>MOST POPULAR</div>
                <h3 className="step-title" style={{ fontSize: 22, marginBottom: 6 }}>Pro Creator</h3>
                <p className="step-desc" style={{ marginBottom: 20 }}>For creators, designers, and teams building production websites.</p>
                <div style={{ fontSize: 32, fontWeight: 700, fontFamily: 'monospace', marginBottom: 24, color: '#ffffff' }}>
                  $29 <span style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'sans-serif', fontWeight: 400 }}>/ month</span>
                </div>

                <div style={{ textAlign: 'left', marginBottom: 28, fontSize: 13, color: '#ffffff', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>All Starter Plan Features</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>Advanced Typography (100–900 Weights)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>Custom Colors (HEX, RGB, RGBA & Presets)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>Single-Element Revision History & Recovery</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>Non-Destructive AI Proposals Engine</span>
                  </div>
                </div>
              </div>

              <button onClick={onGoToEditor} className="btn btn-solid" style={{ width: '100%', height: 42, fontSize: 13.5 }}>
                <span>Start Pro Plan</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="step-card appear is-in" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '32px 24px' }}>
              <div>
                <div className="badge" style={{ marginBottom: 14, fontSize: 10 }}>ENTERPRISE</div>
                <h3 className="step-title" style={{ fontSize: 22, marginBottom: 6 }}>Enterprise</h3>
                <p className="step-desc" style={{ marginBottom: 20 }}>For agencies and organizations needing custom starter seeds and team access.</p>
                <div style={{ fontSize: 32, fontWeight: 700, fontFamily: 'monospace', marginBottom: 24, color: '#ffffff' }}>
                  $79 <span style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'sans-serif', fontWeight: 400 }}>/ month</span>
                </div>

                <div style={{ textAlign: 'left', marginBottom: 28, fontSize: 13, color: '#d0d0d0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>All Pro Creator Features</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>Unlimited Starter Template Customization</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>Isolated Responsive Overrides & Viewports</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>Full JSON Code Surface Synchronization</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#ffffff', fontWeight: 700 }}>✓</span> <span>24/7 Priority Support & History Backup</span>
                  </div>
                </div>
              </div>

              <button onClick={onGoToEditor} className="btn btn-ghost" style={{ width: '100%', height: 42, fontSize: 13.5 }}>
                <span>Contact Sales</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS SECTION BELOW PRICING */}
      <section id="faqs" className="content-section">
        <div className="section-container">
          <div className="badge appear is-in" style={{ marginBottom: 14 }}>
            <svg className="badge-star" width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
            </svg>
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="section-title appear is-in">
            Got Questions? We Have Answers.
          </h2>
          <p className="section-subtitle appear is-in">
            Everything you need to know about Vesper.ai and the visual editor.
          </p>

          <div style={{ width: '100%', maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={item.q} className="faq-item appear is-in">
                  <button onClick={() => toggleFaq(index)} className="faq-btn">
                    <span>{item.q}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0,
                        marginLeft: 12,
                      }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="faq-ans">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20, maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, color: '#ffffff', fontWeight: 600 }}>
            <span>Vesper<span className="logo-suffix">.ai</span></span>
            <span style={{ color: '#777777', fontWeight: 400 }}>— Visual Website Builder</span>
          </div>
          <div>
            © 2026 VESPER.AI. All rights reserved. Powered by Advanced Visual Editor System.
          </div>
        </div>
      </footer>
    </div>
  );
};
