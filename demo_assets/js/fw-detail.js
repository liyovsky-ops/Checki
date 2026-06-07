// Framework Detail Page — pełna strona szczegółów frameworka

var FW_DETAIL_ACTIVE_TAB = 'podstawy';
var FW_DETAIL_ACTIVE_FW  = 'react';

// Mapa danych per framework
var FW_DATA_MAP = {
  'react':     typeof FW_REACT_DATA     !== 'undefined' ? FW_REACT_DATA     : null,
  'fastapi':   typeof FW_FASTAPI_DATA   !== 'undefined' ? FW_FASTAPI_DATA   : null,
  'pytest':    typeof FW_PYTEST_DATA    !== 'undefined' ? FW_PYTEST_DATA    : null,
  'requests':  typeof FW_REQUESTS_DATA  !== 'undefined' ? FW_REQUESTS_DATA  : null,
};

// Nadpisuje stub z framework.js
function openFramework(fw) {
  var overlay = document.getElementById('fw-detail-overlay');
  if (!overlay) return;

  var fwId = fw.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  FW_DETAIL_ACTIVE_FW = fwId;
  var data = FW_DATA_MAP[fwId] || null;
  var color  = fw.color  || '#61dafb';
  var color2 = (data && data.meta && data.meta.color2) ? data.meta.color2 : color;

  overlay.style.setProperty('--fw-color',  color);
  overlay.style.setProperty('--fw-color-2', color2);
  FW_DETAIL_ACTIVE_TAB = 'podstawy';

  if (data) {
    renderDetailPage(fw, data, overlay);
  } else {
    renderComingSoon(fw, overlay);
  }

  overlay.classList.add('fw-detail--visible');

  // Zamknij Escape
  document.addEventListener('keydown', onFwDetailEscape);
}

function closeDetailPage() {
  var overlay = document.getElementById('fw-detail-overlay');
  if (overlay) overlay.classList.remove('fw-detail--visible');
  document.removeEventListener('keydown', onFwDetailEscape);
}

function onFwDetailEscape(e) {
  if (e.key === 'Escape') closeDetailPage();
}

function renderDetailPage(fw, data, overlay) {
  FW_CMD_GROUPS_REF = data.content.komendy || null;
  var color = fw.color || '#61dafb';
  var icon = (data.meta && data.meta.icon) ? data.meta.icon : fw.icon;
  var tabs = data.tabs.map(function(tab) {
    return '<button class="fwd-tab' + (tab.id === FW_DETAIL_ACTIVE_TAB ? ' active' : '') + '" ' +
      'onclick="switchDetailTab(\'' + tab.id + '\')">' + tab.label + '</button>';
  }).join('');

  overlay.innerHTML =
    '<div class="fwd-header">' +
    '<button class="fwd-back-btn" onclick="closeDetailPage()">← Powrót</button>' +
    '<div class="fwd-header-icon">' + icon + '</div>' +
    '<div class="fwd-header-info">' +
    '<div class="fwd-header-name" style="background:linear-gradient(90deg,var(--fw-color),var(--fw-color-2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">' + data.meta.name + '</div>' +
    '<div class="fwd-header-tagline">' + data.meta.tagline + '</div>' +
    '</div>' +
    '<div class="fwd-header-badges">' +
    '<span class="fwd-badge">' + data.meta.lang + '</span>' +
    '<span class="fwd-badge">od ' + data.meta.year + '</span>' +
    '<span class="fwd-badge">⭐ ' + data.meta.stars + '</span>' +
    '</div>' +
    '</div>' +
    '<div class="fwd-tabs">' + tabs + '</div>' +
    '<div class="fwd-content" id="fwd-content"></div>';

  renderTabContent(FW_DETAIL_ACTIVE_TAB, data);
}

function renderComingSoon(fw, overlay) {
  var color = fw.color || '#888';
  overlay.innerHTML =
    '<div class="fwd-header">' +
    '<button class="fwd-back-btn" onclick="closeDetailPage()">← Powrót</button>' +
    '<div class="fwd-header-icon">' + fw.icon + '</div>' +
    '<div class="fwd-header-info">' +
    '<div class="fwd-header-name" style="color:' + color + '">' + fw.name + '</div>' +
    '<div class="fwd-header-tagline">' + fw.desc + '</div>' +
    '</div>' +
    '</div>' +
    '<div class="fwd-content">' +
    '<div class="fwd-coming-soon">' +
    '<div class="fwd-coming-icon">' + fw.icon + '</div>' +
    '<div>Szczegóły <strong>' + fw.name + '</strong> wkrótce...</div>' +
    '<div style="font-size:12px;color:rgba(255,255,255,0.15)">Dostępne: React, FastAPI, pytest, requests — kolejne frameworki w budowie</div>' +
    '</div></div>';
}

function switchDetailTab(tabId) {
  FW_DETAIL_ACTIVE_TAB = tabId;
  document.querySelectorAll('.fwd-tab').forEach(function(t) { t.classList.remove('active'); });
  var activeTab = document.querySelector('.fwd-tab[onclick*="\'' + tabId + '\'"]');
  if (activeTab) activeTab.classList.add('active');

  var data = FW_DATA_MAP[FW_DETAIL_ACTIVE_FW];
  if (data) renderTabContent(tabId, data);
}

function renderTabContent(tabId, data) {
  var el = document.getElementById('fwd-content');
  if (!el) return;
  el.scrollTop = 0;
  var meta = data.meta || {};

  switch (tabId) {
    case 'podstawy':   el.innerHTML = renderBasics(data.content.podstawy, meta);   break;
    case 'komponenty': el.innerHTML = renderComponents(data.content.komponenty, meta); break;
    case 'hooki':      el.innerHTML = renderHooks(data.content.hooki);        break;
    case 'routing':    el.innerHTML = renderRouting(data.content.routing, meta);    break;
    case 'state':      el.innerHTML = renderState(data.content.state);        break;
    case 'rywale':     el.innerHTML = renderRivals(data.content.rywale);      break;
    case 'komendy':    el.innerHTML = renderCommands(data.content.komendy);   break;
    default: el.innerHTML = '<div class="fwd-coming-soon"><div>Wkrótce...</div></div>';
  }
}

// ── Podstawy ──
function renderBasics(b, meta) {
  var html = '';
  var labels = b.labels || {};
  var defaultLang = (meta && meta.codeLang) ? meta.codeLang : 'Code';
  var conceptsLabel       = labels.concepts       || 'Kluczowe koncepcje';
  var whenToUseLabel      = labels.whenToUse      || 'Kiedy używać?';
  var firstComponentLabel = labels.firstComponent || 'Pierwszy przykład';
  var firstComponentLang  = labels.firstComponentLang || defaultLang;

  var icon = (meta && meta.icon) ? meta.icon + ' ' : '';
  html += '<div class="fwd-card fwd-card-accent">' +
    '<div class="fwd-card-title">' + icon + b.intro.title + '</div>' +
    '<div class="fwd-card-desc">' + b.intro.desc + '</div>' +
    '</div>';

  html += '<div class="fwd-section-title">' + conceptsLabel + '</div>';
  html += '<div class="fwd-intro-grid">';
  b.concepts.forEach(function(c) {
    html += '<div class="fwd-concept-card">' +
      '<div class="fwd-concept-icon">' + c.icon + '</div>' +
      '<div class="fwd-concept-title">' + escFwd(c.title) + '</div>' +
      '<div class="fwd-concept-desc">' + escFwd(c.desc) + '</div>' +
      '</div>';
  });
  html += '</div>';

  html += '<div class="fwd-section-title">' + whenToUseLabel + '</div>';
  html += '<div class="fwd-card">';
  html += '<ul class="fwd-when-list">';
  b.whenToUse.forEach(function(w) {
    html += '<li>' + w + '</li>';
  });
  html += '</ul></div>';

  html += '<div class="fwd-section-title">' + firstComponentLabel + '</div>';
  html += '<div class="fwd-card">' +
    '<div class="fwd-code-wrap">' +
    '<span class="fwd-code-lang">' + firstComponentLang + '</span>' +
    '<pre class="fwd-code">' + escFwd(b.firstComponent) + '</pre>' +
    '</div></div>';

  return html;
}

// ── Komponenty ──
function renderComponents(items, meta) {
  var html = '';
  var defaultLang = (meta && meta.codeLang) ? meta.codeLang : 'Code';
  items.forEach(function(item, i) {
    html += '<div class="fwd-card" style="animation-delay:' + (i * 0.05) + 's">' +
      '<div class="fwd-card-title">' + item.title + '</div>' +
      '<div class="fwd-card-desc">' + item.desc + '</div>' +
      '<div class="fwd-code-wrap">' +
      '<span class="fwd-code-lang">' + (item.lang || defaultLang) + '</span>' +
      '<pre class="fwd-code">' + escFwd(item.code) + '</pre>' +
      '</div></div>';
  });
  return html;
}

// ── Hooki ──
function renderHooks(items) {
  var html = '<div class="fwd-hooks-grid">';
  items.forEach(function(h, i) {
    html += '<div class="fwd-hook-card" style="animation-delay:' + (i * 0.04) + 's">' +
      '<div class="fwd-hook-name" style="color:var(--fw-color)">' + h.name + '</div>' +
      '<div class="fwd-hook-desc">' + h.desc + '</div>' +
      '<div class="fwd-hook-when">💡 ' + h.when + '</div>' +
      '<div class="fwd-code-wrap">' +
      '<pre class="fwd-code" style="font-size:11px">' + escFwd(h.code) + '</pre>' +
      '</div></div>';
  });
  html += '</div>';
  return html;
}

// ── Routing ──
function renderRouting(r, meta) {
  var defaultLang = (meta && meta.codeLang) ? meta.codeLang : 'Code';
  var html = '<div class="fwd-install-bar">' +
    '<span class="fwd-install-label">Instalacja</span>' +
    '<span>$ ' + r.install + '</span>' +
    '<span style="font-size:10px;color:rgba(255,255,255,0.2);margin-left:auto">' + r.version + '</span>' +
    '</div>';

  r.sections.forEach(function(s, i) {
    html += '<div class="fwd-card" style="animation-delay:' + (i * 0.05) + 's">' +
      '<div class="fwd-card-title">' + s.title + '</div>' +
      '<div class="fwd-code-wrap">' +
      '<span class="fwd-code-lang">' + (s.lang || defaultLang) + '</span>' +
      '<pre class="fwd-code">' + escFwd(s.code) + '</pre>' +
      '</div></div>';
  });
  return html;
}

// ── State Management ──
function renderState(items) {
  var html = '<div class="fwd-state-grid">';
  items.forEach(function(s, i) {
    html += '<div class="fwd-state-card" style="animation-delay:' + (i * 0.05) + 's;border-left:3px solid ' + s.color + '">' +
      '<div class="fwd-state-header">' +
      '<span style="font-size:20px">' + s.icon + '</span>' +
      '<div class="fwd-state-name">' + s.name + '</div>' +
      '</div>' +
      '<div class="fwd-state-meta">' +
      '<span class="fwd-state-badge">📦 ' + s.bundle + '</span>' +
      '<span class="fwd-state-badge">⚙️ ' + s.complexity + '</span>' +
      '</div>' +
      '<div class="fwd-state-when">' + s.when + '</div>' +
      '<div class="fwd-code-wrap">' +
      '<pre class="fwd-code" style="font-size:11px">' + escFwd(s.code) + '</pre>' +
      '</div></div>';
  });
  html += '</div>';
  return html;
}

// ── Rywale ──
function renderRivals(items) {
  var html = '<div class="fwd-rivals-grid">';
  items.forEach(function(r, i) {
    var pros = r.pros.map(function(p) { return '<li>' + p + '</li>'; }).join('');
    var cons = r.cons.map(function(c) { return '<li>' + c + '</li>'; }).join('');

    html += '<div class="fwd-rival-card" style="animation-delay:' + (i * 0.06) + 's;border-left:3px solid ' + r.color + '">' +
      '<div class="fwd-rival-header">' +
      '<span class="fwd-rival-icon">' + r.icon + '</span>' +
      '<div>' +
      '<div class="fwd-rival-name" style="color:' + r.color + '">' + r.name + '</div>' +
      '<div class="fwd-rival-tagline">' + r.tagline + '</div>' +
      '</div></div>' +
      '<div class="fwd-pros-cons">' +
      '<ul class="fwd-pro-list">' + pros + '</ul>' +
      '<ul class="fwd-con-list">' + cons + '</ul>' +
      '</div>' +
      '<div class="fwd-vs-react">🆚 ' + r.vsReact + '</div>' +
      '</div>';
  });
  html += '</div>';
  return html;
}

// ── Komendy ──
function renderCommands(groups) {
  var html = '';
  groups.forEach(function(group, gi) {
    html += '<div class="fwd-cmd-group">' +
      '<div class="fwd-cmd-group-title"><span>' + group.icon + '</span>' + group.category + '</div>' +
      '<div class="fwd-terminal">';
    group.items.forEach(function(item, ii) {
      var hasDetail = item.detail ? true : false;
      html += '<div class="fwd-terminal-row' + (hasDetail ? ' fwd-terminal-row--clickable' : '') + '"' +
        (hasDetail ? ' onclick="openCmdModal(' + gi + ',' + ii + ')"' : '') + '>' +
        '<span class="fwd-terminal-cmd">' + escFwd(item.cmd) + '</span>' +
        '<span class="fwd-terminal-desc">' + item.desc + '</span>' +
        (hasDetail ? '<span class="fwd-terminal-hint">→</span>' : '') +
        '</div>';
    });
    html += '</div></div>';
  });
  return html;
}

// ── Command Modal ──
var FW_CMD_GROUPS_REF = null;

function openCmdModal(groupIdx, itemIdx) {
  if (!FW_CMD_GROUPS_REF) return;
  var item = FW_CMD_GROUPS_REF[groupIdx].items[itemIdx];
  if (!item || !item.detail) return;
  var d = item.detail;

  var flagsHtml = '';
  if (d.flags && d.flags.length) {
    flagsHtml = '<div class="fwd-cmd-modal-section">' +
      '<div class="fwd-cmd-modal-label">⚙️ Flagi / Opcje</div>' +
      '<div class="fwd-cmd-flags">';
    d.flags.forEach(function(f) {
      flagsHtml += '<div class="fwd-cmd-flag-row">' +
        '<code class="fwd-cmd-flag-name">' + escFwd(f.flag) + '</code>' +
        '<span class="fwd-cmd-flag-desc">' + f.desc + '</span>' +
        '</div>';
    });
    flagsHtml += '</div></div>';
  }

  var tipsHtml = '';
  if (d.tips && d.tips.length) {
    tipsHtml = '<div class="fwd-cmd-modal-section">' +
      '<div class="fwd-cmd-modal-label">💡 Wskazówki dla juniora</div>' +
      '<ul class="fwd-cmd-tips">';
    d.tips.forEach(function(t) {
      tipsHtml += '<li>' + t + '</li>';
    });
    tipsHtml += '</ul></div>';
  }

  var noteHtml = '';
  if (d.note) {
    noteHtml = '<div class="fwd-cmd-note">' + d.note + '</div>';
  }

  var modal = document.getElementById('fwd-cmd-modal');
  if (!modal) return;

  modal.querySelector('.fwd-cmd-modal-cmd-text').textContent = item.cmd;
  modal.querySelector('.fwd-cmd-modal-body').innerHTML =
    '<div class="fwd-cmd-modal-section">' +
    '<div class="fwd-cmd-modal-label">📌 Co robi</div>' +
    '<div class="fwd-cmd-modal-text">' + d.what + '</div>' +
    '</div>' +
    '<div class="fwd-cmd-modal-section">' +
    '<div class="fwd-cmd-modal-label">⚡ Jak działa</div>' +
    '<div class="fwd-cmd-modal-text">' + d.how + '</div>' +
    '</div>' +
    flagsHtml +
    tipsHtml +
    noteHtml;

  modal.classList.add('fwd-cmd-modal--visible');
  document.addEventListener('keydown', onCmdModalEscape);
}

function closeCmdModal() {
  var modal = document.getElementById('fwd-cmd-modal');
  if (modal) modal.classList.remove('fwd-cmd-modal--visible');
  document.removeEventListener('keydown', onCmdModalEscape);
}

function onCmdModalEscape(e) {
  if (e.key === 'Escape') closeCmdModal();
}

function copyCmdText() {
  var el = document.querySelector('.fwd-cmd-modal-cmd-text');
  if (!el) return;
  navigator.clipboard.writeText(el.textContent).then(function() {
    var btn = document.querySelector('.fwd-cmd-copy-btn');
    if (btn) { btn.textContent = '✓ Skopiowano'; setTimeout(function() { btn.textContent = '📋 Kopiuj'; }, 1500); }
  });
}

function escFwd(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Inicjalizacja overlaya
document.addEventListener('DOMContentLoaded', function() {
  if (!document.getElementById('fw-detail-overlay')) {
    var overlay = document.createElement('div');
    overlay.id = 'fw-detail-overlay';
    document.body.appendChild(overlay);
  }

  // Modal komend
  if (!document.getElementById('fwd-cmd-modal')) {
    var modal = document.createElement('div');
    modal.id = 'fwd-cmd-modal';
    modal.innerHTML =
      '<div class="fwd-cmd-modal-box">' +
        '<div class="fwd-cmd-modal-header">' +
          '<div class="fwd-cmd-modal-cmd-wrap">' +
            '<span class="fwd-cmd-modal-dollar">$</span>' +
            '<span class="fwd-cmd-modal-cmd-text"></span>' +
          '</div>' +
          '<div class="fwd-cmd-modal-actions">' +
            '<button class="fwd-cmd-copy-btn" onclick="copyCmdText()">📋 Kopiuj</button>' +
            '<button class="fwd-cmd-modal-close" onclick="closeCmdModal()">✕</button>' +
          '</div>' +
        '</div>' +
        '<div class="fwd-cmd-modal-body"></div>' +
      '</div>';
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeCmdModal();
    });
    document.body.appendChild(modal);
  }

  // Uzupełnij mapę danych po załadowaniu
  if (typeof FW_REACT_DATA     !== 'undefined') FW_DATA_MAP['react']    = FW_REACT_DATA;
  if (typeof FW_FASTAPI_DATA   !== 'undefined') FW_DATA_MAP['fastapi']  = FW_FASTAPI_DATA;
  if (typeof FW_PYTEST_DATA    !== 'undefined') FW_DATA_MAP['pytest']   = FW_PYTEST_DATA;
  if (typeof FW_REQUESTS_DATA  !== 'undefined') FW_DATA_MAP['requests'] = FW_REQUESTS_DATA;
});
