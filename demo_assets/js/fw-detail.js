// Framework detail page — orchestration (open/close/switch/init)
// Render functions → fw-detail-renderers.js
// Command modal    → fw-detail-modal.js

var FW_DETAIL_ACTIVE_TAB = 'podstawy';
var FW_DETAIL_ACTIVE_FW  = 'react';

var FW_DATA_MAP = {
  'react':         typeof FW_REACT_DATA     !== 'undefined' ? FW_REACT_DATA     : null,
  'fastapi':       typeof FW_FASTAPI_DATA   !== 'undefined' ? FW_FASTAPI_DATA   : null,
  'pytest':        typeof FW_PYTEST_DATA    !== 'undefined' ? FW_PYTEST_DATA    : null,
  'requests':      typeof FW_REQUESTS_DATA  !== 'undefined' ? FW_REQUESTS_DATA  : null,
  'beautifulsoup': typeof FW_BS4_DATA       !== 'undefined' ? FW_BS4_DATA       : null,
  'asyncio':       typeof FW_ASYNCIO_DATA   !== 'undefined' ? FW_ASYNCIO_DATA   : null,
  'git':           typeof FW_GIT_DATA       !== 'undefined' ? FW_GIT_DATA       : null,
  'docker':        typeof FW_DOCKER_DATA    !== 'undefined' ? FW_DOCKER_DATA    : null,
  'pyautogui':     typeof FW_PYAUTOGUI_DATA !== 'undefined' ? FW_PYAUTOGUI_DATA : null,
  'mcp':           typeof FW_MCP_DATA       !== 'undefined' ? FW_MCP_DATA       : null,
};

function openFramework(fw) {
  var overlay = document.getElementById('fw-detail-overlay');
  if (!overlay) return;

  var fwId = fw.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  FW_DETAIL_ACTIVE_FW  = fwId;
  FW_DETAIL_ACTIVE_TAB = 'podstawy';

  var data   = FW_DATA_MAP[fwId] || null;
  var color  = fw.color || '#61dafb';
  var color2 = (data && data.meta && data.meta.color2) ? data.meta.color2 : color;

  overlay.style.setProperty('--fw-color',   color);
  overlay.style.setProperty('--fw-color-2', color2);

  if (data) {
    renderDetailPage(fw, data, overlay);
  } else {
    renderComingSoon(fw, overlay);
  }

  overlay.classList.add('fw-detail--visible');
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
    '</div></div>' +
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
    '</div></div>' +
    '<div class="fwd-content"><div class="fwd-coming-soon">' +
    '<div class="fwd-coming-icon">' + fw.icon + '</div>' +
    '<div>Szczegóły <strong>' + fw.name + '</strong> wkrótce...</div>' +
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

  function isGeneric(val) { return val && Array.isArray(val.items); }

  switch (tabId) {
    case 'podstawy':   el.innerHTML = renderBasics(data.content.podstawy, meta); break;
    case 'komponenty': el.innerHTML = isGeneric(data.content.komponenty) ? renderGenericSection(data.content.komponenty, meta) : renderComponents(data.content.komponenty, meta); break;
    case 'hooki':      el.innerHTML = isGeneric(data.content.hooki)      ? renderGenericSection(data.content.hooki, meta)      : renderHooks(data.content.hooki);               break;
    case 'routing':    el.innerHTML = isGeneric(data.content.routing)    ? renderGenericSection(data.content.routing, meta)    : renderRouting(data.content.routing, meta);      break;
    case 'state':      el.innerHTML = isGeneric(data.content.state)      ? renderGenericSection(data.content.state, meta)      : renderState(data.content.state);               break;
    case 'rywale':     el.innerHTML = renderRivals(data.content.rywale);   break;
    case 'pluginy':    el.innerHTML = renderPlugins(data.content.pluginy); break;
    case 'komendy':    el.innerHTML = renderCommands(data.content.komendy); break;
    default: el.innerHTML = '<div class="fwd-coming-soon"><div>Wkrótce...</div></div>';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (!document.getElementById('fw-detail-overlay')) {
    var overlay = document.createElement('div');
    overlay.id = 'fw-detail-overlay';
    document.body.appendChild(overlay);
  }
  // Refresh data map after all fw_ scripts have loaded
  if (typeof FW_REACT_DATA     !== 'undefined') FW_DATA_MAP['react']         = FW_REACT_DATA;
  if (typeof FW_FASTAPI_DATA   !== 'undefined') FW_DATA_MAP['fastapi']       = FW_FASTAPI_DATA;
  if (typeof FW_PYTEST_DATA    !== 'undefined') FW_DATA_MAP['pytest']        = FW_PYTEST_DATA;
  if (typeof FW_REQUESTS_DATA  !== 'undefined') FW_DATA_MAP['requests']      = FW_REQUESTS_DATA;
  if (typeof FW_BS4_DATA       !== 'undefined') FW_DATA_MAP['beautifulsoup'] = FW_BS4_DATA;
  if (typeof FW_ASYNCIO_DATA   !== 'undefined') FW_DATA_MAP['asyncio']       = FW_ASYNCIO_DATA;
  if (typeof FW_GIT_DATA       !== 'undefined') FW_DATA_MAP['git']           = FW_GIT_DATA;
  if (typeof FW_DOCKER_DATA    !== 'undefined') FW_DATA_MAP['docker']        = FW_DOCKER_DATA;
  if (typeof FW_PYAUTOGUI_DATA !== 'undefined') FW_DATA_MAP['pyautogui']     = FW_PYAUTOGUI_DATA;
  if (typeof FW_MCP_DATA       !== 'undefined') FW_DATA_MAP['mcp']           = FW_MCP_DATA;
});
