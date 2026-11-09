

/* ================================
   MOBILE MENU
================================ */

const toggle = document.querySelector('#menuToggle');
const nav = document.querySelector('#nav');
const links = document.querySelectorAll('#nav a');

toggle.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');

  toggle.setAttribute('aria-expanded', String(opened));
  toggle.setAttribute('aria-label', opened ? 'Close menu' : 'Open menu');
  toggle.textContent = opened ? '✕' : '☰';
});


/* ================================
   CLOSE MOBILE MENU AFTER CLICK
================================ */

links.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.textContent = '☰';
  });
});


/* ================================
   ACTIVE NAVIGATION
================================ */

const sections = document.querySelectorAll('main section[id]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, {
  rootMargin: '-35% 0px -55% 0px'
});

sections.forEach(section => observer.observe(section));


/* ================================
   AUTOMATIC FOOTER YEAR
================================ */

document.querySelector('#year').textContent = new Date().getFullYear();


/* ================================
   PROJECT FLIP CARDS
================================ */

// Flip only the project cards
// Existing menu and navigation remain unchanged.

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


/* ================================
   CERTIFICATIONS AND COURSES
   ENLARGED IMAGE MODAL
================================ */

// Modal elements

const certificateModal = document.querySelector('#certificateModal');
const modalImage = document.querySelector('#modalImage');
const modalCaption = document.querySelector('#modalCaption');
const modalClose = document.querySelector('#modalClose');

// All certificate preview buttons

const certificateButtons = document.querySelectorAll('.certificate-preview');

// Store the previously selected button

let previousButton = null;


/* ================================
   OPEN CERTIFICATE
================================ */

certificateButtons.forEach(button => {

  button.addEventListener('click', () => {

    const image = button.querySelector('img');
    const card = button.closest('.portfolio-item');

    // Save selected button

    previousButton = button;

    // Load certificate image

    modalImage.src = image.src;
    modalImage.alt = image.alt;

    // Load certificate title

    modalCaption.textContent =
      card.querySelector('h3').textContent;

    // Show modal

    certificateModal.hidden = false;

    // Prevent background scrolling

    document.body.classList.add('modal-open');

    // Focus close button

    modalClose.focus();

  });

});


/* ================================
   CLOSE CERTIFICATE
================================ */

function closeCertificate() {

  // Hide modal

  certificateModal.hidden = true;

  // Restore background scrolling

  document.body.classList.remove('modal-open');

  // Clear image

  modalImage.src = '';

  // Return focus to previous button

  if (previousButton) {
    previousButton.focus();
  }

}


/* ================================
   CLOSE BUTTON (X)
================================ */

modalClose.addEventListener('click', closeCertificate);


/* ================================
   CLOSE WHEN CLICKING OUTSIDE
================================ */

certificateModal.addEventListener('click', event => {

  if (event.target === certificateModal) {
    closeCertificate();
  }

});


/* ================================
   CLOSE WITH ESCAPE KEY
================================ */

document.addEventListener('keydown', event => {

  if (
    event.key === 'Escape' &&
    !certificateModal.hidden
  ) {
    closeCertificate();
  }

});
