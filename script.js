'use strict';
(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const closeMenu = () => {
    if (!menuButton || !mobileNav) return;
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Menü öffnen');
    document.body.classList.remove('menu-open');
  };
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        mobileNav.hidden = false;
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.setAttribute('aria-label', 'Menü schließen');
        document.body.classList.add('menu-open');
      }
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
      if (event.matches) closeMenu();
    });
  }
  const calendarButton = document.querySelector('#load-tcg-calendar');
  const calendarContainer = document.querySelector('#calendar-embed');
  if (calendarButton && calendarContainer) {
    calendarButton.addEventListener('click', () => {
      if (calendarContainer.querySelector('iframe')) return;
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.tcgevents.net/profile/17413627470044';
      iframe.title = 'DufBros – aktuelle Turniere bei TCGevents';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      calendarContainer.hidden = false;
      calendarContainer.appendChild(iframe);
      calendarButton.textContent = 'Kalender unten geöffnet';
      calendarButton.disabled = true;
    });
  }
  document.querySelectorAll('[data-load-video]').forEach(button => {
    button.addEventListener('click', () => {
      const wrapper = button.closest('[data-video]');
      const videoId = wrapper?.getAttribute('data-video');
      if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return;
      const iframe = document.createElement('iframe');
      iframe.title = 'Video aus dem DufBros Store';
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1';
      iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      wrapper.replaceChildren(iframe);
    });
  });
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
