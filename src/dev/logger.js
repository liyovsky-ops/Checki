export const devLog = [];
const MAX = 300;
const subs = new Set();

export function log(mod, fn, args = []) {
  devLog.unshift({ t: Date.now(), mod, fn, args: args.map(previewVal) });
  if (devLog.length > MAX) devLog.length = MAX;
  subs.forEach(f => f());
}

export function subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }
export function clearLog() { devLog.length = 0; subs.forEach(f => f()); }

export function wrap(mod, fn, func) {
  return function(...args) { log(mod, fn, args); return func.apply(this, args); };
}

function previewVal(v) {
  if (v == null) return String(v);
  if (typeof v === 'string') return v.length > 25 ? `"${v.slice(0, 25)}…"` : `"${v}"`;
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (Array.isArray(v)) return `Array(${v.length})`;
  if (typeof v === 'object') { const k = Object.keys(v); return `{${k.slice(0,3).join(', ')}${k.length>3?'…':''}}`; }
  return typeof v;
}
