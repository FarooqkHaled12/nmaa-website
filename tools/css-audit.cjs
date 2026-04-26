const fs = require('node:fs');
const path = require('node:path');
const csstree = require('css-tree');

function walk(dir, out) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.name === 'node_modules' || ent.name === '.git') continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (ent.isFile() && full.toLowerCase().endsWith('.css')) out.push(full);
  }
}

function uniq(arr) {
  return [...new Set(arr)];
}

function sortByCountDesc(map) {
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
}

const root = process.cwd();
const filesAbs = [];
walk(root, filesAbs);
const files = filesAbs.map((p) => path.relative(root, p).replace(/\\/g, '/'));

const parseErrors = [];
const dupProps = [];
const selectorFiles = new Map(); // selector -> [files]

for (const file of files) {
  const css = fs.readFileSync(path.join(root, file), 'utf8');
  let ast;
  try {
    ast = csstree.parse(css, { filename: file, positions: true });
  } catch (e) {
    parseErrors.push({ file, message: String((e && e.message) || e) });
    continue;
  }

  csstree.walk(ast, {
    visit: 'Rule',
    enter(node) {
      if (node.type !== 'Rule' || !node.prelude) return;
      const selector = csstree.generate(node.prelude).trim();

      if (!selectorFiles.has(selector)) selectorFiles.set(selector, []);
      selectorFiles.get(selector).push(file);

      const seen = new Map();
      if (node.block && node.block.children) {
        node.block.children.forEach((decl) => {
          if (decl.type !== 'Declaration') return;
          const prop = decl.property;
          if (!prop) return;
          const nextCount = (seen.get(prop) || 0) + 1;
          seen.set(prop, nextCount);
          if (nextCount === 2) {
            dupProps.push({ file, selector, property: prop });
          }
        });
      }
    },
  });
}

const dupSelectors = [];
for (const [selector, fileList] of selectorFiles.entries()) {
  const uniqueFiles = uniq(fileList);
  if (uniqueFiles.length > 1) dupSelectors.push({ selector, files: uniqueFiles });
}
dupSelectors.sort((a, b) => b.files.length - a.files.length);

const overlapPairs = new Map(); // "fileA|fileB" -> [selectors]
for (const { selector, files: fsList } of dupSelectors) {
  for (let i = 0; i < fsList.length; i++) {
    for (let j = i + 1; j < fsList.length; j++) {
      const a = fsList[i];
      const b = fsList[j];
      const key = a < b ? `${a}|${b}` : `${b}|${a}`;
      if (!overlapPairs.has(key)) overlapPairs.set(key, []);
      overlapPairs.get(key).push(selector);
    }
  }
}

const topPairs = sortByCountDesc(overlapPairs)
  .slice(0, 30)
  .map(([pair, sels]) => ({ pair, count: sels.length, selectorsSample: sels.slice(0, 30) }));

const result = {
  filesCount: files.length,
  parseErrorsCount: parseErrors.length,
  parseErrors: parseErrors.slice(0, 200),
  duplicatePropertiesInSameRuleCount: dupProps.length,
  duplicatePropertiesInSameRule: dupProps.slice(0, 400),
  duplicateSelectorsAcrossFilesCount: dupSelectors.length,
  duplicateSelectorsAcrossFiles: dupSelectors.slice(0, 300),
  topOverlapPairs: topPairs,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);

