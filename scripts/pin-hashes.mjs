#!/usr/bin/env node
// pin-hashes.mjs — Compute and pin SHA-256 hashes in manifest.json.
//
// Modes:
//   (default)  — fetch/read all entries and update manifest.json in place
//   --check    — verify existing hashes without modifying the manifest; exit non-zero on mismatch
//
// Hashing rules:
//   - JSON schemas (defined or referenced): parsed as JSON, then canonicalJsonSha256
//   - JSON-LD contexts for DEFINED credentials: parsed as JSON, canonicalJsonSha256
//   - JSON-LD contexts for REFERENCED credentials: hashed as literal UTF-8 bytes
//     (JSON-LD key order can be semantically meaningful, so we preserve original bytes)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { canonicalJsonSha256, bytesSha256 } from "./lib/canonical-hash.mjs";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const MANIFEST_PATH = path.join(ROOT, "manifest.json");

const CHECK = process.argv.includes("--check");
const FETCH_TIMEOUT_MS = 30_000;

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: "error",
      signal: controller.signal,
      headers: { "user-agent": "opencred-vc-schemas-pin-hashes/1.0" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  } finally {
    clearTimeout(timer);
  }
}

async function hashSchema(entry) {
  const format = entry.schema.format || "json";
  if (entry.schema.path) {
    const buf = fs.readFileSync(path.join(ROOT, entry.schema.path));
    if (format === "yaml") return bytesSha256(buf);
    return canonicalJsonSha256(JSON.parse(buf.toString("utf8")));
  }
  const buf = await fetchWithTimeout(entry.schema.url);
  if (format === "yaml") return bytesSha256(buf);
  return canonicalJsonSha256(JSON.parse(buf.toString("utf8")));
}

async function hashContext(entry) {
  if (!entry.context) return null;
  if (entry.context.path) {
    const buf = fs.readFileSync(path.join(ROOT, entry.context.path));
    return canonicalJsonSha256(JSON.parse(buf.toString("utf8")));
  }
  // Referenced: literal bytes
  const buf = await fetchWithTimeout(entry.context.url);
  return bytesSha256(buf);
}

async function main() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  let definedCount = 0;
  let referencedCount = 0;
  const failures = [];
  const mismatches = [];

  for (const entry of manifest.credentials) {
    if (entry.source === "defined") definedCount++;
    else referencedCount++;

    try {
      const newSchemaHash = await hashSchema(entry);
      if (CHECK) {
        if (entry.schema.sha256 !== newSchemaHash) {
          mismatches.push(`${entry.id} schema: expected ${entry.schema.sha256}, got ${newSchemaHash}`);
        }
      } else {
        entry.schema.sha256 = newSchemaHash;
      }

      if (entry.context) {
        const newContextHash = await hashContext(entry);
        if (CHECK) {
          if (entry.context.sha256 !== newContextHash) {
            mismatches.push(`${entry.id} context: expected ${entry.context.sha256}, got ${newContextHash}`);
          }
        } else {
          entry.context.sha256 = newContextHash;
        }
      }

      console.log(`  ok   ${entry.id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      failures.push(`${entry.id}: ${msg}`);
      console.log(`  FAIL ${entry.id}: ${msg}`);
      if (!CHECK) {
        entry.schema.sha256 = "FETCH_FAILED";
        if (entry.context) entry.context.sha256 = "FETCH_FAILED";
      }
    }
  }

  if (!CHECK) {
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  }

  console.log("");
  console.log(`Summary: ${definedCount} defined, ${referencedCount} referenced`);
  if (failures.length) {
    console.log(`${failures.length} fetch failure(s):`);
    for (const f of failures) console.log(`  - ${f}`);
  }
  if (mismatches.length) {
    console.log(`${mismatches.length} hash mismatch(es):`);
    for (const m of mismatches) console.log(`  - ${m}`);
    process.exit(1);
  }
  if (CHECK && failures.length) process.exit(1);
  if (!CHECK && failures.length) {
    // Fetch failures are reported; don't hard-fail in write mode so caller can review and prune.
    console.log("(Write mode — failures marked as FETCH_FAILED in the manifest; review and prune before release.)");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
