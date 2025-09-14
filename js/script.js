// Util: persistência de tema
const root = document.documentElement;
const THEME_KEY = 'theme:color-scheme';

function applyTheme(theme) {
  if (theme === 'light') {
    root.classList.add('light');
  } else {
    root.classList.remove('light');
  }
}

function toggleTheme() {
  const current = localStorage.getItem(THEME_KEY) || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

// Inicializa tema
applyTheme(localStorage.getItem(THEME_KEY) || 'dark');

// Botão de tema
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Fechar menu ao clicar em links (mobile)
siteNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => siteNav.classList.remove('open'));
});

// Rolagem suave com offset opcional (já tem CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const el = document.querySelector(targetId);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Copiar e-mail
document.getElementById('copyEmail')?.addEventListener('click', (e) => {
  const email = e.currentTarget.getAttribute('data-email');
  if (!email) return;
  navigator.clipboard.writeText(email).then(() => {
    e.currentTarget.textContent = 'Copiado!';
    setTimeout(() => (e.currentTarget.textContent = 'Copiar e-mail'), 1500);
  });
});

// Back to top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const show = window.scrollY > 600;
  backToTop?.classList.toggle('show', show);
});
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Ano no footer
document.getElementById('year').textContent = new Date().getFullYear();
