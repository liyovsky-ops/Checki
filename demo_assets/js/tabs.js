// Logika zakładek panelu prawego i sidebar
// Wymaga: archiwum.js, historia.js

function switchTab(el, tab) {
  document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');

  const panel = document.getElementById('panel-body');

  if (tab === 'nauka') {
    panel.innerHTML =
      '<div style="font-size:12px; color:#94a3b8; margin-bottom:8px;">Tryb nauki — AI pisze najprostszy możliwy kod</div>' +
      '<div class="analysis-card ok"><div class="card-title">🎓 Zasada trybu nauki</div>' +
      '<div class="card-desc">AI będzie pisać kod bez skrótów, bez magii. Każdy krok osobno, z komentarzami. Idealny do nauki przez czytanie.</div></div>' +
      '<div class="analysis-card"><div class="card-title">Przykład — tryb normalny:</div>' +
      '<div class="card-desc"><code style="color:#a78bfa">users = [u for u in db.execute(\'SELECT * FROM users\')]</code></div></div>' +
      '<div class="analysis-card ok"><div class="card-title">Przykład — tryb nauki:</div>' +
      '<div class="card-desc" style="line-height:2">' +
      '<code style="color:#98c379">wyniki = db.execute(\'SELECT * FROM users\')</code><br>' +
      '<code style="color:#98c379">lista_uzytkownikow = []</code><br>' +
      '<code style="color:#98c379">for uzytkownik in wyniki:</code><br>' +
      '<code style="color:#98c379">&nbsp;&nbsp;&nbsp;&nbsp;lista_uzytkownikow.append(uzytkownik)</code>' +
      '</div></div>';

  } else if (tab === 'text2code') {
    panel.innerHTML =
      '<div style="font-size:12px; color:#94a3b8; margin-bottom:8px;">Opisz co chcesz zrobić</div>' +
      '<div class="analysis-card"><div class="card-title">Przykładowe polecenie:</div>' +
      '<div class="card-desc">"stwórz funkcję która pobiera użytkowników z bazy i zwraca tylko tych którzy mają więcej niż 18 lat"</div></div>' +
      '<div class="analysis-card ok"><div class="card-title">✅ Wygenerowany kod:</div>' +
      '<div class="card-desc" style="line-height:2">' +
      '<code style="color:#98c379">def pobierz_doroslych():</code><br>' +
      '<code style="color:#98c379">&nbsp;&nbsp;conn = get_db_connection()</code><br>' +
      '<code style="color:#98c379">&nbsp;&nbsp;query = \'SELECT * FROM users WHERE wiek > 18\'</code><br>' +
      '<code style="color:#98c379">&nbsp;&nbsp;return conn.execute(query).fetchall()</code>' +
      '</div></div>';

  } else if (tab === 'agenci') {
    panel.innerHTML =
      '<div style="font-size:12px; color:#94a3b8; margin-bottom:8px;">Wybierz agenta</div>' +
      '<div class="analysis-card" style="cursor:pointer"><div class="card-title">🤖 Agent Backend</div>' +
      '<div class="card-desc">Pisze profesjonalny kod serwerowy — API, bazy danych, autentykacja.</div></div>' +
      '<div class="analysis-card warn" style="cursor:pointer"><div class="card-title">🛡️ Agent Security</div>' +
      '<div class="card-desc">Analizuje kod pod kątem luk bezpieczeństwa i proponuje poprawki.</div></div>' +
      '<div class="analysis-card" style="cursor:pointer"><div class="card-title">🎨 Agent Frontend</div>' +
      '<div class="card-desc">Tworzy komponenty UI, style, responsywny layout.</div></div>';

  } else if (tab === 'archiwum') {
    renderujArchiwum(panel);

  } else {
    // domyślna zakładka: analiza kodu
    panel.innerHTML =
      '<div style="font-size:12px; color:#94a3b8; margin-bottom:4px;">Podsumowanie kodu:</div>' +
      '<div class="analysis-card ok"><div class="card-title">📄 Co robi ten kod?</div>' +
      '<div class="card-desc">Prosta aplikacja Flask z jednym endpointem <code style="color:#a78bfa">/users</code>. Pobiera użytkowników z bazy danych i zwraca jako JSON. Zawiera 2 problemy do naprawienia.</div></div>' +
      '<div class="analysis-card error"><div class="card-title">💀 Martwy kod</div>' +
      '<div class="card-desc">Funkcja <code style="color:#a78bfa">old_get_users()</code> nigdy nie jest wywoływana. Można ją usunąć.</div>' +
      '<div class="card-line">→ linia 18–22</div></div>' +
      '<div class="analysis-card warn"><div class="card-title">⚠️ Złe rozwiązanie</div>' +
      '<div class="card-desc">Hasło do bazy danych jest wpisane bezpośrednio w kodzie. Użyj zmiennej środowiskowej <code style="color:#f59e0b">os.environ</code>.</div>' +
      '<div class="card-line">→ linia 4</div></div>' +
      '<div class="analysis-card"><div class="card-title">💡 Sugestia</div>' +
      '<div class="card-desc">Rozważ dodanie obsługi błędów przy połączeniu z bazą danych (try/except).</div>' +
      '<div class="card-line">→ linia 8–10</div></div>';
  }
}

function setActive(el) {
  document.querySelectorAll('.sidebar-item').forEach(function(i) { i.classList.remove('active'); });
  el.classList.add('active');
}

function sendAI() {
  const input = document.getElementById('ai-input');
  const val = input.value.trim();
  if (!val) return;
  const panel = document.getElementById('panel-body');
  const card = document.createElement('div');
  card.className = 'analysis-card ok';
  card.innerHTML = '<div class="card-title">💬 Ty: ' + val + '</div>' +
    '<div class="card-desc" style="color:#a78bfa">🤖 AI analizuje... (to demo, AI odpowie po podpięciu backendu)</div>';
  panel.prepend(card);
  input.value = '';
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('ai-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendAI();
  });
});
