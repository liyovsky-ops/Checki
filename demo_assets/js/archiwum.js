// Zakładka Archiwum — renderowanie kafelek i modal szczegółów biblioteki
// Wymaga: data/biblioteki.js załadowanego wcześniej

const KATEGORIE = {
  'all':      'Wszystkie',
  'stdlib':   '🐍 Stdlib',
  'web':      '🌐 Web',
  'data':     '📊 Data',
  'ai':       '🤖 AI / ML',
  'db':       '🗄️ Bazy danych',
  'utils':    '🔧 Narzędzia',
  'scraping': '🕷️ Scraping',
  'testing':  '🧪 Testy',
  'devtools': '⚙️ Dev Tools',
};

function renderujArchiwum(panel) {
  const katsHTML = Object.entries(KATEGORIE).map(function(e) {
    const k = e[0], v = e[1];
    const aktBg  = k === 'all' ? '#7c6af7' : 'transparent';
    const aktCol = k === 'all' ? '#fff'    : '#94a3b8';
    const aktCls = k === 'all' ? 'arch-kat arch-kat-active' : 'arch-kat';
    return '<button onclick="filtrujArch(\'' + k + '\')" class="' + aktCls + '" data-kat="' + k + '" ' +
      'style="padding:4px 10px;border-radius:6px;border:1px solid #2d3148;background:' + aktBg + ';color:' + aktCol + ';font-size:12px;cursor:pointer;">' + v + '</button>';
  }).join('');

  panel.innerHTML =
    '<div style="margin-bottom:12px;"><input id="archSearch" placeholder="🔍 Szukaj biblioteki..." ' +
    'style="width:100%;padding:8px 12px;background:#13151f;border:1px solid #2d3148;border-radius:8px;color:#e2e8f0;font-size:13px;outline:none;box-sizing:border-box;"></div>' +
    '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;" id="archKats">' + katsHTML + '</div>' +
    '<div id="archGrid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"></div>' +
    '<div id="archCount" style="font-size:11px;color:#4a5568;margin-top:10px;text-align:right;"></div>';

  let aktywnaKat = 'all';
  let szukajFraza = '';

  function renderGrid() {
    const grid  = document.getElementById('archGrid');
    const count = document.getElementById('archCount');
    const filtered = BIBLIOTEKI.filter(function(b) {
      const katOk    = aktywnaKat === 'all' || b.kat === aktywnaKat;
      const szukajOk = !szukajFraza || b.nazwa.toLowerCase().includes(szukajFraza) || b.opis.toLowerCase().includes(szukajFraza);
      return katOk && szukajOk;
    });
    grid.innerHTML = filtered.map(function(b) {
      return '<div onclick="pokazModal(\'' + b.nazwa + '\')" ' +
        'style="background:#13151f;border:1px solid #2d3148;border-radius:10px;padding:10px 12px;cursor:pointer;transition:border-color 0.15s;" ' +
        'onmouseenter="this.style.borderColor=\'#7c6af7\'" onmouseleave="this.style.borderColor=\'#2d3148\'">' +
        '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">' +
        '<span style="font-size:13px;font-weight:600;color:#e2e8f0;">' + b.nazwa + '</span>' +
        '<span style="font-size:10px;background:#1e2235;color:#7c6af7;padding:1px 7px;border-radius:10px;">' + KATEGORIE[b.kat] + '</span>' +
        '</div>' +
        '<div style="font-size:11px;color:#94a3b8;line-height:1.4;margin-bottom:6px;">' + b.krotki + '</div>' +
        '<div style="font-family:monospace;font-size:10px;color:#98c379;background:#0f1117;padding:3px 7px;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + b.pip + '</div>' +
        '</div>';
    }).join('');
    count.textContent = filtered.length + ' z ' + BIBLIOTEKI.length + ' bibliotek';
  }

  window.filtrujArch = function(kat) {
    aktywnaKat = kat;
    document.querySelectorAll('.arch-kat').forEach(function(b) {
      const aktywna = b.dataset.kat === kat;
      b.style.background = aktywna ? '#7c6af7' : 'transparent';
      b.style.color      = aktywna ? '#fff'    : '#94a3b8';
    });
    renderGrid();
  };

  document.getElementById('archSearch').addEventListener('input', function(e) {
    szukajFraza = e.target.value.toLowerCase().trim();
    renderGrid();
  });

  renderGrid();
}

window.pokazModal = function(nazwa) {
  const b = BIBLIOTEKI.find(function(x) { return x.nazwa === nazwa; });
  if (!b) return;
  const zawieraHTML = b.zawiera.map(function(z) {
    return '<li style="margin-bottom:5px;color:#b0b8d0;">' + z + '</li>';
  }).join('');
  document.getElementById('archModalNazwa').textContent  = b.nazwa;
  document.getElementById('archModalKat').textContent    = KATEGORIE[b.kat];
  document.getElementById('archModalTworca').textContent = b.tworca;
  document.getElementById('archModalOpis').textContent   = b.opis;
  document.getElementById('archModalZawiera').innerHTML  = zawieraHTML;
  document.getElementById('archModalImp').textContent    = b.imp;
  document.getElementById('archModalPip').textContent    = b.pip;
  document.getElementById('archModal').style.display     = 'flex';
};

window.zamknijModal = function() {
  document.getElementById('archModal').style.display = 'none';
};

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') zamknijModal();
});
