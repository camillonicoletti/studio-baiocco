import "./globals.css";
import Script from "next/script";
import type { ReactNode } from "react";

export const metadata = {
  title: 'Studio Romana Baiocco - Consulente del Lavoro a Matera',
  description: 'Studio Baiocco, Consulente del Lavoro a Matera. Elaborazione Paghe, Amministrazione del Personale e Consulenza Aziendale Professionale.',
  keywords: 'studio baiocco, studio romana baiocco, romana baiocco, consulente del lavoro, studio consulente del lavoro, consulente del lavoro matera, studio baiocco matera, studio romana baiocco matera, consulente del lavoro studio baiocco matera, studio baiocco consulente del lavoro matera, matera studio romana baiocco, matera studi consulenti del lavoro, consulenza del lavoro matera, consulenza lavoro matera, commercialista lavoro matera, studio paghe matera, elaborazione paghe matera, buste paga matera, gestione paghe matera, amministrazione personale matera, gestione personale matera, assunzioni matera, contratti lavoro matera, studio professionale matera, consulente lavoro basilicata, studio baiocco basilicata, paghe basilicata, consulenza aziendale matera, risorse umane matera, gestione dipendenti matera, TFR matera, contributi INPS matera, cedolini paga matera, apertura partita iva matera, lavoro dipendente matera, normativa lavoro matera',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="it">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Oswald:wght@200..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Quicksand:wght@400;600&family=Syne:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        {children}
        <Script src="/js/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}