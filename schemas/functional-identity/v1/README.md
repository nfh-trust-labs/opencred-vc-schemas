# Functional Identity Credential

**ID:** `functional-identity/v1`
**Type:** `FunctionalIdentityCredential`
**Anchor standard:** Schema.org hasOccupation / Occupation; optional ISCO-08

## Description

Barebones role/capacity credential asserting that the subject holds a particular functional role (e.g., farmer, medical practitioner, student). Verifiers must trust the issuer and affiliation — the mere existence of a VC proves nothing.

## When to use

Use this credential when you need to issue a functional identity credential as a W3C Verifiable Credential. The schema is authored by OpenCred and anchored on Schema.org hasOccupation / Occupation; optional ISCO-08.

## Schema URL

`https://raw.githubusercontent.com/nfh-trust-labs/opencred-vc-schemas/main/schemas/functional-identity/v1/schema.json`

## Example

See [`example.json`](example.json) for a complete worked (unsigned) example credential that validates against `schema.json`.

## License

MIT (same as the rest of the OpenCred schema repository).
