import { renderBasics, renderGenericSection, renderComponents, renderHooks, renderRouting, renderState, renderRivals, renderRivalsSection, renderPlugins, renderCommands } from './fw-detail-renderers.js';
import { setFwCmdGroups } from './fw-detail-modal.js';
import { FW_REACT_DATA }     from '../data/fw_react.js';
import { FW_FASTAPI_DATA }   from '../data/fw_fastapi.js';
import { FW_PYTEST_DATA }    from '../data/fw_pytest.js';
import { FW_REQUESTS_DATA }  from '../data/fw_requests.js';
import { FW_BS4_DATA }       from '../data/fw_beautifulsoup.js';
import { FW_ASYNCIO_DATA }   from '../data/fw_asyncio.js';
import { FW_GIT_DATA }       from '../data/fw_git.js';
import { FW_DOCKER_DATA }    from '../data/fw_docker.js';
import { FW_PYAUTOGUI_DATA } from '../data/fw_pyautogui.js';
import { FW_MCP_DATA }       from '../data/fw_mcp.js';
import { FW_AWS_DATA }        from '../data/fw_aws.js';
import { FW_POSTGRESQL_DATA } from '../data/fw_postgresql.js';
import { FW_REDIS_DATA }      from '../data/fw_redis.js';
import { FW_TERRAFORM_DATA }  from '../data/fw_terraform.js';
import { FW_CICD_DATA }       from '../data/fw_cicd.js';
import { FW_WSL_DATA }        from '../data/fw_wsl.js';
import { FW_LANGGRAPH_DATA }   from '../data/fw_langgraph.js';
import { FW_KUBERNETES_DATA }  from '../data/fw_kubernetes.js';
import { FW_FLASK_DATA }       from '../data/fw_flask.js';
import { FW_OPENAI_DATA }      from '../data/fw_openai.js';

let activeTab = 'podstawy';
let activeFw  = 'react';

const FW_DATA_MAP = {
  react: FW_REACT_DATA, fastapi: FW_FASTAPI_DATA, pytest: FW_PYTEST_DATA,
  requests: FW_REQUESTS_DATA, beautifulsoup: FW_BS4_DATA, asyncio: FW_ASYNCIO_DATA,
  git: FW_GIT_DATA, docker: FW_DOCKER_DATA, pyautogui: FW_PYAUTOGUI_DATA, mcp: FW_MCP_DATA,
  aws: FW_AWS_DATA, postgresql: FW_POSTGRESQL_DATA, redis: FW_REDIS_DATA,
  terraform: FW_TERRAFORM_DATA, cicd: FW_CICD_DATA,
  wsl: FW_WSL_DATA, langgraph: FW_LANGGRAPH_DATA,
  kubernetes: FW_KUBERNETES_DATA, flask: FW_FLASK_DATA,
  openaisdk: FW_OPENAI_DATA,
};

export function openFramework(fw) {
  const overlay = document.getElementById('fw-detail-overlay');
  if (!overlay) return;
  const fwId = fw.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  activeFw  = fwId;
  activeTab = 'podstawy';
  const data   = FW_DATA_MAP[fwId] || null;
  const color  = fw.color || '#61dafb';
  const color2 = (data && data.meta && data.meta.color2) ? data.meta.color2 : color;
  overlay.style.setProperty('--fw-color',   color);
  overlay.style.setProperty('--fw-color-2', color2);
  data ? renderDetailPage(fw, data, overlay) : renderComingSoon(fw, overlay);
  overlay.classList.add('fw-detail--visible');
  document.addEventListener('keydown', onFwDetailEscape);
}

export function closeDetailPage() {
  const overlay = document.getElementById('fw-detail-overlay');
  if (overlay) overlay.classList.remove('fw-detail--visible');
  document.removeEventListener('keydown', onFwDetailEscape);
}

export function onFwDetailEscape(e) {
  if (e.key !== 'Escape') return;
  if (document.getElementById('fwd-cmd-modal')?.classList.contains('fwd-cmd-modal--visible')) return;
  closeDetailPage();
}

function renderDetailPage(fw, data, overlay) {
  setFwCmdGroups(data.content.komendy || null);
  const icon = (data.meta && data.meta.icon) ? data.meta.icon : fw.icon;
  const tabs = data.tabs.map(tab =>
    '<button class="fwd-tab' + (tab.id === activeTab ? ' active' : '') + '" onclick="switchDetailTab(\'' + tab.id + '\')">' + tab.label + '</button>'
  ).join('');
  overlay.innerHTML =
    '<div class="fwd-header">' +
    '<button class="fwd-back-btn" onclick="closeDetailPage()">← Powrót</button>' +
    '<div class="fwd-header-icon">' + icon + '</div>' +
    '<div class="fwd-header-info">' +
    '<div class="fwd-header-name" style="background:linear-gradient(90deg,var(--fw-color),var(--fw-color-2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">' + data.meta.name + '</div>' +
    '<div class="fwd-header-tagline">' + data.meta.tagline + '</div>' +
    '</div>' +
    '<div class="fwd-header-badges">' +
    '<span class="fwd-badge">' + data.meta.lang  + '</span>' +
    '<span class="fwd-badge">od ' + data.meta.year  + '</span>' +
    '<span class="fwd-badge">⭐ ' + data.meta.stars + '</span>' +
    '</div></div>' +
    '<div class="fwd-tabs">' + tabs + '</div>' +
    '<div class="fwd-content" id="fwd-content"></div>';
  renderTabContent(activeTab, data);
}

function renderComingSoon(fw, overlay) {
  overlay.innerHTML =
    '<div class="fwd-header">' +
    '<button class="fwd-back-btn" onclick="closeDetailPage()">← Powrót</button>' +
    '<div class="fwd-header-icon">' + fw.icon + '</div>' +
    '<div class="fwd-header-info">' +
    '<div class="fwd-header-name" style="color:' + (fw.color || '#888') + '">' + fw.name + '</div>' +
    '<div class="fwd-header-tagline">' + fw.desc + '</div>' +
    '</div></div>' +
    '<div class="fwd-content"><div class="fwd-coming-soon">' +
    '<div class="fwd-coming-icon">' + fw.icon + '</div>' +
    '<div>Szczegóły <strong>' + fw.name + '</strong> wkrótce...</div>' +
    '</div></div>';
}

export function switchDetailTab(tabId) {
  activeTab = tabId;
  document.querySelectorAll('.fwd-tab').forEach(t => t.classList.remove('active'));
  const activeEl = document.querySelector('.fwd-tab[onclick*="\'' + tabId + '\'"]');
  if (activeEl) activeEl.classList.add('active');
  const data = FW_DATA_MAP[activeFw];
  if (data) renderTabContent(tabId, data);
}

function isGeneric(val) { return val && Array.isArray(val.items); }
function isRivals(val) { return val && Array.isArray(val.items) && val.items.length > 0 && val.items[0].tagline !== undefined; }

function renderTabContent(tabId, data) {
  const el = document.getElementById('fwd-content');
  if (!el) return;
  el.scrollTop = 0;
  const meta = data.meta || {};
  switch (tabId) {
    case 'podstawy':   el.innerHTML = renderBasics(data.content.podstawy, meta); break;
    case 'komponenty': el.innerHTML = isGeneric(data.content.komponenty) ? renderGenericSection(data.content.komponenty, meta) : renderComponents(data.content.komponenty, meta); break;
    case 'hooki':      el.innerHTML = isGeneric(data.content.hooki)      ? renderGenericSection(data.content.hooki, meta)      : renderHooks(data.content.hooki); break;
    case 'routing':    el.innerHTML = isGeneric(data.content.routing)    ? renderGenericSection(data.content.routing, meta)    : renderRouting(data.content.routing, meta); break;
    case 'state':      el.innerHTML = isGeneric(data.content.state)      ? renderGenericSection(data.content.state, meta)      : renderState(data.content.state); break;
    case 'rywale':     el.innerHTML = isRivals(data.content.rywale) ? renderRivalsSection(data.content.rywale) : (isGeneric(data.content.rywale) ? renderGenericSection(data.content.rywale, meta) : renderRivals(data.content.rywale)); break;
    case 'pluginy':    el.innerHTML = isGeneric(data.content.pluginy) ? renderGenericSection(data.content.pluginy, meta) : renderPlugins(data.content.pluginy); break;
    case 'komendy':    el.innerHTML = renderCommands(data.content.komendy); break;
    default: el.innerHTML = '<div class="fwd-coming-soon"><div>Wkrótce...</div></div>';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (!document.getElementById('fw-detail-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'fw-detail-overlay';
    document.body.appendChild(overlay);
  }
});
