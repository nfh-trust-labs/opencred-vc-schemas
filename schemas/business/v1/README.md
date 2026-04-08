# Business Credential — v1

JSON Schema for an organization incorporation credential.

## URL

```
https://raw.githubusercontent.com/nfh-trust-labs/opencred-vc-schemas/main/schemas/business/v1/schema.json
```

## Required fields

| Field | Type | Format | Notes |
|---|---|---|---|
| `name` | string | — | Legal name of the organization |
| `registrationNumber` | string | — | Registration number assigned by the authority |
| `jurisdiction` | string | — | ISO 3166-1 / ISO 3166-2 code recommended |
| `incorporationDate` | string | `date` | ISO 8601 |

## Example credential subject

```json
{
  "name": "Acme Corp Pvt Ltd",
  "registrationNumber": "U12345KA2020PTC123456",
  "jurisdiction": "IN-KA",
  "incorporationDate": "2020-03-15"
}
```
