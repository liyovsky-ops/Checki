export function escFwd(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function renderBasics(b, meta) {
  const defaultLang = (meta && meta.codeLang) ? meta.codeLang : 'Code';
  const labels = b.labels || {};
  const conceptsLabel       = labels.concepts       || 'Kluczowe koncepcje';
  const whenToUseLabel      = labels.whenToUse      || 'Kiedy używać?';
  const firstComponentLabel = labels.firstComponent || 'Pierwszy przykład';
  const firstComponentLang  = labels.firstComponentLang || defaultLang;
  const icon = (meta && meta.icon) ? meta.icon + ' ' : '';
  let html =
    '<div class="fwd-card fwd-card-accent">' +
    '<div class="fwd-card-title">' + icon + b.intro.title + '</div>' +
    '<div class="fwd-card-desc">'  + b.intro.desc  + '</div></div>' +
    '<div class="fwd-section-title">' + conceptsLabel + '</div>' +
    '<div class="fwd-intro-grid">';
  b.concepts.forEach(c => {
    html += '<div class="fwd-concept-card">' +
      '<div class="fwd-concept-icon">'  + c.icon  + '</div>' +
      '<div class="fwd-concept-title">' + escFwd(c.title) + '</div>' +
      '<div class="fwd-concept-desc">'  + escFwd(c.desc)  + '</div></div>';
  });
  html += '</div><div class="fwd-section-title">' + whenToUseLabel + '</div>' +
    '<div class="fwd-card"><ul class="fwd-when-list">';
  b.whenToUse.forEach(w => { html += '<li>' + w + '</li>'; });
  html += '</ul></div><div class="fwd-section-title">' + firstComponentLabel + '</div>' +
    '<div class="fwd-card"><div class="fwd-code-wrap">' +
    '<span class="fwd-code-lang">' + firstComponentLang + '</span>' +
    '<pre class="fwd-code">' + escFwd(b.firstComponent) + '</pre></div></div>';
  return html;
}

export function renderGenericSection(section, meta) {
  const defaultLang = (meta && meta.codeLang) ? meta.codeLang : 'Code';
  let html = section.title ? '<div class="fwd-section-title">' + escFwd(section.title) + '</div>' : '';
  (section.items || []).forEach(function(item, i) {
    html += '<div class="fwd-card" style="animation-delay:' + (i * 0.05) + 's">' +
      '<div class="fwd-card-title">' + escFwd(item.name || item.title || '') + '</div>' +
      '<div class="fwd-card-desc">'  + escFwd(item.desc || '') + '</div>' +
      (item.code ? '<div class="fwd-code-wrap"><span class="fwd-code-lang">' + escFwd(item.lang || defaultLang) + '</span>' +
        '<pre class="fwd-code">' + escFwd(item.code) + '</pre></div>' : '') +
      '</div>';
  });
  return html;
}

export function renderComponents(items, meta) {
  const defaultLang = (meta && meta.codeLang) ? meta.codeLang : 'Code';
  return items.map((item, i) =>
    '<div class="fwd-card" style="animation-delay:' + (i * 0.05) + 's">' +
    '<div class="fwd-card-title">' + item.title + '</div>' +
    '<div class="fwd-card-desc">'  + item.desc  + '</div>' +
    '<div class="fwd-code-wrap"><span class="fwd-code-lang">' + (item.lang || defaultLang) + '</span>' +
    '<pre class="fwd-code">' + escFwd(item.code) + '</pre></div></div>'
  ).join('');
}

export function renderHooks(items) {
  return '<div class="fwd-hooks-grid">' +
    items.map((h, i) =>
      '<div class="fwd-hook-card" style="animation-delay:' + (i * 0.04) + 's">' +
      '<div class="fwd-hook-name" style="color:var(--fw-color)">' + h.name + '</div>' +
      '<div class="fwd-hook-desc">' + h.desc + '</div>' +
      '<div class="fwd-hook-when">💡 ' + h.when + '</div>' +
      '<div class="fwd-code-wrap"><pre class="fwd-code" style="font-size:11px">' + escFwd(h.code) + '</pre></div></div>'
    ).join('') + '</div>';
}

export function renderRouting(r, meta) {
  const defaultLang = (meta && meta.codeLang) ? meta.codeLang : 'Code';
  let html = '<div class="fwd-install-bar">' +
    '<span class="fwd-install-label">Instalacja</span>' +
    '<span>$ ' + r.install + '</span>' +
    '<span style="font-size:10px;color:rgba(255,255,255,0.2);margin-left:auto">' + r.version + '</span></div>';
  r.sections.forEach((s, i) => {
    html += '<div class="fwd-card" style="animation-delay:' + (i * 0.05) + 's">' +
      '<div class="fwd-card-title">' + s.title + '</div>' +
      '<div class="fwd-code-wrap"><span class="fwd-code-lang">' + (s.lang || defaultLang) + '</span>' +
      '<pre class="fwd-code">' + escFwd(s.code) + '</pre></div></div>';
  });
  return html;
}

export function renderState(items) {
  return '<div class="fwd-state-grid">' +
    items.map((s, i) =>
      '<div class="fwd-state-card" style="animation-delay:' + (i * 0.05) + 's;border-left:3px solid ' + s.color + '">' +
      '<div class="fwd-state-header"><span style="font-size:20px">' + s.icon + '</span>' +
      '<div class="fwd-state-name">' + s.name + '</div></div>' +
      '<div class="fwd-state-meta">' +
      '<span class="fwd-state-badge">📦 ' + s.bundle + '</span>' +
      '<span class="fwd-state-badge">⚙️ ' + s.complexity + '</span></div>' +
      '<div class="fwd-state-when">' + s.when + '</div>' +
      '<div class="fwd-code-wrap"><pre class="fwd-code" style="font-size:11px">' + escFwd(s.code) + '</pre></div></div>'
    ).join('') + '</div>';
}

export function renderRivals(items) {
  return '<div class="fwd-rivals-grid">' +
    items.map((r, i) =>
      '<div class="fwd-rival-card" style="animation-delay:' + (i * 0.06) + 's;border-left:3px solid ' + r.color + '">' +
      '<div class="fwd-rival-header"><span class="fwd-rival-icon">' + r.icon + '</span>' +
      '<div><div class="fwd-rival-name" style="color:' + r.color + '">' + r.name + '</div>' +
      '<div class="fwd-rival-tagline">' + r.tagline + '</div></div></div>' +
      '<div class="fwd-pros-cons"><ul class="fwd-pro-list">' + r.pros.map(p => '<li>' + p + '</li>').join('') + '</ul>' +
      '<ul class="fwd-con-list">' + r.cons.map(c => '<li>' + c + '</li>').join('') + '</ul></div>' +
      '<div class="fwd-vs-react">🆚 ' + r.vsReact + '</div></div>'
    ).join('') + '</div>';
}

export function renderRivalsSection(section) {
  let html = section.title ? '<div class="fwd-section-title">' + escFwd(section.title) + '</div>' : '';
  html += '<div class="fwd-rivals-grid">' +
    (section.items || []).map(function(r, i) {
      const color = r.color || 'var(--fw-color)';
      return '<div class="fwd-rival-card" style="animation-delay:' + (i * 0.06) + 's;border-left:3px solid ' + color + '">' +
        '<div class="fwd-rival-header"><span class="fwd-rival-icon">' + (r.icon || '') + '</span>' +
        '<div><div class="fwd-rival-name" style="color:' + color + '">' + escFwd(r.name) + '</div>' +
        '<div class="fwd-rival-tagline">' + escFwd(r.tagline || '') + '</div></div></div>' +
        (r.pros && r.pros.length
          ? '<div class="fwd-pros-cons"><ul class="fwd-pro-list">' + r.pros.map(function(p) { return '<li>' + escFwd(p) + '</li>'; }).join('') + '</ul>' +
            (r.cons && r.cons.length ? '<ul class="fwd-con-list">' + r.cons.map(function(c) { return '<li>' + escFwd(c) + '</li>'; }).join('') + '</ul>' : '') +
            '</div>'
          : '') +
        (r.vs ? '<div class="fwd-vs-react">🆚 ' + escFwd(r.vs) + '</div>' : '') +
        '</div>';
    }).join('') + '</div>';
  return html;
}

export function renderPlugins(items) {
  return '<div class="fwd-plugins-grid">' +
    items.map((p, i) =>
      '<div class="fwd-plugin-card" style="animation-delay:' + (i * 0.05) + 's;border-left:3px solid ' + p.color + '">' +
      '<div class="fwd-plugin-header"><span style="font-size:22px">' + p.icon + '</span>' +
      '<div><div class="fwd-plugin-name" style="color:' + p.color + '">' + escFwd(p.name) + '</div>' +
      '<div class="fwd-plugin-tagline">' + escFwd(p.tagline) + '</div></div></div>' +
      '<div class="fwd-plugin-install"><code>' + escFwd(p.install) + '</code></div>' +
      '<div class="fwd-plugin-use">' + escFwd(p.use) + '</div>' +
      (p.example ? '<div class="fwd-code-wrap" style="margin-top:10px"><pre class="fwd-code" style="font-size:11px">' + escFwd(p.example) + '</pre></div>' : '') +
      '</div>'
    ).join('') + '</div>';
}

export function renderCommands(data) {
  const groups = Array.isArray(data) ? data : (data.groups || []);
  return groups.map(function(group, gi) {
    const title = group.category || group.name || '';
    const entries = group.items || group.commands || [];
    return '<div class="fwd-cmd-group">' +
      '<div class="fwd-cmd-group-title"><span>' + group.icon + '</span>' + title + '</div>' +
      '<div class="fwd-terminal">' +
      entries.map(function(item, ii) {
        const cmd  = item.cmd  || item.code || '';
        const desc = item.desc || '';
        const hasDetail = !!item.detail;
        const isMulti   = cmd.includes('\n');
        if (isMulti) {
          return '<div class="fwd-terminal-row fwd-terminal-row--block">' +
            '<div class="fwd-terminal-desc fwd-terminal-desc--block">' + escFwd(desc) + '</div>' +
            '<pre class="fwd-code" style="font-size:11px;margin:4px 0 0">' + escFwd(cmd.trim()) + '</pre></div>';
        }
        return '<div class="fwd-terminal-row' + (hasDetail ? ' fwd-terminal-row--clickable' : '') + '"' +
          (hasDetail ? ' onclick="openCmdModal(' + gi + ',' + ii + ')"' : '') + '>' +
          '<span class="fwd-terminal-cmd">' + escFwd(cmd) + '</span>' +
          '<span class="fwd-terminal-desc">' + escFwd(desc) + '</span>' +
          (hasDetail ? '<span class="fwd-terminal-hint">→</span>' : '') +
          '</div>';
      }).join('') +
      '</div></div>';
  }).join('');
}
