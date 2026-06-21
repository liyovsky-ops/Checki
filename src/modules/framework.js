import { FRAMEWORKS, ALL_FRAMEWORKS } from '../data/frameworks.js';

let _openFramework = () => {};

export function initFramework(deps) {
  _openFramework = deps.openFramework;
}

export function showApp(app) {
  const checki    = document.getElementById('checki-page');
  const fw        = document.getElementById('framework-page');
  const btnChecki = document.querySelector('.logo-checki');
  const btnFw     = document.querySelector('.logo-framework');
  if (app === 'framework') {
    checki.style.display = 'none';
    fw.style.display = 'flex';
    btnChecki.classList.remove('active');
    btnFw.classList.add('active');
    applyFwTheme('frontend');
    setTimeout(() => {
      const s = document.querySelector('.fw-section[data-theme="frontend"]');
      if (s) s.scrollIntoView({ behavior: 'instant' });
    }, 0);
  } else {
    fw.style.display = 'none';
    checki.style.display = 'flex';
    btnChecki.classList.add('active');
    btnFw.classList.remove('active');
    document.getElementById('framework-page').className = '';
  }
}

const FW_THEMES = {
  frontend: { bg: '#0d0a1f' }, backend:  { bg: '#050f05' },
  database: { bg: '#08050f' }, devops:   { bg: '#050a10' },
  ai:       { bg: '#0f0a05' },
};

function applyFwTheme(theme) {
  const t = FW_THEMES[theme];
  if (!t) return;
  const page = document.getElementById('framework-page');
  page.style.background = t.bg;
  page.style.transition = 'background 0.6s ease';
}

const CATEGORY_ACCENT = {
  frontend: '#a78bfa',
  backend:  '#00ff41',
  database: '#8b5cf6',
  devops:   '#60a5fa',
  testing:  '#0A9EDC',
  ai:       '#f97316',
};

function hexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

export function renderTiles(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const accent = CATEGORY_ACCENT[category] || '#7c6af7';
  (FRAMEWORKS[category] || []).filter(fw => !fw.hideTile).forEach(function(fw) {
    const tile = document.createElement('div');
    tile.className = 'fw-tile';
    tile.style.background   = hexToRgba(accent, 0.05);
    tile.style.borderColor  = hexToRgba(accent, 0.15);
    tile.style.setProperty('--tc-bg',     hexToRgba(accent, 0.14));
    tile.style.setProperty('--tc-border', hexToRgba(accent, 0.55));
    tile.style.setProperty('--tc-glow',   hexToRgba(accent, 0.22));
    tile.onclick = () => _openFramework(fw);
    tile.innerHTML =
      '<div class="fw-tile-icon">' + fw.icon + '</div>' +
      '<div class="fw-tile-name">' + fw.name + '</div>' +
      '<div class="fw-tile-desc">' + fw.desc  + '</div>' +
      '<div class="fw-tile-lang">' + fw.lang  + '</div>';
    container.appendChild(tile);
  });
}

export function onFwSearch(query) {
  const suggestionsEl = document.getElementById('fw-suggestions');
  suggestionsEl.innerHTML = '';
  if (!query.trim()) return;
  const q = query.toLowerCase();
  const matches = ALL_FRAMEWORKS.filter(fw =>
    fw.name.toLowerCase().includes(q) || fw.cat.toLowerCase().includes(q)
  ).slice(0, 10);
  matches.forEach(function(fw) {
    const chip = document.createElement('button');
    chip.className = 'fw-suggestion-chip';
    chip.style.borderColor = hexToRgba(fw.color, 0.4);
    chip.style.color = fw.color;
    chip.innerHTML =
      '<span class="fw-chip-icon">'  + fw.icon + '</span>' +
      '<span class="fw-chip-name">'  + fw.name + '</span>' +
      '<span class="fw-chip-cat">'   + fw.cat  + '</span>' +
      '<span class="fw-chip-arrow" style="color:' + fw.color + '">→</span>';
    chip.onclick = () => { clearFwSearch(); _openFramework(fw); };
    suggestionsEl.appendChild(chip);
  });
  if (matches.length > 0) {
    document.getElementById('fw-search-input').onkeydown = e => {
      if (e.key === 'Enter') { clearFwSearch(); _openFramework(matches[0]); }
    };
  }
}

export function clearFwSearch() {
  document.getElementById('fw-result-view').style.display  = 'none';
  document.getElementById('fw-search-view').style.display  = 'flex';
  document.getElementById('fw-search-input').value         = '';
  document.getElementById('fw-suggestions').innerHTML      = '';
}

function initScrollTheme() {
  const page     = document.getElementById('framework-page');
  const sections = page.querySelectorAll('.fw-section');
  new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) applyFwTheme(e.target.dataset.theme); });
  }, { root: page, threshold: 0.4 }).observe ? sections.forEach(s => {
    new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) applyFwTheme(e.target.dataset.theme); });
    }, { root: page, threshold: 0.4 }).observe(s);
  }) : null;
}

document.addEventListener('DOMContentLoaded', function() {
  renderTiles('frontend', 'fw-tiles-frontend');
  renderTiles('backend',  'fw-tiles-backend');
  renderTiles('database', 'fw-tiles-database');
  renderTiles('devops',   'fw-tiles-devops');
  renderTiles('ai',       'fw-tiles-ai');
  renderTiles('testing',  'fw-tiles-testing');
  initScrollTheme();
});
