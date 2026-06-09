import { BIBLIOTEKI } from '../data/biblioteki.js';

const KATEGORIE = {
  all: 'Wszystkie', stdlib: '🐍 Stdlib', web: '🌐 Web', data: '📊 Data',
  ai: '🤖 AI / ML', db: '🗄️ Bazy danych', utils: '🔧 Narzędzia',
  scraping: '🕷️ Scraping', testing: '🧪 Testy', devtools: '⚙️ Dev Tools',
};

export function renderujArchiwum(panel) {
  const katsHTML = Object.entries(KATEGORIE).map(([k, v]) => {
    const aktywna = k === 'all';
    return '<button onclick="filtrujArch(\'' + k + '\')" class="arch-kat' + (aktywna ? ' arch-kat-active' : '') + '" data-kat="' + k + '" ' +
      'style="padding:4px 10px;border-radius:6px;border:1px solid #2d3148;background:' + (aktywna ? '#7c6af7' : 'transparent') + ';color:' + (aktywna ? '#fff' : '#94a3b8') + ';font-size:12px;cursor:pointer;">' + v + '</button>';
  }).join('');

  panel.innerHTML =
    '<div style="margin-bottom:12px;"><input id="archSearch" placeholder="🔍 Szukaj biblioteki..." ' +
    'style="width:100%;padding:8px 12px;background:#13151f;border:1px solid #2d3148;border-radius:8px;color:#e2e8f0;font-size:13px;outline:none;box-sizing:border-box;"></div>' +
    '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;" id="archKats">' + katsHTML + '</div>' +
    '<div id="archGrid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"></div>' +
    '<div id="archCount" style="font-size:11px;color:#4a5568;margin-top:10px;text-align:right;"></div>';

  let aktywnaKat = 'all', szukajFraza = '';

  function renderGrid() {
    const filtered = BIBLIOTEKI.filter(b =>
      (aktywnaKat === 'all' || b.kat === aktywnaKat) &&
      (!szukajFraza || b.nazwa.toLowerCase().includes(szukajFraza) || b.opis.toLowerCase().includes(szukajFraza))
    );
    document.getElementById('archGrid').innerHTML = filtered.map(b =>
      '<div onclick="pokazModal(\'' + b.nazwa + '\')" ' +
      'style="background:#13151f;border:1px solid #2d3148;border-radius:10px;padding:10px 12px;cursor:pointer;transition:border-color 0.15s;" ' +
      'onmouseenter="this.style.borderColor=\'#7c6af7\'" onmouseleave="this.style.borderColor=\'#2d3148\'">' +
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">' +
      '<span style="font-size:13px;font-weight:600;color:#e2e8f0">' + b.nazwa + '</span>' +
      '<span style="font-size:10px;background:#1e2235;color:#7c6af7;padding:1px 7px;border-radius:10px">' + KATEGORIE[b.kat] + '</span>' +
      '</div>' +
      '<div style="font-size:11px;color:#94a3b8;line-height:1.4;margin-bottom:6px">' + b.krotki + '</div>' +
      '<div style="font-family:monospace;font-size:10px;color:#98c379;background:#0f1117;padding:3px 7px;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + b.pip + '</div>' +
      '</div>'
    ).join('');
    document.getElementById('archCount').textContent = filtered.length + ' z ' + BIBLIOTEKI.length + ' bibliotek';
  }

  window.filtrujArch = function(kat) {
    aktywnaKat = kat;
    document.querySelectorAll('.arch-kat').forEach(b => {
      b.style.background = b.dataset.kat === kat ? '#7c6af7' : 'transparent';
      b.style.color      = b.dataset.kat === kat ? '#fff'    : '#94a3b8';
    });
    renderGrid();
  };

  document.getElementById('archSearch').addEventListener('input', e => {
    szukajFraza = e.target.value.toLowerCase().trim();
    renderGrid();
  });

  renderGrid();
}

export function pokazModal(nazwa) {
  const b = BIBLIOTEKI.find(x => x.nazwa === nazwa);
  if (!b) return;
  document.getElementById('archModalNazwa').textContent  = b.nazwa;
  document.getElementById('archModalKat').textContent    = KATEGORIE[b.kat];
  document.getElementById('archModalTworca').textContent = b.tworca;
  document.getElementById('archModalOpis').textContent   = b.opis;
  document.getElementById('archModalZawiera').innerHTML  = b.zawiera.map(z => '<li style="margin-bottom:5px;color:#b0b8d0">' + z + '</li>').join('');
  document.getElementById('archModalImp').textContent    = b.imp;
  document.getElementById('archModalPip').textContent    = b.pip;
  document.getElementById('archModal').style.display     = 'flex';
}

export function zamknijModal() {
  document.getElementById('archModal').style.display = 'none';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') zamknijModal(); });
