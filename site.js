/** KaiRis Systems · shared site behavior */
(function () {
  'use strict';

  /* Scroll reveal */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  /* Nav scroll tint */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener(
      'scroll',
      () => {
        nav.style.background =
          window.scrollY > 40 ? 'rgba(15,14,12,0.95)' : 'rgba(15,14,12,0.82)';
      },
      { passive: true }
    );
  }

  /* Hero video · respect save-data + reduced motion (phone / accessibility) */
  const heroWrap = document.querySelector('.hero-visual[data-hero-wrap]');
  const heroVid = document.querySelector('.hero-video-el');
  if (heroWrap && heroVid) {
    const saveData = Boolean(navigator.connection && navigator.connection.saveData);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (saveData || reduceMotion) {
      heroWrap.classList.add('is-static');
      heroVid.removeAttribute('src');
      heroVid.load();
    } else {
      heroVid.setAttribute('autoplay', '');
      heroVid.play().catch(() => {
        heroWrap.classList.add('is-static');
      });
    }
  }

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.getElementById('nav-drawer');
  if (toggle && drawer) {
    const closeDrawer = () => {
      toggle.setAttribute('aria-expanded', 'false');
      drawer.hidden = true;
      document.body.classList.remove('nav-open');
    };

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      drawer.hidden = open;
      document.body.classList.toggle('nav-open', !open);
    });

    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeDrawer();
        toggle.focus();
      }
    });
  }

  /* Bounded projection demo */
  const demo = document.getElementById('bp-demo');
  if (demo) {
    const checkboxes = demo.querySelectorAll('input[type="checkbox"]');
    const warehouseOut = demo.querySelector('[data-out="warehouse"]');
    const sovereignOut = demo.querySelector('[data-out="sovereign"]');
    const barWarehouse = demo.querySelector('[data-bar="warehouse"]');
    const barSovereign = demo.querySelector('[data-bar="sovereign"]');
    const ratioOut = demo.querySelector('[data-out="ratio"]');
    const lrccOut = demo.querySelector('[data-out="lrcc"]');

    const weights = {
      history: 420,
      documents: 680,
      preferences: 95,
      session: 240,
      summary: 48,
    };

    const update = () => {
      let total = 0;
      let projected = 0;
      checkboxes.forEach((cb) => {
        const w = weights[cb.dataset.weight] || 0;
        total += w;
        if (cb.checked) projected += w;
      });
      const warehouse = total;
      const sovereign = projected;
      const ratio = warehouse > 0 ? Math.round(warehouse / Math.max(sovereign, 1)) : 1;
      const lrccRel = sovereign === 0 ? 0.05 : Math.min(1, 0.05 + (sovereign / warehouse) * 0.35);

      warehouseOut.textContent = `${warehouse} KB`;
      sovereignOut.textContent = `${sovereign} KB`;
      barWarehouse.style.width = '100%';
      barSovereign.style.width = `${Math.max(4, (sovereign / warehouse) * 100)}%`;
      ratioOut.textContent = `~${ratio}×`;
      lrccOut.textContent = lrccRel.toFixed(2);
    };

    checkboxes.forEach((cb) => cb.addEventListener('change', update));
    update();
  }
})();
