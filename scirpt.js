// =====================
// Scroll Reveal
// =====================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + 'ms';
  revealObserver.observe(el);
});

// =====================
// Nav Active Link Highlight
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
sections.forEach((s) => sectionObserver.observe(s));

// =====================
// Mini Slider (в карточках услуг)
// =====================
function initSlider(container) {
  const track = container.querySelector('.slider-track');
  const slides = container.querySelectorAll('.slide');
  const dotsContainer = container.querySelector('.slider-dots');
  const prevBtn = container.querySelector('.slider-prev');
  const nextBtn = container.querySelector('.slider-next');

  if (!track || slides.length === 0) return;

  let current = 0;
  const total = slides.length;

  // Создаём точки
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    container.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

  // Свайп на тач
  let startX = 0;
  container.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  container.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  // Автоплей
  let autoplay = setInterval(() => goTo(current + 1), 4000);
  container.addEventListener('mouseenter', () => clearInterval(autoplay));
  container.addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(current + 1), 4000); });
}

document.querySelectorAll('[data-slider]').forEach(initSlider);

// =====================
// Gallery Main Slider
// =====================
function initGallerySlider(container) {
  const track = container.querySelector('.gallery-slider-track');
  const slides = container.querySelectorAll('.gallery-slide');
  const prevBtn = container.querySelector('.gallery-prev');
  const nextBtn = container.querySelector('.gallery-next');
  const currentLabel = container.querySelector('.gallery-current');
  const totalLabel = container.querySelector('.gallery-total');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  if (!track || slides.length === 0) return;

  let current = 0;
  const total = slides.length;
  if (totalLabel) totalLabel.textContent = total;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    if (currentLabel) currentLabel.textContent = current + 1;
    thumbs.forEach((t, i) => t.classList.toggle('active', i === current));
  }

  prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => goTo(parseInt(thumb.dataset.index)));
  });

  // Свайп
  let startX = 0;
  container.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  container.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
  });

  // Клавиатура (стрелки) когда галерея видна
  document.addEventListener('keydown', (e) => {
    const gallerySection = document.getElementById('gallery');
    const rect = gallerySection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    }
  });

  // Автоплей
  let autoplay = setInterval(() => goTo(current + 1), 5000);
  container.addEventListener('mouseenter', () => clearInterval(autoplay));
  container.addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(current + 1), 5000); });
}

document.querySelectorAll('[data-gallery-slider]').forEach(initGallerySlider);