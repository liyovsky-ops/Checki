// Script to split each fw_X.js into 4 files with separated responsibilities
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'demo_assets/data');

const FW_SPLITS = {
  fw_react:         { var: 'FW_REACT_DATA',     routing: 332, rywale: 538, komendy: 778  },
  fw_requests:      { var: 'FW_REQUESTS_DATA',  routing: 379, rywale: 710, komendy: 902  },
  fw_pytest:        { var: 'FW_PYTEST_DATA',     routing: 343, rywale: 639, komendy: 826  },
  fw_fastapi:       { var: 'FW_FASTAPI_DATA',    routing: 325, rywale: 574, komendy: 769  },
  fw_mcp:           { var: 'FW_MCP_DATA',        routing: 322, rywale: 487, komendy: 644  },
  fw_asyncio:       { var: 'FW_ASYNCIO_DATA',    routing: 302, rywale: 534, komendy: 728  },
  fw_docker:        { var: 'FW_DOCKER_DATA',     routing: 318, rywale: 520, komendy: 642  },
  fw_git:           { var: 'FW_GIT_DATA',        routing: 263, rywale: 472, komendy: 619  },
  fw_beautifulsoup: { var: 'FW_BS4_DATA',        routing: 256, rywale: 463, komendy: 641  },
  fw_pyautogui:     { var: 'FW_PYAUTOGUI_DATA',  routing: 239, rywale: 405, komendy: 588  },
};

// Extract value after the colon on a key line, including all nested content
// Returns the value as a string (without trailing comma)
function extractValue(lines, startLine1Based) {
  const i0 = startLine1Based - 1;
  const firstLine = lines[i0];
  const colonPos = firstLine.indexOf(':');

  let result = [];
  let depth = 0;
  let started = false;

  for (let i = i0; i < lines.length; i++) {
    const raw = (i === i0) ? firstLine.slice(colonPos + 1) : lines[i];
    result.push(raw);

    for (let j = 0; j < raw.length; j++) {
      const ch = raw[j];
      if (ch === '"' || ch === "'" || ch === '`') {
        const q = ch;
        j++;
        while (j < raw.length && raw[j] !== q) {
          if (raw[j] === '\\') j++;
          j++;
        }
        continue;
      }
      if (ch === '{' || ch === '[') { depth++; started = true; }
      if (ch === '}' || ch === ']') depth--;
    }
    if (started && depth <= 0) {
      result[result.length - 1] = result[result.length - 1].replace(/,\s*$/, '');
      break;
    }
  }
  return result.join('\n');
}

// Find the 1-based line number of the next key at the same indent level
function findNextKey(lines, afterLine1Based, key) {
  for (let i = afterLine1Based - 1; i < lines.length; i++) {
    if (lines[i].match(new RegExp(`^\\s+${key}:\\s*[\\[\\{]`))) {
      return i + 1;
    }
  }
  return -1;
}

for (const [name, info] of Object.entries(FW_SPLITS)) {
  const filePath = path.join(DATA_DIR, name + '.js');
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  const routingLine  = info.routing;
  const rywaleLine   = info.rywale;
  const komendyLine  = info.komendy;
  const stateLine    = findNextKey(lines, routingLine + 1, 'state');
  const pluginyLine  = findNextKey(lines, rywaleLine  + 1, 'pluginy');

  const varName = info.var;

  // Extract values for each section
  const routingVal = extractValue(lines, routingLine).trimStart();
  const stateVal   = extractValue(lines, stateLine).trimStart();
  const rywaleVal  = extractValue(lines, rywaleLine).trimStart();
  const pluginyVal = extractValue(lines, pluginyLine).trimStart();
  const komendyVal = extractValue(lines, komendyLine).trimStart();

  // ── FILE A: fw_X.js ──
  // Lines 1..(routingLine-1) + placeholder closing
  const partAlines = lines.slice(0, routingLine - 1);
  // Remove trailing comma from last real content line and close the object
  let lastIdx = partAlines.length - 1;
  while (lastIdx > 0 && partAlines[lastIdx].trim() === '') lastIdx--;
  partAlines[lastIdx] = partAlines[lastIdx].replace(/,\s*$/, '');

  const fileA = partAlines.join('\n') + '\n  }\n};\n';

  // ── FILE B: fw_X_advanced.js ──
  const fileB = [
    `// Advanced patterns: routing + state`,
    `${varName}.content.routing  = ${routingVal};`,
    `${varName}.content.state    = ${stateVal};`,
    '',
  ].join('\n');

  // ── FILE C: fw_X_ref.js ──
  const fileC = [
    `// Ecosystem: rywale + pluginy`,
    `${varName}.content.rywale  = ${rywaleVal};`,
    `${varName}.content.pluginy = ${pluginyVal};`,
    '',
  ].join('\n');

  // ── FILE D: fw_X_komendy.js ──
  const fileD = [
    `// Command reference`,
    `${varName}.content.komendy = ${komendyVal};`,
    '',
  ].join('\n');

  fs.writeFileSync(path.join(DATA_DIR, name + '.js'),          fileA);
  fs.writeFileSync(path.join(DATA_DIR, name + '_advanced.js'), fileB);
  fs.writeFileSync(path.join(DATA_DIR, name + '_ref.js'),      fileC);
  fs.writeFileSync(path.join(DATA_DIR, name + '_komendy.js'),  fileD);

  const aLines = fileA.split('\n').length;
  const bLines = fileB.split('\n').length;
  const cLines = fileC.split('\n').length;
  const dLines = fileD.split('\n').length;
  console.log(`${name}: A=${aLines} B=${bLines} C=${cLines} D=${dLines}`);
}

console.log('\nDone!');
