# Salary Slip Schema

A universal schema for salary slips (payslips) as verifiable credentials, based on Schema.org vocabulary with domain-specific extensions.

## Overview

This schema represents a comprehensive salary slip that can be issued as a verifiable credential. It captures:

- Employee and employer information
- Earnings breakdown (salary components)
- Deductions (taxes, contributions, etc.)
- Employer contributions
- Pay period details
- Summary totals

## Schema.org Alignment

This schema extends Schema.org's `Invoice` type, which provides a natural fit for salary documents:

### Core Type Mappings

| Our Concept | Schema.org Type | Notes |
|-------------|-----------------|-------|
| Salary Slip | `Invoice` | Base type for financial documents |
| Employee | `Person` (via `customer` alias) | The person receiving payment |
| Employer | `Organization` (via `provider` alias) | The organization making payment |
| Amounts | `MonetaryAmount` | Standard monetary values |
| Address | `PostalAddress` | Standard postal addresses |

### Property Mappings

| Our Field | Schema.org Property | Type | Notes |
|-----------|---------------------|------|-------|
| `identifier` | `identifier` | Text | Unique salary slip ID |
| `dateCreated` | `dateCreated` | Date | Issue date of salary slip |
| `paymentDueDate` | `paymentDueDate` | Date | Scheduled payment date |
| `accountId` | `accountId` | Text | Payment account reference |
| `employer` | `provider` | Organization | Aliased for clarity |
| `employee` | `customer` | Person | Aliased for clarity |

## Custom Extensions

Since Schema.org doesn't have native salary slip properties, we define a custom vocabulary under the `salary:` namespace.

### Custom Namespace

```
salary: https://example.org/salary#
```

### Custom Types

- **`salary:SalarySlip`**: Extends Invoice for salary-specific documents
- **`salary:SalaryComponent`**: Represents individual salary line items (earnings, deductions)
- **`salary:PayPeriod`**: Defines the salary calculation period
- **`salary:SalaryTotals`**: Contains summary calculations

### Custom Properties

- **`salary:earnings`**: Array of earning components (unordered)
- **`salary:deductions`**: Array of deduction components (unordered)
- **`salary:employerContributions`**: Array of employer contribution components (unordered)
- **`salary:component`**: Name/description of a salary component
- **`salary:payPeriod`**: Pay period with start and end dates

## Example

```json
{
  "@context": [
    "https://schema.org",
    {
      "salary": "https://example.org/salary#",
      "employee": "customer",
      "employer": "provider",
      "earnings": "salary:earnings",
      "deductions": "salary:deductions",
      "employerContributions": "salary:employerContributions",
      "payPeriod": "salary:payPeriod",
      "component": "salary:component"
    }
  ],
  "@type": ["Invoice", "salary:SalarySlip"],
  "identifier": "SAL-2025-07",
  "dateCreated": "2025-07-31",
  "paymentDueDate": "2025-08-01",
  "payPeriod": {
    "@type": "salary:PayPeriod",
    "startDate": "2025-07-01",
    "endDate": "2025-07-31"
  },
  "employer": {
    "@type": "Organization",
    "name": "Acme Pvt Ltd",
    "taxID": "AAACA1234A"
  },
  "employee": {
    "@type": "Person",
    "name": "Jane Doe",
    "identifier": [
      {
        "@type": "PropertyValue",
        "propertyID": "employee-id",
        "value": "EMP-00123"
      }
    ],
    "jobTitle": "Senior Analyst"
  },
  "earnings": [
    {
      "@type": "salary:SalaryComponent",
      "component": "Basic Salary",
      "amount": {
        "@type": "MonetaryAmount",
        "currency": "INR",
        "value": 75000
      }
    }
  ],
  "totals": {
    "@type": "salary:SalaryTotals",
    "netPay": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "value": 88200
    }
  }
}
```

## Field Descriptions

### Required Fields

- **`@context`**: JSON-LD context including Schema.org and custom salary vocabulary
- **`@type`**: Must include both `Invoice` and `salary:SalarySlip`
- **`identifier`**: Unique identifier for this salary slip
- **`dateCreated`**: Date the salary slip was created/issued
- **`employee`**: Person object with employee details
- **`employer`**: Organization object with employer details

### Optional Fields

- **`paymentDueDate`**: Scheduled date for salary payment
- **`accountId`**: Reference to payroll account
- **`payPeriod`**: Object with `startDate` and `endDate` for the pay period
- **`earnings`**: Array of earning components
- **`deductions`**: Array of deduction components
- **`employerContributions`**: Array of employer contributions
- **`totals`**: Summary object with `grossEarnings`, `totalDeductions`, and `netPay`

## Usage in Verifiable Credentials

To use this schema as a verifiable credential:

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://schema.org",
    {
      "salary": "https://example.org/salary#"
    }
  ],
  "type": ["VerifiableCredential", "SalarySlipCredential"],
  "issuer": "did:example:employer123",
  "issuanceDate": "2025-07-31T00:00:00Z",
  "credentialSubject": {
    "id": "did:example:employee456",
    "@type": ["Invoice", "salary:SalarySlip"],
    "identifier": "SAL-2025-07",
    ...
  },
  "proof": {
    "type": "Ed25519Signature2020",
    ...
  }
}
```

## Internationalization

This schema supports international use:

- **Currency**: Use ISO 4217 currency codes (INR, USD, EUR, etc.)
- **Tax IDs**: Use `PropertyValue` with country-specific `propertyID` (e.g., "IN-PAN", "US-SSN")
- **Addresses**: Use standard `PostalAddress` with `addressCountry` field
- **Dates**: Use ISO 8601 format (YYYY-MM-DD)

## Validation

Validate using JSON-LD processors:

```bash
jsonld format --validate schema.json
```

## Related Standards

- [Schema.org Invoice](https://schema.org/Invoice)
- [Schema.org Person](https://schema.org/Person)
- [Schema.org Organization](https://schema.org/Organization)
- [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/)
