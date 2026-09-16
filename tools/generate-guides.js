#!/usr/bin/env node
/* ============================================
   GENERATE-GUIDES — Dein Start in Deutschland
   Erzeugt aus js/guides.js eine statische
   Info-Seite (<slug>.html) pro Journey-Thema.

   Aufruf:  node tools/generate-guides.js
   Ausgabe: <repo-root>/<slug>.html (49 Seiten)
   ============================================ */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = ROOT;
const GUIDES = require(path.join(ROOT, 'js', 'guides.js'));

const BASE_URL = 'https://www.dein-start-in-deutschland.de';
const SITE_NAME = 'Dein Start in Deutschland';
const SITE_TAGLINE = 'Die wichtigsten Schritte für Neuankömmlinge in Deutschland einfach erklärt und übersichtlich dargestellt.';
const DATE_PUBLISHED = '2026-09-17';

// ------------------------------------------------------------------
// Escaping & helpers
// ------------------------------------------------------------------
const escH = (value) =>
  String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const escAttr = escH; // same for attribute contexts

const jsonLd = (obj) =>
  `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n  </script>`;

const svg = (iconKey, w = 22, h = 22, cls = '') =>
  `<svg class="${cls ? escAttr(cls) : ''}" width="${w}" height="${h}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[iconKey] || ICONS.doc}</svg>`;

const checkSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS.check}</svg>`;

// ------------------------------------------------------------------
// SVG line-icons (feather-/lucide-style, stroke-based)
// ------------------------------------------------------------------
const ICONS = {
  check: '<path d="M20 6L9 17l-5-5"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  money: '<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="6" x2="12" y2="18"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  map: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  card: '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  alert: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  building: '<path d="M3 21h18"/><path d="M4 21V9l8-5 8 5v12"/><path d="M8 21v-4h8v4"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="18"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="8" y1="14" x2="8" y2="18"/>',
  hands: '<path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M10 11V5a2 2 0 0 0-4 0v6"/><path d="M18 11V9a2 2 0 0 0-4 0"/><path d="M6 11v-1a2 2 0 0 0-2 2v3c0 4.4 3.6 8 8 8 4.4 0 8-3.6 8-8v-1a2 2 0 0 0-4 0"/>',
  train: '<path d="M8 3h8a4 4 0 0 1 4 4v10H4V7a4 4 0 0 1 4-4z"/><path d="M4 17h16"/><path d="M8 21l1-2M16 21l-1-2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/>',
  telephone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  bike: '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  hand: '<path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M10 11V5a2 2 0 0 0-4 0v6"/><path d="M18 11V9a2 2 0 0 0-4 0"/><path d="M6 11v-1a2 2 0 0 0-2 2v3c0 4.4 3.6 8 8 8 4.4 0 8-3.6 8-8v-1a2 2 0 0 0-4 0"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  school: '<path d="M22 10v6"/><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  ball: '<circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-1.35-9.8-.14-13.5 4.55"/>',
  phone: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
  arrowLeft: '<path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>',
};

// ------------------------------------------------------------------
// Template fragments (structure copied from internet.html)
// ------------------------------------------------------------------
const HEADER = `
  <header class="header" role="banner">
    <div class="header__inner">
      <a href="index.html" class="header__logo" aria-label="Startseite – ${SITE_NAME}">
        <img src="Bilder/logo.png" alt="" class="header__logo-img">
      </a>
      <nav class="header__nav" role="navigation" aria-label="Hauptnavigation">
        <a href="index.html" class="header__link">Startseite</a>
      </nav>
      <button class="hamburger" aria-label="Navigation öffnen" aria-expanded="false" aria-controls="mobile-nav" type="button">
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
      </button>
    </div>
  </header>

  <nav id="mobile-nav" class="mobile-nav" role="navigation" aria-label="Mobile Navigation">
    <a href="index.html" class="mobile-nav__link">Startseite</a>
  </nav>`;

const FOOTER = `
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__brand">
          <div class="footer__brand-name">${SITE_NAME}</div>
          <p class="footer__brand-desc">${SITE_TAGLINE}</p>
        </div>
        <div>
          <div class="footer__col-title">Navigation</div>
          <a href="index.html" class="footer__link">Startseite</a>
        </div>
        <div>
          <div class="footer__col-title">Weitere Services</div>
          <a href="bankkonto.html" class="footer__link">Bankkonto eröffnen</a>
          <a href="kreditkarten.html" class="footer__link">Kreditkarte beantragen</a>
          <a href="geldtransfer.html" class="footer__link">Geld transferieren</a>
          <a href="internet.html" class="footer__link">Internet &amp; DSL</a>
          <a href="deutschlandticket.html" class="footer__link">Deutschlandticket</a>
        </div>
        <div>
          <div class="footer__col-title">Informationen</div>
          <a href="ueber-uns.html" class="footer__link">Über uns</a>
          <a href="kontakt.html" class="footer__link">Kontakt</a>
        </div>
        <div>
          <div class="footer__col-title">Rechtliches</div>
          <a href="impressum.html" class="footer__link">Impressum</a>
          <a href="datenschutz.html" class="footer__link">Datenschutz</a>
        </div>
      </div>
      <div class="footer__bottom">
        <span class="footer__copy">&copy; 2026 ${SITE_NAME}. Alle Rechte vorbehalten.</span>
      </div>
    </div>
  </footer>`;

// ------------------------------------------------------------------
// Section builders
// ------------------------------------------------------------------
function buildBreadcrumbLd(guide) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${BASE_URL}/index.html` },
      { '@type': 'ListItem', position: 2, name: guide.phaseTitle, item: `${BASE_URL}/index.html#journey` },
      { '@type': 'ListItem', position: 3, name: guide.nav, item: `${BASE_URL}/${guide.slug}.html` },
    ],
  });
}

function buildArticleLd(guide) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.hero.title + ' – ' + guide.hero.accent,
    description: guide.seo.description,
    inLanguage: 'de',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${guide.slug}.html`,
    },
    author: { '@type': 'Organization', name: SITE_NAME, url: `${BASE_URL}/index.html` },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: `${BASE_URL}/index.html` },
  });
}

function buildFaqLd(guide) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: (Array.isArray(item.a) ? item.a : [item.a]).join(' '),
      },
    })),
  });
}

function buildIntroGrid(guide) {
  const cards = guide.intro
    .map(
      (c, i) => `
          <article class="tpl-intro-card tpl-reveal" data-index="${String(i + 1).padStart(2, '0')}">
            <div class="tpl-intro-card__icon">
              ${svg(c.icon || 'doc', 22, 22)}
            </div>
            <h3 class="tpl-intro-card__title">${escH(c.title)}</h3>
            <p class="tpl-intro-card__text">${escH(c.text)}</p>
          </article>`
    )
    .join('');

  return `
    <section class="tpl-section tpl-section--first" aria-labelledby="kurz-heading">
      <div class="container">
        <div class="tpl-section__head tpl-reveal">
          <p class="tpl-section__kicker">Kurz erklärt</p>
          <h2 id="kurz-heading" class="tpl-section__title">${escH(guide.nav)} <span class="tpl-mark">– einfach erklärt</span></h2>
          <p class="tpl-section__intro">${escH(guide.hero.subtitle)}</p>
        </div>

        <div class="tpl-intro-grid">
          ${cards}
        </div>
      </div>
    </section>`;
}

function buildDeepDive(guide) {
  const s = guide.section;
  const paragraphs = (s.paragraphs || [])
    .map((p) => `<p>${escH(p)}</p>`)
    .join('');
  const listTitle = s.listTitle
    ? `<h3 class="tpl-guide__list-title">${escH(s.listTitle)}</h3>`
    : '';
  const list = (s.list || [])
    .map(
      (li) => `<li>${checkSvg}<span>${escH(li)}</span></li>`
    )
    .join('');

  return `
    <section id="wichtig" class="tpl-section tpl-section--alt" aria-labelledby="wichtig-heading">
      <div class="container">
        <div class="tpl-section__head tpl-reveal">
          <p class="tpl-section__kicker">${escH(s.kicker || 'Gut zu wissen')}</p>
          <h2 id="wichtig-heading" class="tpl-section__title">${escH(s.title)}</h2>
        </div>

        <div class="tpl-guide__grid tpl-reveal">
          <div class="tpl-guide__prose">${paragraphs}</div>
          <div class="tpl-guide__checklist">
            ${listTitle}
            <ul class="tpl-guide__list">${list}</ul>
          </div>
        </div>
      </div>
    </section>`;
}

function buildBenefits(guide) {
  if (!guide.benefits || !guide.benefits.length) return '';
  const items = guide.benefits
    .map(
      (b) => `
          <div class="tpl-benefit">
            <div class="tpl-benefit__icon">
              ${svg(b.icon || 'check', 22, 22)}
            </div>
            <h3 class="tpl-benefit__title">${escH(b.title)}</h3>
            <p class="tpl-benefit__text">${escH(b.text)}</p>
          </div>`
    )
    .join('');

  return `
    <section class="tpl-section" aria-labelledby="warum-heading">
      <div class="container">
        <div class="tpl-section__head tpl-reveal">
          <p class="tpl-section__kicker">Warum wichtig</p>
          <h2 id="warum-heading" class="tpl-section__title">Darum ist dieses Thema wichtig</h2>
        </div>

        <div class="tpl-benefits tpl-reveal">${items}</div>
      </div>
    </section>`;
}

function buildRelated(guide) {
  if (!guide.related || !guide.related.length) return '';
  const cards = guide.related
    .map(
      (r) => `
          <a class="tpl-guide__related tpl-reveal" href="${escAttr(r.slug)}.html">
            <span class="tpl-guide__related-kicker">Passender Guide</span>
            <span class="tpl-guide__related-title">${escH(r.label)}</span>
            <span class="tpl-guide__related-arrow" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
            </span>
          </a>`
    )
    .join('');

  return `
    <section class="tpl-section" aria-labelledby="weiter-heading">
      <div class="container">
        <div class="tpl-section__head tpl-reveal">
          <p class="tpl-section__kicker">Weiterlesen</p>
          <h2 id="weiter-heading" class="tpl-section__title">Diese Guides <span class="tpl-mark">passen dazu</span></h2>
        </div>

        <div class="tpl-guide__related-grid">${cards}</div>
      </div>
    </section>`;
}

function buildFaq(guide) {
  const items = guide.faq
    .map((item, i) => {
      const qId = `${guide.slug}-faq-q-${i + 1}`;
      const aId = `${guide.slug}-faq-a-${i + 1}`;
      const answers = (Array.isArray(item.a) ? item.a : [item.a])
        .map((p) => `<p>${escH(p)}</p>`)
        .join('');
      return `
            <div class="tpl-faq__item">
              <h3 class="tpl-faq__q-wrap">
                <button type="button" class="tpl-faq__q" id="${escAttr(qId)}"
                        aria-expanded="false" aria-controls="${escAttr(aId)}">
                  <span class="tpl-faq__q-text">${escH(item.q)}</span>
                  <span class="tpl-faq__q-ico" aria-hidden="true"></span>
                </button>
              </h3>
              <div class="tpl-faq__a" id="${escAttr(aId)}" role="region" aria-labelledby="${escAttr(qId)}">
                <div class="tpl-faq__a-inner">${answers}</div>
              </div>
            </div>`;
    })
    .join('');

  return `
    <section id="faq" class="tpl-section" aria-labelledby="faq-heading">
      <div class="container">
        <div class="tpl-section__head tpl-reveal">
          <p class="tpl-section__kicker">Häufige Fragen</p>
          <h2 id="faq-heading" class="tpl-section__title">FAQ <span class="tpl-mark">– ${escH(guide.nav)}</span></h2>
          <p class="tpl-section__intro">Kurz und klar beantwortet: die wichtigsten Fragen zu ${escH(guide.nav.toLowerCase())} in Deutschland.</p>
        </div>

        <div class="tpl-faq tpl-reveal" data-static-faq>
          ${items}
        </div>
      </div>
    </section>`;
}

function buildBack() {
  return `
    <section class="tpl-back" aria-label="Zurück zur Journey">
      <div class="container">
        <div class="tpl-back__inner">
          ${svg('arrowLeft', 22, 22)}
          <div>
            <p class="tpl-back__kicker">Deine Reise</p>
            <a class="tpl-back__link" href="index.html#journey">Weiter mit den nächsten Schritten – zurück zur Journey</a>
          </div>
        </div>
      </div>
    </section>`;
}

// ------------------------------------------------------------------
// Full page
// ------------------------------------------------------------------
function buildPage(guide) {
  const file = `${guide.slug}.html`;
  const ogImage = `${BASE_URL}/Bilder/hero-dsid.png`;
  const title = guide.seo.title;
  const heroTitle = guide.hero.title;
  const heroAccent = guide.hero.accent;

  const head = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escH(title)}</title>
  <meta name="description" content="${escAttr(guide.seo.description)}">
  <meta name="keywords" content="${escAttr(guide.seo.keywords)}">
  <meta name="author" content="${SITE_NAME}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${BASE_URL}/${file}">

  <meta property="og:title" content="${escH(title)}">
  <meta property="og:description" content="${escAttr(guide.seo.description)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${BASE_URL}/${file}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:locale" content="de_DE">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/png" href="Bilder/logo.png">

  ${buildBreadcrumbLd(guide)}
  ${buildArticleLd(guide)}
  ${buildFaqLd(guide)}

  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/template.css?v=3">
</head>
<body>
  <a href="#main" class="skip-link">Zum Hauptinhalt springen</a>
  ${HEADER}

  <main id="main" class="tpl-page">

    <!-- ====== HERO ====== -->
    <section class="tpl-hero" aria-labelledby="tpl-hero-title">
      <div class="container">
        <div class="tpl-hero__inner">

          <div class="tpl-hero__content">
            <nav class="tpl-breadcrumb" aria-label="Brotkrumen-Navigation">
              <a href="index.html#journey">Journey</a>
              <span aria-hidden="true">/</span>
              <a href="index.html#journey">${escH(guide.phaseTitle)}</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">${escH(guide.nav)}</span>
            </nav>

            <p class="tpl-hero__label">
              ${svg(guide.icon || 'doc', 16, 16, 'tpl-hero__label-icon')}
              ${escH(guide.phaseTitle)} · Schritt ${String(guide.step).padStart(2, '0')}
            </p>

            <h1 id="tpl-hero-title" class="tpl-hero__title">
              ${escH(heroTitle)}<span class="tpl-hero__title-accent"> –</span><br>
              <span class="tpl-hero__title-accent">${escH(heroAccent)}</span>
            </h1>

            <p class="tpl-hero__subtitle">
              ${escH(guide.hero.subtitle)}
            </p>

            <div class="tpl-hero__actions">
              <a href="#wichtig" class="btn btn--primary">
                Das Wichtigste
                <span class="tpl-btn__arrow" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
                </span>
              </a>
              <a href="#faq" class="btn btn--ghost">Häufige Fragen</a>
            </div>

            <p class="tpl-hero__meta">
              ${guide.hero.meta.map((m) => `<span>${escH(m)}</span>`).join('\n              ')}
            </p>
          </div>

          <div class="tpl-hero__media">
            <span class="tpl-hero__tag">${escH(guide.nav)}</span>
            <div class="tpl-hero__media-inner">
              <div class="tpl-hero__noimg">
                ${svg(guide.icon || 'doc', 112, 112)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    ${buildIntroGrid(guide)}
    ${buildDeepDive(guide)}
    ${buildBenefits(guide)}
    ${buildRelated(guide)}
    ${buildFaq(guide)}
    ${buildBack()}

  </main>

  ${FOOTER}

  <script src="js/app.js?v=3"></script>
</body>
</html>
`;

  return head.trim() + '\n';
}

// ------------------------------------------------------------------
// Main
// ------------------------------------------------------------------
function main() {
  if (!Array.isArray(GUIDES) || GUIDES.length === 0) {
    console.error('guides.js enthält keine Guides.');
    process.exit(1);
  }

  const slugs = new Set();
  let written = 0;
  const missingIcons = [];

  GUIDES.forEach((guide) => {
    if (!guide || !guide.slug) return;
    if (slugs.has(guide.slug)) {
      console.warn(`Doppelter Slug übersprungen: ${guide.slug}`);
      return;
    }
    slugs.add(guide.slug);

    const icons = [guide.icon, ...(guide.intro || []).map((i) => i.icon), ...(guide.benefits || []).map((b) => b.icon)];
    icons.forEach((k) => {
      if (k && !ICONS[k] && !missingIcons.includes(k)) missingIcons.push(k);
    });

    const html = buildPage(guide);
    fs.writeFileSync(path.join(OUT_DIR, `${guide.slug}.html`), html, 'utf8');
    written += 1;
  });

  if (missingIcons.length) {
    console.warn('Icon-Hinweise (Fallback doc):', missingIcons.join(', '));
  }
  console.log(`OK: ${written} Guide-Seiten erzeugt in ${OUT_DIR}`);
}

main();