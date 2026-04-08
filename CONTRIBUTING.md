# Contributing

Thanks for helping improve OpenCred's credential schemas. Schemas published here are bundled into OpenCred Desktop and the OpenCred Docker image, so the bar for changes is high.

## Adding a new credential

Every credential is either **defined** (authored here) or **referenced** (authoritative source lives upstream).

### Defined credentials

1. Create the directory: `schemas/<name>/v1/`
2. Add the four files:
   - `schema.json` — JSON Schema using the W3C VC 2.0 envelope pattern (see `schemas/electricity/v1/schema.json` as the reference shape). `$id` must match the raw GitHub URL. Prefer `$defs` for reusable sub-objects. Use `https://json-schema.org/draft/2020-12/schema`.
   - `context.jsonld` — JSON-LD context mapping `credentialSubject` fields to domain URIs.
   - `example.json` — a worked, unsigned example credential that validates against `schema.json`.
   - `README.md` — description, anchor standard, schema URL, example pointer, license.
3. Add a manifest entry (see below).

### Referenced credentials

1. Create the directory: `schemas/<name>/v1/` (or `schemas/<namespace>/<name>/v1/` for scoped upstream families like `traceability/`).
2. Add only two files:
   - `README.md` — name, upstream standard owner, upstream schema URL, upstream context URL, description, when to use, license, upstream documentation link.
   - `example.json` — a worked, unsigned example credential for our own testing.
3. Add a manifest entry with `source: "referenced"` and the upstream URL.

**Never** add a `schema.json`, `context.jsonld`, or `pointer.json` to a referenced credential folder — the schema lives upstream, not here.

## Manifest workflow

`manifest.json` at the repo root is the **single source of truth** for every credential. Every addition or change must flow through it.

1. Add an entry with `sha256: "TODO"` placeholders:

   ```json
   {
     "id": "immunization/v1",
     "source": "defined",
     "owner": "OpenCred",
     "license": "MIT",
     "schema": { "path": "schemas/immunization/v1/schema.json", "sha256": "TODO" },
     "context": { "path": "schemas/immunization/v1/context.jsonld", "sha256": "TODO" },
     "example": "schemas/immunization/v1/example.json"
   }
   ```

2. Run the pinner to fill in SHA-256 hashes:

   ```bash
   node scripts/pin-hashes.mjs
   ```

   - For `defined` entries, the pinner reads the local files and computes a canonical-JSON SHA-256.
   - For `referenced` entries, the pinner fetches the upstream URL (HTTPS, no redirects, 30 s timeout) and hashes the response.

3. Regenerate the README credentials table:

   ```bash
   node scripts/generate-readme.mjs
   ```

4. In CI, both scripts run in `--check` mode:

   ```bash
   node scripts/pin-hashes.mjs --check
   node scripts/generate-readme.mjs --check
   ```

   `--check` exits non-zero if any hash is stale or the README is out-of-sync.

5. Open a PR. The PR description should explain the use case for the new credential and note whether it's defined or referenced.

## Revising an existing schema

Schemas published here are **immutable** once referenced in the wild.

| Change | Action |
|---|---|
| README / description typo | Edit in place — does not change validation behavior |
| Tightening validation | **Breaking** — publish as `v<n+1>` |
| Loosening validation (new optional field, wider constraint) | **Non-breaking** — publish as `v<n+1>`, do not mutate `v<n>` |
| Renaming or removing a field | **Breaking** — publish as `v<n+1>` |

In every case, create a new version directory and leave the previous one untouched.

## PR checklist

- [ ] Schema validates against its declared `$schema` meta-schema
- [ ] `example.json` validates against `schema.json` (for defined credentials)
- [ ] `$id` matches the file's raw URL exactly
- [ ] `manifest.json` has an entry for the new credential
- [ ] `node scripts/pin-hashes.mjs` has been run and hashes are committed
- [ ] `node scripts/generate-readme.mjs` has been run and README is committed
- [ ] PR description explains the use case

## Where these schemas are used

- **OpenCred Desktop & Docker** — `credentialSchema` references in issued credentials
- **Verifiers** — schema validation during VC verification
- **Issuers using OpenCred templates** — built-in forms map to these schemas
