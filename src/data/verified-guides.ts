export interface VerifiedGuide {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  category: string
  lastVerified: string
  author: {
    name: string
    role: string
    credentials: string
  }
  keyTakeaways: string[]
  officialSourceUrl: string
  excerpt: string
  content: string
}

export const VERIFIED_GUIDES: VerifiedGuide[] = [
  {
    slug: 'udyam-registration',
    title: 'Udyam Registration 2026: Complete Step-by-Step Guide &amp; Free Application Process',
    metaTitle: 'Udyam Registration 2026: Official Free Portal Process & Benefits | MSMEVault',
    metaDescription: 'Step-by-step verified guide to free online Udyam Registration on udyamregistration.gov.in. Zero fees, Aadhaar OTP authentication, and lifetime certificate validity.',
    category: 'Statutory Registration',
    lastVerified: '22 Aug 2026',
    author: {
      name: 'Aditya Patil',
      role: 'Lead Research Analyst',
      credentials: 'MSME Policy Research Desk',
    },
    keyTakeaways: [
      'Official Udyam Registration is 100% FREE on udyamregistration.gov.in. Never pay private agents or fraudulent portals.',
      'Aadhaar number of proprietor/director and linked mobile number for OTP are mandatory.',
      'PAN and GSTIN are automatically validated with the Income Tax Department and GSTN databases.',
      'Grants lifetime validity with a permanent 19-digit Udyam Registration Number (URN) and downloadable QR certificate.',
      'Mandatory prerequisite for Priority Sector Lending (PSL), collateral-free bank loans under CGTMSE, and PMEGP capital subsidies.',
    ],
    officialSourceUrl: 'https://udyamregistration.gov.in',
    excerpt: 'A comprehensive, plain-language guide on how to register your micro, small, or medium enterprise on the official Government of India Udyam portal without paying any fees.',
    content: `## 1. What is Udyam Registration?

Udyam Registration is the official, paperless, and self-declaration-based registration process launched by the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India w.e.f. 1 July 2020. It replaces the erstwhile Udyog Aadhaar Memorandum (UAM) and EM-II filings.

Upon successful registration, the Ministry issues a permanent **Udyam Registration Certificate** containing a unique **Udyam Registration Number (URN)** and a tamper-proof dynamic QR code.

---

## 2. Key Statutory Benefits of Udyam Registration

Having a valid Udyam certificate unlocks critical statutory benefits under the MSMED Act, 2006:

- **Priority Sector Lending (PSL):** Commercial banks are mandated by the Reserve Bank of India (RBI) to allocate dedicated credit quotas to registered MSMEs at concessional rates.
- **Collateral-Free Bank Loans:** Eligibility to access bank credit up to ₹10 Crore under the CGTMSE credit guarantee trust without pledging land or physical collateral.
- **Protection Against Delayed Payments:** Registered MSMEs can file claims on the **MSME Samadhaan** portal against buyers who fail to settle invoices within 45 days. Buyers are legally liable to pay compound interest at 3x the RBI bank rate.
- **Waiver on Government Tenders:** Exemption from paying Earnest Money Deposit (EMD) and tender document fees in central ministry and PSU procurement tenders.
- **Direct Subsidy Access:** Mandatory eligibility requirement for claiming 15%–35% capital subsidies under PMEGP and up to 80% fee subsidies on ZED Certification and ISO registrations.

---

## 3. Documents & Information Required

The entire registration process is 100% digital and paperless. No physical documents need to be uploaded:

1. **Aadhaar Number:** 12-digit Aadhaar of the Proprietor (for Sole Proprietorship), Managing Partner (for Partnership), or Authorized Signatory (for LLP / Company / Society).
2. **Mobile Number:** Must be linked to Aadhaar to receive instant OTP verification.
3. **PAN Number:** Permanent Account Number of the proprietor or the enterprise entity.
4. **GSTIN:** Mandatory for enterprises engaged in activities requiring GST registration under the CGST Act 2017.
5. **Bank Details:** Active Bank Account Number and IFSC Code of the enterprise.
6. **NIC Code:** 4-digit / 5-digit National Industrial Classification code corresponding to your business activity.

---

## 4. Step-by-Step Registration Workflow (Official Portal)

Follow these exact steps on the official government website:

1. **Visit Official URL:** Navigate to \`https://udyamregistration.gov.in\`.
2. **Select Category:** Click on **"For New Entrepreneurs who are not Registered yet as MSME"**.
3. **Aadhaar & Name Entry:** Enter your 12-digit Aadhaar number and the name as printed on the Aadhaar card. Click **"Validate & Generate OTP"**.
4. **OTP Verification:** Enter the 6-digit OTP received on your Aadhaar-linked mobile.
5. **PAN Validation:** Select your enterprise type (Proprietorship, Partnership, Private Limited, etc.) and enter your PAN. Click **"Validate PAN"**.
6. **Fill Enterprise Details:** Provide the enterprise name, plant/factory location, registered office address, date of business commencement, and active bank account details.
7. **Select NIC Code:** Choose Manufacturing or Service, and search your appropriate 5-digit NIC activity code.
8. **Employee & Investment Declaration:** Declare total number of employees (Male/Female/Other) and written-down investment value in Plant & Machinery.
9. **Final Submission:** Complete final OTP verification and submit. Your Udyam Registration Number is generated immediately, and the official certificate is issued within 24–48 hours.

---

## 5. Critical Warning: Beware of Fake & Fraudulent Portals

> **Official Notice:** The Government of India charges **ZERO FEES (₹0.00)** for Udyam Registration. Numerous private websites with deceptive names charge ₹1,500 to ₹3,000 pretending to be official government portals. Always check that the website domain ends strictly with **.gov.in** before submitting any personal information.`,
  },
  {
    slug: 'mudra-loan',
    title: 'PM Mudra Yojana (PMMY) 2026: Loan Limits, Tarun Plus (₹20L) &amp; Application Guide',
    metaTitle: 'PM Mudra Yojana 2026: Shishu, Kishor, Tarun & Tarun Plus (₹20L) Guide | MSMEVault',
    metaDescription: 'Verified breakdown of PM Mudra Loan categories (Shishu up to ₹50k, Kishor up to ₹5L, Tarun up to ₹10L, and Tarun Plus up to ₹20L w.e.f. Oct 2024). Eligibility & application steps.',
    category: 'Credit & Loans',
    lastVerified: '22 Aug 2026',
    author: {
      name: 'Aditya Patil',
      role: 'Lead Research Analyst',
      credentials: 'MSME Policy Research Desk',
    },
    keyTakeaways: [
      'Four distinct loan tiers: Shishu (≤₹50,000), Kishor (₹50,001–₹5 Lakh), Tarun (₹5 Lakh–₹10 Lakh), and Tarun Plus (₹10 Lakh–₹20 Lakh).',
      'Tarun Plus limit of ₹20 Lakh was officially notified by the Department of Financial Services (DFS) on 24 October 2024 for repeat borrowers with good repayment track record.',
      'Zero collateral or third-party guarantee required across all Mudra loan categories.',
      'Interest rates are determined by the lending institution (commercial banks, RRBs, SFBs, NBFCs, MFIs) and are not fixed by the government.',
      'Apply online via JanSamarth portal (jansamarth.in) or directly at any scheduled commercial bank branch.',
    ],
    officialSourceUrl: 'https://www.mudra.org.in',
    excerpt: 'Everything you need to know about Pradhan Mantri Mudra Yojana in 2026, including the new Tarun Plus tier up to ₹20 Lakh, interest rates, document checklists, and application workflow.',
    content: `## 1. Overview of Pradhan Mantri Mudra Yojana (PMMY)

Pradhan Mantri Mudra Yojana (PMMY) was launched by the Government of India to provide formal institutional credit up to ₹20 Lakh to non-corporate, non-farm micro and small enterprises.

Loans under PMMY are extended by Member Lending Institutions (MLIs) — including Public Sector Banks, Private Commercial Banks, Regional Rural Banks (RRBs), Small Finance Banks (SFBs), Micro Finance Institutions (MFIs), and Non-Banking Financial Companies (NBFCs).

---

## 2. Four Mudra Loan Categories (Updated 2026)

| Loan Tier | Loan Amount Limit | Target Stage | Typical Repayment Tenure |
| :--- | :--- | :--- | :--- |
| **Shishu** | Up to ₹50,000 | New startups, micro vendors, retail artisans | Up to 36–60 months |
| **Kishor** | ₹50,001 to ₹5,00,000 | Developing units buying tools or raw materials | Up to 60 months |
| **Tarun** | ₹5,00,001 to ₹10,00,000 | Established micro units expanding capacity | Up to 60–84 months |
| **Tarun Plus** | ₹10,00,001 to ₹20,00,000 | Repeat borrowers who fully settled prior Tarun loans | Up to 84 months |

### What is the new Tarun Plus category?
Announced in Union Budget 2024-25 and officially notified by the Department of Financial Services (DFS) w.e.f. 24 October 2024, the **Tarun Plus** category doubles the maximum Mudra borrowing ceiling from ₹10 Lakh to **₹20 Lakh**. It is specifically available to entrepreneurs who have previously availed a Tarun loan and demonstrated a clean repayment history.

---

## 3. Interest Rates & Processing Fees

- **Interest Rate:** The Government of India does not fix a single mandatory interest rate. Interest rates are determined by individual lending banks based on their internal EBLR / MCLR benchmarks and the borrower's credit assessment (typically ranging between **9.25% and 13.5% p.a.** in scheduled commercial banks).
- **Processing Fee:** **NIL (0%)** for Shishu loans (up to ₹50,000). For Kishor, Tarun, and Tarun Plus loans, banks typically charge between 0.50% and 1.00% + GST.
- **Collateral Security:** As per RBI guidelines, **NO collateral or third-party guarantee** can be demanded by banks for loans sanctioned under PMMY.

---

## 4. Eligibility Criteria

- Any Indian citizen who has a viable business plan for a non-farm income-generating activity in manufacturing, trading, or service sectors.
- Minimum age: 18 years; Maximum age: 65 years at loan maturity.
- The applicant must not have defaulted on any previous loan with any bank or financial institution (clean CIBIL score &ge; 650 preferred).
- For Tarun Plus: Must produce loan closure and clean repayment certificate of earlier Tarun loan.

---

## 5. How to Apply Online (JanSamarth Portal)

1. Visit the unified national credit portal: \`https://www.jansamarth.in\`.
2. Under "Business Activity Loan", click on **"Check Eligibility"**.
3. Select your enterprise type, required loan amount, and social category.
4. If eligible, complete digital registration using Aadhaar and mobile OTP.
5. Upload basic financial proofs (ITR, Bank Statements, Udyam Certificate).
6. Select your preferred lending bank and submit your digital application for fast in-principle sanction.`,
  },
  {
    slug: 'pmegp-loan',
    title: 'PMEGP Subsidy Scheme 2026: 15%–35% Margin Money Grant &amp; Project Ceilings',
    metaTitle: 'PMEGP Subsidy 2026: 15%–35% Margin Money, ₹50L Mfg Cap & Calculation | MSMEVault',
    metaDescription: 'Comprehensive guide to Prime Minister Employment Generation Programme (PMEGP). Revised ₹50L manufacturing / ₹20L service project ceilings, subsidy matrix, and KVIC portal workflow.',
    category: 'Capital Subsidy',
    lastVerified: '22 Aug 2026',
    author: {
      name: 'Aditya Patil',
      role: 'Lead Research Analyst',
      credentials: 'MSME Policy Research Desk',
    },
    keyTakeaways: [
      'Capital margin money subsidy of 15% to 35% of total project cost directly funded by Ministry of MSME / KVIC.',
      'Project cost ceilings: ₹50 Lakh for Manufacturing sector and ₹20 Lakh for Service / Business sector.',
      'Beneficiary own contribution is only 10% (General Category) or 5% (Special Categories: Women, SC, ST, OBC, PH, Minorities, Ex-Servicemen, NER).',
      'Second loan for upgradation / expansion of existing successful PMEGP units up to ₹1 Crore (mfg) with 15%–20% subsidy.',
      'Apply online on the official KVIC portal at kviconline.gov.in/pmegpeportal.',
    ],
    officialSourceUrl: 'https://www.kviconline.gov.in/pmegpeportal/',
    excerpt: 'Detailed breakdown of PMEGP subsidy calculations, eligibility norms, project cost ceilings, own contribution rates, and the step-by-step KVIC application process.',
    content: `## 1. What is PMEGP?

The Prime Minister’s Employment Generation Programme (PMEGP) is a flagship credit-linked subsidy scheme administered by the Ministry of MSME through the Khadi and Village Industries Commission (KVIC) as the national nodal agency.

Under PMEGP, entrepreneurs setting up new micro-enterprises receive a **non-repayable capital subsidy (called Margin Money)** credited directly into a 3-year term deposit receipt (TDR) in their lending bank, which is adjusted against the loan principal after physical verification.

---

## 2. Subsidy Percentage Matrix

The subsidy percentage depends on the promoter's social category and the geographical location of the proposed unit:

| Beneficiary Social Category | Own Equity Contribution | Urban Area Subsidy | Rural Area Subsidy |
| :--- | :--- | :--- | :--- |
| **General Category** (General Male) | **10%** of project cost | **15%** of project cost | **25%** of project cost |
| **Special Categories** (Women / SC / ST / OBC / Minorities / PH / Ex-Servicemen / NER) | **5%** of project cost | **25%** of project cost | **35%** of project cost |

---

## 3. Project Cost Ceilings

- **Manufacturing Sector:** Maximum eligible project cost is **₹50 Lakh** (Maximum possible subsidy: ₹17.50 Lakh in rural special category).
- **Service / Business Sector:** Maximum eligible project cost is **₹20 Lakh** (Maximum possible subsidy: ₹7.00 Lakh in rural special category).
- **Second Loan for Upgradation:** Existing well-performing PMEGP units can apply for a second expansion loan up to **₹1.00 Crore** (Manufacturing) or **₹25 Lakh** (Service) with an additional 15%–20% subsidy.

---

## 4. Eligibility Requirements

- Minimum age: 18 years. (No upper age limit).
- **Educational Qualification:** For projects costing above ₹10 Lakh in Manufacturing or above ₹5 Lakh in Service sector, the applicant must have passed at least **Class VIII (8th Standard)**.
- Only **NEW greenfield units** are eligible for the first loan. Existing operational units are not eligible for the initial grant.
- Only one person per family (self and spouse) can avail financial assistance under the scheme.
- Mandatory **Entrepreneurship Development Programme (EDP)** training (5–10 days) must be completed before loan disbursal.

---

## 5. How to Apply on KVIC Portal

1. Visit \`https://www.kviconline.gov.in/pmegpeportal/\`.
2. Click on **"Application for New Unit"**.
3. Fill the 20-point application form: Aadhaar number, sponsoring agency (KVIC / KVIB / DIC), industry activity, unit location, and preferred financing bank.
4. Upload required attachments: Detailed Project Report (DPR), Passport photograph, Caste certificate (if special category), 8th pass certificate, and Rural Area certificate (from Gram Panchayat).
5. Submit the application to generate your Application ID. The District Level Task Force Committee (DLTFC) scrutinizes the proposal and forwards it to your chosen bank branch for loan sanction.`,
  },
  {
    slug: 'cgtmse',
    title: 'CGTMSE Scheme 2026: Collateral-Free Bank Guarantee up to ₹10 Crore',
    metaTitle: 'CGTMSE Guarantee Cover 2026: ₹10 Crore Limit, Fees & Bank Process | MSMEVault',
    metaDescription: 'Verified guide to CGTMSE credit guarantee cover up to ₹10 Crore (increased from ₹5 Cr w.e.f. 1 Apr 2025 per Circular 250). Eligibility, coverage ratio, and bank coordination.',
    category: 'Credit Guarantee',
    lastVerified: '22 Aug 2026',
    author: {
      name: 'Aditya Patil',
      role: 'Lead Research Analyst',
      credentials: 'MSME Policy Research Desk',
    },
    keyTakeaways: [
      'Maximum guarantee cover ceiling increased to ₹10 Crore for guarantees approved or renewed on or after 1 April 2025 (CGTMSE Circular 250/2024-25).',
      'Guarantee coverage ratio ranges from 75% to 85% of the credit facility.',
      'Higher 85% coverage available for Women Entrepreneurs, SC/ST, Micro Enterprises up to ₹5 Lakh, and ZED-certified units.',
      'Borrowers deal directly with Member Lending Institutions (MLIs) — commercial banks & NBFCs — not with CGTMSE directly.',
      'Enables high-growth MSMEs to secure multi-crore working capital and machinery term loans without pledging real estate collateral.',
    ],
    officialSourceUrl: 'https://www.cgtmse.in',
    excerpt: 'How the CGTMSE credit guarantee trust enables micro and small enterprises to secure bank loans up to ₹10 Crore without providing third-party collateral or mortgage.',
    content: `## 1. What is CGTMSE?

The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) was jointly set up by the Ministry of MSME, Government of India, and the Small Industries Development Bank of India (SIDBI) to make collateral-free credit flow seamlessly to the MSE sector.

Under CGTMSE, if a registered micro or small enterprise defaults on its bank loan due to genuine business failure, the Trust reimburses **75% to 85% of the defaulted amount** directly to the lending institution.

---

## 2. Historic Guarantee Limit Hike to ₹10 Crore

Through **CGTMSE Circular No. 250/2024-25 dated 18 March 2025**, the Trust officially enhanced the maximum guarantee coverage ceiling from ₹5 Crore to **₹10 Crore** for all credit facilities approved or renewed on or after **1 April 2025**.

This enhancement allows capital-intensive manufacturing units, exporters, and technology-driven MSMEs to access substantial debt capital for factory construction and high-end machinery procurement without mortgaging physical properties.

---

## 3. Guarantee Coverage Structure

| Borrower Category | Loan Amount | Extent of Guarantee Cover |
| :--- | :--- | :--- |
| **Micro Enterprises** | Up to ₹5 Lakh | **85%** of sanctioned amount |
| **Women / SC / ST / ZED Certified** | Up to ₹10 Crore | **85%** of sanctioned amount |
| **Units in NER / UT of J&K / Ladakh** | Up to ₹10 Crore | **85%** of sanctioned amount |
| **General Category MSEs** | Up to ₹10 Crore | **75%** of sanctioned amount |

---

## 4. Annual Guarantee Fee (AGF) Structure

To keep credit affordable, CGTMSE charges an Annual Guarantee Fee (AGF) based on the sanctioned loan amount and the risk rating of the lending institution:

- **Loans up to ₹10 Lakh:** ~0.37% to 0.50% p.a.
- **Loans between ₹10 Lakh and ₹1 Crore:** ~0.55% to 0.75% p.a.
- **Loans between ₹1 Crore and ₹5 Crore:** ~0.60% to 1.20% p.a.
- **Loans between ₹5 Crore and ₹10 Crore:** ~1.20% to 1.35% p.a.
- *Concessions of 10% in AGF are provided to Women-owned enterprises, SC/ST promoters, and units with ZED Gold/Silver certification.*

---

## 5. How to Obtain a CGTMSE Loan

1. **Prepare Bankable DPR:** Prepare a detailed project report including past 3 years audited financials (for existing units), projected cash flows, CMA data, and machinery quotations.
2. **Apply at MLI Bank:** Approach any CGTMSE Member Lending Institution (All Public Sector Banks, leading Private Banks like HDFC/ICICI/Axis, and SIDBI).
3. **Request CGTMSE Coverage:** While submitting the loan application, explicitly request the bank to process the facility under the **CGTMSE Guarantee Scheme**.
4. **Appraisal & Guarantee Sanction:** The bank assesses the project's debt-service coverage ratio (DSCR). Once satisfied with operational viability, the bank logs into the CGTMSE digital portal and secures the guarantee cover directly from the Trust.`,
  },
  {
    slug: 'msme-classification-2026',
    title: 'New MSME Classification Limits 2026: Investment &amp; Turnover Thresholds Explained',
    metaTitle: 'MSME Classification 2026: New Limits w.e.f. 1 April 2025 | MSMEVault',
    metaDescription: 'Verified MSME definition per Gazette Notification S.O. 1364(E). Micro (₹2.5Cr / ₹10Cr), Small (₹25Cr / ₹100Cr), Medium (₹125Cr / ₹500Cr). Composite criteria explained.',
    category: 'Regulatory & Policy',
    lastVerified: '22 Aug 2026',
    author: {
      name: 'Aditya Patil',
      role: 'Lead Research Analyst',
      credentials: 'MSME Policy Research Desk',
    },
    keyTakeaways: [
      'Revised classification limits effective 1 April 2025 per Gazette Notification S.O. 1364(E) dated 21 March 2025.',
      'Micro: Investment in P&M ≤ ₹2.5 Crore AND Turnover ≤ ₹10 Crore.',
      'Small: Investment in P&M ≤ ₹25 Crore AND Turnover ≤ ₹100 Crore.',
      'Medium: Investment in P&M ≤ ₹125 Crore AND Turnover ≤ ₹500 Crore.',
      'Both Investment and Turnover criteria are composite and must be met simultaneously; exceeding either moves the unit to the next category.',
      'Export turnover of goods and services is 100% EXCLUDED when calculating the turnover ceiling.',
    ],
    officialSourceUrl: 'https://msme.gov.in',
    excerpt: 'A comprehensive guide to the updated MSME classification thresholds under the MSMED Act, how composite criteria work, and how export turnover exemptions apply.',
    content: `## 1. Updated MSME Classification Thresholds

Through **Gazette Notification S.O. 1364(E) dated 21 March 2025**, the Ministry of Micro, Small and Medium Enterprises officially revised the composite investment and turnover thresholds effective **1 April 2025**.

The unified definition applies equally to both **Manufacturing and Service** enterprises:

| Classification | Investment in Plant &amp; Machinery / Equipment | Annual Net Turnover |
| :--- | :--- | :--- |
| **Micro Enterprise** | Up to **₹2.50 Crore** | Up to **₹10.00 Crore** |
| **Small Enterprise** | Up to **₹25.00 Crore** | Up to **₹100.00 Crore** |
| **Medium Enterprise** | Up to **₹125.00 Crore** | Up to **₹500.00 Crore** |

*(For historical reference, prior limits were: Micro ₹1Cr/₹5Cr; Small ₹10Cr/₹50Cr; Medium ₹50Cr/₹250Cr).*

---

## 2. How the Composite Criteria Mechanism Works

1. **Both Criteria Are Mandatory:** An enterprise must satisfy both investment and turnover ceilings to remain in a category. If an enterprise exceeds the ceiling limit specified for its present category in either of the two criteria, it ceases to hold that status and is graduated to the next higher category.
2. **Downward Reclassification:** An enterprise will be reclassified downwards only if both its investment and turnover go below the specified limits for that lower category.

---

## 3. Important Exemption: Export Turnover is Excluded

Under Section 7 of the MSMED Act:
> **Calculation of turnover:** Turnover of exports of goods or services or both shall be excluded while calculating the turnover of any enterprise for the purposes of MSME classification.

**Practical Example:**
If an enterprise has a total turnover of ₹120 Crore, of which ₹40 Crore is from domestic sales and ₹80 Crore is from export sales:
- **Net Qualifying Turnover for MSME calculation:** ₹120 Crore - ₹80 Crore = **₹40 Crore**.
- Since ₹40 Crore is &le; ₹100 Crore, the unit remains classified as a **Small Enterprise** (provided its investment is &le; ₹25 Crore), retaining all priority sector benefits, subsidies, and export incentives!`,
  },
]
