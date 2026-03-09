"use client";
import React from "react";
import "./globals.css";
import "./navbar.css";
import "./home.css";
import TiltedCard from "./components/TiltedCard/TiltedCard";
import LogoLoop from "./components/LogoLoop/LogoLoop";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";


function AnimatedPath({ d, fill, progress }: {
  d: string;
  fill: string;
  progress: MotionValue<number>;
}) {
  const strokeProgress = useTransform(progress, [0, 0.6], [0, 1]);
  const clipHeight = useTransform(progress, [0.2, 1], ["0%", "100%"]);
  const clipId = `clip-${d.slice(1, 10).replace(/\s/g, "")}`;

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <motion.rect
            x="0"
            y="0"
            width="422"
            style={{ height: clipHeight, scaleY: 1 }}
          />
        </clipPath>
      </defs>
      <motion.path
        d={d}
        fill={fill === "none" ? "none" : fill}
        stroke="none"
        clipPath={fill === "none" ? undefined : `url(#${clipId})`}
        style={{ opacity: progress }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke={fill === "none" ? "transparent" : fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="0"
        style={{ pathLength: strokeProgress }}
      />
    </g>
  );
}

export default function Home() {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const closeTimer = useState<ReturnType<typeof setTimeout> | null>(null);

  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [screenSize, setScreenSize] = useState("800px");

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth <= 767;
      setIsMobile(mobile);
      const size = Math.max(window.innerWidth, window.innerHeight);
      setScreenSize(`${size}px`);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const cardWidth  = isMobile ? "85vw"  : "400px";
  const cardHeight = isMobile ? "300px" : "450px";

  const heroScale         = useTransform(scrollYProgress, [0, 1],      [1, isMobile ? 0.02 : 0.25]);
  const heroOpacity       = useTransform(scrollYProgress, [0, 1],      [1, 1]);
  const titleOpacity      = useTransform(scrollYProgress, [0, 0.08],   [1, 0]);
  const borderRadius      = useTransform(scrollYProgress, [0, 1],      ["0px", "28px"]);
  const signatureProgress = useTransform(scrollYProgress, [0.1, 0.6],  [0, 1]);
  const overlayOpacity    = useTransform(scrollYProgress, [0.5, 0.9],  [0, 1]);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 150);
    const t2 = setTimeout(() => setShowSubtitle(true), 450);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const openSubmenu = () => {
    if (closeTimer[0]) clearTimeout(closeTimer[0]);
    setSubmenuOpen(true);
  };

  const scheduleClose = () => {
    closeTimer[0] = setTimeout(() => setSubmenuOpen(false), 120);
  };

  // Blocca scroll body quando menu mobile è aperto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const marqueeStyle: React.CSSProperties = {
    fontFamily: 'Oswald',
    fontSize: '5rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '6px',
    background: 'linear-gradient(90deg, white, #c2abd9, #acc2e7, #acc2e7)',
    backgroundSize: '300% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'gradientShift 8s ease infinite',
  };

  const marqueeStyle2: React.CSSProperties = {
    ...marqueeStyle,
    fontWeight: 300,
  };

  const marqueeTexts = [
    { node: <span style={marqueeStyle}>Studio Baiocco</span> },
    { node: <span style={marqueeStyle}>✦</span> },
    { node: <span style={marqueeStyle}>Consulenza del Lavoro</span> },
    { node: <span style={marqueeStyle}>✦</span> },
  ];

  const marqueeTexts2 = [
    { node: <span style={marqueeStyle2}>Romana Baiocco</span> },
    { node: <span style={marqueeStyle2}>✦</span> },
    { node: <span style={marqueeStyle2}>Matera</span> },
    { node: <span style={marqueeStyle2}>✦</span> },
  ];

  const partnerLogos = [
    { src: "/img/footer/conslogo.png", alt: "Consiglio Nazionale", title: "Consiglio Nazionale" },
    { src: "/img/footer/fondlogo.png", alt: "Fondazione", title: "Fondazione" },
    { src: "/img/footer/tribunale.png", alt: "Tribunale", title: "Tribunale" },
    { src: "/img/footer/assecologo.png", alt: "Asseco", title: "Asseco" },
  ];

  const signaturePaths = [
    {
      d: "M251.84 326.45 c-10 -1.23 -16.29 -4.98 -18.80 -11.15 l-0.98 -2.42 0 -38.50 0 -38.50 9.78 0 c7.49 0.04 10.55 0.21 13.06 0.77 7.83 1.70 13.57 4.93 19.70 11.10 7.40 7.44 12.80 18.16 15.61 31.01 0.81 3.74 0.98 5.62 0.98 13.49 0 10.38 -0.34 12.12 -3.28 18.25 -1.36 2.89 -2.42 4.30 -5.40 7.27 -6.34 6.38 -11.83 8.47 -22.80 8.72 -3.49 0.09 -7.06 0.04 -7.87 -0.04z",
      fill: "none",
    },
    {
      d: "M233.33 225.97 l-1.28 -0.30 -0.13 -35.05 c-0.04 -25.52 0.04 -35.18 0.38 -35.61 0.72 -0.89 15.78 -0.81 19.53 0.09 4.85 1.11 8.76 3.36 12.55 7.19 5.23 5.28 8.17 11.02 10.04 19.82 1.36 6.30 1.36 18.68 0.04 24.63 -1.36 5.96 -3.79 10.55 -7.49 14.29 -2.64 2.64 -3.45 3.19 -6 4.04 -2.77 0.89 -3.79 0.98 -14.68 1.06 -6.42 0.04 -12.25 -0.04 -12.97 -0.17z",
      fill: "none",
    },
    {
      d: "M237.97 399.24 c-0.64 -0.98 -0.64 -1.15 -0.04 -2.08 0.38 -0.55 2.17 -1.83 4 -2.85 5.32 -2.85 16.04 -10.17 22.04 -14.97 23.14 -18.51 41.43 -41.05 54.03 -66.45 10.85 -21.99 17.48 -44.20 20.50 -68.75 0.89 -7.53 1.02 -27.06 0.21 -34.20 -0.81 -7.15 -2.51 -16.76 -4.13 -23.74 -0.81 -3.45 -1.49 -6.72 -1.49 -7.23 0 -1.36 0.77 -2 2.38 -2 1.70 0 2.21 0.64 5.45 7.10 9.78 19.57 16 41.18 17.74 61.77 0.64 7.49 0.30 23.31 -0.68 30.25 -3.45 25.35 -13.06 48.11 -28.54 67.43 -5.40 6.72 -16.76 17.91 -24.46 24.04 -5.57 4.47 -14.34 10.72 -17.61 12.59 -0.47 0.30 -3.06 1.79 -5.74 3.36 -2.68 1.53 -7.36 4.04 -10.42 5.57 -3.02 1.49 -5.83 2.89 -6.17 3.06 -0.77 0.43 -3.15 1.32 -14.68 5.23 -9.44 3.23 -11.27 3.53 -12.38 1.87z",
      fill: "#00257a",
    },
    {
      d: "M229.08 336.24 c-8.17 -0.26 -18.42 -0.55 -22.76 -0.55 -4.34 -0.04 -8.72 -0.26 -9.74 -0.43 -2.59 -0.51 -3.32 -1.87 -1.83 -3.36 0.64 -0.64 1.74 -0.85 5.23 -1.06 2.42 -0.17 5.10 -0.47 5.96 -0.72 5.53 -1.57 7.40 -6.13 8.47 -20.42 0.26 -3.57 0.43 -35.78 0.43 -85 0 -74.83 0.04 -79.25 0.72 -79.51 0.43 -0.17 10.72 -0.30 22.89 -0.30 21.23 -0.04 22.33 0 27.10 0.89 11.40 2.21 19.02 5.79 25.18 11.83 6.55 6.47 10 15.31 10.04 25.65 0 15.14 -6.85 28.08 -21.36 40.41 -1.83 1.53 -3.32 2.89 -3.32 3.06 0 0.13 1.57 0.89 3.53 1.66 19.36 7.78 33.90 21.78 38.92 37.48 2.47 7.61 3.06 16.93 1.62 24.38 -2.64 13.70 -10.29 26.03 -21.01 33.90 -3.87 2.85 -12.17 7.15 -16.04 8.34 -1.87 0.60 -3.79 1.23 -4.25 1.40 -1.36 0.55 -11.87 2.13 -17.44 2.59 -6.17 0.51 -12.80 0.47 -32.33 -0.26z m39.05 -12.04 c5.28 -1.36 8.89 -3.49 13.10 -7.70 2.98 -2.98 4.04 -4.38 5.40 -7.27 2.85 -5.96 3.28 -8 3.23 -16.97 0 -6.55 -0.13 -8.59 -0.94 -12.21 -2.81 -12.80 -8.21 -23.57 -15.61 -31.01 -4.30 -4.34 -8.72 -7.44 -13.06 -9.10 -5.79 -2.25 -8.98 -2.72 -18.42 -2.72 l-8.51 -0.04 0 37.22 0 37.22 0.98 2.42 c2.51 6.17 8.81 9.91 18.80 11.15 3.28 0.38 11.74 -0.17 15.02 -0.98z m-8.42 -100.40 c2.55 -0.85 3.36 -1.40 6 -4.04 5.91 -5.96 8.34 -13.23 8.38 -25.14 0 -13.70 -3.45 -23.52 -10.98 -31.05 -3.79 -3.83 -7.70 -6.08 -12.55 -7.19 -3.70 -0.89 -16.25 -0.94 -16.97 -0.09 -0.34 0.43 -0.43 9.74 -0.38 34.33 l0.13 33.78 1.28 0.30 c0.72 0.13 5.96 0.21 11.70 0.17 9.53 -0.09 10.68 -0.17 13.40 -1.06z",
      fill: "#00257a",
    },
    {
      d: "M78.70 277.79 c-2.13 -2.13 -9.78 -19.14 -12.89 -28.71 -9.36 -28.71 -10.81 -59 -4.13 -85.42 8.55 -33.82 29.65 -62.79 61.47 -84.61 13.23 -9.06 30.20 -17.23 46.28 -22.21 6.93 -2.13 8 -2.30 8.98 -1.28 1.49 1.45 0.51 2.94 -3.36 5.06 -1.15 0.64 -2.42 1.40 -2.81 1.74 -0.34 0.34 -0.85 0.60 -1.11 0.60 -0.68 0 -12.68 8.13 -16.17 10.93 -1.70 1.36 -4.93 4 -7.23 5.83 -5.36 4.34 -19.61 18.63 -24.89 24.93 -10.59 12.68 -17.48 23.10 -24.38 36.80 -10.93 21.65 -17.44 42.75 -20.42 65.68 -2.68 21.10 -1.40 44.79 3.45 62.79 1.45 5.32 1.70 7.27 1.02 8.08 -0.77 0.89 -2.81 0.81 -3.83 -0.21z",
      fill: "#7f92c1",
    },
    {
      d: "M135.49 286.04 c-8.34 -1.11 -17.53 -3.62 -22.76 -6.25 l-2.77 -1.36 -0.13 -10.42 c-0.04 -5.74 0.09 -15.48 0.30 -21.61 0.38 -12 0.43 -12.08 2.68 -12.63 1.53 -0.38 2.30 0.89 2.68 4.47 0.72 7.36 2.47 13.87 5.10 19.14 5.96 11.87 18.38 18.46 33.18 17.74 11.40 -0.60 20.80 -5.36 26.08 -13.23 3.83 -5.70 4.98 -10.29 4.68 -18.04 -0.34 -7.70 -2.59 -13.74 -7.78 -20.76 -4.64 -6.21 -8.17 -9.53 -22.76 -21.23 -19.40 -15.57 -27.69 -24.33 -33.56 -35.52 -6.17 -11.74 -7.66 -24.89 -3.87 -34.42 3.74 -9.57 14.93 -19.53 32.16 -28.67 8 -4.21 18.04 -8.81 19.31 -8.81 0.26 0 0.43 2.13 0.43 5.23 l-0.04 5.19 -7.96 3.91 c-11.57 5.70 -17.82 10.64 -20.63 16.29 -1.19 2.38 -1.36 3.28 -1.49 6.64 -0.17 4.42 0.43 7.19 2.55 11.40 3.49 6.98 8.93 12.46 25.44 25.57 14.04 11.10 19.82 16.17 25.27 21.99 9.61 10.25 15.48 21.23 17.53 32.67 0.94 5.36 0.94 14.72 0 19.70 -3.23 16.93 -13.23 30.08 -28.20 37.10 -2.30 1.06 -4.72 2.25 -5.36 2.59 -0.68 0.30 -1.62 0.60 -2.13 0.60 -0.51 0 -1.32 0.30 -1.74 0.64 -0.47 0.34 -1.36 0.64 -2 0.64 -0.64 0 -1.28 0.17 -1.40 0.38 -0.13 0.17 -1.62 0.47 -3.32 0.60 -1.70 0.17 -4.42 0.47 -6.08 0.72 -4.21 0.55 -18.38 0.43 -23.40 -0.26z",
      fill: "#7f92c1",
    },
  ];

  return (
    <main>
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

      {/* ─── UNICO CONTENITORE: hero + servizi ─── */}
      <div className="page-wrapper">

        {/* HERO STICKY */}
        <div className="hero-sticky-area" ref={heroRef}>
          <div className="hero-sticky-inner">

            <div style={{
              position: "absolute", inset: 0, zIndex: 0,
              display: "flex", flexDirection: "column", justifyContent: "center",
              gap: "20px", overflow: "hidden",
            }}>
              {/* @ts-ignore */}
              <LogoLoop logos={marqueeTexts} speed={100} direction="left" logoHeight={90} gap={60} hoverSpeed={0} ariaLabel="Testo scorrevole 1" />
              {/* @ts-ignore */}
              <LogoLoop logos={marqueeTexts2} speed={80} direction="right" logoHeight={90} gap={60} hoverSpeed={0} ariaLabel="Testo scorrevole 2" />
            </div>

            <motion.div
              aria-hidden="true"
              className="hero-photo"
              style={isMobile ? {
                position: "absolute", top: "50%", left: "50%",
                width: `${screenSize}`, height: `${screenSize}`,
                zIndex: 1, scale: heroScale, opacity: heroOpacity,
                transformOrigin: "center center", borderRadius, overflow: "hidden",
                translateX: "-50%", translateY: "-50%",
              } : {
                position: "absolute", inset: 0, zIndex: 1,
                scale: heroScale, opacity: heroOpacity,
                transformOrigin: "center center", borderRadius, overflow: "hidden",
              }}
            >
              <img src="/img/home/foto_copertina_oscurata.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <motion.div style={{
                position: "absolute", inset: 0,
                backgroundImage: "url('/img/home/sfondo_bending_capovolto.jpg')",
                backgroundSize: "cover", backgroundPosition: "center",
                opacity: overlayOpacity, zIndex: 2, pointerEvents: "none",
              }} />
            </motion.div>

            <svg viewBox="0 0 422 449" xmlns="http://www.w3.org/2000/svg" style={{
              position: "absolute", inset: 0, width: "90%", height: "90%",
              top: "5%", left: "5%", zIndex: 15, pointerEvents: "none", overflow: "visible",
            }}>
              {signaturePaths.map((path, i) => (
                <AnimatedPath key={i} d={path.d} fill={path.fill} progress={signatureProgress} />
              ))}
            </svg>

            <motion.header style={{
              position: "absolute", inset: 0, zIndex: 20,
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", textAlign: "center",
              pointerEvents: "none", opacity: titleOpacity,
            }}>
              <div className="title-container">
                <h1 id="animatedTitle" className={showTitle ? "title-visible" : ""} style={{ textAlign: "center" }}>
                  <div className="title-stacked">
                    <span>ROMANA</span>
                    <span>BAIOCCO</span>
                  </div>
                </h1>
                <h2 id="subtitle" className={`subtitle ${showSubtitle ? "subtitle-visible" : ""}`} style={{ textAlign: "center" }}>
                  Consulente del Lavoro
                </h2>
              </div>
            </motion.header>

          </div>
        </div>

        {/* SERVICE SECTION */}
        <div className="services-section">
          <div className="titolo-servizi">
            <h1 className="gradient-title">Esplora i nostri servizi</h1>
          </div>

          <div className="service">
            <div className="services-container">
              <Link href="/servizi/consulenza" style={{ textDecoration: 'none' }}>
                <TiltedCard
                  imageSrc="" altText="Consulenza del lavoro" captionText=""
                  containerHeight={cardHeight} containerWidth={cardWidth}
                  imageHeight={cardHeight} imageWidth={cardWidth}
                  rotateAmplitude={15} scaleOnHover={1.06}
                  showMobileWarning={false} showTooltip={false} displayOverlayContent
                  lottieSrc="https://lottie.host/dd2511e3-6e51-4752-b214-5c6cd69e28d6/KRWyJ4dzH9.lottie"
                  lottieOpacity={1} lottieWidth="50%" lottieHeight="50%"
                  overlayContent={<div className="tilted-overlay"><h3>Consulenza del Lavoro</h3></div>}
                />
              </Link>
              <Link href="/servizi/paghe" style={{ textDecoration: 'none' }}>
                <TiltedCard
                  imageSrc="" altText="Elaborazione paghe" captionText="Elaborazione paghe"
                  containerHeight={cardHeight} containerWidth={cardWidth}
                  imageHeight={cardHeight} imageWidth={cardWidth}
                  rotateAmplitude={15} scaleOnHover={1.06}
                  showMobileWarning={false} showTooltip={false} displayOverlayContent
                  lottieSrc="https://lottie.host/f1e874dc-fd32-4588-8444-9b10877d57c3/Z8ds7oYrOk.lottie"
                  lottieOpacity={1}
                  overlayContent={<div className="tilted-overlay"><h3>Elaborazione paghe</h3></div>}
                />
              </Link>
              <Link href="/servizi/amministrazione" style={{ textDecoration: 'none' }}>
                <TiltedCard
                  imageSrc=""
                  lottieSrc="https://lottie.host/3830086e-7e84-49ec-8748-c9910262db65/Nvi4EouTgh.lottie"
                  altText="Amministrazione del personale" captionText="Amministrazione del personale"
                  containerHeight={cardHeight} containerWidth={cardWidth}
                  imageHeight={cardHeight} imageWidth={cardWidth}
                  rotateAmplitude={15} scaleOnHover={1.06}
                  showMobileWarning={false} showTooltip={false} displayOverlayContent lottieOpacity={1}
                  overlayContent={<div className="tilted-overlay"><h3>Amministrazione personale</h3></div>}
                />
              </Link>
            </div>
          </div>

          <div style={{ marginTop: '30px', overflow: 'hidden' }}>
            {/* @ts-ignore */}
            <LogoLoop logos={partnerLogos} speed={80} direction="left" logoHeight={130} gap={80} hoverSpeed={0} scaleOnHover fadeOut fadeOutColor="rgba(255, 255, 255, 0)" ariaLabel="Partner istituzionali" />
          </div>
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
  );
}
