import { escFwd } from './fw-detail-renderers.js';

export let FW_CMD_GROUPS_REF = null;

export function setFwCmdGroups(data) {
  // normalize: accept array or {title, groups:[]} wrapper
  FW_CMD_GROUPS_REF = Array.isArray(data) ? data : (data && data.groups ? data.groups : data);
}

export function openCmdModal(groupIdx, itemIdx) {
  if (!FW_CMD_GROUPS_REF) return;
  const group = FW_CMD_GROUPS_REF[groupIdx];
  if (!group) return;
  const entries = group.items || group.commands || [];
  const item = entries[itemIdx];
  if (!item || !item.detail) return;
  const d = item.detail;

  const flagsHtml = d.flags && d.flags.length
    ? '<div class="fwd-cmd-modal-section"><div class="fwd-cmd-modal-label">⚙️ Flagi / Opcje</div><div class="fwd-cmd-flags">' +
      d.flags.map(f => '<div class="fwd-cmd-flag-row"><code class="fwd-cmd-flag-name">' + escFwd(f.flag) + '</code><span class="fwd-cmd-flag-desc">' + f.desc + '</span></div>').join('') +
      '</div></div>' : '';

  const tipsHtml = d.tips && d.tips.length
    ? '<div class="fwd-cmd-modal-section"><div class="fwd-cmd-modal-label">💡 Wskazówki dla juniora</div><ul class="fwd-cmd-tips">' +
      d.tips.map(t => '<li>' + t + '</li>').join('') + '</ul></div>' : '';

  const modal = document.getElementById('fwd-cmd-modal');
  if (!modal) return;
  modal.querySelector('.fwd-cmd-modal-cmd-text').textContent = item.cmd || item.code || '';
  modal.querySelector('.fwd-cmd-modal-body').innerHTML =
    '<div class="fwd-cmd-modal-section"><div class="fwd-cmd-modal-label">📌 Co robi</div><div class="fwd-cmd-modal-text">' + d.what + '</div></div>' +
    '<div class="fwd-cmd-modal-section"><div class="fwd-cmd-modal-label">⚡ Jak działa</div><div class="fwd-cmd-modal-text">' + d.how + '</div></div>' +
    flagsHtml + tipsHtml + (d.note ? '<div class="fwd-cmd-note">' + d.note + '</div>' : '');
  modal.classList.add('fwd-cmd-modal--visible');
  document.addEventListener('keydown', onCmdModalEscape);
}

export function closeCmdModal() {
  const modal = document.getElementById('fwd-cmd-modal');
  if (modal) modal.classList.remove('fwd-cmd-modal--visible');
  document.removeEventListener('keydown', onCmdModalEscape);
}

function onCmdModalEscape(e) { if (e.key === 'Escape') closeCmdModal(); }

export function copyCmdText() {
  const el = document.querySelector('.fwd-cmd-modal-cmd-text');
  if (!el) return;
  navigator.clipboard.writeText(el.textContent).then(() => {
    const btn = document.querySelector('.fwd-cmd-copy-btn');
    if (btn) { btn.textContent = '✓ Skopiowano'; setTimeout(() => { btn.textContent = '📋 Kopiuj'; }, 1500); }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('fwd-cmd-modal')) return;
  const modal = document.createElement('div');
  modal.id = 'fwd-cmd-modal';
  modal.innerHTML =
    '<div class="fwd-cmd-modal-box">' +
    '<div class="fwd-cmd-modal-header">' +
    '<div class="fwd-cmd-modal-cmd-wrap"><span class="fwd-cmd-modal-dollar">$</span><span class="fwd-cmd-modal-cmd-text"></span></div>' +
    '<div class="fwd-cmd-modal-actions"><button class="fwd-cmd-copy-btn" onclick="copyCmdText()">📋 Kopiuj</button><button class="fwd-cmd-modal-close" onclick="closeCmdModal()">✕</button></div>' +
    '</div><div class="fwd-cmd-modal-body"></div></div>';
  modal.addEventListener('click', e => { if (e.target === modal) closeCmdModal(); });
  document.body.appendChild(modal);
});
