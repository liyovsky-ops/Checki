import mainSrc from '../main.js?raw';

// Load all module + data sources via glob (DEV-only bundle, tree-shaken in prod)
const rawMods = import.meta.glob('../modules/*.js', { query: '?raw', import: 'default', eager: true });
const rawData = import.meta.glob('../data/*.js',    { query: '?raw', import: 'default', eager: true });

import { CODE_LINES, historia, translatorState, vivisekcjaState, deadCodeState, badPatternsState } from '../modules/state.js';
import { devLog, subscribe as subLog, clearLog } from './logger.js';

// ── Graph layout (SVG canvas 1200 × 700) ──────────────────────────────────────

const NW = 152, NH = 30;

function ms(name) { return rawMods[`../modules/${name}`] || ''; }

const NODES = [
  { id: 'main',       label: 'main.js',                x: 600,  y:  42, color: '#f0c060', src: mainSrc,       path: 'src/main.js' },
  { id: 'editor',     label: 'editor.js',              x:  82,  y: 172, color: '#82aaff', src: ms('editor.js'),              path: 'src/modules/editor.js' },
  { id: 'historia',   label: 'historia.js',            x: 278,  y: 172, color: '#82aaff', src: ms('historia.js'),            path: 'src/modules/historia.js' },
  { id: 'translator', label: 'translator.js',          x: 474,  y: 172, color: '#82aaff', src: ms('translator.js'),          path: 'src/modules/translator.js' },
  { id: 'vivisekcja', label: 'vivisekcja.js',          x: 670,  y: 172, color: '#82aaff', src: ms('vivisekcja.js'),          path: 'src/modules/vivisekcja.js' },
  { id: 'deadcode',   label: 'dead-code.js',           x: 866,  y: 172, color: '#ff7070', src: ms('dead-code.js'),           path: 'src/modules/dead-code.js' },
  { id: 'badpat',     label: 'bad-patterns.js',        x:1062,  y: 172, color: '#ff7070', src: ms('bad-patterns.js'),        path: 'src/modules/bad-patterns.js' },
  { id: 'state',      label: 'state.js',               x:  96,  y: 358, color: '#61dafb', src: ms('state.js'),               path: 'src/modules/state.js' },
  { id: 'progmode',   label: 'programming-mode.js',    x: 292,  y: 338, color: '#82aaff', src: ms('programming-mode.js'),    path: 'src/modules/programming-mode.js' },
  { id: 'tabs',       label: 'tabs.js',                x: 476,  y: 338, color: '#82aaff', src: ms('tabs.js'),                path: 'src/modules/tabs.js' },
  { id: 'archiwum',   label: 'archiwum.js',            x: 660,  y: 338, color: '#82aaff', src: ms('archiwum.js'),            path: 'src/modules/archiwum.js' },
  { id: 'tooltips',   label: 'tooltips.js',            x: 844,  y: 338, color: '#82aaff', src: ms('tooltips.js'),            path: 'src/modules/tooltips.js' },
  { id: 'prefetch',   label: 'prefetch.js',            x:1028,  y: 338, color: '#82aaff', src: ms('prefetch.js'),            path: 'src/modules/prefetch.js' },
  { id: 'framework',  label: 'framework.js',           x: 384,  y: 498, color: '#c792ea', src: ms('framework.js'),           path: 'src/modules/framework.js' },
  { id: 'fwdetail',   label: 'fw-detail.js',           x: 718,  y: 498, color: '#c792ea', src: ms('fw-detail.js'),           path: 'src/modules/fw-detail.js' },
  { id: 'fwmodal',    label: 'fw-detail-modal.js',     x: 546,  y: 630, color: '#c792ea', src: ms('fw-detail-modal.js'),     path: 'src/modules/fw-detail-modal.js' },
  { id: 'fwrend',     label: 'fw-detail-renderers.js', x: 886,  y: 630, color: '#c792ea', src: ms('fw-detail-renderers.js'), path: 'src/modules/fw-detail-renderers.js' },
];

const EDGES = [
  { f:'main', t:'editor' },{ f:'main', t:'historia' },{ f:'main', t:'translator' },
  { f:'main', t:'vivisekcja' },{ f:'main', t:'deadcode' },{ f:'main', t:'badpat' },
  { f:'main', t:'progmode' },{ f:'main', t:'tabs' },{ f:'main', t:'archiwum' },
  { f:'main', t:'tooltips' },{ f:'main', t:'prefetch' },
  { f:'main', t:'framework' },{ f:'main', t:'fwdetail' },{ f:'main', t:'fwmodal' },
  { f:'editor', t:'state' },{ f:'historia', t:'state' },{ f:'translator', t:'state' },
  { f:'vivisekcja', t:'state' },{ f:'deadcode', t:'state' },{ f:'badpat', t:'state' },
  { f:'progmode', t:'state' },{ f:'tabs', t:'state' },{ f:'prefetch', t:'state' },
  { f:'fwdetail', t:'fwrend' },{ f:'fwdetail', t:'fwmodal' },{ f:'fwmodal', t:'fwrend' },
];

const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]));

// ── File browser data ─────────────────────────────────────────────────────────

function sortedFiles(glob, prefix, strip) {
  return Object.entries(glob)
    .map(([p, src]) => {
      const name = p.replace(strip, '');
      return { name, path: prefix + name, src };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

const FILE_SECTIONS = [
  {
    label: 'src/',
    files: [{ name: 'main.js', path: 'src/main.js', src: mainSrc }],
  },
  {
    label: 'src/modules/',
    files: sortedFiles(rawMods, 'src/modules/', '../modules/'),
  },
  {
    label: 'src/data/',
    files: sortedFiles(rawData, 'src/data/', '../data/'),
  },
];

// ── CSS ────────────────────────────────────────────────────────────────────────

const CSS = `
#dv-btn-noop{}

#dv-shell{
  position:fixed;inset:0;z-index:999999;
  background:#040408;font-family:'JetBrains Mono','Fira Code',monospace;
  display:none;
}
#dv-shell.dv-open{display:flex;}

/* Graph */
#dv-g{
  flex:0 0 57%;position:relative;overflow:hidden;
  background:#05050c;
  background-image:
    linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);
  background-size:30px 30px;
  border-right:1px solid rgba(255,255,255,.05);
}
#dv-svg{width:100%;height:100%;cursor:grab;display:block;}
#dv-svg:active{cursor:grabbing;}
#dv-legend{
  position:absolute;bottom:14px;left:14px;
  pointer-events:none;font-size:10px;color:#242440;line-height:1.9;
}
.dvl{display:flex;align-items:center;gap:7px;}
.dvld{width:6px;height:6px;border-radius:50%;}
.dvlhint{margin-top:5px;font-size:9px;color:#1a1a30;}

/* Sidebar */
#dv-side{flex:1;display:flex;flex-direction:column;overflow:hidden;background:#050510;}

#dv-bar{
  padding:10px 15px;border-bottom:1px solid rgba(255,255,255,.05);
  display:flex;align-items:center;gap:10px;flex-shrink:0;
  background:#070715;position:relative;overflow:hidden;
}
#dv-bar::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--dvg,linear-gradient(90deg,#61dafb,#4ecdc4));
}
#dv-fname{font-size:11px;color:var(--dvc,#61dafb);flex:1;letter-spacing:.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
#dv-lc{font-size:10px;color:#1c1c35;flex-shrink:0;}
#dv-x{background:none;border:1px solid rgba(255,255,255,.08);color:#404060;padding:3px 10px;border-radius:4px;cursor:pointer;font:10px/1 inherit;letter-spacing:.05em;transition:color .15s,border-color .15s;}
#dv-x:hover{color:#ccc;border-color:rgba(255,255,255,.22);}

/* Tabs */
#dv-tabs{display:flex;border-bottom:1px solid rgba(255,255,255,.05);flex-shrink:0;background:#070715;}
.dvt{flex:1;padding:7px;text-align:center;font-size:10px;letter-spacing:.09em;cursor:pointer;color:#1e1e3a;border:none;background:none;border-bottom:2px solid transparent;font-family:inherit;transition:color .15s,border-color .15s;}
.dvt:hover{color:#6060a0;}
.dvt.dv-on{color:#61dafb;border-bottom-color:#61dafb;}

#dv-body{flex:1;overflow:hidden;display:flex;flex-direction:column;}

/* Code */
#dv-code{flex:1;overflow:auto;padding:14px 18px;}
.dv-idle{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#161630;font-size:11px;line-height:3;text-align:center;}
.dv-idle-icon{font-size:30px;opacity:.12;margin-bottom:2px;}
pre.dvpre{margin:0;font-size:11.5px;line-height:1.72;tab-size:2;white-space:pre;color:#a8a8c8;}
.dvln{color:#1c1c32;padding-right:14px;user-select:none;display:inline-block;text-align:right;min-width:2.6em;border-right:1px solid rgba(255,255,255,.03);margin-right:12px;}
.dvk{color:#c792ea;}.dvc{color:#2e3f4a;font-style:italic;}.dvs{color:#7fbbaa;}.dvnum{color:#f78c6c;}

/* File browser */
#dv-files{flex:1;overflow-y:auto;padding:8px 0;}
.dvfs{margin-bottom:2px;}
.dvfs-label{padding:7px 14px 5px;font-size:10px;color:#303055;letter-spacing:.07em;border-bottom:1px solid rgba(255,255,255,.04);}
.dvfg{margin:2px 0;}
.dvfg-hdr{
  display:flex;align-items:center;gap:6px;
  padding:5px 14px 5px 20px;font-size:11px;color:#383858;
  cursor:pointer;transition:color .1s;user-select:none;
}
.dvfg-hdr:hover{color:#7070a0;}
.dvfg-hdr.dv-open{color:#6868a8;}
.dvfg-arrow{font-size:9px;transition:transform .15s;flex-shrink:0;}
.dvfg-hdr.dv-open .dvfg-arrow{transform:rotate(90deg);}
.dvfg-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}
.dvfg-count{margin-left:auto;color:#1e1e38;font-size:9px;}
.dvfg-body{display:none;}
.dvfg-body.dv-open{display:block;}
.dvfi{
  display:flex;align-items:center;gap:7px;
  padding:4px 14px 4px 36px;font-size:11px;color:#383860;
  cursor:pointer;transition:background .1s,color .1s;
  white-space:nowrap;overflow:hidden;
}
.dvfi:hover{background:rgba(255,255,255,.04);color:#c0c0e0;}
.dvfi.dv-on{color:#61dafb;background:rgba(97,218,251,.06);}
.dvfi-dot{width:4px;height:4px;border-radius:50%;flex-shrink:0;opacity:.45;}
.dvfi-lines{margin-left:auto;color:#1a1a30;font-size:9px;flex-shrink:0;padding-left:8px;}

/* State */
#dv-state{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;}
.dvsc{background:rgba(255,255,255,.018);border:1px solid rgba(255,255,255,.05);border-radius:7px;padding:10px 13px;transition:border-color .15s;}
.dvsc:hover{border-color:rgba(255,255,255,.1);}
.dvsk{font-size:10px;color:#61dafb;letter-spacing:.07em;margin-bottom:6px;}
.dvsv{font-size:11px;color:#6a9e6a;white-space:pre;line-height:1.6;}
.dvsv.empty{color:#181830;font-style:italic;}

/* Flow / Dependency */
#dv-dep{flex:1;overflow-y:auto;padding:14px 12px;display:flex;flex-direction:column;gap:16px;}
.dvds{display:flex;flex-direction:column;gap:2px;}
.dvds-lbl{
  font-size:10px;letter-spacing:.09em;color:#303055;
  padding:0 4px 6px;border-bottom:1px solid rgba(255,255,255,.05);margin-bottom:4px;
  display:flex;align-items:center;gap:8px;
}
.dvds-count{
  background:rgba(255,255,255,.06);border-radius:3px;
  padding:1px 6px;font-size:9px;color:#505080;
}
.dvdi{
  display:flex;align-items:center;gap:8px;
  padding:5px 8px;border-radius:5px;font-size:11px;color:#404065;
  cursor:pointer;transition:background .1s,color .1s;
}
.dvdi:hover{background:rgba(255,255,255,.05);color:#c0c0e8;}
.dvdi-arr{font-size:12px;flex-shrink:0;}
.dvdi.imp .dvdi-arr{color:#82aaff;}
.dvdi.iby .dvdi-arr{color:#f0c060;}
.dvdi-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;}
.dvdi-name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.dvdi-path{color:#252545;font-size:9px;white-space:nowrap;}
.dvdi-ext{color:#2a2a45;font-size:9px;font-style:italic;}
.dvd-none{color:#1e1e38;font-size:11px;font-style:italic;padding:4px 8px;}
.dvd-idle{
  height:100%;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  color:#161630;font-size:11px;line-height:3;text-align:center;
}
.dvd-idle-icon{font-size:28px;opacity:.1;margin-bottom:4px;}

/* Scrollbars */
#dv-shell ::-webkit-scrollbar{width:3px;height:3px;}
#dv-shell ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.07);border-radius:2px;}
#dv-shell ::-webkit-scrollbar-track{background:transparent;}
`;

// ── SVG ────────────────────────────────────────────────────────────────────────

function edgePath(fn, tn) {
  const f = nodeMap[fn], t = nodeMap[tn];
  if (!f || !t) return '';
  if (tn === 'state') {
    const sx = f.x, sy = f.y, tx = t.x + NW / 2 + 6, ty = t.y, mx = (sx + tx) / 2;
    return `M ${sx} ${sy} C ${mx} ${sy} ${mx} ${ty} ${tx} ${ty}`;
  }
  const sx = f.x, sy = f.y + NH / 2 + 2, tx = t.x, ty = t.y - NH / 2 - 2, my = (sy + ty) / 2;
  return `M ${sx} ${sy} C ${sx} ${my} ${tx} ${my} ${tx} ${ty}`;
}

function buildSVG(selId) {
  const connected = new Set(), selSet = new Set();
  if (selId) {
    EDGES.forEach(e => {
      if (e.f === selId || e.t === selId) {
        connected.add(e.f); connected.add(e.t); selSet.add(e.f + '>' + e.t);
      }
    });
  }
  const hasSel = !!selId;

  const edges = EDGES.map(e => {
    const isSel = selSet.has(e.f + '>' + e.t);
    const op  = hasSel ? (isSel ? 0.7 : 0.02) : 0.07;
    const col = isSel ? nodeMap[e.f].color : '#fff';
    const w   = isSel ? 1.5 : 0.8;
    return `<path d="${edgePath(e.f, e.t)}" stroke="${col}" stroke-opacity="${op}" stroke-width="${w}" fill="none" marker-end="url(#${isSel ? 'ms' : 'md'})"/>`;
  }).join('');

  const gnodes = NODES.map(n => {
    const sel = n.id === selId;
    const con = connected.has(n.id) && !sel;
    const rx = n.x - NW / 2, ry = n.y - NH / 2;
    const bg  = sel ? 0.18 : con ? 0.09 : hasSel ? 0.03 : 0.05;
    const str = sel ? 1    : con ? 0.55 : hasSel ? 0.18 : 0.3;
    const dot = sel ? 1    : con ? 0.7  : hasSel ? 0.2  : 0.45;
    const txt = sel ? '#fff' : con ? 'rgba(255,255,255,.9)' : hasSel ? 'rgba(255,255,255,.28)' : 'rgba(255,255,255,.65)';
    const fs  = n.label.length > 20 ? '9' : n.label.length > 15 ? '9.8' : '10.5';
    const glow = sel ? `<rect x="${rx-5}" y="${ry-5}" width="${NW+10}" height="${NH+10}" rx="11" fill="${n.color}" fill-opacity=".09" filter="url(#fg)"/>` : '';
    return `<g class="dvnd" data-id="${n.id}" style="cursor:pointer">
      ${glow}
      <rect x="${rx}" y="${ry}" width="${NW}" height="${NH}" rx="7" fill="${n.color}" fill-opacity="${bg}" stroke="${n.color}" stroke-opacity="${str}" stroke-width="${sel?1.5:1}"/>
      <rect x="${rx}" y="${ry+2}" width="3" height="${NH-4}" rx="1.5" fill="${n.color}" fill-opacity="${dot}"/>
      <circle cx="${rx+17}" cy="${n.y}" r="3" fill="${n.color}" fill-opacity="${dot}"/>
      <text x="${rx+28}" y="${n.y+0.5}" font-family="'JetBrains Mono','Fira Code',monospace" font-size="${fs}" dominant-baseline="middle" text-anchor="start" fill="${txt}" pointer-events="none">${n.label}</text>
    </g>`;
  }).join('');

  return `<defs>
    <marker id="md" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,1.5 L6.5,4 L0,6.5 Z" fill="rgba(255,255,255,.18)"/></marker>
    <marker id="ms" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,1.5 L6.5,4 L0,6.5 Z" fill="rgba(210,210,255,.8)"/></marker>
    <filter id="fg" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <g>${edges}</g><g>${gnodes}</g>`;
}

// ── Code rendering ─────────────────────────────────────────────────────────────

function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function hlLine(l) {
  return l
    .replace(/(\/\/.*$)/,           '<span class="dvc">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g,   '<span class="dvnum">$1</span>')
    .replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g, '<span class="dvs">$1</span>')
    .replace(/\b(import|export|from|default|const|let|var|function|return|if|else|for|while|do|switch|case|break|class|new|this|null|undefined|true|false|async|await|of|in|typeof|instanceof)\b/g,'<span class="dvk">$1</span>');
}

function renderCode(src) {
  return esc(src).split('\n').map((l, i) =>
    `<span class="dvln">${String(i+1).padStart(4,' ')}</span>${hlLine(l)}`
  ).join('\n');
}

// ── Import graph ──────────────────────────────────────────────────────────────

function resolvePath(dir, rel) {
  const raw = rel.replace(/\.js$/, '');
  const parts = (dir + '/' + raw).split('/');
  const out = [];
  for (const p of parts) {
    if (p === '..') out.pop();
    else if (p && p !== '.') out.push(p);
  }
  return out.join('/') + '.js';
}

let importMap = {};
let importedBy = {};

function buildImportMaps() {
  importMap = {};
  importedBy = {};
  const all = FILE_SECTIONS.flatMap(s => s.files);
  all.forEach(f => { importMap[f.path] = []; });
  all.forEach(f => {
    if (!f.src) return;
    const dir = f.path.substring(0, f.path.lastIndexOf('/'));
    const re = /from\s+['"](\.[^'"]+)['"]/g;
    let m;
    while ((m = re.exec(f.src)) !== null) {
      const resolved = resolvePath(dir, m[1]);
      if (!importMap[f.path].includes(resolved)) importMap[f.path].push(resolved);
      if (!importedBy[resolved]) importedBy[resolved] = [];
      if (!importedBy[resolved].includes(f.path)) importedBy[resolved].push(f.path);
    }
  });
}

function depTabHTML(activePath) {
  if (!activePath) {
    return `<div class="dvd-idle"><div class="dvd-idle-icon">↑</div>Wybierz plik w PLIKI lub kliknij węzeł na grafie<br>żeby zobaczyć jego zależności</div>`;
  }
  const allFiles = FILE_SECTIONS.flatMap(s => s.files);
  const known = new Set(allFiles.map(f => f.path));

  function depItem(path, direction) {
    const name = path.split('/').pop();
    const isKnown = known.has(path);
    const src = isKnown ? (allFiles.find(f => f.path === path)?.src || '') : '';
    const col = fileColor(name, path);
    const arrow = direction === 'imp' ? '→' : '←';
    const attr = isKnown ? `data-path="${path}" data-src="${encodeURIComponent(src)}"` : '';
    return `<div class="dvdi ${direction}" ${attr} title="${path}">
      <span class="dvdi-arr">${arrow}</span>
      <div class="dvdi-dot" style="background:${col}"></div>
      <span class="dvdi-name">${esc(name)}</span>
      <span class="${isKnown ? 'dvdi-path' : 'dvdi-ext'}">${isKnown ? esc(path.replace('src/', '')) : 'zewnętrzny'}</span>
    </div>`;
  }

  const imports   = (importMap[activePath]   || []);
  const importers = (importedBy[activePath]  || []);

  const importsHTML   = imports.length   ? imports.map(p => depItem(p, 'imp')).join('')   : '<div class="dvd-none">— brak importów</div>';
  const importersHTML = importers.length ? importers.map(p => depItem(p, 'iby')).join('') : '<div class="dvd-none">— nikt nie importuje</div>';

  return `<div id="dv-dep">
    <div class="dvds">
      <div class="dvds-lbl">IMPORTUJE <span class="dvds-count">${imports.length}</span></div>
      ${importsHTML}
    </div>
    <div class="dvds">
      <div class="dvds-lbl">IMPORTOWANY PRZEZ <span class="dvds-count">${importers.length}</span></div>
      ${importersHTML}
    </div>
  </div>`;
}

// ── State ─────────────────────────────────────────────────────────────────────

function stateHTML() {
  return [
    { k:'CODE_LINES',       v: CODE_LINES.length===0 ? 'empty' : `${CODE_LINES.length} lines\n${CODE_LINES.slice(0,3).map((l,i)=>`  ${i+1}: ${l.slice(0,55)}`).join('\n')}${CODE_LINES.length>3?'\n  …':''}` },
    { k:'historia',         v: historia.length===0 ? 'empty' : `${historia.length} entries` },
    { k:'translatorState',  v: `data: ${translatorState.data?'loaded':'null'}  ·  snapshot: ${translatorState.snapshot?'yes':'null'}\ncache keys: ${Object.keys(translatorState.cache).length}` },
    { k:'vivisekcjaState',  v: `cache: ${vivisekcjaState.cache?'yes':'null'}  ·  snapshot: ${vivisekcjaState.snapshot?'yes':'null'}` },
    { k:'deadCodeState',    v: `active: ${deadCodeState.active}  ·  cache: ${deadCodeState.cache?'yes':'null'}` },
    { k:'badPatternsState', v: `active: ${badPatternsState.active}  ·  cache: ${badPatternsState.cache?'yes':'null'}` },
  ].map(({k,v}) => `<div class="dvsc"><div class="dvsk">${k}</div><div class="dvsv${v==='empty'?' empty':''}">${esc(v)}</div></div>`).join('');
}

// ── File browser ──────────────────────────────────────────────────────────────

const TYPE_COLORS = {
  'main.js': '#f0c060',
  'state.js': '#61dafb',
  'dead-code.js': '#ff7070', 'bad-patterns.js': '#ff7070',
  'framework.js': '#c792ea', 'fw-detail.js': '#c792ea',
  'fw-detail-renderers.js': '#c792ea', 'fw-detail-modal.js': '#c792ea',
  _module: '#82aaff',
  _data: '#7ec8a0',
};

function fileColor(name, section) {
  return TYPE_COLORS[name] || (section.includes('data') ? TYPE_COLORS._data : TYPE_COLORS._module);
}

const FW_COLORS = {
  react:'#61dafb', fastapi:'#009688', pytest:'#0a9edc', requests:'#e74c3c',
  beautifulsoup:'#4caf50', asyncio:'#ff9800', git:'#f05032', docker:'#2496ed',
  pyautogui:'#9c27b0', mcp:'#ff5722',
};

function fileItem(f, indent, activePath) {
  const lines = f.src ? f.src.split('\n').length : 0;
  const col = fileColor(f.name, f.path);
  const active = f.path === activePath ? ' dv-on' : '';
  const pad = indent ? 'padding-left:' + indent + 'px' : '';
  return `<div class="dvfi${active}" data-path="${f.path}" data-src="${encodeURIComponent(f.src||'')}" title="${f.path}" style="${pad}">
    <div class="dvfi-dot" style="background:${col}"></div>
    ${esc(f.name)}
    <span class="dvfi-lines">${lines}</span>
  </div>`;
}

function groupDataFiles(files) {
  const groups = {}, misc = [];
  files.forEach(f => {
    const m = f.name.match(/^fw_([a-z0-9]+)/);
    if (m) { (groups[m[1]] = groups[m[1]] || []).push(f); }
    else misc.push(f);
  });
  return { groups, misc };
}

function fileBrowserHTML(activePath) {
  return FILE_SECTIONS.map(sec => {
    if (sec.label !== 'src/data/') {
      const items = sec.files.map(f => fileItem(f, null, activePath)).join('');
      return `<div class="dvfs"><div class="dvfs-label">${sec.label}</div>${items}</div>`;
    }

    // src/data/ — group fw_* by framework name
    const { groups, misc } = groupDataFiles(sec.files);

    const miscHTML = misc.map(f => fileItem(f, null, activePath)).join('');

    const groupsHTML = Object.entries(groups).map(([fw, files]) => {
      const col = FW_COLORS[fw] || '#7ec8a0';
      const hasActive = files.some(f => f.path === activePath);
      const openClass = hasActive ? ' dv-open' : '';
      const bodyClass = hasActive ? ' dv-open' : '';
      const filesHTML = files.map(f => fileItem(f, 44, activePath)).join('');
      return `<div class="dvfg">
        <div class="dvfg-hdr${openClass}" data-grp="${fw}">
          <span class="dvfg-arrow">▶</span>
          <div class="dvfg-dot" style="background:${col}"></div>
          ${fw}
          <span class="dvfg-count">${files.length}</span>
        </div>
        <div class="dvfg-body${bodyClass}">${filesHTML}</div>
      </div>`;
    }).join('');

    return `<div class="dvfs"><div class="dvfs-label">${sec.label}</div>${miscHTML}${groupsHTML}</div>`;
  }).join('');
}

// ── Panel state ────────────────────────────────────────────────────────────────

const VB = { x:0, y:0, w:1200, h:700 };
let panStart = null;
let selId = null;
let activeTab = 'graf';
let activePath = null;
let stateTimer = null;

// ── Init ──────────────────────────────────────────────────────────────────────

export function initDevPanel() {
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  const btn = document.getElementById('dv-btn');
  btn.style.display = '';

  const shell = document.createElement('div');
  shell.id = 'dv-shell';
  shell.innerHTML = `
    <div id="dv-g">
      <svg id="dv-svg"></svg>
      <div id="dv-legend">
        <div class="dvl"><div class="dvld" style="background:#f0c060"></div>entry</div>
        <div class="dvl"><div class="dvld" style="background:#61dafb"></div>state</div>
        <div class="dvl"><div class="dvld" style="background:#82aaff"></div>module</div>
        <div class="dvl"><div class="dvld" style="background:#c792ea"></div>framework UI</div>
        <div class="dvl"><div class="dvld" style="background:#ff7070"></div>analysis</div>
        <div class="dvlhint">scroll=zoom · drag=pan · klik=kod</div>
      </div>
    </div>
    <div id="dv-side">
      <div id="dv-bar">
        <span id="dv-fname">⚙ Checki Dev</span>
        <span id="dv-lc"></span>
        <button id="dv-x">✕</button>
      </div>
      <div id="dv-tabs">
        <button class="dvt dv-on" data-t="graf">GRAF</button>
        <button class="dvt" data-t="pliki">PLIKI</button>
        <button class="dvt" data-t="stan">STAN</button>
        <button class="dvt" data-t="przeplyw">PRZEPŁYW</button>
      </div>
      <div id="dv-body"></div>
    </div>`;
  document.body.appendChild(shell);

  const svg = document.getElementById('dv-svg');

  // ── Helpers ──

  function refreshSVG() {
    const { x, y, w, h } = VB;
    svg.setAttribute('viewBox', `${x} ${y} ${w} ${h}`);
    svg.innerHTML = buildSVG(selId);
    svg.querySelectorAll('.dvnd').forEach(g => {
      g.addEventListener('click', e => { e.stopPropagation(); openNode(g.dataset.id); });
    });
  }

  function setHeader(path, src, col) {
    activePath = path;
    document.getElementById('dv-fname').textContent = path;
    document.getElementById('dv-lc').textContent = src ? src.split('\n').length + ' lines' : '';
    document.getElementById('dv-bar').style.setProperty('--dvc', col || '#61dafb');
    document.getElementById('dv-bar').style.setProperty('--dvg', `linear-gradient(90deg,${col||'#61dafb'}55 0%,transparent 100%)`);
  }

  function showCode(src) {
    document.getElementById('dv-body').innerHTML = `<div id="dv-code"><pre class="dvpre">${renderCode(src)}</pre></div>`;
  }

  function openNode(id) {
    selId = id;
    const n = nodeMap[id];
    refreshSVG();
    setHeader(n.path, n.src, n.color);
    if (activeTab === 'przeplyw') { renderBody(); return; }
    if (activeTab !== 'graf') { activeTab = 'graf'; updateTabs(); }
    showCode(n.src);
  }

  function openFile(path, src, col) {
    setHeader(path, src, col);
    selId = NODES.find(n => n.path === path)?.id || null;
    refreshSVG();
    if (activeTab === 'przeplyw') { renderBody(); return; }
    activeTab = 'graf';
    updateTabs();
    showCode(src);
  }

  function updateTabs() {
    document.querySelectorAll('.dvt').forEach(t => t.classList.toggle('dv-on', t.dataset.t === activeTab));
  }

  function findSrc(path) {
    if (!path) return '';
    const node = NODES.find(n => n.path === path);
    if (node) return node.src || '';
    for (const sec of FILE_SECTIONS) {
      const f = sec.files.find(f => f.path === path);
      if (f) return f.src || '';
      for (const g of (sec.groups || [])) {
        const gf = g.files.find(f => f.path === path);
        if (gf) return gf.src || '';
      }
    }
    return '';
  }

  function renderBody() {
    const body = document.getElementById('dv-body');
    if (activeTab === 'graf') {
      if (!activePath) {
        body.innerHTML = `<div id="dv-code"><div class="dv-idle"><div class="dv-idle-icon">↑</div>Kliknij węzeł na grafie<br>lub przejdź do zakładki PLIKI</div></div>`;
      } else {
        showCode(findSrc(activePath));
      }
      return;
    }
    if (activeTab === 'pliki') {
      body.innerHTML = `<div id="dv-files">${fileBrowserHTML(activePath)}</div>`;
      document.getElementById('dv-files').addEventListener('click', e => {
        // toggle group
        const hdr = e.target.closest('.dvfg-hdr');
        if (hdr) {
          hdr.classList.toggle('dv-open');
          hdr.nextElementSibling.classList.toggle('dv-open');
          return;
        }
        // open file
        const el = e.target.closest('.dvfi');
        if (!el) return;
        const src = decodeURIComponent(el.dataset.src);
        const col = fileColor(el.dataset.path.split('/').pop(), el.dataset.path);
        openFile(el.dataset.path, src, col);
      });
      return;
    }
    if (activeTab === 'stan') {
      try {
        body.innerHTML = `<div id="dv-state">${stateHTML()}</div>`;
      } catch(e) {
        body.innerHTML = `<div id="dv-state"><div style="color:#ff7070;padding:16px;font-size:11px">Błąd stanu: ${esc(e.message)}</div></div>`;
      }
      return;
    }
    if (activeTab === 'przeplyw') {
      body.innerHTML = depTabHTML(activePath);
      body.querySelector('#dv-dep')?.addEventListener('click', e => {
        const el = e.target.closest('.dvdi[data-path]');
        if (!el) return;
        const src = decodeURIComponent(el.dataset.src);
        const col = fileColor(el.dataset.path.split('/').pop(), el.dataset.path);
        openFile(el.dataset.path, src, col);
      });
    }
  }

  // ── Pan / Zoom ──
  svg.addEventListener('mousedown', e => {
    if (e.target.closest('.dvnd')) return;
    panStart = { mx: e.clientX, my: e.clientY, vx: VB.x, vy: VB.y };
  });
  window.addEventListener('mousemove', e => {
    if (!panStart) return;
    const r = svg.getBoundingClientRect(), sc = VB.w / r.width;
    VB.x = panStart.vx - (e.clientX - panStart.mx) * sc;
    VB.y = panStart.vy - (e.clientY - panStart.my) * sc;
    refreshSVG();
  });
  window.addEventListener('mouseup', () => { panStart = null; });
  svg.addEventListener('wheel', e => {
    e.preventDefault();
    const r = svg.getBoundingClientRect();
    const cx = VB.x + ((e.clientX - r.left) / r.width) * VB.w;
    const cy = VB.y + ((e.clientY - r.top) / r.height) * VB.h;
    const f = e.deltaY > 0 ? 1.11 : 0.9;
    VB.w *= f; VB.h *= f;
    VB.x = cx - ((e.clientX - r.left) / r.width) * VB.w;
    VB.y = cy - ((e.clientY - r.top) / r.height) * VB.h;
    refreshSVG();
  }, { passive: false });

  // ── Tabs ──
  document.getElementById('dv-tabs').addEventListener('click', e => {
    const t = e.target.closest('.dvt');
    if (!t) return;
    activeTab = t.dataset.t;
    updateTabs();
    renderBody();
  });

  // ── Open / Close ──
  function open() {
    shell.classList.add('dv-open');
    VB.x=0; VB.y=0; VB.w=1200; VB.h=700;
    buildImportMaps();
    refreshSVG();
    renderBody();
    stateTimer = setInterval(() => { if (activeTab === 'stan') renderBody(); }, 700);
  }
  function close() {
    shell.classList.remove('dv-open');
    clearInterval(stateTimer); stateTimer = null;
  }

  btn.addEventListener('click', () => shell.classList.contains('dv-open') ? close() : open());
  document.getElementById('dv-x').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.altKey && e.key==='d') shell.classList.contains('dv-open') ? close() : open(); });

}
