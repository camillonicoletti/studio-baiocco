# Studio Baiocco Romana — Sito Web Ufficiale

Sito web ufficiale di **Studio Baiocco Romana — Consulenza del Lavoro**, realizzato con Next.js e TypeScript. Il sito presenta i servizi dello studio, permette ai clienti di inviare richieste di contatto e include un'area riservata ai clienti.

🌐 **Live:** [studioromanabaiocco.it](https://www.studioromanabaiocco.it)

---

## Stack Tecnologico

| Tecnologia | Utilizzo |
|---|---|
| [Next.js 14](https://nextjs.org/) | Framework React con App Router |
| [React](https://react.dev/) | UI e componenti |
| [TypeScript](https://www.typescriptlang.org/) | Tipizzazione statica |
| [Tailwind CSS](https://tailwindcss.com/) | Styling e layout |
| [Resend](https://resend.com/) | Invio email dal form di contatto |
| [Google Analytics 4](https://analytics.google.com/) | Analisi del traffico |
| [Google Maps Embed](https://developers.google.com/maps) | Mappa nella pagina contatti |
| [Vercel](https://vercel.com/) | Hosting e deploy continuo |
| [Aruba](https://www.aruba.it/) | Registrazione dominio |

---

## Struttura del Progetto

```
studio-baiocco/
├── app/
│   ├── layout.tsx              # Layout globale, metadata, GA4
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Stili globali
│   ├── navbar.css              # Stili navbar
│   ├── favicon.ico             # Favicon
│   ├── icon.png                # Icona Next.js
│   ├── apple-icon.png          # Icona Apple
│   ├── studio/
│   │   └── page.tsx            # Pagina Studio
│   ├── servizi/
│   │   ├── consulenza/
│   │   │   └── page.tsx        # Servizio: Consulenza del lavoro
│   │   ├── paghe/
│   │   │   └── page.tsx        # Servizio: Elaborazione paghe
│   │   └── amministrazione/
│   │       └── page.tsx        # Servizio: Amministrazione del personale
│   ├── modulistica/
│   │   └── page.tsx            # Pagina Modulistica
│   ├── contatti/
│   │   └── page.tsx            # Pagina Contatti con form e mappa
│   └── privacy/
│       └── page.tsx            # Privacy Policy (GDPR)
├── api/
│   └── contact/
│       └── route.ts            # API route per invio email con Resend
├── public/
│   └── img/
│       └── logo/
│           └── logo_piccolo.png
├── .env.local                  
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Pagine

| Percorso | Descrizione |
|---|---|
| `/` | Homepage con hero, servizi e CTA |
| `/studio` | Presentazione dello studio |
| `/servizi/consulenza` | Consulenza del lavoro |
| `/servizi/paghe` | Elaborazione paghe |
| `/servizi/amministrazione` | Amministrazione del personale |
| `/modulistica` | Download modulistica |
| `/contatti` | Form di contatto + Google Maps |
| `/privacy` | Informativa Privacy (GDPR) |

---

## Avvio in Locale

### Prerequisiti

- [Node.js](https://nodejs.org/) versione 18 o superiore
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

### Installazione

```bash
# 1. Clona il repository
git clone https://github.com/tuo-username/studio-baiocco.git
cd studio-baiocco

# 2. Installa le dipendenze
npm install

# 3. Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

### Comandi Disponibili

```bash
npm run dev       # Avvia il server di sviluppo
npm run build     # Build di produzione
npm run start     # Avvia il server di produzione (dopo build)
npm run lint      # Controllo ESLint
```

---

## Servizi Esterni

### Resend
Gestisce l'invio delle email dal form di contatto. Le richieste vengono inviate tramite una API route Next.js (`/api/contact`) che chiama l'API di Resend. [Dashboard Resend →](https://resend.com/overview)

### Google Analytics 4
Il tag GA4 è incluso nel `layout.tsx` globale. I cookie analitici vengono caricati solo previo consenso dell'utente, come da Privacy Policy. [Dashboard GA4 →](https://analytics.google.com/)

### Google Maps
Mappa embed nella pagina `/contatti` che mostra la sede dello studio.

### Aruba
Gestisce la registrazione e il DNS del dominio `studioromanabaiocco.it`. Il dominio punta ai server di Vercel tramite record DNS.

---

## Privacy & GDPR

Il sito è conforme al Regolamento UE 2016/679 (GDPR). L'informativa completa è disponibile su `/privacy` e documenta il trattamento dei dati raccolti tramite form di contatto, cookie analitici (GA4), e i servizi di terze parti (Vercel, Aruba, Resend, Google).

---

## Autore

Sviluppato da **[Camillo Nicoletti →](www.linkedin.com/in/camillonicoletti)**

Per il cliente: **Studio Baiocco Romana — Consulenza del Lavoro**
📍 Via Pietro Nenni, 10 — Matera
📧 studiobaiocco@gmail.com
📞 (+39) 347 700 5683

---

*© 2026 Studio Baiocco Romana. Tutti i diritti riservati.*
