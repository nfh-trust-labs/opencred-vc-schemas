# Contributing

Thanks for helping improve OpenCred's credential schemas. This repo is small and conservative on purpose: schemas published here are referenced by credentials in the wild, so the bar for changes is high.

## Adding a new schema

1. **Pick a name.** Lowercase, hyphenated (`salary-slip`, not `SalarySlip`). Singular noun. Match the credential's primary subject.
2. **Create the directory:** `schemas/<name>/v1/`.
3. **Write the JSON Schema** at `schemas/<name>/v1/schema.json`:
   - Use JSON Schema draft-07 or draft 2020-12 (be consistent within a schema).
   - Set `$id` to the raw URL: `https://raw.githubusercontent.com/nfh-trust-labs/opencred-vc-schemas/main/schemas/<name>/v1/schema.json`.
   - Include `title` and `description`.
   - Mark required fields explicitly under `required`.
   - Document each property with `description`.
   - Default `additionalProperties` to `true` unless you have a reason to lock it down.
4. **Write a README** at `schemas/<name>/v1/README.md` that includes:
   - The schema URL
   - A required-fields table and an optional-fields table
   - At least one realistic example
5. **Optional**: add a `context.jsonld` if the credential needs JSON-LD term mappings, and an `example.json` with a full example credential.

## Revising an existing schema

Schemas published here are **immutable**. Once a `v<n>/schema.json` URL is referenced by a credential in the wild, the file at that URL must keep working forever.

| Change | Action |
|---|---|
| Typo in `description`, README clarification, comment | Edit in place — does not change validation behavior |
| Tightening validation (new required field, narrower constraint) | **Breaking** — publish as `v<n+1>` |
| Loosening validation (new optional field, wider constraint) | **Non-breaking** — still publish as `v<n+1>`, do **not** mutate `v<n>` |
| Renaming or removing a field | **Breaking** — publish as `v<n+1>` |

In all cases of structural change, create a new version directory and leave the previous one untouched.

## Pull request checklist

- [ ] Schema validates against its declared `$schema` meta-schema
- [ ] Example in the README validates against the schema
- [ ] `$id` matches the file's raw URL exactly
- [ ] README documents required + optional fields and includes an example
- [ ] If revising, the change respects the immutability policy above
- [ ] PR description explains the use case for the schema or change

## Where this gets used

These schemas are consumed by:

- **OpenCred Desktop & Docker** — `credentialSchema` references in issued credentials
- **Verifiers** — schema validation during VC verification
- **Issuers using OpenCred templates** — built-in template forms map to these schemas
