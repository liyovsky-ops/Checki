// Prefetch wszystkich analiz w tle po wgraniu pliku

function prefetchAll(code, fileName) {
  prefetchTranslator(code, fileName);
  prefetchVivisekcja(code, fileName);
  prefetchDeadCode(code, fileName);
  prefetchBadPatterns(code, fileName);
}

function findHistoriaIdx(fileName) {
  if (typeof historia === 'undefined') return -1;
  for (var i = 0; i < historia.length; i++) {
    if (historia[i].nazwa === fileName) return i;
  }
  return -1;
}

function prefetchTranslator(code, fileName) {
  fetch('http://localhost:8000/translator/explain-lines', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    translatorData = data.lines;
    translatorCodeSnapshot = code;
    translationCache[code] = data.lines;
    var idx = findHistoriaIdx(fileName);
    if (idx >= 0) {
      historia[idx].translatorData = data.lines;
      if (typeof saveHistoria === 'function') saveHistoria();
      if (typeof refreshHistoriaIfVisible === 'function') refreshHistoriaIfVisible();
    }
  })
  .catch(function() {});
}

function prefetchVivisekcja(code, fileName) {
  fetch('http://localhost:8000/vivisekcja/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    vivisekcjaCache = data.markdown;
    vivisekcjaCodeSnapshot = code;
    var idx = findHistoriaIdx(fileName);
    if (idx >= 0) {
      historia[idx].vivisekcjaData = data.markdown;
      var firstLine = data.markdown.split('\n').find(function(l) {
        return l.trim() && !l.startsWith('#');
      }) || '';
      if (firstLine) historia[idx].opis = firstLine.replace(/\*\*/g, '').trim();
      if (typeof saveHistoria === 'function') saveHistoria();
      if (typeof refreshHistoriaIfVisible === 'function') refreshHistoriaIfVisible();
    }
  })
  .catch(function() {});
}

function prefetchDeadCode(code, fileName) {
  fetch('http://localhost:8000/dead-code/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    deadCodeCache = data.dead;
    deadCodeSnapshot = code;
    var badge = document.querySelector('.dead-code-badge');
    if (badge && data.dead.length > 0) {
      badge.textContent = data.dead.length;
      badge.style.display = '';
    }
    var idx = findHistoriaIdx(fileName);
    if (idx >= 0) {
      historia[idx].deadCodeData = data.dead;
      historia[idx].problemy = data.dead.map(function(d) {
        return '💀 ' + d.label + ' (linia ' + d.lines[0] + ')';
      });
      historia[idx].bledy = data.dead.length;
      if (typeof saveHistoria === 'function') saveHistoria();
      if (typeof refreshHistoriaIfVisible === 'function') refreshHistoriaIfVisible();
    }
  })
  .catch(function() {});
}

function prefetchBadPatterns(code, fileName) {
  fetch('http://localhost:8000/bad-patterns/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    badPatternsCache = data.issues;
    badPatternsSnapshot = code;
    var badge = document.querySelector('.bad-patterns-badge');
    if (badge && data.issues.length > 0) {
      badge.textContent = data.issues.length;
      badge.style.display = '';
    }
    var idx = findHistoriaIdx(fileName);
    if (idx >= 0) {
      var critical = data.issues.filter(function(i) {
        return i.severity === 'critical' || i.severity === 'high';
      });
      var warnings = data.issues.filter(function(i) {
        return i.severity === 'medium' || i.severity === 'low';
      });
      historia[idx].badPatternsData = data.issues;
      historia[idx].problemy = (historia[idx].problemy || []).concat(
        critical.map(function(i) { return '⚠️ [' + i.category + '] ' + i.label + ' (linia ' + i.lines[0] + ')'; })
      );
      historia[idx].sugestie = warnings.map(function(i) {
        return '[' + i.category + '] ' + i.label + ' (linia ' + i.lines[0] + ')';
      });
      historia[idx].ostrzezenia = warnings.length;
      if (typeof saveHistoria === 'function') saveHistoria();
      if (typeof refreshHistoriaIfVisible === 'function') refreshHistoriaIfVisible();
    }
  })
  .catch(function() {});
}
