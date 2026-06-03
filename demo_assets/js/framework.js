// Przełączanie między Checki i Framework
function showApp(app) {
  var checki   = document.getElementById('checki-page');
  var fw       = document.getElementById('framework-page');
  var btnChecki = document.querySelector('.logo-checki');
  var btnFw     = document.querySelector('.logo-framework');

  if (app === 'framework') {
    checki.style.display = 'none';
    fw.style.display = 'flex';
    btnChecki.classList.remove('active');
    btnFw.classList.add('active');
    applyFwTheme('frontend');
  } else {
    fw.style.display = 'none';
    checki.style.display = 'flex';
    btnChecki.classList.add('active');
    btnFw.classList.remove('active');
    document.getElementById('framework-page').className = '';
  }
}

// Motywy sekcji
var FW_THEMES = {
  frontend: { bg: '#0d0a1f', border: 'rgba(124,106,247,0.15)', label: '#7c6af7' },
  backend:  { bg: '#050f05', border: 'rgba(68,183,139,0.15)',  label: '#44b78b' },
  database: { bg: '#08050f', border: 'rgba(90,103,216,0.15)',  label: '#5a67d8' },
  devops:   { bg: '#050a10', border: 'rgba(36,150,237,0.15)',  label: '#2496ed' },
};

function applyFwTheme(theme) {
  var t = FW_THEMES[theme];
  if (!t) return;
  var page = document.getElementById('framework-page');
  page.style.background = t.bg;
  page.style.transition = 'background 0.6s ease';
}

// Renderowanie kafelków
function renderTiles(category, containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  var list = FRAMEWORKS[category] || [];

  list.forEach(function(fw) {
    var tile = document.createElement('div');
    tile.className = 'fw-tile';
    tile.style.background = hexToRgba(fw.color, 0.07);
    tile.style.borderColor = hexToRgba(fw.color, 0.2);
    tile.onclick = function() { openFramework(fw); };

    tile.innerHTML =
      '<div class="fw-tile-icon">' + fw.icon + '</div>' +
      '<div class="fw-tile-name">' + fw.name + '</div>' +
      '<div class="fw-tile-desc">' + fw.desc + '</div>' +
      '<div class="fw-tile-lang">' + fw.lang + '</div>';

    container.appendChild(tile);
  });
}

function hexToRgba(hex, alpha) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(function(c){ return c+c; }).join('');
  var r = parseInt(hex.substring(0,2), 16);
  var g = parseInt(hex.substring(2,4), 16);
  var b = parseInt(hex.substring(4,6), 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

function openFramework(fw) {
  // Na razie placeholder — docelowo pełna strona szczegółów
  alert(fw.name + ' — szczegóły frameworka będą tutaj');
}

// Scroll — zmiana motywu gdy sekcja wchodzi w widok
function initScrollTheme() {
  var page = document.getElementById('framework-page');
  var sections = page.querySelectorAll('.fw-section');

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        applyFwTheme(entry.target.dataset.theme);
      }
    });
  }, { root: page, threshold: 0.4 });

  sections.forEach(function(s) { observer.observe(s); });
}

// Init po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
  renderTiles('frontend', 'fw-tiles-frontend');
  renderTiles('backend',  'fw-tiles-backend');
  renderTiles('database', 'fw-tiles-database');
  renderTiles('devops',   'fw-tiles-devops');
  initScrollTheme();
});
