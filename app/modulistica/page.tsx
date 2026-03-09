'use client';
import './modulistica.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../navbar.css';
import '../globals.css';

type Modulo = {
  id: string;
  categoria: string;
  titolo: string;
  desc: string;
  icon: string;
  tag: string;
  file: string;
  filePreview?: string; // se presente, viene usato per l'anteprima al posto di file
  tipo?: string;
  aggiornato: string;
};

const moduli: Modulo[] = [
  {
    id: 'm01',
    categoria: 'Presenze',
    titolo: 'Foglio Presenze Automatico',
    desc: 'Modulo per la rilevazione automatica delle presenze dei dipendenti, con calcolo delle ore lavorate e reportistica mensile.',
    icon: '🪪',
    tag: 'PRES',
    file: '/moduli/FoglioPresenze_StudioBaiocco.xlsx',         // ← download Excel
    filePreview: '/moduli/FoglioPresenze_StudioBaiocco.pdf',   // ← anteprima PDF
    tipo: 'xlsx',
    aggiornato: 'Mar 2026',
  },
  {
    id: 'm04',
    categoria: 'Detrazioni & Agevolazioni',
    titolo: "Richiesta Detrazioni d'Imposta",
    desc: "Dichiarazione per le detrazioni d'imposta per carichi di famiglia e lavoro dipendente (artt. 12 e 13 DPR 917/86).",
    icon: '📋',
    tag: 'DET',
    file: '/moduli/RICHIESTA_DETRAZIONI.pdf',
    aggiornato: 'Mar 2026',
  },
  {
    id: 'm05',
    categoria: 'Detrazioni & Agevolazioni',
    titolo: 'Trattamento Integrativo',
    desc: 'Modulo per la gestione del trattamento integrativo (ex bonus Renzi).',
    icon: '💶',
    tag: 'TI',
    file: '/moduli/TRATTAMENTO_INTEGRATIVO.pdf',
    aggiornato: 'Mar 2026',
  },
  {
    id: 'm06',
    categoria: 'Detrazioni & Agevolazioni',
    titolo: 'Indennità Aggiuntiva e Ulteriore Detrazione',
    desc: "Modulo per la gestione dell'indennità Aggiuntiva e dell'ulteriore detrazione introdotte dalla Legge di Bilancio 2025 (L. 207/2024).",
    icon: '📊',
    tag: 'IAD',
    file: '/moduli/Indennita_Aggiuntiva_e_Ulteriore_Detrazione.pdf',
    aggiornato: 'Mar 2026',
  },
  {
    id: 'm07',
    categoria: 'Detrazioni & Agevolazioni',
    titolo: 'Rinuncia Detassazione Maggiorazioni',
    desc: "Modulo per la rinuncia all'imposta sostitutiva del 15% su maggiorazioni e indennità per lavoro notturno, festivo e a turni (L. 199/2025).",
    icon: '✍️',
    tag: 'RIN',
    file: '/moduli/Rinuncia_detass_maggiorazioni_ed_indennita.pdf',
    aggiornato: 'Mar 2026',
  },
  {
    id: 'm08',
    categoria: 'Assunzione & Contratti',
    titolo: 'Scelta Destinazione TFR',
    desc: 'Modulo per la scelta della destinazione del Trattamento di Fine Rapporto a fondo pensione o mantenimento in azienda.',
    icon: '🏦',
    tag: 'TFR',
    file: '/moduli/SCELTA_DESTINAZIONE_TFR.pdf',
    aggiornato: 'Mar 2026',
  },
  {
    id: 'm09',
    categoria: 'Assunzione & Contratti',
    titolo: 'Comunicazione Lavoro Intermittente (a chiamata)',
    desc: 'Modulo UNI per la comunicazione obbligatoria delle prestazioni dei lavoratori intermittenti al Ministero del Lavoro.',
    icon: '📤',
    tag: 'UNI',
    file: '/moduli/Modello_UNI_Intermittenti.pdf',
    aggiornato: 'Mar 2026',
  },
  {
    id: 'm02',
    categoria: 'Fisco & Pagamenti',
    titolo: 'Modello F24',
    desc: 'Modello di pagamento unificato per imposte sui redditi, IVA, contributi INPS/INAIL e altri tributi.',
    icon: '🏦',
    tag: 'F24',
    file: '/moduli/MODELLO_F24.pdf',
    aggiornato: 'Mar 2026',
  },
  {
    id: 'm03',
    categoria: 'Fisco & Pagamenti',
    titolo: 'Modello F23',
    desc: "Modello di pagamento per tasse, imposte, sanzioni da versare all'Agenzia delle Entrate.",
    icon: '🏛️',
    tag: 'F23',
    file: '/moduli/MODELLO_F23.pdf',
    aggiornato: 'Mar 2026',
  },
];

const categorie = ['Tutte', ...Array.from(new Set(moduli.map((m) => m.categoria)))];

export default function ModulisticaPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [categoriaAttiva, setCategoriaAttiva] = useState('Tutte');
  const [ricerca, setRicerca] = useState('');
  const [previewModulo, setPreviewModulo] = useState<Modulo | null>(null);
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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewModulo(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (previewModulo) document.body.style.overflow = 'hidden';
    else if (!menuOpen) document.body.style.overflow = '';
  }, [previewModulo, menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const openSubmenu = () => {
    if (closeTimer[0]) clearTimeout(closeTimer[0]);
    setSubmenuOpen(true);
  };

  const scheduleClose = () => {
    closeTimer[0] = setTimeout(() => setSubmenuOpen(false), 120);
  };

  const moduliFiltrati = moduli.filter((m) => {
    const matchCat = categoriaAttiva === 'Tutte' || m.categoria === categoriaAttiva;
    const matchRic =
      ricerca === '' ||
      m.titolo.toLowerCase().includes(ricerca.toLowerCase()) ||
      m.desc.toLowerCase().includes(ricerca.toLowerCase());
    return matchCat && matchRic;
  });

  // URL da usare per l'anteprima: filePreview se esiste, altrimenti file
  const getPreviewUrl = (m: Modulo) => m.filePreview ?? m.file;

  return (
    <>
      <main style={{ position: 'relative' }}>
        {/* SFONDO */}
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, backgroundImage: "url('/img/home/sfondo_bending_capovolto.jpg')", backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }} />
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, backgroundColor: 'rgba(255,255,255,0.45)' }} />

        {/* NAVBAR */}
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <Link href="/">
            <img src="/img/logo/logo_piccolo.png" alt="Logo Studio Baiocco" />
          </Link>
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
              <li
                className="navbar__item navbar__dropdown"
                onMouseEnter={openSubmenu}
                onMouseLeave={scheduleClose}
              >
                <a href="#" className="navbar__links" onClick={(e) => e.preventDefault()}>Servizi</a>
                <ul
                  className={`navbar__submenu${submenuOpen ? ' show' : ''}`}
                  onMouseEnter={openSubmenu}
                  onMouseLeave={scheduleClose}
                >
                  <li className="box-home box-home1" data-num="01">
                    <Link href="/servizi/consulenza" />
                    <span className="nav-tag">Consulenza</span>
                    <h3>Consulenza del lavoro</h3>
                    <p>Un aiuto concreto all&apos;attività imprenditoriale.</p>
                  </li>
                  <li className="box-home box-home2" data-num="02">
                    <Link href="/servizi/paghe" />
                    <span className="nav-tag">Paghe</span>
                    <h3>Elaborazione paghe</h3>
                    <p>Risposte veloci e soluzioni innovative.</p>
                  </li>
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

        {/* ── HERO ── */}
        <section className="modu-hero">
          <div className="modu-hero__bg-grid" />
          <div className="modu-hero__glow" />
          <div className="modu-hero__content">
            <h1 className="modu-hero__title">
              Modulistica<br /><span>&amp; Documenti</span>
            </h1>
            <p className="modu-hero__subtitle">
              Tutti i moduli di cui hai bisogno, sempre aggiornati e pronti al download.
              Cerca, sfoglia per categoria e scarica in un clic.
            </p>
            <div className="modu-search">
              <span className="modu-search__icon">🔍</span>
              <input
                type="text"
                placeholder="Cerca un modulo…"
                value={ricerca}
                onChange={(e) => setRicerca(e.target.value)}
                className="modu-search__input"
              />
              {ricerca && (
                <button className="modu-search__clear" onClick={() => setRicerca('')} aria-label="Cancella ricerca">✕</button>
              )}
            </div>
          </div>
        </section>

        {/* ── FILTRI CATEGORIE ── */}
        <section className="modu-filtri-section">
          <div className="modu-filtri">
            {categorie.map((cat) => (
              <button
                key={cat}
                className={`modu-filtro-btn ${categoriaAttiva === cat ? 'active' : ''}`}
                onClick={() => setCategoriaAttiva(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="modu-count">
            <span>{moduliFiltrati.length}</span> moduli disponibili
          </p>
        </section>

        {/* ── GRIGLIA MODULI ── */}
        <section className="modu-grid-section">
          {moduliFiltrati.length === 0 ? (
            <div className="modu-empty">
              <span>📭</span>
              <p>Nessun modulo trovato. Prova con un altro termine o categoria.</p>
            </div>
          ) : (
            <div className="modu-grid">
              {moduliFiltrati.map((m) => (
                <div key={m.id} className="modu-card">
                  <div className="modu-card__header">
                    <span className="modu-card__icon">{m.icon}</span>
                    <span className="modu-card__tag">{m.tag}</span>
                  </div>
                  <div className="modu-card__body">
                    <span className="modu-card__categoria">{m.categoria}</span>
                    <h3 className="modu-card__titolo">{m.titolo}</h3>
                    <p className="modu-card__desc">{m.desc}</p>
                  </div>
                  <div className="modu-card__footer">
                    <span className="modu-card__aggiornato">Aggiornato: {m.aggiornato}</span>
                    <div className="modu-card__actions">
                      <button
                        className="modu-card__btn modu-card__btn--preview"
                        onClick={() => setPreviewModulo(m)}
                        aria-label="Anteprima"
                        title="Visualizza anteprima"
                      >
                        👁 Anteprima
                      </button>
                      {/* Scarica sempre il file originale: xlsx per il foglio presenze, pdf per tutti gli altri */}
                      <a
                        href={m.file}
                        download
                        className="modu-card__btn modu-card__btn--download"
                        aria-label={`Scarica ${m.titolo}`}
                      >
                        ↓ Scarica{m.tipo === 'xlsx' ? ' Excel' : ''}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── MODAL PREVIEW ── */}
        {previewModulo && (
          <div
            className="modu-modal-overlay"
            onClick={() => setPreviewModulo(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Anteprima: ${previewModulo.titolo}`}
          >
            <div className="modu-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modu-modal__topbar">
                <div className="modu-modal__topbar-left">
                  <span className="modu-modal__icon">{previewModulo.icon}</span>
                  <div>
                    <span className="modu-modal__cat">{previewModulo.categoria}</span>
                    <h2 className="modu-modal__title">{previewModulo.titolo}</h2>
                  </div>
                </div>
                <button
                  className="modu-modal__close"
                  onClick={() => setPreviewModulo(null)}
                  aria-label="Chiudi anteprima"
                >
                  ✕
                </button>
              </div>

              <div className="modu-modal__viewer">
                {/*
                  getPreviewUrl restituisce filePreview (PDF) se esiste,
                  altrimenti file. Così il foglio presenze mostra il PDF
                  ma il download scarica l'Excel originale.
                */}
                <object
                  data={`${getPreviewUrl(previewModulo)}#toolbar=1&navpanes=0`}
                  type="application/pdf"
                  className="modu-modal__iframe"
                  aria-label={previewModulo.titolo}
                >
                  <div className="modu-modal__pdf-fallback">
                    <p>Il tuo browser non supporta la visualizzazione inline dei PDF.</p>
                    <a
                      href={getPreviewUrl(previewModulo)}
                      target="_blank"
                      rel="noreferrer"
                      className="modu-modal__download"
                    >
                      Apri il PDF in una nuova scheda →
                    </a>
                  </div>
                </object>
              </div>

              <div className="modu-modal__footer">
                <span className="modu-modal__update">Aggiornato: {previewModulo.aggiornato}</span>
                {/* Download nella modale: scarica il file originale */}
                <a
                  href={previewModulo.file}
                  download
                  className="modu-modal__download"
                >
                  ↓ Scarica{previewModulo.tipo === 'xlsx' ? ' Excel' : ' il documento'}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <section className="modu-cta">
          <span className="modu-cta__eyebrow">Hai bisogno di aiuto?</span>
          <h2 className="modu-cta__title">
            Non trovi il modulo<br /><em>che ti serve?</em>
          </h2>
          <Link href="/contatti" className="modu-cta__btn">
            Contattaci ora →
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="modern-footer">
          <div className="footer-content">
            <div className="footer-column">
              <div className="footer-logo">
                <img src="/img/logo/logo_piccolo.png" alt="Studio Baiocco" />
              </div>
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
                <li>
                  <a href="https://www.instagram.com/romanabaiocco_consulenzalavoro/" target="_blank" rel="noreferrer">
                    <i className="fab fa-instagram"></i><span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/romana-baiocco-60749523b/" target="_blank" rel="noreferrer">
                    <i className="fab fa-linkedin"></i><span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/romana_baiocco?t=m1DsjX8qrHUwKXUyV-v78w&s=08" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-x-twitter"></i><span>X (Twitter)</span>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/3477005683?text=Ciao!%20Sono%20interessato%20al%20tuo%20servizio." target="_blank" rel="noreferrer">
                    <i className="fab fa-whatsapp"></i><span>WhatsApp</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Contatti</h3>
              <ul className="footer-contact">
                <li>
                  <i className="fa-solid fa-phone"></i>
                  <span>(+39) 347 700 5683</span>
                </li>
                <li>
                  <a href="mailto:studiobaiocco@gmail.com">
                    <i className="fa-solid fa-envelope"></i>
                    <span>studiobaiocco@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a href="https://maps.app.goo.gl/bUaAH2uT7iVKxHgT7" target="_blank" rel="noreferrer">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>Via Pietro Nenni, 10<br />Matera</span>
                  </a>
                </li>
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
            <a
              href="https://studiobaioccoromana.it/hrportal"
              target="_blank"
              rel="noreferrer"
              className="mobile-menu-overlay__cta"
              onClick={() => setMenuOpen(false)}
              data-item="6"
            >
              AREA CLIENTI
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
