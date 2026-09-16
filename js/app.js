/* ============================================
   APP.JS — Dein Start in Deutschland
   Main application logic
   ============================================ */

(function () {
  'use strict';

  // ---- Helpers ----
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Minimal escaping for data-driven values used inside template HTML.
  const esc = (value) =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  // Resolve a journey theme's provider ids → provider objects.
  function getProvidersForSlug(slug) {
    if (typeof PROVIDERS === 'undefined' || typeof JOURNEY_PROVIDERS === 'undefined') return [];
    return (JOURNEY_PROVIDERS[slug] || [])
      .map((id) => PROVIDERS.find((p) => p.id === id))
      .filter(Boolean);
  }

  // Slug from a service page's internalUrl, e.g. "/internet.html" → "internet".
  function pageSlug(page) {
    return String(page.internalUrl || '').replace(/^\/+/, '').replace(/\.html$/, '');
  }

  // Find the service page configuration for a journey slug.
  function getServicePageForSlug(slug) {
    if (typeof SERVICE_PAGES === 'undefined') return null;
    return SERVICE_PAGES.find(
      (p) =>
        pageSlug(p) === slug ||
        (Array.isArray(p.journeySlugs) && p.journeySlugs.includes(slug))
    ) || null;
  }

  // Resolve the local (internal) URL used for a journey item.
  function internalUrlFor(item) {
    const page = getServicePageForSlug(item.slug);
    if (page) return page.internalUrl.replace(/^\/+/, '');
    return `${item.slug}.html`;
  }

  // Build a single provider chip (small clickable card: logo + short name).
  // Brand names stay real, crawlable text – the logo is decorative next to it.
  // When internalHref is given, the chip links to the internal service page
  // (where the concrete offer card with the affiliate link lives) instead of
  // directly to the external provider.
  function providerChip(provider, themeTitle, internalHref) {
    const isAffiliate = provider.type === 'affiliate';
    const rel = isAffiliate ? 'noopener noreferrer sponsored' : 'noopener noreferrer';
    // `journeyLabel` übersteuert nur die sichtbare Beschriftung des Chips auf
    // der Journey (z. B. „Anbieter“ statt Markenname); der echte Name bleibt
    // als aria-label/title/sr-only Text erhalten.
    const nameShort = provider.journeyLabel || provider.shortName || provider.name;
    const aria = isAffiliate
      ? `${provider.name} – Angebot für „${themeTitle}“ auf der Service-Seite ansehen`
      : `${provider.name} – Anbieter für „${themeTitle}“`;
    const logo = provider.logo
      ? `<img src="${esc(provider.logo)}" alt="" class="provider-chip__logo" aria-hidden="true">`
      : '';
    const href = internalHref ? internalHref : esc(provider.url);
    const external = internalHref ? '' : ` target="_blank" rel="${rel}"`;

    return `
      <a href="${href}"
         class="provider-chip provider-chip--${isAffiliate ? 'affiliate' : 'service'}"
         ${external}
         aria-label="${esc(aria)}" title="${esc(provider.name)}">
        ${logo}
        <span class="provider-chip__name">${esc(nameShort)}</span>
        <span class="sr-only">${esc(provider.name)}</span>
        ${isAffiliate ? '<span class="provider-chip__flag">Affiliate</span>' : ''}
      </a>`;
  }

  // "N Anbieter vergleichen" chip for multi-provider journey themes.
  function compareChip(item, count) {
    const url = internalUrlFor(item);
    return `
      <a href="${esc(url)}"
         class="provider-chip provider-chip--compare"
         aria-label="${esc(item.title)} – ${count} Anbieter vergleichen">
        <svg class="provider-chip__icon" width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M16 3h5v5"/>
          <path d="M21 3l-7 7"/>
          <path d="M8 21H3v-5"/>
          <path d="M3 21l7-7"/>
        </svg>
        <span class="provider-chip__name">${count} Anbieter</span>
        <span class="provider-chip__flag">Vergleich</span>
      </a>`;
  }

  // "Artikel" status chip for informational internal-page themes.
  function infoChip() {
    return `
      <span class="provider-chip provider-chip--info" aria-hidden="true">
        <svg class="provider-chip__icon" width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
          <line x1="8" y1="16" x2="12" y2="16"/>
        </svg>
        <span class="provider-chip__name">Artikel</span>
      </span>`;
  }

  // Recognized "product card" art tokens. When a provider's `image` field
  // matches one of these, we render a uniform, brand-colored card face
  // (pure SVG/CSS – no extra assets, no CLS, no invented logos).
  const CARD_TOKENS = ['c24', 'n26', 'revolut', 'tfbank', 'advanzia'];

  function cardTokenFor(value) {
    return CARD_TOKENS.includes(value) ? value : null;
  }

  // Decorative bank-card face. aria-hidden: the real product name is printed
  // as visible text in the card itself.
  function cardArt(provider) {
    const token = cardTokenFor(provider.image);
    if (!token) return '';
    const brand = provider.cardBrand || String(provider.provider || provider.name).trim().toUpperCase();
    const type = provider.cardType || 'DEBIT';
    return `
      <div class="bank-card bank-card--${esc(token)}" aria-hidden="true">
        <span class="bank-card__glow"></span>
        <span class="bank-card__sheen"></span>
        <div class="bank-card__top">
          <span class="bank-card__brand">${esc(brand)}</span>
          <svg class="bank-card__waves" width="30" height="22" viewBox="0 0 30 22" fill="none"
               stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <path d="M3 16C6 11.5 6 9.5 3 6"/>
            <path d="M8.5 15.5C12 11 12 8.5 8.5 4.5"/>
            <path d="M13.5 15C17 10.5 17 8 13.5 4"/>
          </svg>
        </div>
        <svg class="bank-card__chip" width="42" height="31" viewBox="0 0 42 31" fill="currentColor">
          <rect x="1.5" y="1.5" width="39" height="28" rx="5" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M1.5 15.5h39M15.5 1.5v28M26.5 1.5v28"/>
        </svg>
        <div class="bank-card__number">•••• &nbsp;•••• &nbsp;•••• &nbsp;0000</div>
        <div class="bank-card__bottom">
          <span class="bank-card__holder">${esc(provider.name)}</span>
          <span class="bank-card__type">${esc(type)}</span>
        </div>
      </div>`;
  }

  // Detect whether a local image actually exists (no broken links).
  // Uses the browser's cache-capable fetch and silently returns false
  // when the file is missing – so pages only use images that exist.
  const _imgCache = {};
  function imageExists(src) {
    if (!src) return false;
    if (src in _imgCache) return _imgCache[src];
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('HEAD', src, false); // synchronous: fine for tiny local assets
      xhr.send(null);
      _imgCache[src] = xhr.status >= 200 && xhr.status < 300;
    } catch (e) {
      _imgCache[src] = false;
    }
    return _imgCache[src];
  }

  // Resolve the visual for a provider card:
  //   1. explicit productImage file in /images
  //   2. derived product shot for known card tokens (images/bank-<token>.png)
  //   3. heroImage / other local image file
  //   4. brand-colored SVG card face for known bank/card tokens
  //   5. plain neutral face (no art)
  // Only paths that actually exist are used (imageExists).
  function providerFace(provider, token) {
    const derivedProduct = token ? `images/bank-${token}.png` : null;
    const candidates = [
      provider.productImage,
      derivedProduct,
      provider.heroImage,
      provider.image && typeof provider.image === 'string' && !cardTokenFor(provider.image) ? provider.image : null,
    ].filter(Boolean);

    for (const c of candidates) {
      if (imageExists(c)) {
        return {
          type: 'img',
          markup: `<img src="${esc(c)}" alt="${esc(provider.alt || provider.name)}" class="offer__img" loading="lazy" width="600" height="378">`,
        };
      }
    }

    if (token) {
      return {
        type: 'face',
        markup: cardArt(provider),
      };
    }

    return { type: 'none', markup: '' };
  }

  // Build a full provider offer for the internal service page.
  // Editorial "Offer Slab": keine klassische Card/Box.
  // Asymmetrische Fläche mit großer Geisternummer, geometrischer Ecke,
  // frei stehendem Logo, klarer Typo-Hierarchie und Ecken-Cut CTA.
  // Affiliate-/Partnerhinweis wird bewusst NICHT pro Anbieter wiederholt
  // (liegt zentral über/unter der gesamten Anbieter-Sektion).
  function serviceCard(provider, opts) {
    opts = opts || {};
    const position = opts.position || 1;
    const single = !!opts.single;
    const isAffiliate = provider.type === 'affiliate';
    const isRecommendation = provider.type === 'recommendation';
    const rel = isAffiliate ? 'noopener noreferrer sponsored' : 'noopener noreferrer';
    const hasUrl = provider.url && !String(provider.url).trim().startsWith('[TODO]');
    const monogram = String(provider.name || '?').trim().charAt(0).toUpperCase();
    const token = cardTokenFor(provider.image);
    const face = providerFace(provider, token);
    const withImage = face.type !== 'none';
    const num = String(position).padStart(2, '0');

    // Logo frei stehend – keine Box. Alt-Text bleibt crawlbar.
    const logo = provider.logo
      ? `<img src="${esc(provider.logo)}" alt="${esc(provider.name)} Logo" loading="lazy" width="64" height="64" class="offer__logo-img">`
      : `<span class="offer__logo-mark" aria-hidden="true">${esc(monogram)}</span>`;

    // Kleines Label statt Banner: nur Text + Akzent-Punkt.
    const tagLabel = isAffiliate
      ? 'Partnerangebot'
      : isRecommendation
      ? 'Empfehlung'
      : 'Service von Dein Start in Deutschland';
    const tag = `<span class="offer__tag offer__tag--${isAffiliate ? 'affiliate' : isRecommendation ? 'info' : 'service'}"><span class="offer__tag-dot" aria-hidden="true"></span>${esc(tagLabel)}</span>`;

    const head = single
      ? `<header class="offer__head">${tag}</header>`
      : `<header class="offer__head"><span class="offer__index" aria-hidden="true">${num}</span>${tag}</header>`;

    // Bonus/Prämie: elegantes geometrisches Chip (Ecken-Schnitt), kein Banner.
    const bonus = provider.bonus
      ? `<span class="offer__bonus"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
           <path d="M12 2l2.4 4.9 5.5.8-4 3.9.9 5.4-4.8-2.5-4.8 2.5.9-5.4-4-3.9 5.5-.8L12 2z"/></svg>
         <span>${esc(provider.bonus)}</span></span>`
      : '';

    const price = provider.price
      ? `<span class="offer__price">${esc(provider.price)}</span>`
      : '';

    const meta = provider.bonus || provider.price
      ? `<div class="offer__meta">${price}${bonus}</div>`
      : '';

    // Kompaktes 2-spaltiges Benefit-Grid – keine Trennlinien.
    const benefits = provider.benefits
      ? `<ul class="offer__benefits">
           ${provider.benefits.map((b) => `
             <li class="offer__benefit">
               <svg class="offer__check" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                 <path d="M20 6L9 17l-5-5"/>
               </svg>
               <span>${esc(b)}</span>
             </li>`).join('')}
         </ul>`
      : '';

    // Details als dezenters Secondary-Countroll (Mehr erfahren).
    const details = provider.details
      ? `<details class="offer__details">
           <summary>
             <span>Mehr erfahren</span>
             <svg class="offer__chev" width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
               <path d="M6 9l6 6 6-6"/>
             </svg>
           </summary>
           <div class="offer__details-content"><p>${esc(provider.details)}</p></div>
         </details>`
      : '';

    const arrow = `<span class="tpl-btn__arrow" aria-hidden="true">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
    </span>`;

    // CTA: geometrischer Ecken-Cut-Button, direkt zur Offer-Information.
    // Etikett per provider.cta übersteuerbar (Standard: „Zum Angebot“).
    const ctaLabel = provider.cta || 'Zum Angebot';
    const cta = hasUrl
      ? `<a href="${esc(provider.url)}" class="btn btn--primary offer__cta" target="_blank" rel="${rel}">
           ${esc(ctaLabel)}
           ${arrow}
         </a>`
      : `<span class="btn btn--primary btn--disabled offer__cta" aria-disabled="true">Angebot folgt</span>`;

    const visual = withImage
      ? `<div class="offer__visual">${face.markup}</div>`
      : '';

    return `
      <article class="offer ${withImage ? 'offer--visual' : ''} ${token ? `offer--${esc(token)}` : ''} ${single ? 'offer--single' : ''}"
               ${provider.slug ? `id="provider-${esc(provider.slug)}"` : ''}>
        <span class="offer__ghost" aria-hidden="true">${num}</span>
        <span class="offer__shape" aria-hidden="true"></span>
        ${head}
        <div class="offer__body">
          <div class="offer__content">
            <div class="offer__logo">${logo}</div>
            <h3 class="offer__name">${esc(provider.name)}</h3>
            <p class="offer__desc">${esc(provider.description)}</p>
            ${meta}
            ${benefits}
            <div class="offer__action">
              ${cta}
              ${details}
            </div>
          </div>
          ${visual}
        </div>
      </article>`;
  }

  // Render all provider cards on the current internal service page.
  // Multiple providers → comparison grid; one provider → large single card.
  // Alle Offers gleiche Grösse: innerhalb einer Grid-Rasterhöhe werden die
  // Kartengrössen vereinheitlicht, damit die Vergleichsliste sauber wirkt.
  function renderServiceCards() {
    const mounts = $$('[data-service-page]');
    if (!mounts.length || typeof SERVICE_PAGES === 'undefined') return;
    mounts.forEach((mount) => {
      const slug = mount.getAttribute('data-service-page');
      const page = SERVICE_PAGES.find((p) => pageSlug(p) === slug);
      if (!page || !page.providers) return;
      const count = page.providers.length;
      const single = count === 1;
      if (single) {
        mount.classList.add('offer-grid--single');
      } else {
        mount.classList.add('offer-grid--product', `offer-grid--count-${count}`);
      }
      mount.innerHTML = page.providers
        .map((p, i) => serviceCard(p, { single: single, position: i + 1 }))
        .join('');

      // Vergleichs-Grid: alle Offers auf die höchste Karte ziehen,
      // damit jede Karte exakt gleich gross ist (Höhe + Breite).
      if (!single) {
        const offers = $$('.offer', mount);
        if (offers.length > 1) {
          const tallest = Math.max(...offers.map((o) => o.getBoundingClientRect().height));
          offers.forEach((o) => {
            o.style.height = `${Math.ceil(tallest)}px`;
          });
        }
      }
    });

    // Fenster-/Breakpoint-Änderungen: Kartenhöhen neu vereinheitlichen.
    let resizeT = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => {
        $$('.offer-grid--product').forEach((mount) => {
          const offers = $$('.offer', mount);
          if (offers.length > 1) {
            offers.forEach((o) => (o.style.height = ''));
            const tallest = Math.max(...offers.map((o) => o.getBoundingClientRect().height));
            offers.forEach((o) => (o.style.height = `${Math.ceil(tallest)}px`));
          }
        });
      }, 120);
    });
  }

  // ============================================
  // FAQ — Accordion (Block 4) + FAQPage-JSON-LD
  // Fragen/antworten kommen aus SERVICE_PAGES[].faq. Native <button>-
  // Elemente: volle Tastatur-Bedienbarkeit (Tab/Fokus, Enter/Space),
  // aria-expanded + aria-controls für Screenreader. Pro Zeile eine Frage;
  // es ist immer höchstens eine Antwort offen.
  // ============================================
  function injectFaqLd(faqItems) {
    if (!faqItems || !faqItems.length) return;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: (Array.isArray(item.a) ? item.a : [item.a]).join(' '),
        },
      })),
    };
    $('script[data-js-seo="faqpage"]')?.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-js-seo', 'faqpage');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }

  function renderFaq() {
    const mounts = $$('[data-faq-page]');
    if (!mounts.length || typeof SERVICE_PAGES === 'undefined') return;
    mounts.forEach((mount) => {
      const slug = mount.getAttribute('data-faq-page');
      const page = SERVICE_PAGES.find((p) => pageSlug(p) === slug);
      if (!page || !Array.isArray(page.faq) || !page.faq.length) return;

      const answers = (item) =>
        (Array.isArray(item.a) ? item.a : [item.a])
          .map((p) => `<p>${esc(p)}</p>`)
          .join('');

      mount.innerHTML = page.faq
        .map((item, i) => {
          const qId = `${slug}-faq-q-${i + 1}`;
          const aId = `${slug}-faq-a-${i + 1}`;
          return `
            <div class="tpl-faq__item">
              <h3 class="tpl-faq__q-wrap">
                <button type="button" class="tpl-faq__q" id="${esc(qId)}"
                        aria-expanded="false" aria-controls="${esc(aId)}">
                  <span class="tpl-faq__q-text">${esc(item.q)}</span>
                  <span class="tpl-faq__q-ico" aria-hidden="true"></span>
                </button>
              </h3>
              <div class="tpl-faq__a" id="${esc(aId)}" role="region" aria-labelledby="${esc(qId)}">
                <div class="tpl-faq__a-inner">${answers(item)}</div>
              </div>
            </div>`;
        })
        .join('');

      const items = $$('.tpl-faq__item', mount);
      items.forEach((item) => {
        const q = $('.tpl-faq__q', item);
        q.addEventListener('click', () => {
          const wasOpen = item.classList.contains('is-open');
          items.forEach((el) => {
            el.classList.remove('is-open');
            const b = $('.tpl-faq__q', el);
            if (b) b.setAttribute('aria-expanded', 'false');
          });
          if (!wasOpen) {
            item.classList.add('is-open');
            q.setAttribute('aria-expanded', 'true');
          }
        });
      });

      injectFaqLd(page.faq);
    });
  }

  // ============================================
  // HEADER — scroll effect
  // ============================================
  const header = $('.header');
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    if (y > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ============================================
  // HAMBURGER — mobile nav toggle
  // ============================================
  const hamburger = $('.hamburger');
  const mobileNav = $('#mobile-nav');

  function toggleMobileNav() {
    const isOpen = hamburger.classList.toggle('hamburger--open');
    mobileNav.classList.toggle('mobile-nav--open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);

    if (isOpen) {
      // Focus first link
      const firstLink = $('.mobile-nav__link', mobileNav);
      if (firstLink) firstLink.focus();
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileNav);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('mobile-nav--open')) {
        toggleMobileNav();
        hamburger.focus();
      }
    });

    // Close on link click
    $$('.mobile-nav__link', mobileNav).forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileNav.classList.contains('mobile-nav--open')) {
          toggleMobileNav();
        }
      });
    });
  }

  // ============================================
  // JOURNEY — render & interactions
  // ============================================
  function renderJourney() {
    const track = $('.journey__track');
    if (!track || typeof JOURNEY_PHASES === 'undefined') return;

    // Keep the path element
    const pathEl = $('.journey__path', track);
    track.innerHTML = '';
    if (pathEl) track.appendChild(pathEl);

    JOURNEY_PHASES.forEach((phase, index) => {
      const isLeft = index % 2 === 0;
      const phaseEl = document.createElement('div');
      phaseEl.className = `journey__phase ${isLeft ? 'journey__phase--left' : 'journey__phase--right'}`;
      phaseEl.setAttribute('data-phase', phase.id);
      phaseEl.setAttribute('role', 'listitem');

      const availableCount = phase.items.filter((i) => i.status !== 'coming-soon').length;

      phaseEl.innerHTML = `
        <div class="journey__node" aria-hidden="true">${phase.icon}</div>
        <div class="journey__card" tabindex="0" role="button" aria-expanded="false"
             aria-label="${phase.number} ${phase.title} – ${phase.description}">
          <div class="journey__card-header">
            <div>
              <div class="journey__card-number">${phase.number}</div>
              <h3 class="journey__card-title">${phase.title}</h3>
              <div class="journey__card-subtitle">${phase.subtitle}</div>
            </div>
          </div>
          <p class="journey__card-desc">${phase.description}</p>
          <div class="journey__card-toggle">
            <span>${phase.items.length} Themen entdecken</span>
            <span class="journey__card-toggle-icon" aria-hidden="true">▾</span>
          </div>
          <div class="journey__items" aria-hidden="true">
            <div class="journey__items-inner">
              ${phase.items.map((item) => {
                const status = item.status || 'coming-soon';
                const providers = getProvidersForSlug(item.slug);
                const page = getServicePageForSlug(item.slug);

                // Title link for live themes.
                const isLive = status !== 'coming-soon';
                const titleMarkup = isLive
                  ? `<a href="${esc(internalUrlFor(item))}" class="journey__item-title journey__item-title--link">${esc(item.title)}</a>`
                  : `<span class="journey__item-title">${esc(item.title)}</span>`;

                let chips = '';

                if (status === 'coming-soon') {
                  // No provider assigned yet → "Demnächst" placeholder.
                  chips = `<span class="provider-chip provider-chip--empty">
                             <span class="provider-chip__name">Demnächst</span>
                           </span>`;
                } else if (status === 'multiple-providers') {
                  // Leads to an internal service page with several provider cards.
                  const count = page && page.providers ? page.providers.length : 0;
                  chips = compareChip(item, count || (providers.length || 1));
                } else if (status === 'internal-page') {
                  // Information article (no external offers).
                  chips = infoChip();
                } else if (status === 'affiliate') {
                  // Single affiliate offer → internal page keeps the offer card.
                  chips = providers.length
                    ? providers.map((p) => providerChip(p, item.title, internalUrlFor(item))).join('')
                    : infoChip();
                } else {
                  // provider (e.g. GRE service) → chip links to the provider
                  // directly, or internally when a service page exists.
                  chips = providers.length
                    ? providers.map((p) => providerChip(p, item.title, page ? internalUrlFor(item) : null)).join('')
                    : `<span class="provider-chip provider-chip--empty"><span class="provider-chip__name">Demnächst</span></span>`;
                }

                if (isLive) {
                  return `
                    <div class="journey__item journey__item--available">
                      ${titleMarkup}
                      <div class="journey__providers">${chips}</div>
                    </div>`;
                }
                return `
                  <div class="journey__item journey__item--coming-soon">
                    ${titleMarkup}
                    <div class="journey__providers">${chips}</div>
                  </div>`;
              }).join('')}
            </div>
          </div>
        </div>
      `;

      track.appendChild(phaseEl);

      // Toggle interaction
      const card = $('.journey__card', phaseEl);
      const items = $('.journey__items', phaseEl);

      function togglePhase() {
        const isActive = phaseEl.classList.toggle('journey__phase--active');
        card.setAttribute('aria-expanded', String(isActive));
        items.setAttribute('aria-hidden', String(!isActive));
        // Keep collapsed chips out of focus order and out of the a11y tree
        // until the phase is opened (progressive disclosure).
        items.inert = !isActive;
        // The card grows/shrinks over the CSS max-height transition; let
        // the road re-measure and "grow" with it (path follows the nodes).
        syncRoad();
      }

      // Initially collapsed → non-interactive.
      items.inert = true;

      card.addEventListener('click', togglePhase);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          togglePhase();
        }
      });

      // Entrance / scroll-reveal state: cards & nodes appear one after another
      // (kept subtle: small offset, gentle ease-out — per design guidance).
      if (!prefersReducedMotion) {
        phaseEl.setAttribute('data-revealed', 'false');
        phaseEl.style.opacity = '0';
        phaseEl.style.transform = 'translateY(0)';
        phaseEl.style.transition = 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)';
      }
    });

    // Scroll-reveal + active-station tracking
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const ph = entry.target;
              // Stagger a little as each station enters, but never so long
              // that the journey feels sluggish.
              const pending = $$('.journey__phase[data-revealed="false"]', track);
              const delay = pending.indexOf(ph) * 40;
              setTimeout(() => {
                ph.style.opacity = '1';
                ph.style.transform = 'translateY(0)';
                ph.setAttribute('data-revealed', 'true');
              }, Math.min(delay, 300));
              revealObserver.unobserve(ph);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      $$('.journey__phase', track).forEach((phase) => revealObserver.observe(phase));

      // "Active station" subtle highlight while scrolling the journey.
      // Uses the default viewport trigger so the current station glows.
      const inviewObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('journey__phase--inview');
            } else {
              entry.target.classList.remove('journey__phase--inview');
            }
          });
        },
        { threshold: 0.35 }
      );
      $$('.journey__phase', track).forEach((phase) => inviewObserver.observe(phase));
    } else {
      // Fallback: show all
      $$('.journey__phase', track).forEach((phase) => {
        phase.style.opacity = '1';
        phase.style.transform = 'translate(0, 0)';
        phase.setAttribute('data-revealed', 'true');
      });
    }

    // Draw the winding road through the node centers
    drawJourneyPath();
  }

  // ============================================
  // JOURNEY — winding road (SVG)
  // The road is measured against the LIVE geometry of the station
  // dots. A ResizeObserver watches the track, so whenever a card is
  // expanded/collapsed (or the viewport changes) the path is rebuilt to
  // follow the nodes in real time — the route "grows" with the cards and
  // never sits under a card or its expanded text.
  // ============================================
  const NS = 'http://www.w3.org/2000/svg';

  // Measure each station's centre relative to the track. The node scale
  // used on hover/inview keeps the visual centre fixed, so this reports
  // the resting position the road should pass through.
  function measureNodes(track) {
    const trackRect = track.getBoundingClientRect();
    return $$('.journey__node', track).map((node) => {
      const r = node.getBoundingClientRect();
      const x = r.left - trackRect.left + r.width / 2;
      const y = r.top - trackRect.top + r.height / 2;
      return {
        x: isMobile() ? Math.max(18, Math.min(trackRect.width - 18, x)) : x,
        y,
      };
    });
  }

  // Build the smooth clamped-cubic path through the stations. Each pair
  // of consecutive nodes forms exactly one cubic segment, so the shape
  // of the "d" is stable no matter how the cards grow.
  function buildRoadD(pts) {
    if (!pts.length) return 'M 0 0';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      // Tangent magnitude ~ 1/3 of the vertical distance for a natural S.
      const k = Math.abs(p1.y - p0.y) * 0.33;
      d += ` C ${p0.x} ${p0.y + k}, ${p1.x} ${p1.y - k}, ${p1.x} ${p1.y}`;
    }
    return d;
  }

  // Apply a freshly-measured path to the (existing) dynamic svg.
  // This is used both for the initial render and for live re-measures,
  // so the road always matches the current card geometry.
  function applyRoad(svg, track, pts) {
    const tr = track.getBoundingClientRect();
    const d = buildRoadD(pts);
    svg.setAttribute('viewBox', `0 0 ${tr.width} ${tr.height}`);
    svg.style.width = tr.width + 'px';
    svg.style.height = tr.height + 'px';
    $$('.journey__road-edge, .journey__road-base, .journey__road-center', svg).forEach((p) => {
      p.setAttribute('d', d);
    });
    return d;
  }

  // Create (once) the svg with the gradient plus the three road strokes.
  function ensureRoad(track) {
    let svg = track.querySelector('.journey__path--dynamic');
    if (svg) return svg;
    svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'journey__path journey__path--dynamic');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    const gradient = document.createElementNS(NS, 'linearGradient');
    gradient.setAttribute('id', 'journeyGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');
    ([
      ['0%', '#3B82F6'],
      ['12%', '#8B5CF6'],
      ['25%', '#06B6D4'],
      ['37%', '#10B981'],
      ['50%', '#F59E0B'],
      ['62%', '#EF4444'],
      ['75%', '#EC4899'],
      ['87%', '#6366F1'],
      ['100%', '#475569'],
    ]).forEach(([off, color]) => {
      const stop = document.createElementNS(NS, 'stop');
      stop.setAttribute('offset', off);
      stop.setAttribute('stop-color', color);
      gradient.appendChild(stop);
    });
    svg.appendChild(gradient);

    const edge = document.createElementNS(NS, 'path');
    edge.setAttribute('class', 'journey__road-edge');
    const base = document.createElementNS(NS, 'path');
    base.setAttribute('class', 'journey__road-base');
    const center = document.createElementNS(NS, 'path');
    center.setAttribute('class', 'journey__road-center');
    center.setAttribute('stroke', 'url(#journeyGradient)');

    svg.appendChild(edge);
    svg.appendChild(base);
    svg.appendChild(center);
    track.appendChild(svg);
    return svg;
  }

  // Initial draw: ensure the svg, apply the first path, trigger the
  // draw-on / flow animations.
  function drawJourneyPath() {
    const track = $('.journey__track');
    if (!track) return;
    const svg = ensureRoad(track);
    const pts = measureNodes(track);
    applyRoad(svg, track, pts);
    const center = $('.journey__road-center', svg);
    const len = center.getTotalLength();
    if (len) {
      document.documentElement.style.setProperty('--path-length', String(Math.ceil(len)));
      track.classList.add('journey__track--drawn');
      if (!isMobile()) {
        setTimeout(() => track.classList.add('journey__track--animated'), 1700);
      }
    }
  }

  // Live syncing: coalesced rAF loop that re-measures the nodes and
  // re-applies the path so it stays glued to the cards while they
  // expand/collapse (and on any layout change). Stops once two frames
  // produce identical geometry, and restarts on demand.
  let roadLoopRunning = false;
  function syncRoad() {
    if (roadLoopRunning) return;
    const track = $('.journey__track');
    const svg = track && track.querySelector('.journey__path--dynamic');
    if (!track || !svg) return;
    roadLoopRunning = true;
    let lastSig = '';
    const step = () => {
      if (!roadLoopRunning) return;
      const pts = measureNodes(track);
      const sig = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join('|');
      if (sig === lastSig) {
        // Settled — stop chasing (a final apply already happened).
        roadLoopRunning = false;
        return;
      }
      lastSig = sig;
      applyRoad(svg, track, pts);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function onResize() {
    const track = $('.journey__track');
    if (!track) return;
    track.classList.remove('journey__track--drawn', 'journey__track--animated');
    drawJourneyPath();
  }

  // ============================================
  // SERVICES — render grid
  // ============================================
  function renderServices() {
    const grid = $('#services-grid');
    if (!grid || typeof SERVICE_CATEGORIES === 'undefined') return;

    grid.innerHTML = SERVICE_CATEGORIES.map((cat) => {
      const availableServices = cat.services.filter((s) => s.available);
      const totalServices = cat.services.length;

      return `
        <article class="service-card" data-color="${cat.colorVar}" tabindex="0" role="link"
                 aria-label="${cat.title} – ${cat.description}">
          <div class="service-card__icon" aria-hidden="true">${cat.icon}</div>
          <h2 class="service-card__title">${cat.title}</h2>
          <p class="service-card__desc">${cat.description}</p>
          <div class="service-card__items">
            ${cat.services
              .slice(0, 4)
              .map(
                (s) =>
                  `<span class="service-card__item ${s.available ? 'service-card__item--available' : ''}">${s.title}</span>`
              )
              .join('')}
            ${totalServices > 4 ? `<span class="service-card__item">+${totalServices - 4} weitere</span>` : ''}
          </div>
          <div class="service-card__footer">
            <span class="service-card__cta">
              Entdecken
              <span class="service-card__cta-arrow" aria-hidden="true">→</span>
            </span>
            <span class="service-card__count">${totalServices} Services</span>
          </div>
        </article>
      `;
    }).join('');

    // Make cards clickable
    $$('.service-card', grid).forEach((card, index) => {
      const cat = SERVICE_CATEGORIES[index];
      function navigate() {
        if (cat.journeyLink) {
          // Navigate to homepage journey section
          window.location.href = `index.html#journey`;
        }
      }

      card.addEventListener('click', navigate);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate();
        }
      });
    });

    // Entrance animations
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
              }, i * 80);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      $$('.service-card', grid).forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(card);
      });
    }
  }

  // ============================================
  // SMOOTH SCROLL for anchor links
  // ============================================
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = $(targetId);
        if (target) {
          e.preventDefault();
          const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
          const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
          window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
          // Update URL without scroll
          history.pushState(null, '', targetId);
        }
      });
    });
  }

  // ============================================
  // SMOOTH REVEAL for .tpl-reveal elements
  // ============================================
  function initReveal() {
    const items = $$('.tpl-reveal');
    if (!items.length) return;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }
    // Reveal anything already within (or near) the viewport immediately, so
    // content above the fold is never left invisible if the observer's initial
    // callback is delayed.
    const inView = (el) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh - 40 && r.bottom > 0;
    };
    items.forEach((el) => { if (inView(el)) el.classList.add('is-in'); });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    items.forEach((el) => io.observe(el));

    // Guaranteed safety net: never leave content invisible. In browsers where
    // IntersectionObserver delivers callbacks, the progressive reveal has
    // already happened as the user scrolled; this only catches stragglers.
    window.addEventListener('load', () => {
      setTimeout(() => items.forEach((el) => el.classList.add('is-in')), 700);
    }, { once: true });
  }

  // ============================================
  // INIT
  // ============================================
  function init() {
    renderJourney();
    renderServices();
    renderServiceCards();
    renderFaq();
    initSmoothScroll();
    initReveal();

    // Robust responsiveness: watch the track itself. Any layout change —
    // expanded cards, viewport resize, font/wrap differences, etc. — is
    // caught here and the road is re-measured + re-applied to follow the
    // moving station dots. No fixed pixel assumptions.
    const track = $('.journey__track');
    if (track && 'ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(() => {
        // Fires continuously during the card max-height transition.
        syncRoad();
      });
      resizeObserver.observe(track);
    }

    // Redraw the path on window resize (kept as a debounced fallback for
    // the draw-on animation reset when crossing viewport breakpoints).
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        onResize();
      }, 150);
    });

    // Handle hash on load (e.g. index.html#journey)
    if (window.location.hash) {
      setTimeout(() => {
        const target = $(window.location.hash);
        if (target) {
          const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
          const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
          window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      }, 300);
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
