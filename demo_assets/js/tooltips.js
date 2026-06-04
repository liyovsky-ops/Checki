// Obsługa dymków na hover dla tokenów Pythona (.kw, .fn)
// Wymaga: data/slownik.js załadowanego wcześniej

const tooltip = document.getElementById('dictTooltip');
const tooltipLabel = document.getElementById('dictTooltipLabel');
const tooltipOpis = document.getElementById('dictTooltipOpis');
const tooltipPrzyklad = document.getElementById('dictTooltipPrzyklad');

function podepnijSlownik() {
  document.querySelectorAll('.kw, .fn').forEach(function(span) {
    const tekst = span.textContent.trim();
    if (SLOWNIK[tekst]) {
      span.setAttribute('data-dict', tekst);
      span.addEventListener('mouseenter', function(e) { pokazTooltip(e, tekst); });
      span.addEventListener('mouseleave', ukryjTooltip);
    }
  });
}

function pokazTooltip(e, nazwa) {
  const wpis = SLOWNIK[nazwa];
  tooltipLabel.textContent = wpis.kat + ' · ' + nazwa;
  tooltipOpis.textContent = wpis.opis;
  tooltipPrzyklad.textContent = wpis.przyklad;
  tooltip.style.display = 'block';
  pozycjonuj(e);
}

function pozycjonuj(e) {
  const x = e.clientX + 16;
  const y = e.clientY - 10;
  const w = tooltip.offsetWidth;
  const h = tooltip.offsetHeight;
  tooltip.style.left = (x + w > window.innerWidth ? x - w - 32 : x) + 'px';
  tooltip.style.top  = (y + h > window.innerHeight ? y - h : y) + 'px';
  document.addEventListener('mousemove', sledz, { passive: true });
}

function sledz(e) {
  if (tooltip.style.display === 'none') { document.removeEventListener('mousemove', sledz); return; }
  const x = e.clientX + 16;
  const y = e.clientY - 10;
  const w = tooltip.offsetWidth;
  const h = tooltip.offsetHeight;
  tooltip.style.left = (x + w > window.innerWidth ? x - w - 32 : x) + 'px';
  tooltip.style.top  = (y + h > window.innerHeight ? y - h : y) + 'px';
}

function ukryjTooltip() {
  tooltip.style.display = 'none';
  document.removeEventListener('mousemove', sledz);
}

document.addEventListener('DOMContentLoaded', podepnijSlownik);

// Ponowne podpięcie gdy zakładka zmienia widok (dynamiczny render)
const observer = new MutationObserver(podepnijSlownik);
observer.observe(document.getElementById('editor') || document.body, { childList: true, subtree: true });
