import fg from 'fast-glob';
import fs from 'node:fs';
import csstree from 'css-tree';

function uniq(arr) {
  return [...new Set(arr)];
}

function sortByCountDesc(map) {
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
}

const files = await fg(['**/*.css'], {
  dot: true,
  ignore: ['**/node_modules/**', '**/.git/**'],
});

const parseErrors = [];
const dupProps = [];
const selectorFiles = new Map(); // selector -> [files]

for (const file of files) {
  const css = fs.readFileSync(file, 'utf8');
  let ast;
  try {
    ast = csstree.parse(css, { filename: file, positions: true });
  } catch (e) {
    parseErrors.push({ file, message: String(e?.message || e) });
    continue;
  }

  csstree.walk(ast, {
    visit: 'Rule',
    enter(node) {
      if (node.type !== 'Rule' || !node.prelude) return;
      const selector = csstree.generate(node.prelude).trim();

      if (!selectorFiles.has(selector)) selectorFiles.set(selector, []);
      selectorFiles.get(selector).push(file);

      const seen = new Map(); // prop -> count
      if (node.block?.children) {
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

// Also group duplicate selectors by file-pair for easier fixing.
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
  .slice(0, 20)
  .map(([pair, sels]) => ({ pair, count: sels.length, selectorsSample: sels.slice(0, 20) }));

const result = {
  filesCount: files.length,
  parseErrorsCount: parseErrors.length,
  parseErrors: parseErrors.slice(0, 100),
  duplicatePropertiesInSameRuleCount: dupProps.length,
  duplicatePropertiesInSameRule: dupProps.slice(0, 200),
  duplicateSelectorsAcrossFilesCount: dupSelectors.length,
  duplicateSelectorsAcrossFiles: dupSelectors.slice(0, 200),
  topOverlapPairs: topPairs,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
