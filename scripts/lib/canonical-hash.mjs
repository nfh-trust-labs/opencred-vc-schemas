// Canonical JSON SHA-256 — must match @opencred/shared/src/hash.ts bit-identically.
// Algorithm:
//   - Recursive sorted-key JSON serialization
//   - Object keys sorted lexicographically (JS default string sort)
//   - Arrays preserve order
//   - `undefined` properties dropped
//   - `null` serialized as "null"
//   - -0 canonicalized as "0"
//   - NaN / Infinity throw
//   - Functions / symbols / BigInt throw
//   - SHA-256 of UTF-8 bytes, lowercase hex

import { createHash } from "node:crypto";

export function canonicalize(value) {
  if (value === null) return "null";
  const t = typeof value;
  if (t === "string") return JSON.stringify(value);
  if (t === "number") {
    if (!Number.isFinite(value)) {
      throw new TypeError("Cannot canonicalize non-finite number");
    }
    if (Object.is(value, -0)) return "0";
    return JSON.stringify(value);
  }
  if (t === "boolean") return value ? "true" : "false";
  if (t === "bigint") throw new TypeError("Cannot canonicalize BigInt");
  if (t === "function") throw new TypeError("Cannot canonicalize function");
  if (t === "symbol") throw new TypeError("Cannot canonicalize symbol");
  if (t === "undefined") throw new TypeError("Cannot canonicalize undefined at root");
  if (Array.isArray(value)) {
    const parts = value.map((v) => (v === undefined ? "null" : canonicalize(v)));
    return "[" + parts.join(",") + "]";
  }
  if (t === "object") {
    const keys = Object.keys(value).sort();
    const parts = [];
    for (const k of keys) {
      const v = value[k];
      if (v === undefined) continue;
      parts.push(JSON.stringify(k) + ":" + canonicalize(v));
    }
    return "{" + parts.join(",") + "}";
  }
  throw new TypeError("Unsupported type: " + t);
}

export function canonicalJsonSha256(obj) {
  const canonical = canonicalize(obj);
  return createHash("sha256").update(canonical, "utf8").digest("hex");
}

export function bytesSha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}
