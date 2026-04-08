# Identity Credential — v1

JSON Schema for a basic identity credential anchored to a government-issued document.

## URL

```
https://raw.githubusercontent.com/nfh-trust-labs/opencred-vc-schemas/main/schemas/identity/v1/schema.json
```

## Required fields

| Field | Type | Format | Notes |
|---|---|---|---|
| `name` | string | — | Full legal name |
| `dateOfBirth` | string | `date` | ISO 8601 |
| `nationality` | string | — | ISO 3166-1 alpha-2 country code recommended |
| `documentNumber` | string | — | Underlying identity document number |

> **Privacy note**: identity credentials carry sensitive PII. Issuers should consider selective disclosure (e.g. BBS+ proofs) and minimum-necessary collection. Verifiers must handle this data under applicable privacy law.

## Example credential subject

```json
{
  "name": "Jane Doe",
  "dateOfBirth": "1990-04-12",
  "nationality": "IN",
  "documentNumber": "P1234567"
}
```
