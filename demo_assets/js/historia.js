// Historia analizowanych plików — dane i renderowanie
// Wywoływana przez tabs.js gdy user kliknie w sidebar

const historia = [
  {
    nazwa: 'app.py', jezyk: 'Python', data: 'dzisiaj, 14:32', linie: 23, bledy: 2, ostrzezenia: 1,
    opis: 'Aplikacja Flask z endpointem /users. Pobiera użytkowników z bazy SQLite i zwraca JSON.',
    problemy: ['Hardcoded hasło w linii 4', 'Martwa funkcja old_get_users() nigdy nie wywoływana'],
    sugestie: ['Dodać obsługę błędów (try/except) przy połączeniu z bazą']
  },
  {
    nazwa: 'auth.js', jezyk: 'JavaScript', data: 'wczoraj, 18:10', linie: 47, bledy: 0, ostrzezenia: 3,
    opis: 'Moduł autoryzacji z JWT tokenami. Obsługuje logowanie, wylogowanie i odświeżanie tokena.',
    problemy: [],
    sugestie: ['Token nie ma ustawionego czasu wygaśnięcia', 'Brak walidacji długości hasła', 'console.log z danymi użytkownika — usuń przed produkcją']
  },
  {
    nazwa: 'database.py', jezyk: 'Python', data: '2 dni temu, 09:45', linie: 61, bledy: 1, ostrzezenia: 0,
    opis: 'Klasa do obsługi bazy danych PostgreSQL. Zawiera metody CRUD dla tabeli users i orders.',
    problemy: ['Brak zamknięcia połączenia po operacji — wyciek zasobów w linii 34'],
    sugestie: ['Rozważ użycie context managera (with) dla połączeń']
  },
  {
    nazwa: 'scraper.py', jezyk: 'Python', data: '3 dni temu, 11:20', linie: 89, bledy: 0, ostrzezenia: 2,
    opis: 'Web scraper używający BeautifulSoup. Pobiera oferty pracy z kilku serwisów i zapisuje do bazy.',
    problemy: [],
    sugestie: ['Brak obsługi timeout przy żądaniach HTTP', 'Brak rate limiting — ryzyko zablokowania IP']
  }
];

function showHistoria() {
  const panel = document.getElementById('panel-body');
  panel.innerHTML =
    '<div style="font-size:12px; color:#94a3b8; margin-bottom:8px;">Ostatnio analizowane pliki</div>' +
    historia.map(function(h, i) {
      const cls = h.bledy > 0 ? 'error' : h.ostrzezenia > 0 ? 'warn' : 'ok';
      return '<div class="analysis-card ' + cls + '" style="cursor:pointer;transition:transform 0.1s;" ' +
        'onclick="showHistoriaDetail(' + i + ')" onmouseover="this.style.transform=\'translateX(3px)\'" onmouseout="this.style.transform=\'translateX(0)\'">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">' +
        '<div class="card-title" style="flex:1">📄 ' + h.nazwa + '</div>' +
        '<span style="font-size:10px;background:#0f1117;padding:2px 8px;border-radius:10px;color:#94a3b8">' + h.jezyk + '</span>' +
        '</div>' +
        '<div class="card-desc">' + h.opis + '</div>' +
        '<div style="display:flex;gap:12px;margin-top:8px;">' +
        '<span style="font-size:11px;color:#4a5568">🕓 ' + h.data + '</span>' +
        '<span style="font-size:11px;color:#4a5568">' + h.linie + ' linii</span>' +
        (h.bledy > 0      ? '<span style="font-size:11px;color:#ef4444">● ' + h.bledy + ' błędy</span>' : '') +
        (h.ostrzezenia > 0 ? '<span style="font-size:11px;color:#f59e0b">● ' + h.ostrzezenia + ' ostrzeżenia</span>' : '') +
        (h.bledy === 0 && h.ostrzezenia === 0 ? '<span style="font-size:11px;color:#22c55e">● Czysto</span>' : '') +
        '</div></div>';
    }).join('');
}

function showHistoriaDetail(i) {
  const h = historia[i];
  const panel = document.getElementById('panel-body');
  panel.innerHTML =
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">' +
    '<button onclick="showHistoria()" style="background:#2d3148;border:none;color:#94a3b8;border-radius:6px;padding:5px 10px;cursor:pointer;font-size:12px;font-family:inherit">← Wróć</button>' +
    '<span style="font-size:13px;font-weight:600;color:#e2e8f0">📄 ' + h.nazwa + '</span>' +
    '<span style="font-size:10px;background:#1a1d2e;padding:2px 8px;border-radius:10px;color:#94a3b8;border:1px solid #2d3148">' + h.jezyk + '</span>' +
    '</div>' +
    '<div class="analysis-card ok">' +
    '<div class="card-title">📋 Co zawierał kod?</div>' +
    '<div class="card-desc">' + h.opis + '</div>' +
    '<div style="display:flex;gap:12px;margin-top:8px;flex-wrap:wrap;">' +
    '<span style="font-size:11px;color:#4a5568">🕓 ' + h.data + '</span>' +
    '<span style="font-size:11px;color:#4a5568">📏 ' + h.linie + ' linii</span>' +
    '</div></div>' +
    (h.problemy.length > 0 ?
      '<div class="analysis-card error"><div class="card-title">🔴 Błędy (' + h.bledy + ')</div>' +
      h.problemy.map(function(p) { return '<div class="card-desc" style="margin-top:6px;">• ' + p + '</div>'; }).join('') + '</div>'
      :
      '<div class="analysis-card ok"><div class="card-title">✅ Brak błędów</div><div class="card-desc">Kod nie zawierał krytycznych problemów.</div></div>'
    ) +
    (h.sugestie.length > 0 ?
      '<div class="analysis-card warn"><div class="card-title">💡 Sugestie (' + (h.ostrzezenia || h.sugestie.length) + ')</div>' +
      h.sugestie.map(function(s) { return '<div class="card-desc" style="margin-top:6px;">• ' + s + '</div>'; }).join('') + '</div>'
      : ''
    );
}
