# Prescription Credential

**ID:** `prescription/v1`
**Type:** `PrescriptionCredential`
**Anchor standard:** HL7 FHIR R4 MedicationRequest; RxNorm/SNOMED

## Description

W3C VC wrapper around HL7 FHIR R4 MedicationRequest. Represents a clinician's prescription order.

## When to use

Use this credential when you need to issue a prescription credential as a W3C Verifiable Credential. The schema is authored by OpenCred and anchored on HL7 FHIR R4 MedicationRequest; RxNorm/SNOMED.

## Schema URL

`https://raw.githubusercontent.com/nfh-trust-labs/opencred-vc-schemas/main/schemas/prescription/v1/schema.json`

## Example

See [`example.json`](example.json) for a complete worked (unsigned) example credential that validates against `schema.json`.

## License

MIT (same as the rest of the OpenCred schema repository).
