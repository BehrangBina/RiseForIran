 // Mobile menu toggle
    const nav = document.getElementById('siteNav');
    const toggle = document.getElementById('menuToggle');
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Make nav solid after hero (IntersectionObserver for performance)
    const hero = document.getElementById('hero');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Observer watches when hero is out of view at the top
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const atTop = entry.isIntersecting; // hero in view
          if (atTop) {
            nav.classList.add('is-transparent');
            nav.classList.remove('is-solid');
          } else {
            nav.classList.remove('is-transparent');
            nav.classList.add('is-solid');
          }
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: `-${getComputedStyle(nav).height || '64px'} 0px 0px 0px`
      }
    );
    observer.observe(hero);

    // Optional: close mobile menu when clicking a link
    document.getElementById('primaryLinks').addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });