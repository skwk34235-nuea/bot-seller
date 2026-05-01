let currentLang = localStorage.getItem('lang') || 'th';

function t(key) {
  if (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang][key]) {
    return translations[currentLang][key];
  }
  return key;
}

function toggleLang() {
  currentLang = currentLang === 'th' ? 'en' : 'th';
  localStorage.setItem('lang', currentLang);
  const langLabel = document.getElementById('langLabel');
  if (langLabel) {
    langLabel.textContent = currentLang === 'th' ? 'EN' : 'TH';
  }
  updateTranslations();
}

function updateTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    let key = el.dataset.i18n;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else {
      el.innerHTML = t(key);
    }
  });
}

// Initial setup on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  const langLabel = document.getElementById('langLabel');
  if (langLabel) {
    langLabel.textContent = currentLang === 'th' ? 'EN' : 'TH';
  }
  updateTranslations();
});
