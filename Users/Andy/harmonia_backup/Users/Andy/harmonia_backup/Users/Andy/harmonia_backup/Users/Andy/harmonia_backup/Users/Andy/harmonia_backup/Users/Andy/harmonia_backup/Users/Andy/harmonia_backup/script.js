const menuToggle = document.querySelector('.menu-toggle');
const siteNavigation = document.querySelector('.site-nav');

if (menuToggle && siteNavigation) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteNavigation.classList.toggle('is-open', !expanded);
  });

  siteNavigation.addEventListener('click', event => {
    if (event.target.closest('a')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteNavigation.classList.remove('is-open');
    }
  });
}

document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = String(new Date().getFullYear());
});

const resourceSearch = document.querySelector('#resource-search');
const resourceCards = [...document.querySelectorAll('.resource-card')];
const noResults = document.querySelector('#no-results');
const searchStatus = document.querySelector('#search-status');

if (resourceSearch && resourceCards.length && noResults && searchStatus) {
  resourceSearch.addEventListener('input', () => {
    const query = resourceSearch.value.trim().toLocaleLowerCase('fr');
    let visibleCount = 0;

    resourceCards.forEach(card => {
      const searchableText = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase('fr');
      const isVisible = searchableText.includes(query);
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    noResults.hidden = visibleCount > 0;
    searchStatus.textContent = query ? `${visibleCount} ressource${visibleCount === 1 ? '' : 's'} trouvée${visibleCount === 1 ? '' : 's'}.` : '';
  });
}

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  const topic = contactForm.querySelector('#topic');
  const formStatus = contactForm.querySelector('#form-status');
  const requestedTopic = new URLSearchParams(window.location.search).get('objet');

  if (requestedTopic === 'benevolat' && topic) {
    topic.value = 'Devenir bénévole';
  }

  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const values = new FormData(contactForm);
    const subject = `Harmonia — ${values.get('Sujet')}`;
    const body = [
      `Nom : ${values.get('Nom')}`,
      `Courriel : ${values.get('Courriel')}`,
      '',
      String(values.get('Message'))
    ].join('\n');

    formStatus.textContent = 'Votre application de courriel va s’ouvrir avec votre message. Vérifiez-le puis envoyez-le depuis cette application.';
    formStatus.removeAttribute('data-error');
    window.location.href = `mailto:contact@harmonia.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
