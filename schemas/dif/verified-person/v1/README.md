# dif/verified-person/v1

**Source:** Referenced (upstream-owned)
**Owner:** Decentralized Identity Foundation (DIF)
**License:** Apache-2.0

## Upstream

- Schema: [https://raw.githubusercontent.com/decentralized-identity/credential-schemas/main/dif-recommended-schemas/verified-person-schema/v1.0/VerifiedPerson.schema.json](https://raw.githubusercontent.com/decentralized-identity/credential-schemas/main/dif-recommended-schemas/verified-person-schema/v1.0/VerifiedPerson.schema.json)

- Documentation: [https://github.com/decentralized-identity/credential-schemas/tree/main/dif-recommended-schemas/verified-person-schema/v1.0](https://github.com/decentralized-identity/credential-schemas/tree/main/dif-recommended-schemas/verified-person-schema/v1.0)

## Description

DIF Verified Person schema — KYC identity credential with verified attributes (name, date of birth, address, government-issued ID, verification process).

## When to use

Issuing a KYC-backed identity credential after an identity verification process.

## Notes

This is a **referenced** credential: the authoritative schema lives upstream at the URL above. We do NOT redistribute the schema here — the OpenCred build pipeline fetches it at release time, verifies its SHA-256 against `manifest.json`, and bundles it into the desktop and server artifacts so the runtime never makes network requests.

We maintain only this README and an [`example.json`](example.json) for our own testing.
