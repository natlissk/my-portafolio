
const toggle = document.querySelector('#menuToggle');
const nav = document.querySelector('#nav');
const links = document.querySelectorAll('#nav a');

toggle.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(opened));
  toggle.setAttribute('aria-label', opened ? 'Close menu' : 'Open menu');
  toggle.textContent = opened ? '✕' : '☰';
});

links.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.textContent = '☰';
}));

const sections = document.querySelectorAll('main section[id]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(lik => link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + entry.target.id
      ));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));

document.querySelector('#year').textContent = new Date().getFullYear();


// Flip only the project cards; existing menu and navigation remain unchanged.
document.querySelectorAll('.project-card').forEach(card => {
  const buttons = card.querySelectorAll('.flip-button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const isFlipped = card.classList.toggle('is-flipped');

      buttons.forEach(item => {
        item.setAttribute('aria-expanded', String(isFlipped));
      });
    });
  });
});

