var badPatternsActive = false;
var badPatternsCache = null;
var badPatternsSnapshot = null;

var SEVERITY_COLOR = {
  critical: '#ef4444',
  high:     '#f97316',
  medium:   '#f59e0b',
  low:      '#94a3b8'
};

var SEVERITY_LABEL = {
  critical: '🔴 Krytyczny',
  high:     '🟠 Wysoki',
  medium:   '🟡 Średni',
  low:      '⚪ Niski'
};

var CATEGORY_ICON = {
  security:        '🔒',
  reliability:     '⚙️',
  maintainability: '🧹',
  performance:     '⚡',
  best_practices:  '📐'
};

function toggleBadPatterns() {
  badPatternsActive = true;
  var currentCode = getOriginalCodeText();

  if (badPatternsCache && badPatternsSnapshot === currentCode) {
    applyBadPatternResults(badPatternsCache);
    return;
  }

  showBadPatternsLoading();
  fetchBadPatterns(currentCode);
}

function fetchBadPatterns(code) {
  fetch('http://localhost:8000/bad-patterns/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code })
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    badPatternsCache = data.issues;
    badPatternsSnapshot = code;
    applyBadPatternResults(data.issues);
    if (typeof historia !== 'undefined' && historia.length > 0) {
      historia[0].badPatternsData = data.issues;
      var critical = data.issues.filter(function(i) { return i.severity === 'critical' || i.severity === 'high'; });
      var warnings = data.issues.filter(function(i) { return i.severity === 'medium' || i.severity === 'low'; });
      var critLabels = critical.map(function(i) { return '[' + i.category + '] ' + i.label + ' (linia ' + i.lines[0] + ')'; });
      var warnLabels = warnings.map(function(i) { return '[' + i.category + '] ' + i.label + ' (linia ' + i.lines[0] + ')'; });
      historia[0].problemy = (historia[0].problemy || []).concat(critLabels);
      historia[0].sugestie = (historia[0].sugestie || []).concat(warnLabels);
      historia[0].bledy = (historia[0].bledy || 0) + critical.length;
      historia[0].ostrzezenia = (historia[0].ostrzezenia || 0) + warnings.length;
      if (typeof saveHistoria === 'function') saveHistoria();
    }
  })
  .catch(function() {
    showBadPatternsError();
  });
}

function applyBadPatternResults(issues) {
  clearBadPatternHighlights();

  if (issues.length === 0) {
    showBadPatternsPanel([]);
    return;
  }

  // Zbierz linie do podświetlenia
  var lineMap = {};
  issues.forEach(function(issue) {
    issue.lines.forEach(function(lineNum) {
      if (!lineMap[lineNum] || SEVERITY_ORDER_VAL(issue.severity) < SEVERITY_ORDER_VAL(lineMap[lineNum].severity)) {
        lineMap[lineNum] = issue;
      }
    });
  });

  // Podświetl linie
  var lines = document.querySelectorAll('#editor .code-line');
  lines.forEach(function(el, idx) {
    var lineNum = idx + 1;
    if (lineMap[lineNum]) {
      var sev = lineMap[lineNum].severity;
      el.classList.add('bad-pattern-highlight');
      el.style.setProperty('--bad-color', SEVERITY_COLOR[sev] || '#f59e0b');
    }
  });

  // Badge
  var badge = document.querySelector('.bad-patterns-badge');
  if (badge) {
    badge.textContent = issues.length > 0 ? issues.length : '';
    badge.style.display = issues.length > 0 ? '' : 'none';
  }

  showBadPatternsPanel(issues);
}

function SEVERITY_ORDER_VAL(sev) {
  return { critical: 0, high: 1, medium: 2, low: 3 }[sev] || 3;
}

function clearBadPatternHighlights() {
  document.querySelectorAll('#editor .code-line.bad-pattern-highlight').forEach(function(el) {
    el.classList.remove('bad-pattern-highlight');
    el.style.removeProperty('--bad-color');
  });
  document.querySelectorAll('#editor .code-line.bad-pattern-pulse').forEach(function(el) {
    el.classList.remove('bad-pattern-pulse');
  });
}

function showBadPatternsLoading() {
  var panel = document.getElementById('panel-body');
  if (!panel) return;
  panel.innerHTML = '<div style="font-size:12px;color:#94a3b8;padding:8px 0;">⏳ Analizuję wzorce (5 kategorii równolegle)...</div>';
}

function showBadPatternsError() {
  var panel = document.getElementById('panel-body');
  if (!panel) return;
  panel.innerHTML = '<div style="font-size:12px;color:#ef4444;padding:8px 0;">❌ Nie można połączyć się z backendem.</div>';
  badPatternsActive = false;
}

function showBadPatternsPanel(issues) {
  var panel = document.getElementById('panel-body');
  if (!panel) return;

  if (issues.length === 0) {
    panel.innerHTML =
      '<div class="analysis-card ok">' +
      '<div class="card-title">✅ Brak złych wzorców</div>' +
      '<div class="card-desc">Kod wygląda czysto we wszystkich 5 kategoriach.</div>' +
      '</div>';
    return;
  }

  var html = '<div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">⚠️ Znaleziono ' + issues.length + ' problem' + (issues.length > 1 ? 'ów' : '') + ':</div>';

  issues.forEach(function(issue) {
    var sev = issue.severity || 'medium';
    var color = SEVERITY_COLOR[sev] || '#f59e0b';
    var linesText = issue.lines.length === 1
      ? 'linia ' + issue.lines[0]
      : 'linie ' + issue.lines[0] + '–' + issue.lines[issue.lines.length - 1];
    var icon = CATEGORY_ICON[issue.category] || '⚠️';

    html +=
      '<div class="analysis-card" style="border-left:3px solid ' + color + ';cursor:pointer;" ' +
      'onclick="highlightBadPatternLines(' + JSON.stringify(issue.lines) + ')">' +
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">' +
      '<span style="font-size:10px;color:' + color + ';font-weight:600;">' + SEVERITY_LABEL[sev] + '</span>' +
      '<span style="font-size:10px;color:#4a5568;">' + icon + ' ' + issue.category + '</span>' +
      '</div>' +
      '<div class="card-title">' + issue.label + '</div>' +
      '<div class="card-desc">' + issue.reason + '</div>' +
      (issue.fix ? '<div class="card-desc" style="margin-top:4px;color:#22c55e;font-size:11px;">💡 ' + issue.fix + '</div>' : '') +
      '<div class="card-line">→ ' + linesText + '</div>' +
      '</div>';
  });

  panel.innerHTML = html;
}

function highlightBadPatternLines(lines) {
  document.querySelectorAll('#editor .code-line.bad-pattern-pulse').forEach(function(el) {
    el.classList.remove('bad-pattern-pulse');
  });
  var editorLines = document.querySelectorAll('#editor .code-line');
  lines.forEach(function(lineNum) {
    var el = editorLines[lineNum - 1];
    if (el) {
      el.classList.add('bad-pattern-pulse');
      if (lineNum === lines[0]) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

function resetBadPatterns() {
  badPatternsActive = false;
  badPatternsCache = null;
  badPatternsSnapshot = null;
  clearBadPatternHighlights();
  var badge = document.querySelector('.bad-patterns-badge');
  if (badge) { badge.textContent = ''; badge.style.display = 'none'; }
}
