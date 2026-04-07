# Education Credential — v1

JSON Schema for an academic qualification credential.

## URL

```
https://raw.githubusercontent.com/nfh-trust-labs/opencred-vc-schemas/main/schemas/education/v1/schema.json
```

## Required fields

| Field | Type | Format | Notes |
|---|---|---|---|
| `name` | string | — | Full name of the credential subject |
| `degree` | string | — | The academic qualification conferred |
| `institution` | string | — | Conferring institution's legal name |
| `dateConferred` | string | `date` (ISO 8601) | Date the qualification was conferred |

`additionalProperties: true` — issuers may include extra fields (transcript URLs, GPA, honors, etc.) without breaking conformance.

## Example credential subject

```json
{
  "name": "Jane Doe",
  "degree": "Bachelor of Science in Computer Science",
  "institution": "University of Example",
  "dateConferred": "2024-06-15",
  "honors": "magna cum laude"
}
```
