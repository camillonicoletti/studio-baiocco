'use client';
import './paghe.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../../navbar.css';
import '../../globals.css';
import Image from 'next/image';

const servizi = [
  {
    num: '01', icon: '👥', tag: 'HR',
    titolo: 'Inquadramento personale dipendente',
    desc: 'Elaboriamo contratti di lavoro su misura che bilanciano tutele normative e obiettivi aziendali, garantendo solidità giuridica e prevenendo potenziali controversie future.',
    features: ['Valutazione', 'Previsione di costo', 'Corretto Inquadramento'],
    color: 1,
  },
  {
    num: '02', icon: '🧾', tag: 'HR',
    titolo: 'Elaborazione paghe',
    desc: "Attraverso un processo rigoroso, gestiamo con precisione ogni fase dell'elaborazione paghe, assicurando la conformità normativa e la soddisfazione dei dipendenti.",
    features: ['Registrazione presenze', 'Elaborazione Cedolini', 'Tenuta del LUL (Libro Unico del Lavoro)'],
    color: 2,
  },
  {
    num: '03', icon: '📊', tag: 'HR',
    titolo: 'Adempimenti mensili',
    desc: 'Garantiamo la regolarità degli adempimenti mensili, prevenendo sanzioni e mantenendo un rapporto trasparente con enti previdenziali e assicurativi.',
    features: ['Invio UNIEMENS', 'Cassa Integrazione Maltempo Edilizia', 'Denuncia Cassa Edile'],
    color: 3,
  },
  {
    num: '04', icon: '📅', tag: 'HR',
    titolo: 'Adempimenti annuali',
    desc: "Affianchiamo l'azienda nella gestione degli adempimenti annuali, assicurando la conformità normativa e prevenendo sanzioni amministrative.",
    features: ['Autoliquidazione INAIL', 'Modello 770', 'Certificazione Unica', 'Prospetto Informativo Disabili'],
    color: 4,
  },
];

export default function PaghePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const closeTimer = useState<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const openSubmenu = () => {
    if (closeTimer[0]) clearTimeout(closeTimer[0]);
    setSubmenuOpen(true);
  };
  const scheduleClose = () => {
    closeTimer[0] = setTimeout(() => setSubmenuOpen(false), 120);
  };

  return (
    <>
      <main style={{ position: 'relative' }}>
        {/* SFONDO */}
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, backgroundImage: "url('/img/home/sfondo_bending_capovolto.jpg')", backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }} />
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, backgroundColor: 'rgba(255,255,255,0.45)' }} />

        {/* NAVBAR */}
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <Link href="/"><img src="/img/logo/logo_piccolo.png" alt="Logo Studio Baiocco" /></Link>
          <div className="navbar__container">
            <Link href="/" id="navbar__logo"></Link>
            <button className={`navbar__toggle ${menuOpen ? 'active' : ''}`} aria-label="Apri il menu" aria-expanded={menuOpen} type="button" onClick={toggleMenu}>
              <span></span><span></span><span></span>
            </button>
            <ul className={`navbar__menu ${menuOpen ? 'active' : ''}`}>
              <li className="navbar__item"><Link href="/" className="navbar__links">Home</Link></li>
              <li className="navbar__item"><Link href="/studio" className="navbar__links">Studio</Link></li>
              <li className="navbar__item navbar__dropdown" onMouseEnter={openSubmenu} onMouseLeave={scheduleClose}>
                <a href="#" className="navbar__links" onClick={(e) => e.preventDefault()}>Servizi</a>
                <ul className={`navbar__submenu${submenuOpen ? ' show' : ''}`} onMouseEnter={openSubmenu} onMouseLeave={scheduleClose}>
                  <li className="box-home box-home1" data-num="01"><Link href="/servizi/consulenza" /><span className="nav-tag">Consulenza</span><h3>Consulenza del lavoro</h3><p>Un aiuto concreto all&apos;attività imprenditoriale.</p></li>
                  <li className="box-home box-home2" data-num="02"><Link href="/servizi/paghe" /><span className="nav-tag">Paghe</span><h3>Elaborazione paghe</h3><p>Risposte veloci e soluzioni innovative.</p></li>
                  <li className="box-home box-home3" data-num="03"><Link href="/servizi/amministrazione" /><span className="nav-tag">Amministrazione</span><h3>Amministrazione del personale</h3><p>Un servizio perfettamente collaudato.</p></li>
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

        {/* HERO */}
        <section className="consulenza-hero">
          <div className="consulenza-hero__bg-grid" />
          <div className="consulenza-hero__glow" />
          <div className="consulenza-hero__content">
            <h1 className="consulenza-hero__title">
              Elaborazione<br /><span>Paghe</span>
            </h1>
            <p className="consulenza-hero__subtitle">
              Dalla busta paga alle dichiarazioni contributive e fiscali, ci occupiamo di ogni
              adempimento per lasciare a te il tempo di fare impresa.
            </p>
          </div>
        </section>

        {/* CARDS */}
        <section className="consulenza-cards-section">
          <div className="consulenza-section-header">
            <span className="consulenza-section-header__tag">I nostri servizi</span>
            <h2 className="consulenza-section-header__title">
              Tutto ciò di cui<br /><em>la tua azienda ha bisogno</em>
            </h2>
          </div>
          <div className="consulenza-stack">
            {servizi.map((s) => (
              <div key={s.num} className={`s-card s-card--${s.color}`}>
                <div className="s-card__bg" />
                <div className="s-card__deco-circle s-card__deco-circle--1" />
                <div className="s-card__deco-circle s-card__deco-circle--2" />
                <div className="s-card__content">
                  <div className="s-card__left">
                    <div className="s-card__top">
                      <span className="s-card__num">{s.num}</span>
                      <div className="s-card__icon">{s.icon}</div>
                    </div>
                    <div className="s-card__tag">{s.tag}</div>
                    <h3 className="s-card__title">{s.titolo}</h3>
                    <p className="s-card__desc">{s.desc}</p>
                  </div>
                  <div className="s-card__right">
                    <ul className="s-card__features">
                      {s.features.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                    <Link href="/contatti#form" className="s-card__cta">Richiedi info →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="consulenza-drag-hint" />
        </section>

        {/* ── AREA CLIENTI ── */}
        <section className="ac-section">
          <div className="ac-section__grid" />

          <div className="ac-inner">
            {/* testo in alto */}
            <div className="ac-header">
              <span className="ac-header__eyebrow">Accesso Esclusivo</span>
              <h2 className="ac-header__title">Area Clienti<br /><em>Riservata</em></h2>
              <p className="ac-header__subtitle">Finalmente liberi dalla consegna mensile dei cedolini. <br></br>Ogni documento del Processo Paghe con un click</p>
            </div>

            {/* immagine mockup */}
            <div className="ac-mockup">
              <Image
                src="/img/logo/areaclienti.png"
                alt="Area Clienti — Studio Baiocco"
                width={1000}
                height={660}
                className="ac-mockup__img"
                priority
              />
            </div>

            {/* bottone sotto il mockup */}
            <div className="ac-cta">
              <a href="https://studiobaioccoromana.it/hrportal" target="_blank" rel="noreferrer" className="ac-header__btn">
                Accedi all&apos;Area Clienti
              </a>
              <p className="ac-header__note">Accesso riservato ai clienti dello Studio Baiocco</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="consulenza-cta">
          <span className="consulenza-cta__eyebrow">Inizia oggi</span>
          <h2 className="consulenza-cta__title">
            Hai bisogno di<br /><em>una consulenza?</em>
          </h2>
          <Link href="/contatti#form" className="consulenza-cta__btn">Contattaci ora</Link>
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

        {/* MOBILE OVERLAY */}
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
