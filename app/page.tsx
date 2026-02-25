'use client';

import { useEffect, useRef } from 'react';
import config from '../config.json';

const PLACEHOLDER = '/placeholder.svg';
const PLACEHOLDER_LOGO = '/placeholder-logo.svg';

function Img({
  src,
  alt,
  className,
  placeholder = PLACEHOLDER,
}: {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}) {
  return (
    <img
      src={src || placeholder}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (target.src !== placeholder) {
          target.src = placeholder;
        }
      }}
    />
  );
}

export default function Home() {
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addFadeRef = (el: HTMLDivElement | null) => {
    if (el && !fadeRefs.current.includes(el)) {
      fadeRefs.current.push(el);
    }
  };

  const { hotel, hero, sections, footer } = config;

  return (
    <main>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href={hotel.url} className="navbar-logo" target="_blank" rel="noopener noreferrer">
            <Img
              src={hotel.logo}
              alt={hotel.name}
              className="navbar-logo-img"
              placeholder={PLACEHOLDER_LOGO}
            />
          </a>
          <a href={hero.ctaUrl} className="navbar-cta" target="_blank" rel="noopener noreferrer">
            {hero.ctaText}
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg">
          <Img src={hero.image} alt={hotel.name} />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">{hero.text}</h1>
          <p className="hero-desc">{hero.description}</p>
          <a href={hero.ctaUrl} className="hero-cta" target="_blank" rel="noopener noreferrer">
            {hero.ctaText}
          </a>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      {sections.about.enabled && (
        <section className="section">
          <div ref={addFadeRef} className="fade-in">
            <h2 className="section-title">{sections.about.title}</h2>
            <div className="about-grid">
              <div className="about-image">
                <Img src={sections.about.image} alt={sections.about.title} />
              </div>
              <div className="about-text-block">
                <p>{sections.about.text}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== GALLERY ===== */}
      {sections.gallery.enabled && (
        <section className="section section-alt">
          <div ref={addFadeRef} className="fade-in">
            <h2 className="section-title">{sections.gallery.title}</h2>
            <div className="gallery-grid">
              {sections.gallery.images.map((img, i) => (
                <div key={i} className="gallery-item">
                  <Img src={img} alt={`${hotel.name} - Bild ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      {sections.cta.enabled && (
        <section className="cta-section">
          <div ref={addFadeRef} className="fade-in">
            <h2 className="cta-title">{sections.cta.title}</h2>
            <p className="cta-text">{sections.cta.text}</p>
            <a
              href={sections.cta.buttonUrl}
              className="cta-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              {sections.cta.buttonText}
            </a>
          </div>
        </section>
      )}

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <p>{footer.text}</p>
      </footer>
    </main>
  );
}
