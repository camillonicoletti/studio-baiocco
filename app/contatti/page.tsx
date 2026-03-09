'use client';
import './contatti.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../navbar.css';
import '../globals.css';

export default function ContattiPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const closeTimer = useState<ReturnType<typeof setTimeout> | null>(null);
  const [formData, setFormData] = useState({ nome: '', email: '', telefono: '', messaggio: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!privacyAccepted) {
      setError('Devi prendere visione della Privacy Policy per inviare il messaggio.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/contatti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Si è verificato un errore. Riprova.');
      } else {
        setSent(true);
      }
    } catch {
      setError('Errore di rete. Controlla la connessione e riprova.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="contatti-page" style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.2s ease' }}>
        {/* SFONDO */}
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, backgroundImage: "url('/img/home/sfondo_bending_capovolto.jpg')", backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat' }} />
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, backgroundColor: 'rgba(255,255,255,0.45)' }} />

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

        {/* SPLIT LAYOUT */}
        <div className="contatti-split">
          {/* PANNELLO SINISTRO */}
          <div className="contatti-panel">
            <div className="contatti-panel__head">
              <span className="contatti-panel__eyebrow">Contattaci</span>
              <h1 className="contatti-panel__title">
                Parliamo<br /><em>insieme.</em>
              </h1>
              <p className="contatti-panel__desc">
                Raccontaci la tua situazione. Ti risponderemo il prima possibile con una consulenza personalizzata.
              </p>
            </div>
            <div className="contatti-rows">
              <a href="tel:+393477005683" className="contatti-row">
                <div className="contatti-row__num">01</div>
                <div className="contatti-row__body">
                  <span className="contatti-row__label">Telefono</span>
                  <span className="contatti-row__val">(+39) 347 700 5683</span>
                </div>
                <div className="contatti-row__arrow">
                  <i className="fa-solid fa-phone contatti-row__arrow--icon"></i>
                </div>
              </a>
              <a href="mailto:studiobaiocco@gmail.com" className="contatti-row">
                <div className="contatti-row__num">02</div>
                <div className="contatti-row__body">
                  <span className="contatti-row__label">Email</span>
                  <span className="contatti-row__val">studiobaiocco@gmail.com</span>
                </div>
                <div className="contatti-row__arrow">
                  <i className="fa-solid fa-envelope contatti-row__arrow--icon"></i>
                </div>
              </a>
              <a href="#" className="contatti-row" onClick={(e) => e.preventDefault()}>
                <div className="contatti-row__num">03</div>
                <div className="contatti-row__body">
                  <span className="contatti-row__label">Orari</span>
                  <span className="contatti-row__val">Da Lunedì a Venerdì<br />Riceve per appuntamento</span>
                </div>
                <div className="contatti-row__arrow">
                  <i className="fa-regular fa-clock contatti-row__arrow--icon"></i>
                </div>
              </a>
            </div>
            <div className="contatti-social-row">
              <a href="https://www.instagram.com/romanabaiocco_consulenzalavoro/" target="_blank" rel="noreferrer" className="contatti-social-link"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/in/romana-baiocco-60749523b/" target="_blank" rel="noreferrer" className="contatti-social-link"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://x.com/romana_baiocco" target="_blank" rel="noreferrer" className="contatti-social-link"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="https://wa.me/3477005683" target="_blank" rel="noreferrer" className="contatti-social-link"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>

          {/* MAPPA */}
          <div className="contatti-map-panel">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3026.312423993311!2d16.59718757599365!3d40.66708464036424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13477ff0dd905b0b%3A0xee4c818107ad5cb5!2sStudio%20Baiocco%20Romana!5e0!3m2!1sit!2sit!4v1772793881281!5m2!1sit!2sit"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Studio Baiocco - Via Pietro Nenni 10, Matera"
            />
          </div>
        </div>

        {/* FORM SECTION */}
        <section className="contatti-form-section" id="form">
          <div className="contatti-form-section__inner">
            <div className="contatti-form-section__left">
              <span className="contatti-form-section__tag">Scrivici</span>
              <h2 className="contatti-form-section__title">
                Invia una<br />richiesta
              </h2>
              <p className="contatti-form-section__sub">
                Compilare il form è il modo più veloce per metterci in contatto.
              </p>
              <div className="contatti-form-section__promise">
                <div className="contatti-promise-item">
                  <span className="contatti-promise-item__icon">⚡</span>
                  <span>Risposta entro 24h</span>
                </div>
                <div className="contatti-promise-item">
                  <span className="contatti-promise-item__icon">✦</span>
                  <span>Nessun impegno</span>
                </div>
              </div>
            </div>

            <div className="contatti-form-section__right">
              {sent ? (
                <div className="contatti-success">
                  <div className="contatti-success__circle">✓</div>
                  <h3>Messaggio inviato!</h3>
                  <p>Grazie per averci scritto. Ti risponderemo il prima possibile.</p>
                  <button
                    className="contatti-success__reset"
                    onClick={() => {
                      setSent(false);
                      setFormData({ nome: '', email: '', telefono: '', messaggio: '' });
                    }}
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form className="contatti-form" onSubmit={handleSubmit} noValidate>
                  <div className="contatti-form__row">
                    <div className={`cf ${focused === 'nome' || formData.nome ? 'cf--active' : ''}`}>
                      <label htmlFor="nome">Nome e Cognome *</label>
                      <input
                        id="nome" name="nome" type="text" required
                        value={formData.nome} onChange={handleChange}
                        onFocus={() => setFocused('nome')} onBlur={() => setFocused(null)}
                        placeholder="Mario Rossi"
                      />
                    </div>
                    <div className={`cf ${focused === 'telefono' || formData.telefono ? 'cf--active' : ''}`}>
                      <label htmlFor="telefono">Telefono</label>
                      <input
                        id="telefono" name="telefono" type="tel"
                        value={formData.telefono} onChange={handleChange}
                        onFocus={() => setFocused('telefono')} onBlur={() => setFocused(null)}
                        placeholder="+39 333 000 0000"
                      />
                    </div>
                  </div>
                  <div className={`cf ${focused === 'email' || formData.email ? 'cf--active' : ''}`}>
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email" name="email" type="email" required
                      value={formData.email} onChange={handleChange}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                      placeholder="mario@esempio.it"
                    />
                  </div>
                  <div className={`cf ${focused === 'messaggio' || formData.messaggio ? 'cf--active' : ''}`}>
                    <label htmlFor="messaggio">Messaggio *</label>
                    <textarea
                      id="messaggio" name="messaggio" required rows={5}
                      value={formData.messaggio} onChange={handleChange}
                      onFocus={() => setFocused('messaggio')} onBlur={() => setFocused(null)}
                      placeholder="Descrivi la tua situazione..."
                    />
                  </div>

                  {error && (
                    <div className="contatti-form__error">
                      ⚠️ {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="contatti-form__btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="contatti-form__spinner" />
                        Invio in corso…
                      </>
                    ) : (
                      <>
                        Invia messaggio
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                      </>
                    )}
                  </button>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', marginTop: 4 }}>
                    <input
                      type="checkbox"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      style={{ marginTop: 3, width: 16, height: 16, accentColor: '#c9a84c', flexShrink: 0, cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                      Ho letto e accetto la <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'underline' }}>Privacy Policy</Link>. Dati trattati ai sensi del GDPR.
                    </span>
                  </label>
                </form>
              )}
            </div>
          </div>

          {/* WHATSAPP BLOCK */}
          <div className="contatti-wa-block">
            <div className="contatti-wa-block__inner">
              <div className="contatti-wa-block__left">
                <div>
                  <h3 className="contatti-wa-block__title">Preferisci WhatsApp?</h3>
                  <p className="contatti-wa-block__sub">Scrivici un messaggio. Ti risponderemo il prima possibile.</p>
                </div>
              </div>
              <a href="https://wa.me/3477005683?text=Ciao!%20Sono%20interessato%20al%20tuo%20servizio." target="_blank" rel="noreferrer" className="contatti-wa-block__btn">
                <i className="fab fa-whatsapp"></i>
                Scrivici su WhatsApp
              </a>
            </div>
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
                <li><a href="https://x.com/romana_baiocco" target="_blank" rel="noreferrer"><i className="fa-brands fa-x-twitter"></i><span>X (Twitter)</span></a></li>
                <li><a href="https://wa.me/3477005683" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i><span>WhatsApp</span></a></li>
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