# Contributing

Thanks for helping improve OpenCred's credential schemas. Schemas published here are bundled into OpenCred Desktop and the OpenCred Docker image, so the bar for changes is high.

> **TL;DR — three paths**
>
> | Your situation | Use |
> |---|---|
> | One of the [bundled schemas](README.md#credentials) fits, or is *almost* right with minor extensions | The bundled schema (extend with a sub-type if needed) |
> | You need a credential **shape that recurs across many issuers** and no bundled schema covers it | **Propose a new global schema** — open an issue here, then a PR (see below) |
> | You need a one-off shape that's specific to **your** company/agency/use-case | **Inline schema** via `inlineSchema` on `POST /v1/credentials/issue` — no PR needed |

If you're in the first row, just use the bundled schema and stop reading. If you're in the third, see the [Inline schemas](#using-an-inline-or-self-hosted-schema-instead) section at the bottom — that's the supported path for use-case-specific schemas. The rest of this guide is for the second row.

## Proposing a new global schema (Track A — issue first)

For anything bigger than a typo fix, **open an issue before a PR**. Two reasons: a 5-minute exchange in the issue thread often surfaces an existing schema that already covers the use case, and reviewing a schema's *design* is harder once it's already been encoded into files. We'd rather discuss the field set before you do the implementation work.

### When a new global schema is the right answer

Propose a new global schema when **all** of the following are true:

- The credential type recurs across multiple issuers — it's not company-internal.
- No existing schema in this repo (defined **or** referenced) covers the shape — check the [credentials table](README.md#credentials) first, including the W3C CCG traceability and DIF Basic-Person upstream-referenced families.
- You can point at **anchor standards** the schema should align with (Schema.org, W3C CCG vocab, IATA, ISO, Open Badges, DIF, GS1, etc.). If you can't, the proposal probably needs a working group before it needs a schema.
- You're a **regulator, industry body, or issuer-of-record** for this credential type — proposals from individuals who can't shepherd the schema to adoption tend to bit-rot.

### Where to file

[**Open an issue in this repository.**](https://github.com/nfh-trust-labs/opencred-vc-schemas/issues/new) Use the title format `proposal: <category>/<schema-id>/v1` — e.g. `proposal: aviation/maintenance-inspection/v1`.

### What the proposal issue must include

1. **Use case** — one paragraph on who issues this credential, who consumes it, and what trust decision it backs. If it's a regulated credential, name the regulator.
2. **Existing standards check** — what you found when searching the bundled schemas, schema.org, W3C CCG vocab, IATA, ISO, OpenBadges, DIF, etc. If nothing covers it, say so explicitly. If something covers it *partially*, explain the gap.
3. **Draft `credentialSubject` shape** — paste the JSON Schema for the subject fields only (not the full VC envelope; the envelope is W3C-standard and shared). Use `https://json-schema.org/draft/2020-12/schema` and prefer `$defs` for reusable sub-objects.
4. **Sample populated subject** — a realistic example with all required fields and a representative selection of optional fields.
5. **JSON-LD context** — if you're claiming new terms, paste the `@context` mapping. If the credential can be expressed entirely with `schema.org` types, say so — that's the preferred outcome.
6. **Versioning intent** — `/v1` for the first draft. State whether you intend `/v1` to be stable from the start, or whether you anticipate breaking changes in `/v2` after deployment feedback. (Anything that ships into a credential in the wild is then frozen — see [Revising an existing schema](#revising-an-existing-schema).)
7. **Defined or referenced?** — see [Defined credentials](#defined-credentials) vs [Referenced credentials](#referenced-credentials) below. If you're proposing to reference an upstream standard, link to the upstream raw schema URL.

### What happens next

A maintainer will respond with one of:

- ✅ **Adopt as-is** — proceed to Track B (implementation PR).
- 🔄 **Request changes** — specific field-level feedback, usually field renames or tightenings. Update the issue body in place; respond when ready.
- ❌ **Rejected with reason** — e.g. "covered by `business-entity/v1`, extend that instead", or "too narrow for a global schema — use an inline schema". Reasons are always concrete.
- 🤝 **Working-group needed** — the proposal touches enough adjacent credentials (e.g. a whole maritime-trade family) that a one-issue review isn't enough. We'll convene the right stakeholders and pick this back up.

Response time: typically within five working days. If you don't hear back in two weeks, ping the issue.

## Implementing the proposal (Track B — PR)

Once the proposal issue is ✅, open a PR. **The PR description must link the proposal issue.** Everything below is about how to author the files — the original guide is preserved here intact.

### Adding a new credential

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

## After your PR merges

Your schema gets a stable ID `<category>/<schema-id>/v1` and is hash-pinned in `manifest.json` here. It then ships in the **next OpenCred release** via the bundled `@opencred/schema-engine` registry — issuers reference it by ID through `POST /v1/credentials/issue`'s `schemaId` field, no inline schema needed. The schema's raw GitHub URL is what gets stamped into the issued credential's `credentialSchema.id`; verifiers don't fetch this URL (they hash-match against their bundled registry), so the URL is human-navigation only.

## Using an inline or self-hosted schema instead

If a global schema is the wrong fit — your credential is company-specific, you're in a sector OpenCred doesn't cover yet, or you don't want to wait for a proposal review — you have two supported alternatives that don't go through this repo:

### Inline schemas (no PR required)

Pass `inlineSchema` to `POST /v1/credentials/issue`. The full JSON Schema is validated server-side at issue time, hashed, and embedded into the issued credential's `credentialSchema` as a data URI. Verifiers see a self-contained credential — nothing to fetch.

Use this when:
- The schema is genuinely internal — you're the only issuer and you're the only verifier.
- You want to iterate fast — you can change the schema between issuances without coordinating with anyone.

### Self-hosted schemas

Host the JSON Schema on your own domain (or any HTTPS endpoint that returns a stable response), and reference it as `credentialSchema.id` in your issued credentials. OpenCred's verifier doesn't fetch this URL by default — it hash-matches against bundled and inline schemas first. Verifiers that *do* trust your domain (sector-specific or jurisdictional regulators, for example) validate against the fetched schema.

Use this when:
- You're a regulator or industry body publishing a schema your sector adopts, but the schema isn't relevant outside that sector and shouldn't be in OpenCred's global bundle.
- You need the schema to be reachable by tooling other than OpenCred.

Either path lets you issue and verify credentials with your own schema today, without waiting for a global-schema proposal to land. You can always migrate **into** the global registry later: open a proposal here, copy your schema in, and reissue against the global ID.
