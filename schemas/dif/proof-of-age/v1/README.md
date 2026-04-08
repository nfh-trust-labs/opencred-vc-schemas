# dif/proof-of-age/v1

**Source:** Referenced (upstream-owned)
**Owner:** Decentralized Identity Foundation (DIF)
**License:** Apache-2.0

## Upstream

- Schema: [https://raw.githubusercontent.com/decentralized-identity/credential-schemas/main/dif-recommended-schemas/proof-of-age-schema/v1.0/ProofOfAge.schema.json](https://raw.githubusercontent.com/decentralized-identity/credential-schemas/main/dif-recommended-schemas/proof-of-age-schema/v1.0/ProofOfAge.schema.json)

- Documentation: [https://github.com/decentralized-identity/credential-schemas/tree/main/dif-recommended-schemas/proof-of-age-schema/v1.0](https://github.com/decentralized-identity/credential-schemas/tree/main/dif-recommended-schemas/proof-of-age-schema/v1.0)

## Description

DIF Proof of Age schema — proves the subject is over a threshold age (18+, 21+, etc.) without revealing date of birth.

## When to use

Age-gating scenarios where you need to prove the subject meets a minimum age without leaking their actual date of birth.

## Notes

This is a **referenced** credential: the authoritative schema lives upstream at the URL above. We do NOT redistribute the schema here — the OpenCred build pipeline fetches it at release time, verifies its SHA-256 against `manifest.json`, and bundles it into the desktop and server artifacts so the runtime never makes network requests.

We maintain only this README and an [`example.json`](example.json) for our own testing.
