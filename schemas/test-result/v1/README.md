# Test Result Credential

**ID:** `test-result/v1`
**Type:** `TestResultCredential`
**Anchor standard:** HL7 FHIR R4 DiagnosticReport / Observation; LOINC codes; ISO 15189 lab accreditation

## Description

W3C VC wrapper around HL7 FHIR R4 DiagnosticReport with embedded Observation results. Represents a laboratory or diagnostic test result.

## When to use

Use this credential when you need to issue a test result credential as a W3C Verifiable Credential. The schema is authored by OpenCred and anchored on HL7 FHIR R4 DiagnosticReport / Observation; LOINC codes; ISO 15189 lab accreditation.

## Schema URL

`https://raw.githubusercontent.com/nfh-trust-labs/opencred-vc-schemas/main/schemas/test-result/v1/schema.json`

## Example

See [`example.json`](example.json) for a complete worked (unsigned) example credential that validates against `schema.json`.

## License

MIT (same as the rest of the OpenCred schema repository).
