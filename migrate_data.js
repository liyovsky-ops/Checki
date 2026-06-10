#!/usr/bin/env node
// Converts demo_assets/data/fw_*.js → src/data/fw_*.js (ES modules)
const fs = require('fs');
const path = require('path');

const SRC  = path.join(__dirname, 'demo_assets/data');
const DEST = path.join(__dirname, 'src/data');

const FWS = ['react','fastapi','pytest','requests','beautifulsoup','asyncio','git','docker','pyautogui','mcp'];

// _advanced.js / _ref.js: "VAR.content.KEY = VALUE;\nVAR.content.KEY2 = VALUE2;"
// → "export default { KEY: VALUE, KEY2: VALUE2 };"
function convertSplitObject(code) {
  // Remove leading comment line
  const lines = code.split('\n');
  const start = lines.findIndex(l => /^[A-Z0-9_]+\.content\.[a-z]/.test(l));
  const comment = lines.slice(0, start).join('\n').trim();
  let body = lines.slice(start).join('\n');

  // Replace `VARNAME.content.KEY  =` → `  KEY:`
  body = body.replace(/^[A-Z0-9_]+_DATA\.content\.([a-z]+)\s*=/gm, '  $1:');

  // After each top-level value block (};  or ];  not inside deeper nesting)
  // we need comma instead of semicolon when followed by another key
  // Strategy: replace `};\n  ` with `},\n  ` and `];\n  ` with `],\n  `
  body = body.replace(/([\}\]])\s*;\s*\n(\s{2}[a-z])/g, '$1,\n$2');

  // Remove trailing semicolon from last entry
  body = body.replace(/([\}\]])\s*;\s*$/, '$1');

  const header = comment ? comment + '\n' : '';
  return header + 'export default {\n' + body.trim() + '\n};\n';
}

// _komendy.js: "VAR.content.komendy = [...];"
// → "export default [...];"
function convertKomendy(code) {
  const lines = code.split('\n');
  const start = lines.findIndex(l => /^[A-Z0-9_]+\.content\.komendy/.test(l));
  const comment = lines.slice(0, start).join('\n').trim();

  let body = lines.slice(start).join('\n');
  // Remove `VAR.content.komendy = `
  body = body.replace(/^[A-Z0-9_]+_DATA\.content\.komendy\s*=\s*/, '');
  // Remove trailing semicolon
  body = body.replace(/;\s*$/, '');

  const header = comment ? comment + '\n' : '';
  return header + 'export default ' + body.trim() + ';\n';
}

// fw_X.js: add imports, change const→export const, spread into content
function convertMain(code, fw) {
  const imports = [
    `import _advanced from './fw_${fw}_advanced.js';`,
    `import _ref      from './fw_${fw}_ref.js';`,
    `import _komendy  from './fw_${fw}_komendy.js';`,
    '',
  ].join('\n');

  // export const
  code = code.replace(/^const (FW_[A-Z0-9_]+_DATA\s*=)/, 'export const $1');

  // Inject spread before last `  }` that closes `content: {`
  // File ends with `  }\n};` — inject before it
  code = code.replace(/(\n  }\n\};)\s*$/, ',\n    ..._advanced,\n    ..._ref,\n    komendy: _komendy,\n  }\n};\n');

  return imports + code;
}

// Also copy non-fw data files
['frameworks.js','biblioteki.js','slownik.js'].forEach(f => {
  const src = path.join(SRC, f);
  const dst = path.join(DEST, f);
  if (!fs.existsSync(src)) return;
  let code = fs.readFileSync(src, 'utf8');
  // Expose as export if not already
  if (!code.includes('export')) {
    code = code.replace(/^(const|var|let) ([A-Z_]+\s*=)/, 'export $1 $2');
    code = code.replace(/^(const|var|let) ([A-Z_]+\s*=)/, 'export $1 $2');
  }
  fs.writeFileSync(dst, code);
  console.log('copied:', f);
});

FWS.forEach(fw => {
  console.log('converting:', fw);

  const read = name => fs.readFileSync(path.join(SRC, name), 'utf8');
  const write = (name, data) => fs.writeFileSync(path.join(DEST, name), data);

  // Check which split file types exist
  const advFile = `fw_${fw}_advanced.js`;
  const refFile = `fw_${fw}_ref.js`;
  const cmdFile = `fw_${fw}_komendy.js`;

  if (fs.existsSync(path.join(SRC, advFile))) {
    const code = read(advFile);
    // Check if it contains an array (rywale/komendy style) or object
    write(advFile, convertSplitObject(code));
    console.log('  ✓', advFile);
  }
  if (fs.existsSync(path.join(SRC, refFile))) {
    write(refFile, convertSplitObject(read(refFile)));
    console.log('  ✓', refFile);
  }
  if (fs.existsSync(path.join(SRC, cmdFile))) {
    write(cmdFile, convertKomendy(read(cmdFile)));
    console.log('  ✓', cmdFile);
  }

  const mainFile = `fw_${fw}.js`;
  if (fs.existsSync(path.join(SRC, mainFile))) {
    write(mainFile, convertMain(read(mainFile), fw));
    console.log('  ✓', mainFile);
  }
});

console.log('\nDone. Check src/data/ for output.');
