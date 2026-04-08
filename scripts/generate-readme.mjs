#!/usr/bin/env node
// generate-readme.mjs — Regenerate the credentials table in README.md from manifest.json.
//
// The table lives between sentinel HTML comments:
//   <!-- credentials-table-start -->
//   ...
//   <!-- credentials-table-end -->
//
// Modes:
//   (default)  — rewrite README.md in place
//   --check    — exit non-zero if README is out-of-sync

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const MANIFEST_PATH = path.join(ROOT, "manifest.json");
const README_PATH = path.join(ROOT, "README.md");

const CHECK = process.argv.includes("--check");
const START = "<!-- credentials-table-start -->";
const END = "<!-- credentials-table-end -->";

function schemaCell(entry) {
  if (entry.source === "defined") {
    return `[${entry.schema.path}](${entry.schema.path})`;
  }
  return `[upstream](${entry.schema.url})`;
}

function contextCell(entry) {
  if (!entry.context) return "—";
  if (entry.source === "defined") {
    return `[${entry.context.path}](${entry.context.path})`;
  }
  return `[upstream](${entry.context.url})`;
}

function buildTable(manifest) {
  const sorted = [...manifest.credentials].sort((a, b) => {
    if (a.source !== b.source) return a.source === "defined" ? -1 : 1;
    return a.id.localeCompare(b.id);
  });

  const rows = [
    "| ID | Source | Owner | Schema | Context | License |",
    "|---|---|---|---|---|---|",
  ];
  for (const e of sorted) {
    rows.push(`| \`${e.id}\` | ${e.source} | ${e.owner} | ${schemaCell(e)} | ${contextCell(e)} | ${e.license} |`);
  }
  return rows.join("\n");
}

function main() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  const table = buildTable(manifest);
  const readme = fs.readFileSync(README_PATH, "utf8");

  const startIdx = readme.indexOf(START);
  const endIdx = readme.indexOf(END);
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    console.error(`README.md is missing the sentinel comments ${START} / ${END}`);
    process.exit(1);
  }

  const before = readme.slice(0, startIdx + START.length);
  const after = readme.slice(endIdx);
  const newReadme = `${before}\n${table}\n${after}`;

  if (CHECK) {
    if (newReadme !== readme) {
      console.error("README.md is out-of-sync with manifest.json. Run `node scripts/generate-readme.mjs` to fix.");
      process.exit(1);
    }
    console.log("README.md is in sync with manifest.json.");
    return;
  }

  fs.writeFileSync(README_PATH, newReadme);
  console.log(`Regenerated credentials table (${manifest.credentials.length} entries).`);
}

main();
