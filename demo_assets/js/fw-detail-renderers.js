// Render functions for framework detail tabs

function escFwd(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ── Podstawy ──
function renderBasics(b, meta) {
  var html = '';
  var labels = b.labels || {};
  var defaultLang = (meta && meta.codeLang) ? meta.codeLang : 'Code';
  var conceptsLabel       = labels.concepts       || 'Kluczowe koncepcje';
  var whenToUseLabel      = labels.whenToUse      || 'Kiedy używać?';
  var firstComponentLabel = labels.firstComponent || 'Pierwszy przykład';
  var firstComponentLang  = labels.firstComponentLang || defaultLang;

  var icon = (meta && meta.icon) ? meta.icon + ' ' : '';
  html += '<div class="fwd-card fwd-card-accent">' +
    '<div class="fwd-card-title">' + icon + b.intro.title + '</div>' +
    '<div class="fwd-card-desc">' + b.intro.desc + '</div>' +
    '</div>';

  html += '<div class="fwd-section-title">' + conceptsLabel + '</div>';
  html += '<div class="fwd-intro-grid">';
  b.concepts.forEach(function(c) {
    html += '<div class="fwd-concept-card">' +
      '<div class="fwd-concept-icon">' + c.icon + '</div>' +
      '<div class="fwd-concept-title">' + escFwd(c.title) + '</div>' +
      '<div class="fwd-concept-desc">' + escFwd(c.desc) + '</div>' +
      '</div>';
  });
  html += '</div>';

  html += '<div class="fwd-section-title">' + whenToUseLabel + '</div>';
  html += '<div class="fwd-card"><ul class="fwd-when-list">';
  b.whenToUse.forEach(function(w) { html += '<li>' + w + '</li>'; });
  html += '</ul></div>';

  html += '<div class="fwd-section-title">' + firstComponentLabel + '</div>';
  html += '<div class="fwd-card"><div class="fwd-code-wrap">' +
    '<span class="fwd-code-lang">' + firstComponentLang + '</span>' +
    '<pre class="fwd-code">' + escFwd(b.firstComponent) + '</pre>' +
    '</div></div>';

  return html;
}

// ── Generic {title, items[{name,desc,code}]} — non-React frameworks ──
function renderGenericSection(section, meta) {
  var defaultLang = (meta && meta.codeLang) ? meta.codeLang : 'Code';
  var html = '';
  if (section.title) {
    html += '<div class="fwd-section-title">' + escFwd(section.title) + '</div>';
  }
  (section.items || []).forEach(function(item, i) {
    html += '<div class="fwd-card" style="animation-delay:' + (i * 0.05) + 's">' +
      '<div class="fwd-card-title">' + escFwd(item.name || item.title || '') + '</div>' +
      '<div class="fwd-card-desc">' + escFwd(item.desc || '') + '</div>' +
      (item.code
        ? '<div class="fwd-code-wrap"><span class="fwd-code-lang">' + escFwd(item.lang || defaultLang) + '</span>' +
          '<pre class="fwd-code">' + escFwd(item.code) + '</pre></div>'
        : '') +
      '</div>';
  });
  return html;
}

// ── Komponenty ──
function renderComponents(items, meta) {
  var html = '';
  var defaultLang = (meta && meta.codeLang) ? meta.codeLang : 'Code';
  items.forEach(function(item, i) {
    html += '<div class="fwd-card" style="animation-delay:' + (i * 0.05) + 's">' +
      '<div class="fwd-card-title">' + item.title + '</div>' +
      '<div class="fwd-card-desc">' + item.desc + '</div>' +
      '<div class="fwd-code-wrap"><span class="fwd-code-lang">' + (item.lang || defaultLang) + '</span>' +
      '<pre class="fwd-code">' + escFwd(item.code) + '</pre>' +
      '</div></div>';
  });
  return html;
}

// ── Hooki ──
function renderHooks(items) {
  var html = '<div class="fwd-hooks-grid">';
  items.forEach(function(h, i) {
    html += '<div class="fwd-hook-card" style="animation-delay:' + (i * 0.04) + 's">' +
      '<div class="fwd-hook-name" style="color:var(--fw-color)">' + h.name + '</div>' +
      '<div class="fwd-hook-desc">' + h.desc + '</div>' +
      '<div class="fwd-hook-when">💡 ' + h.when + '</div>' +
      '<div class="fwd-code-wrap"><pre class="fwd-code" style="font-size:11px">' + escFwd(h.code) + '</pre>' +
      '</div></div>';
  });
  return html + '</div>';
}

// ── Routing ──
function renderRouting(r, meta) {
  var defaultLang = (meta && meta.codeLang) ? meta.codeLang : 'Code';
  var html = '<div class="fwd-install-bar">' +
    '<span class="fwd-install-label">Instalacja</span>' +
    '<span>$ ' + r.install + '</span>' +
    '<span style="font-size:10px;color:rgba(255,255,255,0.2);margin-left:auto">' + r.version + '</span>' +
    '</div>';
  r.sections.forEach(function(s, i) {
    html += '<div class="fwd-card" style="animation-delay:' + (i * 0.05) + 's">' +
      '<div class="fwd-card-title">' + s.title + '</div>' +
      '<div class="fwd-code-wrap"><span class="fwd-code-lang">' + (s.lang || defaultLang) + '</span>' +
      '<pre class="fwd-code">' + escFwd(s.code) + '</pre>' +
      '</div></div>';
  });
  return html;
}

// ── State Management ──
function renderState(items) {
  var html = '<div class="fwd-state-grid">';
  items.forEach(function(s, i) {
    html += '<div class="fwd-state-card" style="animation-delay:' + (i * 0.05) + 's;border-left:3px solid ' + s.color + '">' +
      '<div class="fwd-state-header"><span style="font-size:20px">' + s.icon + '</span>' +
      '<div class="fwd-state-name">' + s.name + '</div></div>' +
      '<div class="fwd-state-meta">' +
      '<span class="fwd-state-badge">📦 ' + s.bundle + '</span>' +
      '<span class="fwd-state-badge">⚙️ ' + s.complexity + '</span>' +
      '</div>' +
      '<div class="fwd-state-when">' + s.when + '</div>' +
      '<div class="fwd-code-wrap"><pre class="fwd-code" style="font-size:11px">' + escFwd(s.code) + '</pre>' +
      '</div></div>';
  });
  return html + '</div>';
}

// ── Rywale ──
function renderRivals(items) {
  var html = '<div class="fwd-rivals-grid">';
  items.forEach(function(r, i) {
    var pros = r.pros.map(function(p) { return '<li>' + p + '</li>'; }).join('');
    var cons = r.cons.map(function(c) { return '<li>' + c + '</li>'; }).join('');
    html += '<div class="fwd-rival-card" style="animation-delay:' + (i * 0.06) + 's;border-left:3px solid ' + r.color + '">' +
      '<div class="fwd-rival-header"><span class="fwd-rival-icon">' + r.icon + '</span>' +
      '<div><div class="fwd-rival-name" style="color:' + r.color + '">' + r.name + '</div>' +
      '<div class="fwd-rival-tagline">' + r.tagline + '</div></div></div>' +
      '<div class="fwd-pros-cons"><ul class="fwd-pro-list">' + pros + '</ul>' +
      '<ul class="fwd-con-list">' + cons + '</ul></div>' +
      '<div class="fwd-vs-react">🆚 ' + r.vsReact + '</div>' +
      '</div>';
  });
  return html + '</div>';
}

// ── Pluginy / Ekosystem ──
function renderPlugins(items) {
  var html = '<div class="fwd-plugins-grid">';
  items.forEach(function(p, i) {
    var exampleHtml = p.example
      ? '<div class="fwd-code-wrap" style="margin-top:10px"><pre class="fwd-code" style="font-size:11px">' + escFwd(p.example) + '</pre></div>'
      : '';
    html += '<div class="fwd-plugin-card" style="animation-delay:' + (i * 0.05) + 's;border-left:3px solid ' + p.color + '">' +
      '<div class="fwd-plugin-header"><span style="font-size:22px">' + p.icon + '</span>' +
      '<div><div class="fwd-plugin-name" style="color:' + p.color + '">' + escFwd(p.name) + '</div>' +
      '<div class="fwd-plugin-tagline">' + escFwd(p.tagline) + '</div></div></div>' +
      '<div class="fwd-plugin-install"><code>' + escFwd(p.install) + '</code></div>' +
      '<div class="fwd-plugin-use">' + escFwd(p.use) + '</div>' +
      exampleHtml + '</div>';
  });
  return html + '</div>';
}

// ── Komendy ──
function renderCommands(groups) {
  var html = '';
  groups.forEach(function(group, gi) {
    html += '<div class="fwd-cmd-group">' +
      '<div class="fwd-cmd-group-title"><span>' + group.icon + '</span>' + group.category + '</div>' +
      '<div class="fwd-terminal">';
    group.items.forEach(function(item, ii) {
      var hasDetail = !!item.detail;
      html += '<div class="fwd-terminal-row' + (hasDetail ? ' fwd-terminal-row--clickable' : '') + '"' +
        (hasDetail ? ' onclick="openCmdModal(' + gi + ',' + ii + ')"' : '') + '>' +
        '<span class="fwd-terminal-cmd">' + escFwd(item.cmd) + '</span>' +
        '<span class="fwd-terminal-desc">' + item.desc + '</span>' +
        (hasDetail ? '<span class="fwd-terminal-hint">→</span>' : '') +
        '</div>';
    });
    html += '</div></div>';
  });
  return html;
}
