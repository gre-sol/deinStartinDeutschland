/* ============================================
   DATA LAYER — Dein Start in Deutschland
   Central data management for Journey & Services
   ============================================ */

const SITE = {
  name: 'Dein Start in Deutschland',
  tagline: 'Die wichtigsten Schritte – einfach erklärt und Schritt für Schritt.',
  description: 'Du bist neu in Deutschland? Entdecke die wichtigsten Themen für deinen Start und finde schnell die passenden Services und Informationen.',
  url: '',
  lang: 'de',
};

const JOURNEY_PHASES = [
  {
    id: 'ankommen',
    number: '01',
    icon: '✈',
    title: 'Ankommen',
    subtitle: 'Dein erster Schritt',
    description: 'Die ersten wichtigen Dinge direkt nach deiner Ankunft in Deutschland.',
    colorVar: 'ankommen',
    items: [
      { title: 'Unterkunft', slug: 'unterkunft', status: 'coming-soon' },
      { title: 'SIM-Karte & Internet', slug: 'sim-karte-internet', status: 'multiple-providers' },
      { title: 'Erste Orientierung', slug: 'erste-orientierung', status: 'coming-soon' },
      { title: 'Krankenversicherung', slug: 'krankenversicherung-ankommen', status: 'coming-soon' },
      { title: 'Wichtige Dokumente', slug: 'wichtige-dokumente-ankommen', status: 'coming-soon' },
      { title: 'Notrufnummern & Erste Hilfe', slug: 'notrufnummern', status: 'coming-soon' },
    ],
  },
  {
    id: 'wohnen',
    number: '02',
    icon: '🏠',
    title: 'Wohnen & Anmeldung',
    subtitle: 'Dein Zuhause finden',
    description: 'Wohnungssuche, Mietvertrag und die wichtige Anmeldung beim Bürgeramt.',
    colorVar: 'wohnen',
    items: [
      { title: 'Wohnung finden', slug: 'wohnung-finden', status: 'coming-soon' },
      { title: 'Mietvertrag verstehen', slug: 'mietvertrag-verstehen', status: 'coming-soon' },
      { title: 'Wohnungsgeberbestätigung', slug: 'wohnungsgeberbestaetigung', status: 'coming-soon' },
      { title: 'Anmeldung beim Bürgeramt', slug: 'anmeldung-buergeramt', status: 'coming-soon' },
      { title: 'Meldebescheinigung', slug: 'meldebescheinigung', status: 'coming-soon' },
      { title: 'Gas, Strom & Wasser', slug: 'gas-strom-wasser', status: 'multiple-providers' },
      { title: 'Internet & Router', slug: 'internet-router', status: 'multiple-providers' },
      { title: 'GEZ / Rundfunkbeitrag', slug: 'gez-rundfunkbeitrag', status: 'coming-soon' },
    ],
  },
  {
    id: 'aufenthalt',
    number: '03',
    icon: '🪪',
    title: 'Aufenthalt & Dokumente',
    subtitle: 'Dein Aufenthaltsstatus',
    description: 'Aufenthaltstitel, Arbeitserlaubnis und alle wichtigen Dokumente.',
    colorVar: 'aufenthalt',
    items: [
      { title: 'Aufenthaltstitel', slug: 'aufenthaltstitel', status: 'coming-soon' },
      { title: 'Visum', slug: 'visum', status: 'coming-soon' },
      { title: 'Ausländerbehörde', slug: 'auslaenderbehoerde', status: 'coming-soon' },
      { title: 'Arbeitserlaubnis', slug: 'arbeitserlaubnis', status: 'coming-soon' },
      { title: 'Niederlassungserlaubnis', slug: 'niederlassungserlaubnis', status: 'coming-soon' },
      { title: 'Steuer-ID', slug: 'steuer-id', status: 'coming-soon' },
      { title: 'Wichtige Dokumente', slug: 'wichtige-dokumente', status: 'coming-soon' },
    ],
  },
  {
    id: 'finanzen',
    number: '04',
    icon: '🏦',
    title: 'Finanzen',
    subtitle: 'Geld & Bank',
    description: 'Bankkonto eröffnen, Gehalt verstehen und finanziell durchstarten.',
    colorVar: 'finanzen',
    items: [
      { title: 'Bankkonto', slug: 'bankkonto', status: 'multiple-providers' },
      { title: 'Kreditkarten', slug: 'kreditkarten', status: 'multiple-providers' },
      { title: 'Gehalt verstehen', slug: 'gehalt-verstehen', status: 'coming-soon' },
      { title: 'Kindergeld', slug: 'kindergeld', status: 'coming-soon' },
      { title: 'Steuern & Steuererklärung', slug: 'steuern', status: 'coming-soon' },
      { title: 'Sozialleistungen & BAföG', slug: 'sozialleistungen', status: 'coming-soon' },
      { title: 'Überweisungen', slug: 'ueberweisungen', status: 'multiple-providers' },
      { title: 'Laufende Kosten', slug: 'laufende-kosten', status: 'coming-soon' },
    ],
  },
  {
    id: 'mobilitaet',
    number: '05',
    icon: '🚆',
    title: 'Mobilität',
    subtitle: 'Fortbewegen in Deutschland',
    description: 'ÖPNV, Führerschein, Deutschlandticket und alle Mobilitäts-Infos.',
    colorVar: 'mobilitaet',
    items: [
      { title: 'ÖPNV', slug: 'oepnv', status: 'coming-soon' },
      { title: 'Deutschlandticket', slug: 'deutschlandticket', status: 'multiple-providers' },
      { title: 'ADAC & Mobilität', slug: 'adac-mobilitaet', status: 'multiple-providers' },
      { title: 'Führerschein', slug: 'fuehrerschein', status: 'coming-soon' },
      { title: 'Auto', slug: 'auto', status: 'coming-soon' },
      { title: 'Fahrrad', slug: 'fahrrad', status: 'coming-soon' },
    ],
  },
  {
    id: 'versicherungen',
    number: '06',
    icon: '🛡',
    title: 'Versicherungen',
    subtitle: 'Absicherung für dein Leben',
    description: 'Krankenversicherung, Haftpflicht und weitere wichtige Versicherungen.',
    colorVar: 'versicherungen',
    items: [
      { title: 'Krankenversicherung', slug: 'krankenversicherung', status: 'coming-soon' },
      { title: 'Privathaftpflicht', slug: 'privathaftpflicht', status: 'coming-soon' },
      { title: 'Hausratversicherung', slug: 'hausratversicherung', status: 'coming-soon' },
      { title: 'Versicherungen vergleichen', slug: 'versicherungen', status: 'multiple-providers' },
    ],
  },
  {
    id: 'integration',
    number: '07',
    icon: '🗣',
    title: 'Sprache & Integration',
    subtitle: 'Ankommen im Alltag',
    description: 'Deutsch lernen, Integrationskurse, Bildung, Beruf und Community.',
    colorVar: 'integration',
    items: [
      { title: 'Deutsch lernen', slug: 'deutsch-lernen', status: 'coming-soon' },
      { title: 'Integrationskurs', slug: 'integrationskurs', status: 'coming-soon' },
      { title: 'Beruf & Arbeit', slug: 'beruf-arbeit', status: 'coming-soon' },
      { title: 'Anerkennung von Abschlüssen', slug: 'abschluesse-integration', status: 'coming-soon' },
      { title: 'Schule & Kita', slug: 'schule-kita', status: 'coming-soon' },
      { title: 'Kindergarten & Betreuung', slug: 'kindergarten', status: 'coming-soon' },
      { title: 'Studium & Ausbildung', slug: 'studium-ausbildung', status: 'coming-soon' },
      { title: 'Community', slug: 'community', status: 'coming-soon' },
      { title: 'Freizeit & Vereine', slug: 'freizeit', status: 'coming-soon' },
    ],
  },
  {
    id: 'alltag',
    number: '08',
    icon: '💻',
    title: 'Alltag & Digitale Services',
    subtitle: 'Dein digitaler Alltag',
    description: 'Online-Banking, Behördenportale, wichtige Apps und digitale Services.',
    colorVar: 'alltag',
    items: [
      { title: 'Online-Banking', slug: 'online-banking', status: 'coming-soon' },
      { title: 'Behördenportale', slug: 'behoerdenportale', status: 'coming-soon' },
      { title: 'Wichtige Apps', slug: 'wichtige-apps', status: 'coming-soon' },
      { title: 'Internetanbieter', slug: 'internet-anbieter', status: 'multiple-providers' },
      { title: 'Rundfunkbeitrag', slug: 'rundfunkbeitrag', status: 'coming-soon' },
      { title: 'Weitere Services', slug: 'weitere-services', status: 'coming-soon' },
    ],
  },
  {
    id: 'verlassen',
    number: '09',
    icon: '✈',
    title: 'Deutschland verlassen',
    subtitle: 'Abschluss der Reise',
    description: 'Vorübergehend oder dauerhaft auswandern – Wohnung, Verträge, Umzug und wichtige Vorbereitungen.',
    colorVar: 'verlassen',
    items: [
      { title: 'Vorübergehend ins Ausland', slug: 'voruebergehend-abwesend', status: 'coming-soon' },
      { title: 'Dauerhaft auswandern', slug: 'dauerhaft-auswandern', status: 'coming-soon' },
      { title: 'Wohnung & Verträge', slug: 'wohnung-vertraege-abreise', status: 'coming-soon' },
      { title: 'Sachen einlagern', slug: 'sachen-einlagern', status: 'affiliate' },
      { title: 'Post & Dokumente', slug: 'post-dokumente-abreise', status: 'coming-soon' },
      { title: 'Rückkehr nach Deutschland', slug: 'rueckkehr-deutschland', status: 'coming-soon' },
    ],
  },
];

const SERVICE_CATEGORIES = [
  {
    id: 'wohnen',
    icon: '🏠',
    title: 'Wohnen',
    description: 'Wohnung, Anmeldung & Relocation',
    colorVar: 'wohnen',
    journeyLink: 'wohnen',
    services: [
      { title: 'Wohnungssuche', slug: 'wohnungssuche', available: false, type: 'internal' },
      { title: 'Relocation-Unterstützung', slug: 'relocation', available: false, type: 'internal' },
      { title: 'Mietvertrag', slug: 'mietvertrag', available: false, type: 'internal' },
      { title: 'Anmeldung', slug: 'anmeldung', available: false, type: 'internal' },
      { title: 'Gas, Strom & Wasser', slug: 'gas-strom-wasser-service', available: false, type: 'internal' },
      { title: 'Internet & Rundfunkbeitrag', slug: 'internet-rundfunk', available: false, type: 'internal' },
      { title: 'Wohnungsbezogene Services', slug: 'wohnungs-services', available: false, type: 'internal' },
    ],
  },
  {
    id: 'behoerden',
    icon: '🪪',
    title: 'Behörden & Dokumente',
    description: 'Anmeldung, Aufenthalt, Übersetzungen',
    colorVar: 'aufenthalt',
    journeyLink: 'aufenthalt',
    services: [
      { title: 'Anmeldung', slug: 'anmeldung-behoerde', available: false, type: 'internal' },
      { title: 'Aufenthalt', slug: 'aufenthalt-service', available: false, type: 'internal' },
      { title: 'Ausländerbehörde', slug: 'auslaenderbehoerde-service', available: false, type: 'internal' },
      { title: 'Dokumente', slug: 'dokumente', available: false, type: 'internal' },
      { title: 'Übersetzungen', slug: 'uebersetzungen', available: false, type: 'internal' },
      { title: 'Behördliche Unterstützung', slug: 'behoerdsupport', available: false, type: 'internal' },
    ],
  },
  {
    id: 'mobilitaet',
    icon: '🚗',
    title: 'Mobilität',
    description: 'Führerschein, Auto & Deutschlandticket',
    colorVar: 'mobilitaet',
    journeyLink: 'mobilitaet',
    services: [
      { title: 'Führerschein', slug: 'fuehrerschein-service', available: false, type: 'internal' },
      { title: 'Auto', slug: 'auto-service', available: false, type: 'internal' },
      { title: 'Versicherung', slug: 'auto-versicherung', available: false, type: 'internal' },
      { title: 'Deutschlandticket', slug: 'deutschlandticket-service', available: false, type: 'internal' },
      { title: 'Fahrzeugbezogene Services', slug: 'fahrzeug-services', available: false, type: 'internal' },
    ],
  },
  {
    id: 'versicherungen',
    icon: '🛡',
    title: 'Versicherungen',
    description: 'Krankenversicherung, Haftpflicht & mehr',
    colorVar: 'versicherungen',
    journeyLink: 'versicherungen',
    services: [
      { title: 'Krankenversicherung', slug: 'krankenversicherung-service', available: false, type: 'internal' },
      { title: 'Privathaftpflicht', slug: 'privathaftpflicht-service', available: false, type: 'internal' },
      { title: 'Hausratversicherung', slug: 'hausratversicherung-service', available: false, type: 'internal' },
      { title: 'Weitere Versicherungen', slug: 'weitere-versicherungen-service', available: false, type: 'internal' },
    ],
  },
  {
    id: 'finanzen',
    icon: '🏦',
    title: 'Finanzen',
    description: 'Bankkonto, Geldtransfer & Steuern',
    colorVar: 'finanzen',
    journeyLink: 'finanzen',
    services: [
      { title: 'Bankkonto', slug: 'bankkonto-service', available: false, type: 'internal' },
      { title: 'Geldtransfer', slug: 'geldtransfer', available: false, type: 'internal' },
      { title: 'Kindergeld', slug: 'kindergeld-service', available: false, type: 'internal' },
      { title: 'Steuern', slug: 'steuern-service', available: false, type: 'internal' },
      { title: 'Sozialleistungen', slug: 'sozialleistungen-service', available: false, type: 'internal' },
      { title: 'Finanzielle Services', slug: 'finanz-services', available: false, type: 'internal' },
    ],
  },
  {
    id: 'integration',
    icon: '🗣',
    title: 'Sprache & Integration',
    description: 'Deutschkurse, Integrationskurse & Community',
    colorVar: 'integration',
    journeyLink: 'integration',
    services: [
      { title: 'Deutschkurse', slug: 'deutschkurse', available: false, type: 'internal' },
      { title: 'Integrationskurse', slug: 'integrationskurse', available: false, type: 'internal' },
      { title: 'Sprachpartner', slug: 'sprachpartner', available: false, type: 'internal' },
      { title: 'Schule & Kindergarten', slug: 'schule-kindergarten', available: false, type: 'internal' },
      { title: 'Community', slug: 'community-service', available: false, type: 'internal' },
      { title: 'Freizeit', slug: 'freizeit-service', available: false, type: 'internal' },
    ],
  },
  {
    id: 'karriere',
    icon: '💼',
    title: 'Arbeit & Karriere',
    description: 'Jobs, Bewerbungen & Anerkennung',
    colorVar: 'ankommen',
    journeyLink: null,
    services: [
      { title: 'Jobs finden', slug: 'jobs-finden', available: false, type: 'internal' },
      { title: 'Bewerbungen', slug: 'bewerbungen', available: false, type: 'internal' },
      { title: 'Lebenslauf', slug: 'lebenslauf', available: false, type: 'internal' },
      { title: 'Anerkennung von Abschlüssen', slug: 'abschluesse', available: false, type: 'internal' },
      { title: 'Karriereberatung', slug: 'karriereberatung', available: false, type: 'internal' },
    ],
  },
  {
    id: 'digital',
    icon: '💻',
    title: 'Digitale Services',
    description: 'Online-Banking, Apps & Internet',
    colorVar: 'alltag',
    journeyLink: 'alltag',
    services: [
      { title: 'Online-Banking', slug: 'online-banking-service', available: false, type: 'internal' },
      { title: 'Behördenportale', slug: 'behoerdenportale-service', available: false, type: 'internal' },
      { title: 'Apps', slug: 'apps-service', available: false, type: 'internal' },
      { title: 'Internet', slug: 'internet-service', available: false, type: 'internal' },
      { title: 'Digitale Dienstleistungen', slug: 'digitale-dienste', available: false, type: 'internal' },
    ],
  },
];

/* ---- Providers (central config) ----
   Single source of truth for provider logos, names and links.
   Journey themes only reference provider ids – the rendering in app.js
   resolves them via PROVIDERS.

   type:
     'service'   – neutral service partner / recommendation
     'affiliate' – partner offer with affiliate link (clearly marked,
                   links use rel="sponsored")
*/
const PROVIDERS = [
  {
    id: 'gre',
    name: 'German Relo Experts (GRE)',
    shortName: 'GRE',
    logo: 'Bilder/icons/gre-logo.png',
    url: 'https://g-reloexperts.com/',
    type: 'service',
  },
  {
    id: 'savespace',
    name: 'SaveSpace',
    shortName: 'SaveSpace',
    logo: '',
    url: 'https://savespace.eu/?ref=O8KHZV',
    type: 'affiliate',
    journeyLabel: 'Anbieter',
  },
];

/* Journey theme → provider ids. Themes without a provider entry render a
   "Demnächst" placeholder chip instead of a provider chip. */
const JOURNEY_PROVIDERS = {
  // Phase 01 – Ankommen
  'unterkunft': ['gre'],
  'sim-karte-internet': ['gre'],
  'erste-orientierung': ['gre'],
  'krankenversicherung-ankommen': ['gre'],
  'wichtige-dokumente-ankommen': ['gre'],
  'notrufnummern': ['gre'],
  // Phase 02 – Wohnen & Anmeldung
  'wohnung-finden': ['gre'],
  'mietvertrag-verstehen': ['gre'],
  'wohnungsgeberbestaetigung': ['gre'],
  'anmeldung-buergeramt': ['gre'],
  'meldebescheinigung': ['gre'],
  'gas-strom-wasser': ['gre'],
  'internet-router': ['gre'],
  'gez-rundfunkbeitrag': ['gre'],
  // Phase 03 – Aufenthalt & Dokumente
  'aufenthaltstitel': ['gre'],
  'visum': ['gre'],
  'auslaenderbehoerde': ['gre'],
  'arbeitserlaubnis': ['gre'],
  'niederlassungserlaubnis': ['gre'],
  'steuer-id': ['gre'],
  'wichtige-dokumente': ['gre'],
  // Phase 04 – Finanzen
  'bankkonto': ['gre'],
  'gehalt-verstehen': ['gre'],
  'kindergeld': ['gre'],
  'steuern': ['gre'],
  'sozialleistungen': ['gre'],
  'ueberweisungen': ['gre'],
  'laufende-kosten': ['gre'],
  // Phase 05 – Mobilität
  'oepnv': ['gre'],
  'deutschlandticket': ['gre'],
  'fuehrerschein': ['gre'],
  'auto': ['gre'],
  'fahrrad': ['gre'],
  // Phase 06 – Versicherungen
  'krankenversicherung': ['gre'],
  'privathaftpflicht': ['gre'],
  'hausratversicherung': ['gre'],
  'weitere-versicherungen': ['gre'],
  // Phase 07 – Sprache & Integration
  'deutsch-lernen': ['gre'],
  'integrationskurs': ['gre'],
  'beruf-arbeit': ['gre'],
  'abschluesse-integration': ['gre'],
  'schule-kita': ['gre'],
  'kindergarten': ['gre'],
  'studium-ausbildung': ['gre'],
  'community': ['gre'],
  'freizeit': ['gre'],
  // Phase 08 – Alltag & Digitale Services
  'online-banking': ['gre'],
  'behoerdenportale': ['gre'],
  'wichtige-apps': ['gre'],
  'internet-anbieter': ['gre'],
  'rundfunkbeitrag': ['gre'],
  'weitere-services': ['gre'],
  // Phase 09 – Deutschland verlassen
  'voruebergehend-abwesend': ['gre'],
  'dauerhaft-auswandern': ['gre'],
  'wohnung-vertraege-abreise': ['gre'],
  'sachen-einlagern': ['savespace'],
  'post-dokumente-abreise': ['gre'],
  'rueckkehr-deutschland': ['gre'],
};

/* ---- Service pages (central config) ----
   Two-level journey: a journey theme leads to an internal service page
   (internalUrl), and that page presents one or more provider offers as
   cards. A provider card's CTA opens the external provider only when
   clicked (via its url). This keeps the external provider one step away
   and the internal page fully part of "Dein Start in Deutschland".

   type of a page:
     'internal-page'      – purely informational internal article
     'provider'           – single service offer (e.g. GRE)
     'affiliate'          – single affiliate offer
     'multiple-providers' – several co-listed offers as cards

   providers[].type:
     'service'   – neutral service recommendation (no commission)
     'affiliate' – partner offer via affiliate link (clearly marked)
   provider.url may be a real affiliate link or a [TODO] placeholder.
*/
const SERVICE_PAGES = [
  {
    title: 'Internet & DSL',
    type: 'multiple-providers',
    internalUrl: '/internet.html',
    phase: 'alltag',
    kicker: 'Alltag & Digitale Services',
    step: '2',
    journeySlugs: ['sim-karte-internet', 'internet-router', 'internet-anbieter'],
    seo: {
      title: 'Internet & DSL in Deutschland: Anbieter vergleichen',
      metaDescription: 'Internet-Anbieter für deinen Start in Deutschland: Dein DSL, Kabel oder Glasfaser flexibel vergleichen – transparent, ohne Kosten, mit klaren Informationen für Neuankömmlinge.',
      keywords: 'Internet Deutschland, DSL Anbieter, Glasfaser, Internet vergleichen, Internet Neuankömmling, Internetvertrag',
    },
    intro: 'Ein zuverlässiger Internetanschluss ist einer der ersten Dinge, die du in Deutschland klärst. Ob für Arbeit, Studium oder den Kontakt mit deiner Familie – ein guter Tarif gehört zum Ankommen dazu.',
    sections: [
      {
        kicker: 'Worauf du achten solltest',
        title: 'Internet für Neuankömmlinge – einfach erklärt',
        paragraphs: [
          'In Deutschland kannst du zwischen DSL, Kabel, Glasfaser (FTTH) und oft auch 5G-Mobilfunk wählen. DSL ist am weitesten verbreitet und fast überall verfügbar. Glasfaser ist schneller, aber regional noch nicht flächendeckend ausgebaut.',
          'Vor dem Vertragsabschluss solltest du prüfen, was an deiner neuen Adresse verfügbar ist. Die Anbieter geben an, welche Geschwindigkeit bei dir ankommt – für Homeoffice und Streaming empfehlen sich mindestens 50 Mbit/s, besser 100 Mbit/s oder mehr.',
          'Beachte Mindestlaufzeiten (oft 24 Monate), monatliche Kosten und einmalige Anschlussgebühren. Ein Vergleich der Tarife hilft dir, das beste Preis-Leistungs-Verhältnis zu finden – viele Anbieter wickeln die Buchung komplett online ab.',
        ],
      },
    ],
    providers: [
      {
        name: 'Check24 – Internet & DSL-Vergleich',
        logo: '',
        description: 'Vergleichsportal für DSL-, Kabel- und Glasfaser-Tarife. In wenigen Minuten siehst du, welcher Anbieter an deiner Adresse verfügbar ist.',
        benefits: ['Tarife an deiner Adresse vergleichen', 'Wechselhilfe und kostenlose Beratung', 'Oft mit Cashback-Aktionen'],
        bonus: 'Aktuelle Wechsel- und Neukunden-Boni je nach Tarif',
        url: '[TODO] check24-affiliate-link',
        type: 'affiliate',
      },
      {
        name: 'German Relo Experts (GRE)',
        logo: 'Bilder/icons/gre-logo.png',
        description: 'Wir unterstützen dich bei der Auswahl und Einrichtung deines Internetanschlusses – Teil unseres Begleitservice.',
        benefits: ['Individuelle Beratung bei der Tarifwahl', 'Unterstützung bei Vertrag und Einrichtung', 'Persönlicher Ansprechpartner vor Ort'],
        bonus: '',
        url: 'https://g-reloexperts.com/',
        type: 'service',
      },
      {
        name: 'Telekom',
        logo: '',
        description: 'Deutschlands größter Netzbetreiber mit deutschlandweitem Glasfaser- und DSL-Ausbau sowie persönlichem Service vor Ort.',
        benefits: ['Größtes Netz in Deutschland', 'Glasfaser- & DSL-Ausbau', 'Hilfe und Router-Service inklusive'],
        bonus: '',
        url: 'https://www.telekom.de/',
        type: 'service',
        cta: 'Zur Telekom',
      },
    ],
    faq: [
      {
        q: 'Welche Internetarten gibt es in Deutschland?',
        a: [
          'In Deutschland kannst du zwischen DSL, Kabel, Glasfaser (FTTH) und oft auch 5G-Mobilfunk wählen. DSL ist am weitesten verbreitet und fast überall verfügbar, Glasfaser ist schneller, aber regional noch nicht flächendeckend ausgebaut.',
          'Welche Technologie bei dir verfügbar ist, hängt von deiner Adresse ab. Die Anbieter prüfen das online anhand deiner Postleitzahl oder Straße.',
        ],
      },
      {
        q: 'Wie schnell muss mein Internetanschluss sein?',
        a: [
          'Für E-Mail, Surfen und Videoanrufe reichen 50 Mbit/s meist locker. Wenn du regelmäßig streamst, im Homeoffice arbeitest oder zusammen mit mehreren Personen im Haushalt lebst, solltest du zu 100 Mbit/s oder mehr greifen.',
        ],
      },
      {
        q: 'Welche Kosten kommen auf mich zu?',
        a: [
          'Neben dem monatlichen Tarifpreis fallen oft eine einmalige Anschlussgebühr an und manchmal Kosten für den Router (oder eine monatliche Router-Miete). Achte außerdem auf die Mindestlaufzeit – in Deutschland sind 24 Monate üblich.',
        ],
      },
      {
        q: 'Brauche ich einen Festnetzanschluss für Internet?',
        a: [
          'Nein. Internet läuft heute in der Regel über Kabel, Glasfaser oder Mobilfunk. Einen klassischen Telefonanschluss benötigst du dafür nicht – viele sparen sich den separaten Festnetzvertrag.',
        ],
      },
      {
        q: 'Kann ich als Neuankömmling in Deutschland einen Internetvertrag abschließen?',
        a: [
          'Ja, das ist möglich. In der Regel brauchst du einen gültigen Ausweis, eine deutsche Meldeadresse und ein Bankkonto für die Zahlung. Einige Anbieter akzeptieren auch deine neue Anmeldung direkt nach dem Einzug.',
          'Falls du noch keine deutsche Bonitätshistorie hast, gibt es Anbieter, die erste Verträge flexibler vergeben – ein Tarifvergleich zeigt dir diese Optionen.',
        ],
      },
      {
        q: 'Wie lange dauert es, bis mein Anschluss steht?',
        a: [
          'Das hängt von der Technik ab: Ein bestehender DSL-Anschluss ist oft innerhalb weniger Tage bis zwei Wochen aktiv. Für einen neuen Glasfaserausbau kann es deutlich länger dauern. Frage beim Anbieter vor Vertragsschluss, welcher Termin für deine Adresse realistisch ist.',
        ],
      },
    ],
  },
  {
    title: 'Strom & Energie',
    type: 'multiple-providers',
    internalUrl: '/strom-energie.html',
    phase: 'wohnen',
    kicker: 'Wohnen & Anmeldung',
    step: '1',
    journeySlugs: ['gas-strom-wasser', 'strom-energie'],
    seo: {
      title: 'Stromanbieter in Deutschland: Tarife vergleichen',
      metaDescription: 'Strom & Energie für deine neue Wohnung: Anbieter und Tarife transparent vergleichen. Alles, was Neuankömmlinge zur Anmeldung und Auswahl des Stromtarifs wissen müssen.',
      keywords: 'Strom Deutschland, Stromanbieter vergleichen, Stromtarif, Anmeldung Strom, Energie Neuankömmling, Smart Meter',
    },
    intro: 'Nach dem Einzug musst du dich um deinen Strom kümmern. In Deutschland ist der Strommarkt liberalisiert: Du kannst deinen Anbieter frei wählen und ihn jederzeit wechseln.',
    sections: [
      {
        kicker: 'Dein erster Schritt',
        title: 'Stromanmeldung für Neuankömmlinge',
        paragraphs: [
          'Wenn du eine neue Wohnung beziehst, meldest du beim örtlichen Grundversorger. Viele machen einen Stromvertrag automatisch mit dem Einzug – du kannst aber auch selbst einen günstigeren Tarif bei einem anderen Anbieter abschließen.',
          'Zahlbar ist der Strom monatlich über einen Abschlag, der einmal im Jahr abgerechnet wird. Stromzähler mit Smart-Meter-Funktion werden in Deutschland zunehmend Standard.',
          'Ein Tarifvergleich lohnt sich oft: Die Preise unterscheiden sich stark zwischen den Anbietern. Achte auf den Arbeitspreis pro Kilowattstunde (kWh) und den monatlichen Grundpreis.',
        ],
      },
    ],
    providers: [
      {
        name: 'Check24 – Stromvergleich',
        logo: '',
        description: 'Vergleichsportal für Stromtarife. Gib deine Postleitzahl und deinen Jahresverbrauch ein und sieh in wenigen Minuten die günstigsten Tarife für deine Adresse.',
        benefits: ['Tarife nach Postleitzahl und Verbrauch', 'Wechselservice inklusive', 'Transparente Preise und Boni'],
        bonus: 'Wechselprämien und Sofort-Boni je nach Tarif',
        url: '[TODO] check24-strom-affiliate-link',
        type: 'affiliate',
      },
      {
        name: 'German Relo Experts (GRE)',
        logo: 'Bilder/icons/gre-logo.png',
        description: 'Wir helfen dir bei der Anmeldung deines Stromanschlusses und bei der Wahl eines passenden Tarifs – ein Baustein unseres Ankommens-Service.',
        benefits: ['Unterstützung bei Anmeldung & Tarifwahl', 'Erklärung der Nebenkosten', 'Persönlicher Ansprechpartner'],
        bonus: '',
        url: 'https://g-reloexperts.com/',
        type: 'service',
      },
    ],
    faq: [
      {
        q: 'Muss ich mich als Neuankömmling selbst um meinen Strom kümmern?',
        a: [
          'In der Regel bekommst du beim Einzug automatisch Strom vom örtlichen Grundversorger. Oft kannst du aber einen günstigeren Tarif wählen, wenn du innerhalb der ersten Wochen selbst einen Vertrag bei einem anderen Anbieter abschließt.',
        ],
      },
      {
        q: 'Was kostet Strom in Deutschland?',
        a: [
          'Die Stromkosten setzen sich aus dem Arbeitspreis pro Kilowattstunde (kWh) und einem monatlichen Grundpreis zusammen. Gezahlt wird meist per monatlichem Abschlag, der einmal im Jahr abgerechnet wird.',
          'Die Preise unterscheiden sich zwischen den Anbietern deutlich – ein Tarifvergleich kann sich daher schnell lohnen.',
        ],
      },
      {
        q: 'Wie melde ich meinen Strom an?',
        a: [
          'Für die Anmeldung brauchst du in der Regel deine neue Adresse, den gewünschten Starttermin und manchmal deinen aktuellen Zählerstand. Die meisten Anbieter erledigen die Anmeldung komplett online.',
        ],
      },
      {
        q: 'Was ist ein Smart Meter?',
        a: [
          'Ein Smart Meter ist ein digitaler Stromzähler, der deinen Verbrauch automatisch übermittelt. Solche Zähler werden in Deutschland zunehmend zur Standardausstattung.',
        ],
      },
      {
        q: 'Brauche ich für die Stromanmeldung besondere Unterlagen?',
        a: [
          'In der Regel reichen deine Meldeadresse und eine Bankverbindung für den Lastschrifteinzug. Einige Anbieter fragen zur Identifikation zusätzlich nach einem Ausweisdokument.',
        ],
      },
    ],
  },
  {
    title: 'Bankkonto',
    type: 'multiple-providers',
    internalUrl: '/bankkonto.html',
    phase: 'finanzen',
    kicker: 'Finanzen',
    step: '3',
    journeySlugs: ['bankkonto'],
    seo: {
      title: 'Bankkonto in Deutschland: 4 Bankkonten im Vergleich (2026)',
      metaDescription: 'Welches Bankkonto passt zu deinem Start in Deutschland? Vergleiche 4 Angebote: C24 Konto, N26, Revolut und TF Bank Girokonto – transparent erklärt für Neuankömmlinge.',
      keywords: 'Bankkonto Deutschland, Konto Vergleich, C24, N26, Revolut, TF Bank, Girokonto ohne Gebühren, Konto eröffnen, Neuankömmling',
    },
    intro: 'Welches Konto passt zu dir? Vergleiche die vier Bankkonten unten und wähle bewusst – alle lassen sich komplett online eröffnen.',
    sections: [
      {
        kicker: 'Bevor du eröffnest',
        title: 'So findest du das richtige Bankkonto',
        paragraphs: [
          'Für die Kontoeröffnung brauchst du in der Regel deinen Pass oder Personalausweis, deine Meldebescheinigung (nach der Anmeldung) und oft deine Steuer-ID. Bei Online-Anbietern geht die Eröffnung meist innerhalb weniger Minuten per Video-Ident.',
          'Achte bei der Auswahl auf kostenlose Kontoführung, eine kostenlose Debitkarte, kostenloses oder günstiges Bargeldabheben, die Sprachen der App und den Support. Manche Anbieter locken zusätzlich mit Guthaben-Zinsen oder Willkommens-Boni.',
          'Die meisten Banken eröffnen dein Konto auch ohne deutsche Bonitäts-Historie. Für Neuankömmlinge sind Online-Banken daher oft der einfachste Einstieg.',
        ],
      },
      {
        kicker: 'Deine Checkliste',
        title: 'Das solltest du vor der Eröffnung klären',
        paragraphs: [
          'Ist die Kontoführung dauerhaft kostenlos oder nur mit Gehaltseingang?',
          'Welche Debitkarte ist inklusive und wo kannst du kostenlos Bargeld abheben?',
          'Wo und zu welchen Bedingungen kannst du kostenlos Bargeld abheben?',
          'Geht alles online per Video-Ident oder braucht es eine Filiale?',
          'Gibt es die App und den Support in deiner Sprache?',
        ],
      },
    ],
    providers: [
      {
        slug: 'c24',
        name: 'C24 Konto',
        provider: 'C24 Bank',
        logo: '',
        image: 'c24',
        cardBrand: 'C24',
        cardType: 'DEBIT',
        description: 'Gebührenfreies Girokonto der App-Bank der CHECK24-Gruppe. Dauerhaft keine Kontoführungsgebühren, Guthaben wird verzinst und Bargeld kannst du weltweit – auch in Fremdwährung – kostenlos abheben.',
        benefits: [
          'Kontoführung dauerhaft kostenlos',
          'Verzinsung deines Guthabens',
          'Kostenlos Bargeld abheben – weltweit in allen Währungen',
          'Unterkonten für deine Sparziele',
        ],
        bonus: 'Aktueller Willkommens-Bonus für Neukundinnen und Neukunden',
        details: 'Warum passt das C24 Konto zu deinem Start? Die Eröffnung erfolgt komplett online per Video-Ident – ohne deutsche Bonitäts-Historie. Es eignet sich besonders, wenn du ein dauerhaft kostenloses Konto mit Zusatznutzen (Zinsen, Unterkonten, weltweites Abheben) möchtest. Ein Tagesgeldkonto lässt sich direkt ergänzen.',
        url: '[TODO] c24-affiliate-link',
        type: 'affiliate',
      },
      {
        slug: 'n26',
        name: 'N26 Standard',
        provider: 'N26 Bank',
        logo: '',
        image: 'n26',
        cardBrand: 'N26',
        cardType: 'DEBIT',
        description: 'Die bekannteste Smartphone-Bank aus Deutschland. Kontoeröffnung in Minuten per Video-Ident, beim Standard-Konto keine Kontoführungsgebühren und eine kostenlose Debitkarte inklusive.',
        benefits: [
          'Kostenloses Standardkonto mit Debitkarte',
          'Unterkonten (Spaces) für Sparziele',
          'Bezahlen und Überweisen in allen Währungen',
          'App in mehreren Sprachen',
        ],
        bonus: 'Aktuelle Willkommens-Boni je nach Kontomodell',
        details: 'N26 eignet sich besonders für Neuankömmlinge: Die Eröffnung funktioniert komplett digital per Video-Ident und setzt keine deutsche Bankhistorie voraus. Beim Standard-Konto entfallen die Kontoführungsgebühren. Beachte: Abhebungen an Fremdautomaten im Ausland können Kosten verursachen.',
        url: '[TODO] n26-affiliate-link',
        type: 'affiliate',
      },
      {
        slug: 'revolut',
        name: 'Revolut Standard',
        provider: 'Revolut',
        logo: '',
        image: 'revolut',
        cardBrand: 'REVOLUT',
        cardType: 'DEBIT',
        description: 'EU-weit verfügbares Fintech-Konto mit gebührenfreiem Standard-Tarif. Besonders stark bei internationalen Zahlungen: Überweisungen in viele Währungen zu tagesaktuellen Wechselkursen – ideal zum Start in Deutschland.',
        benefits: [
          'Gebührenfreies Standard-Konto mit Debitkarte',
          'Günstige Wechselkurse bei Auslandszahlungen',
          'Unterkonten in verschiedenen Währungen',
          'Virtuelle Karten direkt aus der App',
        ],
        bonus: 'Aktuelle Kampagne für Neukundinnen und Neukunden',
        details: 'Revolut eignet sich hervorragend als Zweitkonto für Reisen und internationale Überweisungen. Als Haupt-Girokonto für Gehalt und Miete ziehen viele ein Konto einer deutschen Bank vor. Die Eröffnung ist in wenigen Minuten per App möglich.',
        url: '[TODO] revolut-affiliate-link',
        type: 'affiliate',
      },
      {
        slug: 'tfbank',
        name: 'TF Bank Girokonto',
        provider: 'TF Bank',
        logo: '',
        image: 'tfbank',
        cardBrand: 'TF BANK',
        cardType: 'DEBIT',
        description: 'Kostenloses Online-Girokonto der europäischen TF Bank (Schweden). Klare digitale Prozesse, attraktive Tagesgeld-Zinsen und eine weltweit nutzbare Debitkarte – ganz ohne Filiale.',
        benefits: [
          'Kontoführung ohne monatliche Gebühren',
          'Attraktive Zinsen aufs Tagesgeld',
          'Weltweit nutzbare Debitkarte',
          'Übersichtliches Online-Banking',
        ],
        bonus: 'Attraktive Sparzinsen für Neukundinnen und Neukunden',
        details: 'Die TF Bank ist ein europäisches Bankinstitut mit Sitz in Schweden und unterliegt der schwedischen Einlagensicherung. Das Girokonto eignet sich als unkompliziertes Zweitkonto oder als kostenlose Alternative zum Hauptkonto. Tagesgeld lässt sich direkt ergänzen.',
        url: '[TODO] tfbank-affiliate-link',
        type: 'affiliate',
      },
    ],
    faq: [
      {
        q: 'Welche Unterlagen brauche ich für die Kontoeröffnung?',
        a: [
          'In der Regel brauchst du deinen Pass oder Personalausweis, deine Meldebescheinigung (nach der Anmeldung) und oft deine Steuer-ID. Online-Banken prüfen deine Identität per Video-Ident.',
        ],
      },
      {
        q: 'Kann ich als Neuankömmling ohne deutsche Bonitäts-Historie ein Konto eröffnen?',
        a: [
          'Ja. Die meisten Banken eröffnen dein Konto auch ohne deutsche Bonitäts-Historie. Für Neuankömmlinge sind Online-Banken daher oft der einfachste Einstieg.',
        ],
      },
      {
        q: 'Was ist ein Video-Ident?',
        a: [
          'Beim Video-Ident bestätigst du deine Identität in einem kurzen Videoanruf mit deinem Ausweisdokument. Danach ist das Konto meist innerhalb weniger Minuten eröffnet.',
        ],
      },
      {
        q: 'Sind Online-Konten wirklich kostenlos?',
        a: [
          'Viele Online-Banken führen das Girokonto dauerhaft kostenlos – oft ohne Bedingungen wie einen regelmäßigen Gehaltseingang. Prüfe vorher, ob einzelne Leistungen wie Bargeldabheben oder Karten kostenpflichtig sind.',
        ],
      },
      {
        q: 'Wie schnell bekomme ich mein Konto?',
        a: [
          'Bei Online-Banken ist die Eröffnung meist in wenigen Minuten erledigt – danach erhältst du Karte und Kontodaten in der Regel innerhalb weniger Tage per Post.',
        ],
      },
      {
        q: 'Online-Konto oder Filialbank?',
        a: [
          'Online-Banken bieten dir den schnellsten und oft günstigsten Einstieg – komplett ohne Termin. Wenn du eine persönliche Beratung im Schaltergeschäft möchtest, ist eine Filialbank die Alternative.',
        ],
      },
    ],
  },
  {
    title: 'Kreditkarten',
    type: 'multiple-providers',
    internalUrl: '/kreditkarten.html',
    phase: 'finanzen',
    kicker: 'Finanzen',
    step: '4',
    journeySlugs: ['kreditkarten'],
    seo: {
      title: 'Kreditkarte in Deutschland: 4 Karten vergleichen (2026)',
      metaDescription: 'Welche Kreditkarte passt zu dir? Advanzia Mastercard Gold, N26 Kreditkarte, Barclays und Check24 Vergleich – transparent und verständlich erklärt für Neuankömmlinge.',
      keywords: 'Kreditkarte Deutschland, Kreditkarte vergleichen, kostenlose Kreditkarte, Advanzia, Barclays, N26 Kreditkarte, Check24, Reise-Kreditkarte, Kreditkarte Neuankömmling',
    },
    intro: 'In Deutschland ist die Girocard (EC-Karte) am weitesten verbreitet, aber eine Kreditkarte lohnt sich viele – vor allem für Reisen, Online-Shopping und Mietwagen.',
    sections: [
      {
        kicker: 'Was du wissen solltest',
        title: 'Kreditkarten einfach erklärt',
        paragraphs: [
          'Es gibt kostenlose Kreditkarten und solche mit Jahresgebühr. Viele Online-Banken legen deiner Kontoeröffnung eine kostenlose Debit-Kreditkarte bei.',
          'Für echte Kreditkarten (Revolving-Karten) wird oft eine Bonitätsprüfung (SCHUFA) durchgeführt. Das kann für Neuankömmlinge ohne deutsche Bonitäts-Historie eine Hürde sein.',
          'Vergleiche die Konditionen: Jahresgebühr, Bargeldabheben im Ausland, Auslandseinsatzgebühr, Versicherungen und Bonusprogramme. Debit-Karten von Online-Banken sind oft die schnellste Lösung für Neue.',
        ],
      },
    ],
    providers: [
      {
        slug: 'advanzia',
        name: 'Advanzia Mastercard Gold',
        provider: 'Advanzia Bank',
        logo: '',
        image: 'advanzia',
        productImage: 'images/karte-advanzia-gold.png',
        cardBrand: 'ADVANZIA',
        cardType: 'KREDIT',
        description: 'Kostenlose Mastercard-Kreditkarte der luxemburgischen Advanzia Bank – ohne Jahresgebühr und mit flexiblem Kreditrahmen zwischen 500 und 10.000 Euro. Eine sinnvolle Ergänzung zum Girokonto in den ersten Monaten.',
        benefits: [
          'Keine Jahresgebühr – dauerhaft kostenlos',
          'Flexibler Kreditrahmen von 500 bis 10.000 €',
          'Bis zu 6 Monate zinsfrei mit Teilzahlung',
          'Weltweit einsetzbar (Mastercard)',
        ],
        bonus: '0 % Zinsen in den ersten 6 Monaten bei Teilzahlung',
        details: 'Die Advanzia Mastercard Gold ist eine klassische Kreditkarte mit monatlicher Abrechnung. Bei pünktlicher Rückzahlung des Gesamtbetrags bleibt sie dauerhaft gebührenfrei. Für Barabhebungen erhebt die Bank ein Entgelt – die Karte eignet sich zum Bezahlen und als Ergänzung deines Girokontos, nicht als Ersatz dafür.',
        url: '[TODO] advanzia-affiliate-link',
        type: 'affiliate',
      },
      {
        slug: 'n26',
        name: 'N26 – Kreditkarte',
        logo: '',
        productImage: 'images/karte-n26.png',
        description: 'Die N26-Debit-Karte ist gratis und direkt mit deinem N26-Konto verbunden. Für Zahlungen weltweit geeignet, mit integrierten Versicherungen je nach Kontomodell.',
        benefits: ['Kostenlose Karte zum Konto', 'Weltweit einsetzbar', 'Bonus-Programme je nach Modell'],
        bonus: '',
        url: '[TODO] n26-kreditkarte-affiliate-link',
        type: 'affiliate',
      },
      {
        slug: 'barclays',
        name: 'Barclays Visa & Mastercard',
        logo: '',
        productImage: 'images/karte-barclays.png',
        description: 'Bekannte kostenlose Kreditkarten mit hohem Limit, oft ohne Kontoführungsgebühren. Geeignet, wenn du eine klassische Kreditkarte als eigenständige Karte möchtest.',
        benefits: ['Kostenlose Kartenmodelle', 'Weltweites Bargeldabheben', 'Hohe Flexibilität'],
        bonus: '',
        url: '[TODO] barclays-affiliate-link',
        type: 'affiliate',
      },
      {
        slug: 'check24',
        name: 'Check24 – Kreditkartenvergleich',
        logo: '',
        description: 'Vergleich zahlreicher Kreditkarten nach Gebühren, Boni und Leistungen – so findest du die passende Karte für deine Bedürfnisse.',
        benefits: ['Kreditkarten übersichtlich vergleichen', 'Filtern nach Kosten und Vorteilen', 'Wechsel- und Neukundenangebote'],
        bonus: 'Aktuelle Karten-Boni je nach Anbieter',
        url: '[TODO] check24-kreditkarte-affiliate-link',
        type: 'affiliate',
      },
    ],
    faq: [
      {
        q: 'Was ist der Unterschied zwischen Debit- und Kreditkarte?',
        a: [
          'Mit einer Debitkarte zahlst du direkt von deinem Konto – das Geld wird sofort gebucht. Bei einer echten Kreditkarte räumt dir die Bank einen Kreditrahmen ein, den du monatlich abzahlst.',
          'Viele Online-Banken legen deiner Kontoeröffnung eine kostenlose Debitkarte bei. Echte Kreditkarten gibt es oft mit Jahresgebühr oder über Banken, die eine Bonitätsprüfung durchführen.',
        ],
      },
      {
        q: 'Kann ich als Neuankömmling ohne Bonitätsprüfung eine Kreditkarte bekommen?',
        a: [
          'Echte Kreditkarten (Revolving-Karten) hängen oft an einer SCHUFA-Prüfung. Ohne deutsche Bonitäts-Historie sind Debit-Karten von Online-Banken die schnellste Lösung – sie funktionieren weltweit und sind meist kostenlos.',
        ],
      },
      {
        q: 'Was kostet eine Kreditkarte in Deutschland?',
        a: [
          'Es gibt kostenlose Karten und solche mit Jahresgebühr. Achte außerdem auf Kosten für Bargeldabheben im Ausland und Auslandseinsatzgebühren – gerade bei Reisen können diese schnell teuer werden.',
        ],
      },
      {
        q: 'Welche Karte lohnt sich für Reisen und Ausland?',
        a: [
          'Für Reisen sind Karten mit kostenlosem Bargeldabheben im Ausland und ohne Auslandseinsatzgebühr ideal. Verreise- und Debitkarten von Online-Banken decken diesen Fall meist gut ab.',
        ],
      },
      {
        q: 'Muss ich die Kreditkartenrechnung komplett bezahlen?',
        a: [
          'Bei echten Kreditkarten kannst du den Gesamtbetrag monatlich ausgleichen oder in Raten zahlen. Wer den Gesamtbetrag pünktlich zahlt, bleibt bei vielen kostenlosen Karten komplett gebührenfrei.',
        ],
      },
    ],
  },
  {
    title: 'ADAC & Mobilität',
    type: 'multiple-providers',
    internalUrl: '/adac-mobilitaet.html',
    phase: 'mobilitaet',
    kicker: 'Mobilität',
    step: '5',
    journeySlugs: ['adac-mobilitaet'],
    seo: {
      title: 'ADAC & Mobilität in Deutschland: Pannenhilfe & mehr',
      metaDescription: 'Mobilität für Neuankömmlinge in Deutschland: ADAC-Mitgliedschaft, Pannenhilfe, Reise- und Serviceleistungen – transparent erklärt und vergleichbar.',
      keywords: 'ADAC Mitgliedschaft, Pannenhilfe Deutschland, Mobilität Deutschland, ADAC Vergleich, Autoschutz Neuankömmling',
    },
    intro: 'Der ADAC (Allgemeiner Deutscher Automobil-Club) ist Deutschlands größter Automobilclub und bietet Pannenhilfe, Reiseschutz und viele weitere Serviceleistungen.',
    sections: [
      {
        kicker: 'Mobilität absichern',
        title: 'ADAC & Mobilität für deinen Start',
        paragraphs: [
          'Eine ADAC-Mitgliedschaft lohnt sich vor allem, wenn du ein Auto fährst oder viel unterwegs bist. Die Pannenhilfe kommt in Deutschland und Europa zu dir, wenn dein Fahrzeug liegen bleibt.',
          'Neben der Fahrzeug-Pannenhilfe bietet der ADAC Reiseversicherungen, Auslandskrankenschutz, Gebrauchtwagen-Prüfungen und weitere Services.',
          'Vergleiche die Mitgliedschafts-Modelle: Welche Leistungen brauchst du, welche Kosten sind fällig? Gerade für Berufspendler und Vielfahrende kann sich eine Mitgliedschaft schnell rechnen.',
        ],
      },
    ],
    providers: [
      {
        name: 'ADAC – Mitgliedschaft',
        logo: '',
        description: 'Die klassische ADAC-Mitgliedschaft mit Pannenhilfe in ganz Europa, inklusive Haftpflicht- und Reiseschutz-Leistungen je nach Tarif.',
        benefits: ['Pannenhilfe in Deutschland & Europa', 'Reiseschutz-Leistungen inklusive', 'Zahlreiche Partner-Vorteile'],
        bonus: '',
        url: '[TODO] adac-affiliate-link',
        type: 'affiliate',
      },
      {
        name: 'German Relo Experts (GRE)',
        logo: 'Bilder/icons/gre-logo.png',
        description: 'Wir beraten dich zu allen Themen rund um Mobilität – von ADAC-Mitgliedschaft bis zur Auswahl des passenden Deutschlandtickets.',
        benefits: ['Individuelle Mobilitäts-Beratung', 'Personlicher Ansprechpartner', 'Unterstützung bei der Wahl'],
        bonus: '',
        url: 'https://g-reloexperts.com/',
        type: 'service',
      },
    ],
    faq: [
      {
        q: 'Was ist eine ADAC-Mitgliedschaft?',
        a: [
          'Der ADAC (Allgemeiner Deutscher Automobil-Club) ist Deutschlands größter Automobilclub. Eine Mitgliedschaft umfasst Pannenhilfe, Reiseschutz und weitere Serviceleistungen – je nach Modell.',
        ],
      },
      {
        q: 'Was kostet die ADAC-Mitgliedschaft?',
        a: [
          'Die Kosten hängen vom gewählten Modell ab – es gibt Basis-Modelle und Tarife mit erweitertem Reiseschutz. Prüfe vor dem Abschluss, welche Leistungen du wirklich brauchst und welche Kosten dafür fällig sind.',
        ],
      },
      {
        q: 'Was tun, wenn ich eine Autopanne habe?',
        a: [
          'Bei einer Panne rufst du die Pannenhilfe an. Als Mitglied wird Hilfe zu dir geschickt – in Deutschland und Europa. Oft reicht die Hilfe vor Ort, ansonsten wird dein Fahrzeug zur nächsten Werkstatt gebracht.',
        ],
      },
      {
        q: 'Kann ich als Neuankömmling Mitglied werden?',
        a: [
          'Ja. Die Mitgliedschaft ist unkompliziert und nicht an eine bestimmte Nationalität gebunden. Sie lohnt sich vor allem, wenn du ein Auto fährst oder regelmäßig unterwegs bist.',
        ],
      },
      {
        q: 'Gilt die Pannenhilfe auch im Ausland?',
        a: [
          'Ja, die Pannenhilfe gilt zusätzlich in ganz Europa. Dazu kommen je nach Tarif Reiseleistungen wie Auslandskrankenschutz und weitere Services für deine Mobilität.',
        ],
      },
    ],
  },
  {
    title: 'Versicherungen',
    type: 'multiple-providers',
    internalUrl: '/versicherungen.html',
    phase: 'versicherungen',
    kicker: 'Versicherungen',
    step: '6',
    journeySlugs: ['versicherungen', 'weitere-versicherungen'],
    seo: {
      title: 'Versicherungen in Deutschland: Haftpflicht, Hausrat & mehr',
      metaDescription: 'Welche Versicherungen brauchst du in Deutschland? Privathaftpflicht, Hausrat und mehr – verständlich erklärt und übersichtlich vergleichbar.',
      keywords: 'Versicherungen Deutschland, Privathaftpflicht, Hausratversicherung, Versicherungen vergleichen, Neuankömmling Versicherung',
    },
    intro: 'In Deutschland ist nur die Krankenversicherung gesetzlich Pflicht. Andere Versicherungen sind freiwillig – einige davon kannst du aber stark empfehlen.',
    sections: [
      {
        kicker: 'Die wichtigsten Policen',
        title: 'Versicherungen für Neuankömmlinge',
        paragraphs: [
          'Die Privathaftpflichtversicherung ist die wichtigste freiwillige Versicherung: Sie deckt Schäden ab, die du versehentlich an anderen Personen oder deren Eigentum verursachst. Sie ist günstig und fast jeder sollte sie haben.',
          'Die Hausratversicherung schützt deinen Hausrat bei Feuer, Wasser, Einbruchdiebstahl und Sturm. Sie ist besonders sinnvoll, wenn du wertvolle Möbel und Elektronik besitzt.',
          'Krankenversicherung ist Pflicht – du musst dich bei einer gesetzlichen oder privaten Krankenkasse versichern. Der Abschluss ist einer deiner ersten Schritte nach der Ankunft.',
        ],
      },
    ],
    providers: [
      {
        name: 'Check24 – Versicherungsvergleich',
        logo: '',
        description: 'Vergleiche Privathaftpflicht, Hausrat, Berufsunfähigkeit und viele weitere Versicherungen – übersichtlich und kostenlos.',
        benefits: ['Tarife übersichtlich vergleichen', 'Leistungen direkt gegenüberstellen', 'Abschluss oft direkt online'],
        bonus: 'Wechsel- und Abschluss-Boni je nach Anbieter',
        url: '[TODO] check24-versicherung-affiliate-link',
        type: 'affiliate',
      },
      {
        name: 'German Relo Experts (GRE)',
        logo: 'Bilder/icons/gre-logo.png',
        description: 'Wir erklären dir das deutsche Versicherungssystem und helfen dir, die für deine Situation passenden Policen zu verstehen und auszuwählen.',
        benefits: ['Versicherungen verständlich erklärt', 'Unterstützung bei der Auswahl', 'Persönliche Beratung'],
        bonus: '',
        url: 'https://g-reloexperts.com/',
        type: 'service',
      },
    ],
    faq: [
      {
        q: 'Welche Versicherungen sind in Deutschland Pflicht?',
        a: [
          'Gesetzlich Pflicht ist nur die Krankenversicherung – entweder gesetzlich oder privat. Wenn du ein Auto fährst, kommt die Kfz-Haftpflichtversicherung hinzu. Alles andere ist freiwillig, aber oft sinnvoll.',
        ],
      },
      {
        q: 'Was ist eine Privathaftpflichtversicherung?',
        a: [
          'Sie deckt Schäden ab, die du versehentlich an anderen Personen oder deren Eigentum verursachst. Sie ist günstig und gilt als die wichtigste freiwillige Versicherung in Deutschland.',
        ],
      },
      {
        q: 'Was ist eine Hausratversicherung?',
        a: [
          'Sie schützt deinen Hausrat bei Feuer, Wasser, Einbruchdiebstahl und Sturm. Besonders sinnvoll ist sie, wenn du wertvolle Möbel und Elektronik besitzt.',
        ],
      },
      {
        q: 'Wie schließe ich eine Krankenversicherung ab?',
        a: [
          'Die Krankenversicherung ist einer deiner ersten Schritte nach der Ankunft. Du wählst eine gesetzliche oder private Krankenkasse und meldest dich dort an – die Kasse übernimmt die weitere Abwicklung.',
        ],
      },
      {
        q: 'Wie vergleiche ich Versicherungen?',
        a: [
          'Vergleichsportale stellen Tarife und Leistungen direkt gegenüber – etwa bei Haftpflicht, Hausrat oder Berufsunfähigkeit. Achte nicht nur auf den Preis, sondern auch auf die konkreten Leistungen im Schadensfall.',
        ],
      },
    ],
  },
  {
    title: 'Geldtransfer',
    type: 'multiple-providers',
    internalUrl: '/geldtransfer.html',
    phase: 'finanzen',
    kicker: 'Finanzen',
    step: '7',
    journeySlugs: ['ueberweisungen', 'geldtransfer'],
    seo: {
      title: 'Geld nach Deutschland & ins Ausland senden: Vergleich',
      metaDescription: 'Geld transferieren zwischen Deutschland und dem Ausland: Anbieter vergleichen, Wechselkurse verstehen und kostengünstig senden. Klare Tipps für Neuankömmlinge.',
      keywords: 'Geldtransfer, Geld senden Ausland, Überweisung ins Ausland, Wechselkurs, Wise, Western Union, Neuankömmling',
    },
    intro: 'Wenn du Geld nach Deutschland bringst oder von Deutschland ins Ausland überweist, machen die Wahl des Anbieters und der richtige Zeitpunkt einen großen Unterschied.',
    sections: [
      {
        kicker: 'Günstig & sicher senden',
        title: 'Geldtransfer für Neuankömmlinge',
        paragraphs: [
          'Für internationale Überweisungen lohnt sich ein Blick auf spezialisierte Anbieter wie Wise (ehemals TransferWise). Sie bieten oft deutlich bessere Wechselkurse und niedrigere Gebühren als klassische Banken.',
          'Achte auf die Gesamtkosten: Wechselkurs-Aufschlag plus Überweisungsgebühr. Versteckte Gebühren vermeidest du, wenn du den echten (interbank) Wechselkurs verwendest.',
          'Für Überweisungen innerhalb der EU (SEPA) sind Überweisungen in Euro meist kostenlos oder sehr günstig – auch bei deutschen Banken.',
        ],
      },
    ],
    providers: [
      {
        name: 'Wise – Geld international senden',
        logo: '',
        description: 'Beliebter Anbieter für internationale Überweisungen mit fairem Wechselkurs und niedrigen Gebühren. Ideal, um Geld zwischen Deutschland und anderen Ländern zu senden.',
        benefits: ['Faire Wechselkurse (Interbank)', 'Niedrige und transparente Gebühren', 'Schnelle Überweisung in viele Länder'],
        bonus: '',
        url: '[TODO] wise-affiliate-link',
        type: 'affiliate',
      },
      {
        name: 'Western Union',
        logo: '',
        description: 'Globaler Geldtransfer-Dienst mit vielen Standorten weltweit. Geeignet, wenn Bargeld-Abholung vor Ort wichtig ist.',
        benefits: ['Weltweit viele Standorte', 'Bargeldabholung möglich', 'Schnelle Überweisung'],
        bonus: '',
        url: '[TODO] westernunion-affiliate-link',
        type: 'affiliate',
      },
      {
        name: 'German Relo Experts (GRE)',
        logo: 'Bilder/icons/gre-logo.png',
        description: 'Wir erklären dir die günstigsten Wege, dein Geld nach Deutschland zu bringen – und unterstützen dich bei der Einrichtung deines ersten Kontos.',
        benefits: ['Beratung zu Geldtransfer & Konto', 'Hilfe bei der Einrichtung', 'Verständliche Erklärung der Kosten'],
        bonus: '',
        url: 'https://g-reloexperts.com/',
        type: 'service',
      },
    ],
    faq: [
      {
        q: 'Wie kann ich Geld nach Deutschland senden?',
        a: [
          'Für Überweisungen aus dem Euro-Raum reicht in der Regel eine SEPA-Überweisung – meist kostenlos bei deutschen Banken. Bei Währungen außerhalb des Euro (z. B. Dollar, Pfund) lohnen spezialisierte Anbieter wie Wise oder Western Union.',
        ],
      },
      {
        q: 'Warum ist der Wechselkurs so wichtig?',
        a: [
          'Der Wechselkurs bestimmt, wie viel dein Geld beim Empfänger ankommt. Manche Anbieter weichen mit versteckten Aufschlägen vom echten Marktkurs ab – rechne deshalb immer mit den Gesamtkosten aus Kurs und Gebühr.',
        ],
      },
      {
        q: 'Was kostet eine SEPA-Überweisung?',
        a: [
          'Euro-Überweisungen innerhalb der EU sind meist kostenlos oder sehr günstig – auch bei deutschen Banken. Kosten fallen nur an, wenn andere Währungen oder große Beträge im Spiel sind.',
        ],
      },
      {
        q: 'Wie lange dauert eine internationale Überweisung?',
        a: [
          'SEPA-Überweisungen sind meist am nächsten Werktag beim Empfänger. Internationale Überweisungen in andere Währungen können ein bis mehrere Werktage dauern – je nach Anbieter und Zielland.',
        ],
      },
      {
        q: 'Ist Geldtransfer sicher?',
        a: [
          'Ja, wenn du etablierte und lizenzierte Anbieter nutzt. Überweise nur an dir bekannte Konten und prüfe die Empfängerdaten sorgfältig – führende Anbieter sind reguliert und bieten Schutzmechanismen.',
        ],
      },
    ],
  },
  {
    title: 'Deutschlandticket & Mobilität',
    type: 'multiple-providers',
    internalUrl: '/deutschlandticket.html',
    phase: 'mobilitaet',
    kicker: 'Mobilität',
    step: '8',
    journeySlugs: ['deutschlandticket'],
    seo: {
      title: 'Deutschlandticket: ÖPNV in ganz Deutschland',
      metaDescription: 'Das Deutschlandticket erklärt: Ein Ticket für Bus und Bahn in ganz Deutschland. Preise, Gültigkeit und wie du es für 49 Euro im Monat bekommst.',
      keywords: 'Deutschlandticket, 49 Euro Ticket, ÖPNV Deutschland, Bus Bahn Deutschland, Deutschlandticket kaufen',
    },
    intro: 'Mit dem Deutschlandticket fährst du für einen festen Monatspreis im gesamten Nah- und Regionalverkehr in ganz Deutschland – Bus, Straßenbahn, U-Bahn, S-Bahn und Regionalzüge.',
    sections: [
      {
        kicker: 'Mobilität im ganzen Land',
        title: 'Deutschlandticket einfach erklärt',
        paragraphs: [
          'Das Deutschlandticket kostet aktuell 49 Euro im Monat und gilt im gesamten öffentlichen Nahverkehr (VBB, MVV und allen anderen Verkehrsverbünden) sowie im Regionalverkehr der Bahn. Es ist ein Abo, das monatlich kündbar ist.',
          'Das Ticket ist nicht übertragbar und gilt in der Regel nicht im Fernverkehr (ICE, IC). Es ist als Chipkarte oder in der App vieler Verkehrsverbünde und Anbieter erhältlich.',
          'Manche Arbeitgeber bieten das Deutschlandticket als Jobticket mit Zuschuss an – frag nach. Auch für Studierende und Azubis gibt es oft vergünstigte Modelle.',
        ],
      },
    ],
    providers: [
      {
        name: 'Deutschlandticket – direkt beim Verkehrsverbund',
        logo: '',
        description: 'Kaufe das Deutschlandticket direkt über deinen regionalen Verkehrsverbund oder die App. Die gültigste und günstigste Option für deine Stadt.',
        benefits: ['Gilt in ganz Deutschland', 'Monatlich kündbar', '49 Euro im Monat'],
        bonus: '',
        url: '[TODO] deutschlandticket-verbund-link',
        type: 'service',
      },
      {
        name: 'Deutschlandticket über Arbeitgeber (Jobticket)',
        logo: '',
        description: 'Immer mehr Arbeitgeber bieten das Deutschlandticket mit Zuschuss an – frag in deinem Unternehmen nach den Konditionen.',
        benefits: ['Arbeitgeber-Zuschuss möglich', 'Ein Ticket für Arbeit & Freizeit', 'Leicht über den Job beantragbar'],
        bonus: '',
        url: '[TODO] jobticket-info',
        type: 'recommendation',
      },
    ],
    faq: [
      {
        q: 'Was kostet das Deutschlandticket?',
        a: [
          'Das Deutschlandticket kostet aktuell 49 Euro im Monat und gilt im gesamten Nah- und Regionalverkehr in ganz Deutschland. Viele Arbeitgeber unterstützen es als Jobticket mit einem Zuschuss.',
        ],
      },
      {
        q: 'Wo gilt das Deutschlandticket?',
        a: [
          'Das Ticket gilt in Bussen, Straßenbahnen, U- und S-Bahnen sowie Regionalzügen in allen Verkehrsverbünden Deutschlands. Im Fernverkehr (ICE, IC) gilt es in der Regel nicht.',
        ],
      },
      {
        q: 'Wie kaufe ich das Deutschlandticket?',
        a: [
          'Du kannst es direkt bei deinem regionalen Verkehrsverbund, über die App vieler Anbieter oder als Jobticket beim Arbeitgeber abschließen. Es ist ein Abo, das monatlich kündbar ist.',
        ],
      },
      {
        q: 'Ist das Deutschlandticket übertragbar?',
        a: [
          'Nein. Das Ticket ist nicht übertragbar und gilt nur für die Person, auf die es ausgestellt ist. Es ist als Chipkarte oder digital in der App erhältlich.',
        ],
      },
      {
        q: 'Kann ich das Deutschlandticket jeden Monat kündigen?',
        a: [
          'Ja, das Deutschlandticket ist ein monatlich kündbares Abo. Achte darauf, die Kündigungsfrist zu beachten, damit es zum nächsten Monatswechsel endet.',
        ],
      },
    ],
  },
  {
    title: 'Sachen einlagern',
    type: 'provider',
    internalUrl: '/sachen-einlagern.html',
    phase: 'verlassen',
    kicker: 'Deutschland verlassen',
    step: '4',
    journeySlugs: ['sachen-einlagern'],
    seo: {
      title: 'Sachen einlagern bei SaveSpace: Möbel & Hausrat sicher einlagern',
      metaDescription: 'Sachen einlagern, wenn du Deutschland verlässt: SaveSpace holt deine Möbel und Kartons ab, lagert sie sicher und liefert sie zurück. Unkompliziert und transparent erklärt für Neuankömmlinge.',
      keywords: 'Sachen einlagern, Einlagerung, Self-Storage, SaveSpace, Möbel einlagern, Umzug ins Ausland, Deutschland verlassen, Lagerfläche',
    },
    intro: 'Du gehst für eine Weile oder für immer ins Ausland, untervermietest deine Wohnung oder wechselst – aber deine Möbel und persönlichen Gegenstände sollst du nicht verlieren. Einlagerung ist die unkomplizierte Lösung.',
    sections: [
      {
        kicker: 'Kurz erklärt',
        title: 'Was ist Einlagerung und für wen lohnt sie sich?',
        paragraphs: [
          'Kurz erklärt: Du lagerst deine Möbel, Kartons und persönlichen Gegenstände in einem sicheren, überwachten Lager – und bekommst sie zurück, sobald du sie wieder brauchst. Du musst nichts verkaufen oder einlagern.',
          'Für wen ist es interessant? Für alle, die vorübergehend oder dauerhaft ins Ausland gehen, ein Auslandssemester machen, die Wohnung untervermieten oder zwischen zwei Wohnungen wechseln und ihren Hausrat behalten möchten.',
          'Der größte Vorteil: Du zahlst nur für deine eingelagerten Sachen – keine laufende Miete, keine Nebenkosten und kein fester Mietvertrag. Deine Sachen bleiben ordentlich verstaut, bis du sie brauchst.',
        ],
      },
    ],
    providers: [
      {
        slug: 'savespace',
        name: 'SaveSpace',
        provider: 'SaveSpace',
        logo: '',
        image: 'savespace',
        productImage: 'images/savespace-logo.png',
        heroImage: 'images/sachen-einlagern-hero.png',
        description: 'Unkomplizierte Einlagerung mit Abholung, sicherer Lagerung und Rücklieferung – ideal, wenn du Deutschland verlässt und deine Sachen nicht verlieren möchtest.',
        benefits: [
          'Abholung und Rücklieferung inklusive',
          'Sichere, überwachte Lagerung',
          'Flexibel – je nach Umfang und Laufzeit',
          'Kein Eigentransport nötig',
        ],
        bonus: 'CampusBox–Guthaben: 15 € für Neukundinnen und Neukunden',
        details: 'SaveSpace holt deine Kartons und Möbel bei dir zu Hause ab, lagert sie in einem sicheren Lager und liefert sie zurück, wenn du sie wieder brauchst. Besonders praktisch, wenn du aus dem Ausland zurückkehrst oder gerade kein eigenes Zuhause hast. Die Buchung erfolgt online, flexibel und ohne feste Mindestlaufzeit.',
        url: 'https://savespace.eu/?ref=O8KHZV',
        type: 'affiliate',
      },
    ],
    faq: [
      {
        q: 'Wie funktioniert das Einlagern bei SaveSpace?',
        a: [
          'SaveSpace holt deine Möbel und Kartons bei dir zu Hause ab, lagert sie in einem sicheren, überwachten Lager und liefert sie zurück, sobald du sie wieder brauchst. Die Buchung erfolgt online, flexibel und ohne feste Mindestlaufzeit.',
        ],
      },
      {
        q: 'Was kann ich einlagern?',
        a: [
          'Eingelagert werden Möbel, Umzugskartons und persönliche Gegenstände – von der Wohnungseinrichtung bis zum Hausrat. Du musst nichts verkaufen oder entsorgen.',
        ],
      },
      {
        q: 'Wie viel kostet die Einlagerung?',
        a: [
          'Die Kosten hängen vom Umfang deiner Sachen und der gewünschten Laufzeit ab. Du zahlst nur für das, was du einlagerst – ganz ohne laufende Wohnkosten oder Nebenkosten.',
        ],
      },
      {
        q: 'Wie sicher ist mein gelagertes Eigentum?',
        a: [
          'Deine Sachen werden in einem sicheren, überwachten Lager untergebracht. Damit ist dein Hausrat geschützt aufbewahrt, bis du ihn wieder abrufst.',
        ],
      },
      {
        q: 'Wie komme ich wieder an meine Sachen?',
        a: [
          'Wenn du deine Sachen brauchst, beauftragst du einfach die Rücklieferung. Deine Möbel und Kartons werden dir dann wieder bis vor die Haustür gebracht – ideal gerade bei einer Rückkehr oder einem weiteren Umzug.',
        ],
      },
    ],
  },
];

const NAV_LINKS = [
  { label: 'Startseite', href: 'index.html', id: 'home' },
];

const FOOTER_LINKS = {
  navigation: [
    { label: 'Startseite', href: 'index.html' },
  ],
  legal: [
    { label: 'Impressum', href: 'impressum.html', available: false },
    { label: 'Datenschutz', href: 'datenschutz.html', available: false },
  ],
  info: [
    { label: 'Über uns', href: 'ueber-uns.html', available: false },
    { label: 'Kontakt', href: 'kontakt.html', available: false },
  ],
};
