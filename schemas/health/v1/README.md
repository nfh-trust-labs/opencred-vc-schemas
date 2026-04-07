# Health Credential — v1

JSON Schema for a health-related certification credential (fitness-for-duty, professional medical certification, etc.). **Not** intended for clinical records or patient data.

## URL

```
https://raw.githubusercontent.com/nfh-trust-labs/opencred-vc-schemas/main/schemas/health/v1/schema.json
```

## Required fields

| Field | Type | Format | Notes |
|---|---|---|---|
| `name` | string | — | Full name of the subject |
| `certification` | string | — | Name of the certification |
| `issuingBody` | string | — | Issuing organization |
| `validUntil` | string | `date` | Expiry date (ISO 8601) |

> Use a domain-specific schema for clinical health data — this schema covers certifications only.

## Example credential subject

```json
{
  "name": "Jane Doe",
  "certification": "Aviation Medical Class 1",
  "issuingBody": "DGCA",
  "validUntil": "2027-04-01"
}
```
