// =====================
// Scroll Reveal Animation
// =====================
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + 'ms';
  observer.observe(el);
});

// =====================
// Smooth Nav Link Highlight
// =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach((section) => sectionObserver.observe(section));

// =====================
// Mobile Nav Toggle (hamburger — готов к расширению)
// =====================
// Если захотите добавить мобильное меню — раскомментируйте:
/*
const burger = document.querySelector('.nav-burger');
const navMenu = document.querySelector('.nav-links');
if (burger) {
  burger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}
*/