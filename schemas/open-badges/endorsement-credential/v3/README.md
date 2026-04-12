# open-badges/endorsement-credential/v3

**Source:** Referenced (upstream-owned)
**Owner:** 1EdTech Consortium
**License:** 1EdTech Specification License (royalty-free)

## Upstream

- Schema: [https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_endorsementcredential_schema.json](https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_endorsementcredential_schema.json)
- Context: [https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json](https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json)
- Documentation: [https://www.imsglobal.org/spec/ob/v3p0/#endorsementcredential](https://www.imsglobal.org/spec/ob/v3p0/#endorsementcredential)

## Description

Open Badges 3.0 EndorsementCredential — a verifiable claim by a third party endorsing an issuer profile or a specific achievement definition. Used to build trust networks around credential issuers.

## When to use

Endorsing an issuer's authority to issue a particular credential, or endorsing the quality/validity of an achievement definition.

## Notes

This is a **referenced** credential: the authoritative schema lives upstream at the URL above. We do NOT redistribute the schema here — the OpenCred build pipeline fetches it at release time, verifies its SHA-256 against `manifest.json`, and bundles it into the desktop and server artifacts so the runtime never makes network requests.

We maintain only this README and an [`example.json`](example.json) for our own testing.
