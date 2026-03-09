'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../navbar.css';
import '../globals.css';

export default function PrivacyPage() {
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
  const openSubmenu = () => { if (closeTimer[0]) clearTimeout(closeTimer[0]); setSubmenuOpen(true); };
  const scheduleClose = () => { closeTimer[0] = setTimeout(() => setSubmenuOpen(false), 120); };

  return (
    <>
      <main style={{ minHeight: '100vh', background: '#f5f7fa' }}>

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
              <li className="navbar__btn"><a href="https://studiobaioccoromana.it/hrportal" target="_blank" rel="noreferrer" className="button">AREA CLIENTI</a></li>
            </ul>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ background: 'linear-gradient(135deg, #0a1628 0%, #01247e 100%)', padding: '120px 24px 60px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#c9a84c', fontWeight: 700, display: 'block', marginBottom: 16 }}>
            Documento legale
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.03em' }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', maxWidth: 560, margin: '0 auto' }}>
            Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)
          </p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', marginTop: 16 }}>
            Ultimo aggiornamento: marzo 2026
          </p>
        </div>

        {/* CONTENT */}
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '60px 24px 100px' }}>

          <Section num="1" title="Titolare del trattamento">
            <p>Il Titolare del trattamento dei dati personali è:</p>
            <InfoBox>
              <b>Studio Baiocco Romana — Consulenza del Lavoro</b><br />
              Via Pietro Nenni, 10 — Matera<br />
              Email: <a href="mailto:studiobaiocco@gmail.com">studiobaiocco@gmail.com</a><br />
              Telefono: <a href="tel:+393477005683">(+39) 347 700 5683</a>
            </InfoBox>
          </Section>

          <Section num="2" title="Tipologie di dati raccolti">
            <p>Attraverso il sito <strong>studiobaioccoromana.it</strong> vengono raccolti i seguenti dati personali:</p>
            <SubSection title="2.1 — Form di contatto">
              <p>Compilando il modulo presente nella pagina Contatti, l'utente fornisce volontariamente:</p>
              <ul>
                <li><b>Nome e cognome</b> (obbligatorio)</li>
                <li><b>Indirizzo email</b> (obbligatorio)</li>
                <li><b>Numero di telefono</b> (facoltativo)</li>
                <li><b>Contenuto del messaggio</b> (obbligatorio)</li>
              </ul>
              <p>Questi dati vengono trasmessi via email al Titolare tramite il servizio <strong>Resend</strong> (vedi sezione 6) e non vengono archiviati su database.</p>
            </SubSection>
            <SubSection title="2.2 — Dati di navigazione">
              <p>I sistemi informatici e le procedure software preposte al funzionamento del sito acquisiscono, nel corso del loro normale esercizio, alcuni dati la cui trasmissione è implicita nell'uso dei protocolli di comunicazione Internet, tra cui: indirizzi IP, tipo di browser, sistema operativo, pagine visitate e orari di accesso. Tali dati non sono raccolti per essere associati a interessati identificati, ma per la sola verifica del corretto funzionamento del sito.</p>
            </SubSection>
          </Section>

          <Section num="3" title="Finalità e base giuridica del trattamento">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#01247e', color: '#fff' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px 0 0 0' }}>Finalità</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '0 8px 0 0' }}>Base giuridica</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Rispondere alle richieste inviate tramite il form di contatto', 'Interesse legittimo del Titolare (art. 6, par. 1, lett. f GDPR) / Esecuzione di misure precontrattuali'],
                  ['Gestione della comunicazione con potenziali clienti', 'Interesse legittimo del Titolare'],
                  ['Adempimento di obblighi di legge', 'Obbligo legale (art. 6, par. 1, lett. c GDPR)'],
                ].map(([f, b], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#f8f9fb' : '#fff' }}>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #eee' }}>{f}</td>
                    <td style={{ padding: '12px 16px', borderBottom: '1px solid #eee', color: '#555' }}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section num="4" title="Modalità di trattamento e conservazione">
            <p>I dati personali sono trattati con strumenti elettronici per il tempo strettamente necessario a conseguire gli scopi per cui sono stati raccolti.</p>
            <ul>
              <li>I dati del form di contatto vengono trasmessi via email e conservati nelle caselle di posta elettronica del Titolare.</li>
              <li>I dati vengono conservati per il tempo necessario alla gestione della richiesta e, successivamente, per un massimo di <strong>24 mesi</strong>, salvo obblighi di legge che richiedano una conservazione più lunga.</li>
              <li>Non viene effettuato alcun trattamento automatizzato né profilazione degli utenti.</li>
            </ul>
          </Section>

          <Section num="5" title="Comunicazione e diffusione dei dati">
            <p>I dati personali non vengono venduti, ceduti o diffusi a terzi, salvo nei seguenti casi:</p>
            <ul>
              <li><b>Fornitori di servizi tecnici</b> (vedi sezione 6) che trattano i dati in qualità di Responsabili del trattamento, nei limiti strettamente necessari allo svolgimento del servizio.</li>
              <li><b>Autorità competenti</b>, ove richiesto da obblighi di legge o provvedimenti dell'autorità.</li>
            </ul>
          </Section>

          <Section num="6" title="Servizi di terze parti (Sub-Responsabili)">
            <SubSection title="Resend — Invio email transazionali">
              <p>Il sito utilizza <strong>Resend</strong> (Resend Inc., USA) per la trasmissione delle email generate dal form di contatto. Resend agisce come Responsabile del trattamento. I dati trasmessi (nome, email, telefono, messaggio) vengono utilizzati esclusivamente per l'inoltro della comunicazione.</p>
              <p>Per maggiori informazioni: <a href="https://resend.com" target="_blank" rel="noreferrer">resend.com/privacy</a></p>
            </SubSection>
            <SubSection title="Google Maps — Mappa interattiva">
              <p>La pagina Contatti incorpora una mappa di <strong>Google Maps</strong> (Google LLC, USA). Il caricamento della mappa può comportare la raccolta di dati da parte di Google secondo la propria <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a>.</p>
            </SubSection>
          </Section>

          <Section num="7" title="Diritti dell'interessato">
            <p>Ai sensi degli artt. 15–22 del GDPR, l'utente ha il diritto di:</p>
            <ul>
              <li><b>Accesso</b> — ottenere conferma che sia o meno in corso un trattamento di dati personali che lo riguardano</li>
              <li><b>Rettifica</b> — ottenere la correzione di dati inesatti o l'integrazione di dati incompleti</li>
              <li><b>Cancellazione</b> ("diritto all'oblio") — richiedere la cancellazione dei propri dati</li>
              <li><b>Limitazione</b> — richiedere la limitazione del trattamento</li>
              <li><b>Portabilità</b> — ricevere i propri dati in formato strutturato e leggibile da dispositivo automatico</li>
              <li><b>Opposizione</b> — opporsi in qualsiasi momento al trattamento basato su interesse legittimo</li>
              <li><b>Reclamo</b> — proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">garanteprivacy.it</a>)</li>
            </ul>
            <p>Per esercitare i propri diritti, è possibile contattare il Titolare scrivendo a: <a href="mailto:studiobaiocco@gmail.com">studiobaiocco@gmail.com</a></p>
          </Section>

          <Section num="8" title="Cookie">
            <p>Il sito <strong>studiobaioccoromana.it</strong> non utilizza cookie di profilazione né cookie di terze parti a fini pubblicitari. Vengono utilizzati esclusivamente cookie tecnici strettamente necessari al funzionamento del sito (es. gestione della sessione), per i quali non è richiesto il consenso ai sensi della normativa vigente.</p>
          </Section>

          <Section num="9" title="Trasferimento dei dati extra-UE">
            <p>L'utilizzo del servizio Resend può comportare il trasferimento dei dati verso gli Stati Uniti. Tale trasferimento avviene nel rispetto delle garanzie previste dal GDPR, in particolare mediante le Clausole Contrattuali Standard approvate dalla Commissione Europea.</p>
          </Section>

          <Section num="10" title="Modifiche alla presente informativa">
            <p>Il Titolare si riserva il diritto di apportare modifiche alla presente informativa in qualsiasi momento, dandone pubblicità agli utenti su questa pagina. Si prega dunque di consultare questa pagina periodicamente, prendendo come riferimento la data di ultima modifica indicata in cima al documento.</p>
          </Section>

          {/* BACK LINK */}
          <div style={{ textAlign: 'center', marginTop: 60 }}>
            <Link href="/contatti" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#01247e', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>
              ← Torna alla pagina Contatti
            </Link>
          </div>

        </div>

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
                <li><a href="https://maps.app.goo.gl/bUaAH2uT7iVKxHgT7" target="_blank" rel="noreferrer"><i className="fa-solid fa-location-dot"></i><span>Via Pietro Nenni, 10 — Matera</span></a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© StudioBaiocco 2026. All rights reserved | Website created by Camillo Nicoletti</p>
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

/* ── Componenti interni ── */

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20, paddingBottom: 12, borderBottom: '2px solid #01247e' }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#c9a84c', letterSpacing: '0.1em', background: '#fff8e8', border: '1px solid #c9a84c', borderRadius: 4, padding: '2px 8px' }}>
          Art. {num}
        </span>
        <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0a1628' }}>{title}</h2>
      </div>
      <div style={{ fontSize: '0.93rem', color: '#444', lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 20, paddingLeft: 16, borderLeft: '3px solid #e8edf8' }}>
      <h3 style={{ margin: '0 0 10px', fontSize: '0.92rem', fontWeight: 700, color: '#01247e' }}>{title}</h3>
      {children}
    </div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#f0f4ff', border: '1px solid #c5d5f5', borderRadius: 10, padding: '16px 20px', marginTop: 14, fontSize: '0.9rem', lineHeight: 1.8, color: '#333' }}>
      {children}
    </div>
  );
}
