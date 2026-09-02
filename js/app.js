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

    // Keep the line element
    const line = $('.journey__line', track);
    track.innerHTML = '';
    if (line) track.appendChild(line);

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
                  item.available
                    ? `<a href="/${item.slug}" class="journey__item journey__item--available">
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
      }

      card.addEventListener('click', togglePhase);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          togglePhase();
        }
      });

      // Entrance animation
      if (!prefersReducedMotion) {
        phaseEl.style.opacity = '0';
        phaseEl.style.transform = isLeft ? 'translateX(-20px)' : 'translateX(20px)';
        phaseEl.style.transition = `opacity ${500 + index * 60}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${500 + index * 60}ms cubic-bezier(0.16, 1, 0.3, 1)`;
      }
    });

    // Intersection Observer for entrance animations
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateX(0)';
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
      );

      $$('.journey__phase', track).forEach((phase) => observer.observe(phase));
    } else {
      // Fallback: show all
      $$('.journey__phase', track).forEach((phase) => {
        phase.style.opacity = '1';
        phase.style.transform = 'translateX(0)';
      });
    }
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
