# Employment Credential — v1

JSON Schema for an employment verification credential.

## URL

```
https://raw.githubusercontent.com/nfh-trust-labs/opencred-vc-schemas/main/schemas/employment/v1/schema.json
```

## Required fields

| Field | Type | Format | Notes |
|---|---|---|---|
| `name` | string | — | Full name of the employee |
| `employer` | string | — | Legal name of the employer |
| `position` | string | — | Job title or role |
| `startDate` | string | `date` | When employment began |

## Optional fields

| Field | Type | Format | Notes |
|---|---|---|---|
| `endDate` | string | `date` | Omit while employment is current |

`additionalProperties: true` — issuers may include compensation, department, employee ID, etc.

## Example credential subject

```json
{
  "name": "Jane Doe",
  "employer": "Acme Corp",
  "position": "Senior Engineer",
  "startDate": "2022-01-10",
  "department": "Platform"
}
```
