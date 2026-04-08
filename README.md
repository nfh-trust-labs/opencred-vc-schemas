# OpenCred Verifiable Credential Schemas

JSON Schemas and referenced upstream schema pointers for W3C Verifiable Credentials (VCs) used by [OpenCred](https://github.com/nfh-trust-labs/opencred). The catalogue is a curated mix of **OpenCred-authored schemas** (where no strong standard exists) and **referenced upstream schemas** (where strong standards already exist — W3C CCG Traceability Vocab, Open Badges 3.0, DIF).

All credentials — defined and referenced — are tracked in [`manifest.json`](manifest.json) as a single source of truth. The OpenCred build pipeline fetches each schema at release time, verifies its SHA-256 against the manifest, and bundles it into the desktop and server artifacts so the runtime never makes remote requests.

## Credentials

> This table is auto-generated from `manifest.json` — edit `manifest.json` and run `node scripts/generate-readme.mjs`.

<!-- credentials-table-start -->
| ID | Source | Owner | Schema | Context | License |
|---|---|---|---|---|---|
| `business-entity/v1` | defined | OpenCred | [schemas/business-entity/v1/schema.json](schemas/business-entity/v1/schema.json) | [schemas/business-entity/v1/context.jsonld](schemas/business-entity/v1/context.jsonld) | MIT |
| `electricity/v1` | defined | OpenCred | [schemas/electricity/v1/schema.json](schemas/electricity/v1/schema.json) | [schemas/electricity/v1/context.jsonld](schemas/electricity/v1/context.jsonld) | MIT |
| `employment-offer-letter/v1` | defined | OpenCred | [schemas/employment-offer-letter/v1/schema.json](schemas/employment-offer-letter/v1/schema.json) | [schemas/employment-offer-letter/v1/context.jsonld](schemas/employment-offer-letter/v1/context.jsonld) | MIT |
| `functional-identity/v1` | defined | OpenCred | [schemas/functional-identity/v1/schema.json](schemas/functional-identity/v1/schema.json) | [schemas/functional-identity/v1/context.jsonld](schemas/functional-identity/v1/context.jsonld) | MIT |
| `immunization/v1` | defined | OpenCred | [schemas/immunization/v1/schema.json](schemas/immunization/v1/schema.json) | [schemas/immunization/v1/context.jsonld](schemas/immunization/v1/context.jsonld) | MIT |
| `insurance-policy/v1` | defined | OpenCred | [schemas/insurance-policy/v1/schema.json](schemas/insurance-policy/v1/schema.json) | [schemas/insurance-policy/v1/context.jsonld](schemas/insurance-policy/v1/context.jsonld) | MIT |
| `prescription/v1` | defined | OpenCred | [schemas/prescription/v1/schema.json](schemas/prescription/v1/schema.json) | [schemas/prescription/v1/context.jsonld](schemas/prescription/v1/context.jsonld) | MIT |
| `salary-slip/v1` | defined | OpenCred | [schemas/salary-slip/v1/schema.json](schemas/salary-slip/v1/schema.json) | — | MIT |
| `test-result/v1` | defined | OpenCred | [schemas/test-result/v1/schema.json](schemas/test-result/v1/schema.json) | [schemas/test-result/v1/context.jsonld](schemas/test-result/v1/context.jsonld) | MIT |
| `dif/proof-of-age/v1` | referenced | Decentralized Identity Foundation (DIF) | [upstream](https://raw.githubusercontent.com/decentralized-identity/credential-schemas/main/dif-recommended-schemas/proof-of-age-schema/v1.0/ProofOfAge.schema.json) | — | Apache-2.0 |
| `dif/verified-person/v1` | referenced | Decentralized Identity Foundation (DIF) | [upstream](https://raw.githubusercontent.com/decentralized-identity/credential-schemas/main/dif-recommended-schemas/verified-person-schema/v1.0/VerifiedPerson.schema.json) | — | Apache-2.0 |
| `open-badges/v3` | referenced | 1EdTech Consortium | [upstream](https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_achievementcredential_schema.json) | [upstream](https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json) | 1EdTech Specification License (royalty-free) |
| `traceability/bill-of-lading/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/BillOfLadingCredential.yml) | — | W3C-20150513 |
| `traceability/certification-of-origin/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/CertificationOfOrigin.yml) | — | W3C-20150513 |
| `traceability/commercial-invoice/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/CommercialInvoiceCredential.yml) | — | W3C-20150513 |
| `traceability/delivery-schedule/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/DeliveryScheduleCredential.yml) | — | W3C-20150513 |
| `traceability/food-grade-inspection/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/FoodGradeInspectionCredential.yml) | — | W3C-20150513 |
| `traceability/freight-manifest/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/FreightManifestCredential.yml) | — | W3C-20150513 |
| `traceability/gap-inspection/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/GAPInspectionCredential.yml) | — | W3C-20150513 |
| `traceability/house-bill-of-lading/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/HouseBillOfLadingCredential.yml) | — | W3C-20150513 |
| `traceability/iata-air-waybill/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/IATAAirWaybillCredential.yml) | — | W3C-20150513 |
| `traceability/importer-security-filing/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/ImporterSecurityFilingCredential.yml) | — | W3C-20150513 |
| `traceability/mill-test-report/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/MillTestReportCredential.yml) | — | W3C-20150513 |
| `traceability/natural-gas-environmental-passport/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/NaturalGasProducerEnvironmentalPassportCredential.yml) | — | W3C-20150513 |
| `traceability/oil-and-gas-product/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/OilAndGasProductCredential.yml) | — | W3C-20150513 |
| `traceability/order-confirmation/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/OrderConfirmationCredential.yml) | — | W3C-20150513 |
| `traceability/packing-list/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/PackingListCredential.yml) | — | W3C-20150513 |
| `traceability/phytosanitary/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/PhytosanitaryCredential.yml) | — | W3C-20150513 |
| `traceability/purchase-order/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/PurchaseOrderCredential.yml) | — | W3C-20150513 |
| `traceability/sbom/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/SoftwareBillofMaterialsCredential.yml) | — | W3C-20150513 |
| `traceability/shipping-instructions/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/ShippingInstructionsCredential.yml) | — | W3C-20150513 |
| `traceability/sima-steel-import-license/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/SIMASteelImportLicenseCredential.yml) | — | W3C-20150513 |
| `traceability/usmca-certification-of-origin/v1` | referenced | W3C CCG Traceability Vocabulary | [upstream](https://raw.githubusercontent.com/w3c-ccg/traceability-vocab/main/docs/openapi/components/schemas/credentials/USMCACertificationOfOrigin.yml) | — | W3C-20150513 |
<!-- credentials-table-end -->

## Repository layout

```
opencred-vc-schemas/
├── manifest.json                 # Single source of truth — every credential with SHA-256
├── README.md                     # Auto-generated table
├── CONTRIBUTING.md               # How to add a credential
├── schemas/
│   ├── <defined-cred>/v1/
│   │   ├── schema.json           # JSON Schema (W3C VC 2.0 envelope)
│   │   ├── context.jsonld        # JSON-LD context (if applicable)
│   │   ├── example.json          # Unsigned example credential
│   │   └── README.md
│   └── <referenced-cred>/v1/
│       ├── README.md             # 1-page description + upstream URL
│       └── example.json          # Unsigned example credential
└── scripts/
    ├── lib/canonical-hash.mjs    # Canonical JSON SHA-256
    ├── pin-hashes.mjs            # Read manifest, compute/verify SHA-256
    └── generate-readme.mjs       # Rebuild the table above
```

## URL pattern (defined credentials)

Every defined schema is reachable at a stable raw URL:

```
https://raw.githubusercontent.com/nfh-trust-labs/opencred-vc-schemas/main/schemas/<name>/v<version>/schema.json
```

This URL is also the schema's `$id`. OpenCred references these URLs in the W3C VC `credentialSchema` field.

## Source kinds

- **`defined`** — authored in this repository. We own the schema, the context, and the README.
- **`referenced`** — the authoritative schema lives upstream at a URL we don't control. We maintain only a README pointing at the upstream source and an `example.json` for our own testing. The build pipeline fetches and hashes the upstream file at release time.

## Versioning policy

- Each schema version is **immutable** once merged.
- **Breaking changes** → publish under a new version directory (`v2`, `v3`, …) and keep older versions in place.
- Once a credential is in the wild referencing `…/v1/schema.json`, that URL must keep working forever.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add or revise a schema, including how to use the `pin-hashes.mjs` and `generate-readme.mjs` tooling.
