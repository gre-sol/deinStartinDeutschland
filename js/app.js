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

      const availableCount = phase.items.filter((i) => i.available).length;

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
              ${phase.items
                .map(
                  (item) => `
                ${
                  item.available && item.serviceType === 'external'
                    ? `<a href="#" class="journey__item journey__item--available journey__item--external" data-service-slug="${item.slug}">
                        <span aria-hidden="true">→</span>
                        <span>${item.title}</span>
                        <span class="journey__item-badge">
                          <span class="badge badge--external">Externer Service</span>
                        </span>
                       </a>`
                    : item.available
                    ? `<a href="${item.slug}.html" class="journey__item journey__item--available">
                        <span aria-hidden="true">→</span>
                        <span>${item.title}</span>
                        <span class="journey__item-arrow" aria-hidden="true">→</span>
                       </a>`
                    : `<div class="journey__item journey__item--coming-soon">
                        <span aria-hidden="true">·</span>
                        <span>${item.title}</span>
                        <span class="journey__item-badge">
                          <span class="badge badge--coming-soon">Demnächst</span>
                        </span>
                       </div>`
                }`
                )
                .join('')}
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
        // The card grows/shrinks over the CSS max-height transition; let
        // the road re-measure and "grow" with it (path follows the nodes).
        syncRoad();
      }

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
  // INIT
  // ============================================
  function init() {
    renderJourney();
    renderServices();
    initSmoothScroll();

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
