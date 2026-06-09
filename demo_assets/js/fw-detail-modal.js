// Command detail modal — opens when user clicks a command row

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
    d.tips.forEach(function(t) { tipsHtml += '<li>' + t + '</li>'; });
    tipsHtml += '</ul></div>';
  }

  var noteHtml = d.note ? '<div class="fwd-cmd-note">' + d.note + '</div>' : '';

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
    flagsHtml + tipsHtml + noteHtml;

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

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('fwd-cmd-modal')) return;
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
  modal.addEventListener('click', function(e) { if (e.target === modal) closeCmdModal(); });
  document.body.appendChild(modal);
});
