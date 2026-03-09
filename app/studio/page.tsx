'use client';
import './studio.css';
import Lanyard from '../components/lanyard/lanyard';
import WobbleCard from '../components/WobbleCard/wobble-card';
import Link from "next/link";
import "../navbar.css";
import "../globals.css";
import { useEffect, useState, useRef } from "react";
function useCountUp(target: number, duration: number, start: boolean) {
const [count, setCount] = useState(0);
useEffect(() => {
if (!start) return;
let startTime: number | null = null;
const step = (timestamp: number) => {
if (!startTime) startTime = timestamp;
const progress = Math.min((timestamp - startTime) / duration, 1);
setCount(Math.floor(progress * target));
if (progress < 1) requestAnimationFrame(step);
    };
requestAnimationFrame(step);
  }, [start, target, duration]);
return count;
}
const marqueeItems = [
'Professionalità', '·', 'Legalità', '·', 'Riservatezza', '·',
'Affidabilità', '·', 'Innovazione', '·', 'Trasparenza', '·',
'Competenza', '·', 'Fiducia', '·', 'Precisione', '·',
];
const certificazioni = [
  {
logo: '/img/footer/conslogo.png',
titolo: 'Ordine dei Consulenti del Lavoro',
sottotitolo: 'Iscritta all\'Albo Provinciale di Matera dal 2005 | N.167',
colore: '#022581',
  },
  {
logo: '/img/footer/tribunale.png',
titolo: 'Albo Consulenti Tecnici d\'Ufficio (CTU)',
sottotitolo: 'Iscritta all\'Albo dei Consulenti Tecnici del Tribunale Ordinario - Matera N.207',
colore: '#022581',
  },
  {
logo: '/img/footer/fondlogo.png',
titolo: 'Fondazione Consulenti per il Lavoro',
sottotitolo: 'Delega n.MT13214FL - Fondazione Consulenti per il Lavoro',
colore: '#022581',
  },
  {
logo: '/img/footer/assecologo.png',
titolo: 'Consulente del Lavoro asseveratore ASSE.CO.',
sottotitolo: 'Abilitato al rilascio dell\u2019ASSE.CO (Asseverazione di Conformità dei rapporti di lavoro)',
colore: '#022581',
  },
];
export default function StudioPage() {
const [scrolled, setScrolled] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
const [submenuOpen, setSubmenuOpen] = useState(false);
const closeTimer = useState<ReturnType<typeof setTimeout> | null>(null);
const [countersVisible, setCountersVisible] = useState(false);
const countersRef = useRef<HTMLDivElement>(null);
const anni = useCountUp(21, 2500, countersVisible);
const clienti = useCountUp(100, 2500, countersVisible);
const pratiche = useCountUp(100, 2500, countersVisible);
useEffect(() => {
const handleScroll = () => setScrolled(window.scrollY > 50);
window.addEventListener('scroll', handleScroll);
const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCountersVisible(true); },
      { threshold: 0.5, rootMargin: '0px 0px -130px 0px' }
    );
if (countersRef.current) observer.observe(countersRef.current);
return () => { window.removeEventListener('scroll', handleScroll); observer.disconnect(); };
  }, []);
const toggleMenu = () => setMenuOpen(!menuOpen);
const openSubmenu = () => {
if (closeTimer[0]) clearTimeout(closeTimer[0]);
setSubmenuOpen(true);
  };
const scheduleClose = () => {
closeTimer[0] = setTimeout(() => setSubmenuOpen(false), 120);
  };
useEffect(() => {
if (menuOpen) {
document.body.style.overflow = 'hidden';
    } else {
document.body.style.overflow = '';
    }
return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
return (
<>
<main style={{ position: "relative" }}>
{/* SFONDO */}
<div style={{ position: "fixed", inset: 0, zIndex: -1, backgroundImage: "url('/img/home/sfondo_bending_capovolto.jpg')", backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }} />
<div style={{ position: "fixed", inset: 0, zIndex: -1, backgroundColor: "rgba(255,255,255,0.45)" }} />
{/* NAVBAR */}
<nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
<Link href="/"><img src="/img/logo/logo_piccolo.png" alt="Logo Studio Baiocco" /></Link>
<div className="navbar__container">
<Link href="/" id="navbar__logo"></Link>
<button
className={`navbar__toggle ${menuOpen ? 'active' : ''}`}
aria-label="Apri il menu"
aria-expanded={menuOpen}
type="button"
onClick={toggleMenu}
>
<span></span><span></span><span></span>
</button>
<ul className={`navbar__menu ${menuOpen ? 'active' : ''}`}>
<li className="navbar__item"><Link href="/" className="navbar__links">Home</Link></li>
<li className="navbar__item"><Link href="/studio" className="navbar__links">Studio</Link></li>
<li className="navbar__item navbar__dropdown"
onMouseEnter={openSubmenu}
onMouseLeave={scheduleClose}
>
<a href="#" className="navbar__links" onClick={(e) => e.preventDefault()}>Servizi</a>
<ul
className={`navbar__submenu${submenuOpen ? ' show' : ''}`}
onMouseEnter={openSubmenu}
onMouseLeave={scheduleClose}
>
                {/* ── Card 01: Consulenza ── */}
                <li className="box-home box-home1" data-num="01">
                  <Link href="/servizi/consulenza" />
                  <span className="nav-tag">Consulenza</span>
                  <h3>Consulenza del lavoro</h3>
                  <p>Un aiuto concreto all&apos;attività imprenditoriale.</p>
                </li>

                {/* ── Card 02: Paghe ── */}
                <li className="box-home box-home2" data-num="02">
                  <Link href="/servizi/paghe" />
                  <span className="nav-tag">Paghe</span>
                  <h3>Elaborazione paghe</h3>
                  <p>Risposte veloci e soluzioni innovative.</p>
                </li>

                {/* ── Card 03: Amministrazione ── */}
                <li className="box-home box-home3" data-num="03">
                  <Link href="/servizi/amministrazione" />
                  <span className="nav-tag">Amministrazione</span>
                  <h3>Amministrazione del personale</h3>
                  <p>Un servizio perfettamente collaudato.</p>
                </li>
</ul>
</li>
<li className="navbar__item"><Link href="/modulistica" className="navbar__links">Modulistica</Link></li>
<li className="navbar__item"><Link href="/contatti" className="navbar__links">Contatti</Link></li>
<li className="navbar__btn">
<a href="https://studiobaioccoromana.it/hrportal" target="_blank" rel="noreferrer" className="button">AREA CLIENTI</a>
</li>
</ul>
</div>
</nav>
{/* ── HERO + LANYARD AFFIANCATI ── */}
<div className="studio-hero-wrapper">
<section className="studio-hero">
<div className="studio-hero__text">
<h1>Prima che un lavoro,<br /><span>una passione</span></h1>
<p className="studio-hero__subtitle">Consulente del Lavoro a Matera dal 2005</p>
<div className="studio-hero__quote">
<blockquote>Il mio obiettivo è affiancare le aziende nelle loro scelte, aiutarle ad essere virtuose e operanti nella legalità, con professionalità, riservatezza e passione autentica.</blockquote>
<cite>Dott.ssa Romana Baiocco</cite>
</div>
</div>
</section>
<div className="studio-lanyard-section">
<Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
</div>
</div>
{/* ── COUNTERS ── */}
<section className="studio-counters" ref={countersRef}>
<div className="studio-counter">
<span className="studio-counter__number">{anni}+</span>
<span className="studio-counter__label">Anni di esperienza</span>
</div>
<div className="studio-counter__divider" />
<div className="studio-counter">
<span className="studio-counter__number">{clienti}%</span>
<span className="studio-counter__label">Formazione Continua</span>
</div>
<div className="studio-counter__divider" />
<div className="studio-counter">
<span className="studio-counter__number">{pratiche.toLocaleString()}%</span>
<span className="studio-counter__label">Gestione Digitale</span>
</div>
</section>
{/* ── VALORI ── */}
<section className="studio-values">
<h2 className="studio-values__title">I NOSTRI VALORI</h2>
<div className="bento-grid">
<div className="bento-row">
<WobbleCard containerClassName="bento-card bento-card--large bento-card--blue">
<div className="bento-card__text">
<div className="bento-card__icon">⚖️</div>
<h3>Legalità</h3>
<p>Operiamo sempre nel pieno rispetto della normativa vigente, garantendo correttezza e trasparenza in ogni aspetto della nostra attività.</p>
</div>
<div className="bento-card__deco bento-card__deco--right">
<div className="bento-deco-circle bento-deco-circle--1" />
<div className="bento-deco-circle bento-deco-circle--2" />
</div>
</WobbleCard>
<WobbleCard containerClassName="bento-card bento-card--small bento-card--purple">
<div className="bento-card__text">
<div className="bento-card__icon">🤝</div>
<h3>Fiducia</h3>
<p>Relazioni durature basate su trasparenza e affidabilità e sulla conoscenza approfondita delle necessità e delle problematiche dei nostri clienti.</p>
</div>
</WobbleCard>
</div>
<div className="bento-row">
<WobbleCard containerClassName="bento-card bento-card--full bento-card--indigo">
<div className="bento-card__text bento-card__text--wide">
<div className="bento-card__icon">💡</div>
<h3>Innovazione &amp; Riservatezza</h3>
<p>Utilizziamo strumenti moderni e soluzioni innovative per rispondere puntualmente alle esigenze dei clienti, trattando ogni informazione con la massima discrezione e rispetto della privacy.</p>
</div>
<div className="bento-card__deco bento-card__deco--bottom">
<div className="bento-deco-circle bento-deco-circle--3" />
<div className="bento-deco-circle bento-deco-circle--4" />
</div>
</WobbleCard>
</div>
</div>
</section>
{/* ── MARQUEE ── */}
<div className="studio-marquee">
<div className="studio-marquee__track">
{[...marqueeItems, ...marqueeItems].map((item, i) => (
<span key={i} className={item === '·' ? 'studio-marquee__dot' : 'studio-marquee__word'}>
{item}
</span>
            ))}
</div>
</div>
{/* ── CERTIFICAZIONI ── */}
<section className="studio-cert">
<h2 className="studio-cert__title">ABILITAZIONI E CERTIFICAZIONI</h2>
<p className="studio-cert__subtitle">Garanzia di professionalità riconosciuta</p>
<div className="studio-cert__grid">
{certificazioni.map((c) => (
<div className="studio-cert__card" key={c.titolo} style={{ '--cert-color': c.colore } as React.CSSProperties}>
<div className="studio-cert__icon">
<img src={c.logo} alt={c.titolo} />
</div>
<div className="studio-cert__info">
<strong>{c.titolo}</strong>
<span>{c.sottotitolo}</span>
</div>
<div className="studio-cert__check">✓</div>
</div>
            ))}
</div>
</section>
{/* FOOTER */}
<footer className="modern-footer">
<div className="footer-content">
<div className="footer-column">
<div className="footer-logo"><img src="/img/logo/logo_piccolo.png" alt="Studio Baiocco" /></div>
<p className="footer-tagline">Consulenza del lavoro professionale e affidabile per la tua azienda.</p>
</div>
<div className="footer-column">
<h3 className="footer-title">Mappa del Sito</h3>
<ul className="footer-links">
<li><Link href="/">Home</Link></li>
<li><Link href="/studio">Studio</Link></li>
<li><Link href="/servizi/consulenza">Consulenza del lavoro</Link></li>
<li><Link href="/servizi/paghe">Elaborazione paghe</Link></li>
<li><Link href="/servizi/amministrazione">Amministrazione del personale</Link></li>
<li><Link href="/modulistica">Modulistica</Link></li>
<li><Link href="/contatti">Contatti</Link></li>
</ul>
</div>
<div className="footer-column">
<h3 className="footer-title">Seguici</h3>
<ul className="footer-social">
<li><a href="https://www.instagram.com/romanabaiocco_consulenzalavoro/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i><span>Instagram</span></a></li>
<li><a href="https://www.linkedin.com/in/romana-baiocco-60749523b/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i><span>LinkedIn</span></a></li>
<li><a href="https://x.com/romana_baiocco?t=m1DsjX8qrHUwKXUyV-v78w&s=08" target="_blank" rel="noreferrer"><i className="fa-brands fa-x-twitter"></i><span>X (Twitter)</span></a></li>
<li><a href="https://wa.me/3477005683?text=Ciao!%20Sono%20interessato%20al%20tuo%20servizio." target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i><span>WhatsApp</span></a></li>
</ul>
</div>
<div className="footer-column">
<h3 className="footer-title">Contatti</h3>
<ul className="footer-contact">
<li><i className="fa-solid fa-phone"></i><span>(+39) 347 700 5683</span></li>
<li><a href="mailto:studiobaiocco@gmail.com"><i className="fa-solid fa-envelope"></i><span>studiobaiocco@gmail.com</span></a></li>
<li><a href="https://maps.app.goo.gl/bUaAH2uT7iVKxHgT7" target="_blank" rel="noreferrer"><i className="fa-solid fa-location-dot"></i><span>Via Pietro Nenni, 10<br />Matera</span></a></li>
</ul>
</div>
</div>
<div className="footer-bottom">
      <p>© StudioBaiocco 2026. All rights reserved | Website created by{' '}
      <a href="https://www.linkedin.com/in/camillonicoletti" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
      Camillo Nicoletti
    </a>
  </p>
</div>
</footer>
{/* ── MOBILE FULLSCREEN OVERLAY MENU ── */}
<div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
<div className="mobile-menu-overlay__header">
<img src="/img/logo/logo_piccolo.png" alt="Studio Baiocco" className="mobile-menu-overlay__logo" />
<button className="mobile-menu-overlay__close" onClick={() => setMenuOpen(false)} aria-label="Chiudi menu">✕</button>
</div>
<div className="mobile-menu-overlay__body">
<Link href="/" className="mobile-menu-overlay__link" onClick={() => setMenuOpen(false)} data-item="1">Home</Link>
<Link href="/studio" className="mobile-menu-overlay__link" onClick={() => setMenuOpen(false)} data-item="2">Studio</Link>
<div className="mobile-menu-overlay__section" data-item="3">
<div className="mobile-menu-overlay__section-title">Servizi</div>
<div className="mobile-menu-overlay__sub">
<Link href="/servizi/consulenza" className="mobile-menu-overlay__sublink" onClick={() => setMenuOpen(false)}>→ Consulenza del lavoro</Link>
<Link href="/servizi/paghe" className="mobile-menu-overlay__sublink" onClick={() => setMenuOpen(false)}>→ Elaborazione paghe</Link>
<Link href="/servizi/amministrazione" className="mobile-menu-overlay__sublink" onClick={() => setMenuOpen(false)}>→ Amministrazione del personale</Link>
</div>
</div>
<Link href="/modulistica" className="mobile-menu-overlay__link" onClick={() => setMenuOpen(false)} data-item="4">Modulistica</Link>
<Link href="/contatti" className="mobile-menu-overlay__link" onClick={() => setMenuOpen(false)} data-item="5">Contatti</Link>
<a href="https://studiobaioccoromana.it/hrportal" target="_blank" rel="noreferrer" className="mobile-menu-overlay__cta" onClick={() => setMenuOpen(false)} data-item="6">AREA CLIENTI</a>
</div>
</div>
</main>
</>
  );
}
