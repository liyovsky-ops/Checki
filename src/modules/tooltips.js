import { SLOWNIK } from '../data/slownik.js';

const tooltip        = document.getElementById('dictTooltip');
const tooltipLabel   = document.getElementById('dictTooltipLabel');
const tooltipOpis    = document.getElementById('dictTooltipOpis');
const tooltipPrzyklad = document.getElementById('dictTooltipPrzyklad');

export function podepnijSlownik() {
  document.querySelectorAll('.kw, .fn').forEach(function(span) {
    const tekst = span.textContent.trim();
    if (SLOWNIK[tekst]) {
      span.setAttribute('data-dict', tekst);
      span.addEventListener('mouseenter', e => pokazTooltip(e, tekst));
      span.addEventListener('mouseleave', ukryjTooltip);
    }
  });
}

function pokazTooltip(e, nazwa) {
  const wpis = SLOWNIK[nazwa];
  tooltipLabel.textContent   = wpis.kat + ' · ' + nazwa;
  tooltipOpis.textContent    = wpis.opis;
  tooltipPrzyklad.textContent = wpis.przyklad;
  tooltip.style.display = 'block';
  pozycjonuj(e);
}

function pozycjonuj(e) {
  updatePos(e.clientX, e.clientY);
  document.addEventListener('mousemove', sledz, { passive: true });
}

function updatePos(cx, cy) {
  const x = cx + 16, y = cy - 10;
  const w = tooltip.offsetWidth, h = tooltip.offsetHeight;
  tooltip.style.left = (x + w > window.innerWidth  ? x - w - 32 : x) + 'px';
  tooltip.style.top  = (y + h > window.innerHeight ? y - h      : y) + 'px';
}

function sledz(e) {
  if (tooltip.style.display === 'none') { document.removeEventListener('mousemove', sledz); return; }
  updatePos(e.clientX, e.clientY);
}

function ukryjTooltip() {
  tooltip.style.display = 'none';
  document.removeEventListener('mousemove', sledz);
}

document.addEventListener('DOMContentLoaded', function() {
  podepnijSlownik();
  const editorEl = document.getElementById('editor') || document.body;
  new MutationObserver(podepnijSlownik).observe(editorEl, { childList: true, subtree: true });
});
