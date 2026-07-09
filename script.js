const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const fadeSections = document.querySelectorAll('.section, .footer');

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks.addEventListener('click', (event) => {
  if (event.target.tagName !== 'A') {
    return;
  }

  navLinks.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
});

fadeSections.forEach((section) => {
  section.classList.add('fade-section');
});

const revealSection = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  threshold: 0.18,
});

fadeSections.forEach((section) => {
  sectionObserver.observe(section);
});
