# OpenCred Verifiable Credential Schemas

JSON Schemas for Verifiable Credentials (VCs) used by [OpenCred](https://github.com/nfh-trust-labs/opencred) and the broader trust-services ecosystem. Each schema is interoperable, versioned, and immutable once published.

## Available schemas

| Credential | Latest | Schema URL |
|---|---|---|
| Education | v1 | [schemas/education/v1/schema.json](schemas/education/v1/schema.json) |
| Employment | v1 | [schemas/employment/v1/schema.json](schemas/employment/v1/schema.json) |
| Identity | v1 | [schemas/identity/v1/schema.json](schemas/identity/v1/schema.json) |
| Health | v1 | [schemas/health/v1/schema.json](schemas/health/v1/schema.json) |
| Business | v1 | [schemas/business/v1/schema.json](schemas/business/v1/schema.json) |
| Salary Slip | v1 | [schemas/salary-slip/v1/schema.json](schemas/salary-slip/v1/schema.json) |
| Electricity (Customer) | v1 | [schemas/electricity/v1/schema.json](schemas/electricity/v1/schema.json) |

## URL pattern

Every schema is reachable at a stable raw URL:

```
https://raw.githubusercontent.com/nfh-trust-labs/opencred-vc-schemas/main/schemas/<name>/v<version>/schema.json
```

This URL is also the schema's `$id`, so JSON Schema processors can resolve it directly. OpenCred references these URLs in the W3C VC `credentialSchema` field.

## Repository layout

```
schemas/
└── <credential-name>/
    └── v<version>/
        ├── schema.json     # JSON Schema (draft-07 or 2020-12)
        ├── README.md       # field reference + example
        ├── context.jsonld  # JSON-LD context (optional)
        └── example.json    # example credential subject (optional)
```

## Versioning policy

- Each schema version is **immutable** once merged. Bug fixes that don't change the data shape are allowed; anything else requires a new version.
- **Breaking changes** → publish under a new version directory (`v2`, `v3`, …) and keep older versions in place.
- **Non-breaking additions** (new optional properties, looser constraints) — bump the directory version. Don't mutate existing files.
- Once a credential is in the wild referencing `…/v1/schema.json`, that URL must keep working forever.

## Using a schema

### From the command line

```bash
curl https://raw.githubusercontent.com/nfh-trust-labs/opencred-vc-schemas/main/schemas/education/v1/schema.json
```

### From a W3C Verifiable Credential

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1"
  ],
  "type": ["VerifiableCredential", "EducationCredential"],
  "credentialSchema": {
    "id": "https://raw.githubusercontent.com/nfh-trust-labs/opencred-vc-schemas/main/schemas/education/v1/schema.json",
    "type": "JsonSchemaValidator2018"
  },
  "issuer": "did:web:example.org",
  "issuanceDate": "2026-04-07T00:00:00Z",
  "credentialSubject": {
    "id": "did:example:subject",
    "name": "Jane Doe",
    "degree": "Bachelor of Science in Computer Science",
    "institution": "University of Example",
    "dateConferred": "2024-06-15"
  }
}
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add or revise a schema.

## Resources

- [W3C Verifiable Credentials Data Model](https://www.w3.org/TR/vc-data-model/)
- [JSON Schema](https://json-schema.org/)
- [JSON-LD 1.1](https://www.w3.org/TR/json-ld11/)
- [Schema.org](https://schema.org)

## License

MIT — see [LICENSE](LICENSE).

## Maintainer

**Networks for Humanity**
